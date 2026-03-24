/* eslint-disable no-console */
import https from 'https';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
const cert = fs.readFileSync('cert/cert.pem');
const key = fs.readFileSync('cert/key.pem');
const WSDLS = {
    recibe: 'https://sifen-test.set.gov.py/de/ws/sync/recibe.wsdl?wsdl',
    recibeLote: 'https://sifen-test.set.gov.py/de/ws/async/recibe-lote.wsdl?wsdl',
    evento: 'https://sifen-test.set.gov.py/de/ws/eventos/evento.wsdl?wsdl',
    consulta: 'https://sifen-test.set.gov.py/de/ws/consultas/consulta.wsdl?wsdl',
    consultaLote: 'https://sifen-test.set.gov.py/de/ws/consultas/consulta-lote.wsdl?wsdl',
    consultaRuc: 'https://sifen-test.set.gov.py/de/ws/consultas/consulta-ruc.wsdl?wsdl'
};
// XSD locations are relative — resolve them against the WSDL's base URL
const XSD_BASE = {
    recibe: 'https://sifen-test.set.gov.py/de/ws/sync/',
    recibeLote: 'https://sifen-test.set.gov.py/de/ws/async/',
    evento: 'https://sifen-test.set.gov.py/de/ws/eventos/',
    consulta: 'https://sifen-test.set.gov.py/de/ws/consultas/',
    consultaLote: 'https://sifen-test.set.gov.py/de/ws/consultas/',
    consultaRuc: 'https://sifen-test.set.gov.py/de/ws/consultas/'
};
function httpsGet(url) {
    return new Promise((resolve, reject) => {
        const parsed = new URL(url);
        const req = https.request({
            hostname: parsed.hostname,
            path: parsed.pathname + parsed.search,
            method: 'GET',
            cert,
            key,
            rejectUnauthorized: true,
            minVersion: 'TLSv1.2'
        }, (res) => {
            let data = '';
            res.on('data', (chunk) => (data += chunk));
            res.on('end', () => {
                if (res.statusCode !== 200)
                    return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
                resolve(data);
            });
        });
        req.on('error', reject);
        req.end();
    });
}
async function httpsGetWithBackoff(url) {
    const maxAttempts = 5;
    let delay = 500;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        await new Promise((r) => setTimeout(r, delay));
        const content = await httpsGet(url);
        if (content.length > 0)
            return content;
        console.warn(`  ⚠ empty response for ${url} (attempt ${attempt}/${maxAttempts}, retrying in ${delay}ms)`);
        delay = Math.min(delay * 2, 10_000);
    }
    throw new Error(`Failed to fetch ${url} after ${maxAttempts} attempts`);
}
function extractXsdLocations(content) {
    const matches = content.matchAll(/schemaLocation=["']([^"']+\.xsd)["']/g);
    return [...matches].map((m) => m[1]);
}
async function fetchWithDeps(baseUrl, filename, outDir) {
    if (fs.existsSync(path.join(outDir, filename)))
        return;
    await new Promise((r) => setTimeout(r, 2000));
    const content = await httpsGetWithBackoff(baseUrl + filename);
    fs.writeFileSync(path.join(outDir, filename), content);
    console.log(`  ✓ fetched ${filename} (${content.length} bytes)`);
    for (const dep of extractXsdLocations(content)) {
        await fetchWithDeps(baseUrl, dep, outDir);
    }
}
fs.rmSync('src/gen/soap', { recursive: true, force: true });
fs.mkdirSync('src/gen/soap', { recursive: true });
fs.mkdirSync('src/gen/soap/wsdl', { recursive: true });
// 1. Fetch WSDLs
for (const [name, url] of Object.entries(WSDLS)) {
    await new Promise((r) => setTimeout(r, 2000));
    const content = await httpsGetWithBackoff(url);
    console.log(`✓ fetched ${name}.wsdl (${content.length} bytes)`);
    fs.writeFileSync(path.join('src/gen/soap/wsdl', `${name}.wsdl`), content);
    const xsds = extractXsdLocations(content);
    console.log(`  found XSDs: ${JSON.stringify(xsds)}`);
    for (const xsdFile of xsds) {
        await fetchWithDeps(XSD_BASE[name], xsdFile, 'wsdl');
    }
}
// 2. Gen types
console.log('\nGenerating types...');
for (const name of Object.keys(WSDLS)) {
    const wsdlPath = path.join('src/gen/soap/wsdl', `${name}.wsdl`);
    const outDir = path.join('src/gen/soap', name);
    fs.mkdirSync(outDir, { recursive: true });
    execSync(`pnpx wsdl-tsclient ${wsdlPath} -o ${outDir} --esm`, { stdio: 'inherit' });
    console.log(`✓ generated ${name}`);
}
console.log('\nFixing type imports...');
execSync(`pnpm eslint src/gen/soap/ --fix --rule '{"@typescript-eslint/consistent-type-imports": ["error", {"prefer": "type-imports"}], "@typescript-eslint/consistent-type-exports": ["error", {"fixMixedExportsWithInlineTypeSpecifier": true}]}'`, { stdio: 'inherit' });
console.log('✓ fixed type imports');
console.log('\nDone. Types in ./src/gen/soap/');
