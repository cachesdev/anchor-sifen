import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { create } from 'xmlbuilder2';

type XMLTextNode = {
  textContent: string | null;
};

type XMLEnumerationNode = {
  getAttribute: (name: string) => string | null;
  getElementsByTagName: (name: string) => ArrayLike<XMLTextNode>;
};

type XMLRootNode = {
  getElementsByTagName: (name: string) => ArrayLike<XMLEnumerationNode>;
};

const xsdPath = resolve(process.cwd(), 'xsd/Paises_v100.xsd');
const outputPath = resolve(process.cwd(), 'src/gen/paises.ts');

const xsd = readFileSync(xsdPath, 'utf8');
const rootNode = create(xsd).root().node as unknown as XMLRootNode;

const enumerationNodes = Array.from(rootNode.getElementsByTagName('xs:enumeration'));
const entriesMap = new Map<string, string>();

for (const enumerationNode of enumerationNodes) {
  const code = enumerationNode.getAttribute('value')?.trim();
  const documentationNode = enumerationNode.getElementsByTagName('xs:documentation')[0];
  const name = documentationNode?.textContent?.replace(/\s+/g, ' ').trim();

  if (!code || !name) {
    continue;
  }

  // Si hay duplicados, el último valor sobrescribe el anterior
  entriesMap.set(code, name);
}

if (entriesMap.size === 0) {
  throw new Error(`No se encontraron entradas de paises en ${xsdPath}`);
}

const entries = Array.from(entriesMap.entries()).map(([code, name]) => ({ code, name }));

// Helper function to convert country code to PascalCase key
function toPascalCase(code: string): string {
  // Special cases for better readability
  const specialCases: Record<string, string> = {
    PRY: 'Paraguay',
    ARG: 'Argentina',
    BRA: 'Brasil',
    URY: 'Uruguay',
    CHL: 'Chile',
    BOL: 'Bolivia',
    PER: 'Peru',
    USA: 'EstadosUnidos',
    GBR: 'ReinoUnido',
    ESP: 'Espana',
    FRA: 'Francia',
    DEU: 'Alemania',
    ITA: 'Italia',
    CHN: 'China',
    JPN: 'Japon',
    KOR: 'CoreaSur',
    PRK: 'CoreaNorte',
    RUS: 'Rusia',
    CAN: 'Canada',
    MEX: 'Mexico',
    COL: 'Colombia',
    VEN: 'Venezuela',
    ECU: 'Ecuador',
    PAN: 'Panama',
    CRI: 'CostaRica',
    GTM: 'Guatemala',
    HND: 'Honduras',
    NIC: 'Nicaragua',
    SLV: 'ElSalvador',
    CUB: 'Cuba',
    DOM: 'RepublicaDominicana',
    HTI: 'Haiti',
    JAM: 'Jamaica',
    PRI: 'PuertoRico',
    AUS: 'Australia',
    NZL: 'NuevaZelanda',
    IND: 'India',
    PAK: 'Pakistan',
    BGD: 'Bangladesh',
    IDN: 'Indonesia',
    THA: 'Tailandia',
    VNM: 'Vietnam',
    PHL: 'Filipinas',
    MYS: 'Malasia',
    SGP: 'Singapur',
    SAU: 'ArabiaSaudita',
    ARE: 'EmiratosArabesUnidos',
    ISR: 'Israel',
    TUR: 'Turquia',
    EGY: 'Egipto',
    ZAF: 'Sudafrica',
    NGA: 'Nigeria',
    KEN: 'Kenia',
    ETH: 'Etiopia',
    GHA: 'Ghana',
    TZA: 'Tanzania',
    UGA: 'Uganda',
    AGO: 'Angola',
    MOZ: 'Mozambique',
    ZWE: 'Zimbabue',
    ZMB: 'Zambia',
    BWA: 'Botsuana',
    NAM: 'Namibia',
    SWZ: 'Suazilandia',
    LSO: 'Lesoto'
  };

  if (specialCases[code]) {
    return specialCases[code];
  }

  // Default: use the code itself as PascalCase
  return code.charAt(0).toUpperCase() + code.slice(1).toLowerCase();
}

const lines: string[] = [];

lines.push('/**');
lines.push(' * Códigos de países ISO 3166 - Tabla 4 | Manual Tecnico p.211');
lines.push(' * Generado por scripts/gen-paises.ts desde Paises_v100.xsd');
lines.push(' */');
lines.push("import type { ValueOf } from 'type-fest';");
lines.push('');
lines.push('export const codigoPais = {');

for (const { code } of entries) {
  const key = toPascalCase(code);
  lines.push(`  ${key}: '${code}',`);
}

lines.push('} as const;');
lines.push('export type CodigoPais = ValueOf<typeof codigoPais>;');
lines.push('');
lines.push('export const descripcionCodigoPais = {');

for (const { code, name } of entries) {
  lines.push(`  [codigoPais.${toPascalCase(code)}]: ${JSON.stringify(name)},`);
}

lines.push('} as const satisfies Record<CodigoPais, string>;');
lines.push('export type DescripcionCodigoPais = ValueOf<typeof descripcionCodigoPais>;');
lines.push('');

writeFileSync(outputPath, lines.join('\n'), 'utf8');

process.stdout.write(`Generado ${outputPath} con ${entries.length} entradas de ${xsdPath}\n`);
