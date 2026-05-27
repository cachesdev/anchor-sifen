/* eslint-disable no-console */
import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const MAIN_PAGE =
  'https://servicios.set.gov.py/eset-publico/consultarActividadEconomicaIService.do';

interface ActividadNode {
  id: string;
  nombre: string;
  hijos: boolean;
}

async function main() {
  const browser = await chromium.launch({ headless: true });

  try {
    const page = await browser.newPage();

    console.log('Cargando pagina...');
    await page.goto(MAIN_PAGE, { waitUntil: 'domcontentloaded', timeout: 30_000 });
    await page.waitForSelector('.list-group-item', { timeout: 15_000 });
    console.log(`Pagina cargada: "${await page.title()}"`);

    const allLeaves = new Map<string, string>();

    async function fetchChildren(parentId: string | null): Promise<ActividadNode[]> {
      const result = await Promise.race([
        page.evaluate(async (padre) => {
          const appEl = document.querySelector('[data-ng-app]');
          if (!appEl) throw new Error('No se encontro la app AngularJS');

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const injector = (window as any).angular.element(appEl).injector();
          if (!injector) throw new Error('No se encontro el inyector');

          const svc = injector.get('mgtuService');
          return svc.arbolNodos(padre || null, 'LOVActividadesEconomicas', {});
        }, parentId),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('Timeout en arbolNodos')), 30_000)
        )
      ]);

      return (result as { hijos?: ActividadNode[] }).hijos ?? [];
    }

    async function traverse(parentId: string | null, depth: number) {
      const children = await fetchChildren(parentId);
      for (const node of children) {
        const indent = '  '.repeat(depth + 1);
        if (node.hijos) {
          console.log(`${indent}→ ${node.nombre} [${node.id}]`);
          await traverse(node.id, depth + 1);
        } else {
          const code = node.id.replace(/^C4_/, '');
          const description = node.nombre.replace(/^\d+\s*-\s*/, '').trim();
          console.log(`${indent} ${description} (${code})`);

          if (allLeaves.has(code)) {
            console.warn(`${indent} Duplicado: ${code}`);
          }
          allLeaves.set(code, description);
        }
      }
    }

    console.log('Recorriendo arbol...');
    await traverse(null, 0);

    console.log(`\nTotal actividades: ${allLeaves.size}`);

    const entries = [...allLeaves.entries()].map(([code, description]) => ({
      code,
      description,
      key: toEnumKey(description)
    }));

    const output = buildFile(entries);
    const outputDir = resolve(process.cwd(), 'src/gen');
    mkdirSync(outputDir, { recursive: true });
    const outputPath = resolve(outputDir, 'actividad-economica.ts');
    writeFileSync(outputPath, output, 'utf8');
    console.log(`Generado ${outputPath} con ${entries.length} entradas.`);
  } finally {
    await browser.close();
  }
}

function toEnumKey(name: string): string {
  const base = name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0]!.toUpperCase() + part.slice(1).toLowerCase())
    .join('');

  const clean = base || 'SinNombre';
  return /^\d/.test(clean) ? `N${clean}` : clean;
}

function escapeTSString(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function buildFile(entries: { code: string; key: string; description: string }[]): string {
  const lines: string[] = [
    '/**',
    ' * Actividades Economicas - CIUU Paraguay',
    ' * Generado por scripts/gen-actividad-economica.ts desde servicios.set.gov.py',
    ' */',
    "import type { ValueOf } from 'type-fest';",
    '',
    'export const codigoActividadEconomica = {'
  ];

  for (const entry of entries) {
    lines.push(`  ${entry.key}: '${entry.code}',`);
  }

  lines.push(
    '} as const;',
    '',
    'export type CodigoActividadEconomica = ValueOf<typeof codigoActividadEconomica>;',
    '',
    'export const descripcionCodigoActividadEconomica = {'
  );

  for (const entry of entries) {
    const escaped = escapeTSString(entry.description);
    lines.push(`  [codigoActividadEconomica.${entry.key}]: '${escaped}',`);
  }

  lines.push(
    '} as const satisfies Record<CodigoActividadEconomica, string>;',
    '',
    'export type DescripcionCodigoActividadEconomica = ValueOf<typeof descripcionCodigoActividadEconomica>;',
    ''
  );

  return lines.join('\n');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
