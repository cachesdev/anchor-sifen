import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { create } from 'xmlbuilder2';
const xsdPath = resolve(process.cwd(), 'xsd/Monedas_v150.xsd');
const outputPath = resolve(process.cwd(), 'src/gen/iso4217.ts');
const xsd = readFileSync(xsdPath, 'utf8');
const rootNode = create(xsd).root().node;
const enumerationNodes = Array.from(rootNode.getElementsByTagName('xs:enumeration'));
const entries = [];
for (const enumerationNode of enumerationNodes) {
    const code = enumerationNode.getAttribute('value')?.trim();
    const codeNameNode = enumerationNode.getElementsByTagName('CodeName')[0];
    const name = codeNameNode?.textContent?.replace(/\s+/g, ' ').trim();
    if (!code || !name) {
        continue;
    }
    entries.push({ code, name });
}
if (entries.length === 0) {
    throw new Error(`No se encontraron entradas ISO 4217 en ${xsdPath}`);
}
const seen = new Set();
for (const { code } of entries) {
    if (seen.has(code)) {
        throw new Error(`Codigo ISO 4217 duplicado en XSD: ${code}`);
    }
    seen.add(code);
}
const lines = [];
lines.push('/**');
lines.push(' * Codigos de Moneda ISO 4217 en base a Monedas_v150.xsd.');
lines.push(' * Generado por src/scripts/gen-iso4217.ts');
lines.push(' */');
lines.push('export const codigoMoneda = {');
for (const { code, name } of entries) {
    lines.push(`  ${code}: ${JSON.stringify(name)},`);
}
lines.push('} as const;');
lines.push('');
lines.push('export type CodigoMoneda = keyof typeof codigoMoneda;');
lines.push('export type DescripcionCodigoMoneda = (typeof codigoMoneda)[CodigoMoneda];');
lines.push('');
writeFileSync(outputPath, lines.join('\n'), 'utf8');
process.stdout.write(`Generado ${outputPath} con ${entries.length} entradas de ${xsdPath}\n`);
