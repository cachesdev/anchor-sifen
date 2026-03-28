/**
 * Genera archivos TS para Departamentos, Distritos y Ciudades
 * en base al Excel de referencia geografica de SIFEN.
 */

import ExcelJS from 'exceljs';
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

type CatalogMap = Map<number, string>;

type EnumEntry = {
  key: string;
  code: number;
  name: string;
};

function toEnumKey(name: string, code: number, used: Set<string>): string {
  const base = name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0]!.toUpperCase() + part.slice(1).toLowerCase())
    .join('');

  const cleanBase = base || 'SinNombre';
  const candidate = /^\d/.test(cleanBase) ? `N${cleanBase}` : cleanBase;

  if (!used.has(candidate)) {
    used.add(candidate);
    return candidate;
  }

  const withCode = `${candidate}_${code}`;
  if (!used.has(withCode)) {
    used.add(withCode);
    return withCode;
  }

  let i = 2;
  while (used.has(`${withCode}_${i}`)) i += 1;
  const unique = `${withCode}_${i}`;
  used.add(unique);
  return unique;
}

function toTSString(value: string): string {
  return `'${value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
}

function toEntries(catalog: CatalogMap): EnumEntry[] {
  const used = new Set<string>();
  return [...catalog.entries()].map(([code, name]) => ({
    key: toEnumKey(name, code, used),
    code,
    name
  }));
}

function buildEnumFile(params: {
  title: string;
  enumName: string;
  enumType: string;
  descName: string;
  descType: string;
  entries: EnumEntry[];
}): string {
  const lines: string[] = [
    '/**',
    ` * ${params.title}`,
    ' */',
    "import type { ValueOf } from 'type-fest';",
    '',
    `export const ${params.enumName} = {`
  ];

  for (const entry of params.entries) {
    lines.push(`  ${entry.key}: ${entry.code},`);
  }

  lines.push(
    '} as const;',
    '',
    `export type ${params.enumType} = ValueOf<typeof ${params.enumName}>;`,
    '',
    `export const ${params.descName} = {`
  );

  for (const entry of params.entries) {
    lines.push(`  [${params.enumName}.${entry.key}]: ${toTSString(entry.name)},`);
  }

  lines.push(
    `} as const satisfies Record<${params.enumType}, string>;`,
    '',
    `export type ${params.descType} = ValueOf<typeof ${params.descName}>;`,
    ''
  );

  return lines.join('\n');
}

const workbook = new ExcelJS.Workbook();
await workbook.xlsx.readFile(
  resolve(process.cwd(), 'scripts/data/CÓDIGO DE REFERENCIA GEOGRAFICA_NOVIEMBRE_2025.xlsx')
);

const worksheet = workbook.worksheets[0];
if (!worksheet) throw new Error('No se encontro la primera hoja del Excel');

const departamentos = new Map<number, string>();
const distritos = new Map<number, string>();
const ciudades = new Map<number, string>();

worksheet.eachRow((row, rowNumber) => {
  if (rowNumber <= 15) return;

  const depCode = Number(row.getCell(2).value);
  const depName = String(row.getCell(3).value ?? '').trim();
  const distCode = Number(row.getCell(4).value);
  const distName = String(row.getCell(5).value ?? '').trim();
  const cityCode = Number(row.getCell(6).value);
  const cityName = String(row.getCell(7).value ?? '').trim();

  if (depCode && depName) departamentos.set(depCode, depName);
  if (distCode && distName) distritos.set(distCode, distName);
  if (cityCode && cityName) ciudades.set(cityCode, cityName);
});

const outputDir = resolve(process.cwd(), 'src/gen');
mkdirSync(outputDir, { recursive: true });

const departamentosFile = buildEnumFile({
  title: 'Referencias geograficas: Departamentos de Paraguay.',
  enumName: 'codigoDepartamento',
  enumType: 'CodigoDepartamento',
  descName: 'descripcionCodigoDepartamento',
  descType: 'DescripcionCodigoDepartamento',
  entries: toEntries(
    new Map([...departamentos.entries()].sort((a, b) => Number(a[0]) - Number(b[0])))
  )
});

const distritosFile = buildEnumFile({
  title: 'Referencias geograficas: Distritos de Paraguay.',
  enumName: 'codigoDistrito',
  enumType: 'CodigoDistrito',
  descName: 'descripcionCodigoDistrito',
  descType: 'DescripcionCodigoDistrito',
  entries: toEntries(new Map([...distritos.entries()].sort((a, b) => Number(a[0]) - Number(b[0]))))
});

const ciudadesFile = buildEnumFile({
  title: 'Referencias geograficas: Ciudades de Paraguay.',
  enumName: 'codigoCiudad',
  enumType: 'CodigoCiudad',
  descName: 'descripcionCodigoCiudad',
  descType: 'DescripcionCodigoCiudad',
  entries: toEntries(new Map([...ciudades.entries()].sort((a, b) => Number(a[0]) - Number(b[0]))))
});

writeFileSync(resolve(outputDir, 'departamentos.ts'), departamentosFile, 'utf8');
writeFileSync(resolve(outputDir, 'distritos.ts'), distritosFile, 'utf8');
writeFileSync(resolve(outputDir, 'ciudades.ts'), ciudadesFile, 'utf8');

// eslint-disable-next-line no-console
console.log(`Procesado:
- ${departamentos.size} departamentos
- ${distritos.size} distritos
- ${ciudades.size} ciudades
Archivos generados en ${outputDir}`);
