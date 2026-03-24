/* eslint-disable no-console */
import * as fs from 'fs';
import * as path from 'path';
import $RefParser from '@apidevtools/json-schema-ref-parser';
// ---- config (edit these) ---------------------------------------------------
const SCHEMA_PATH = './schema.json';
const OUTPUT_PATH = './fake-data.json';
const COUNT = 1; // number of objects to generate
// ---- fake data generator ---------------------------------------------------
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomFloat(min, max) {
    return parseFloat((Math.random() * (max - min) + min).toFixed(4));
}
function randomString(len = 8) {
    return Math.random()
        .toString(36)
        .slice(2, 2 + len);
}
function randomDate() {
    const d = new Date(Date.now() - randomInt(0, 1000 * 60 * 60 * 24 * 365 * 5));
    return d.toISOString();
}
function fakeFromSchema(schema, depth = 0) {
    if (!schema || typeof schema !== 'object')
        return null;
    if (depth > 10)
        return null; // safety limit
    // handle allOf / anyOf / oneOf by picking first
    if (schema.allOf)
        return fakeFromSchema({ ...schema, ...schema.allOf[0], allOf: undefined }, depth);
    if (schema.anyOf)
        return fakeFromSchema(schema.anyOf[0], depth);
    if (schema.oneOf)
        return fakeFromSchema(schema.oneOf[0], depth);
    // enum
    if (schema.enum)
        return schema.enum[randomInt(0, schema.enum.length - 1)];
    // const
    if ('const' in schema)
        return schema.const;
    const type = Array.isArray(schema.type) ? schema.type[0] : schema.type;
    switch (type) {
        case 'object': {
            const result = {};
            const props = schema.properties ?? {};
            const required = schema.required ?? [];
            for (const [key, val] of Object.entries(props)) {
                if (true) {
                    result[key] = fakeFromSchema(val, depth + 1);
                }
            }
            return result;
        }
        case 'array': {
            const len = randomInt(schema.minItems ?? 1, schema.maxItems ?? 3);
            return Array.from({ length: len }, () => fakeFromSchema(schema.items, depth + 1));
        }
        case 'string':
            if (schema.format === 'date-time')
                return randomDate();
            if (schema.format === 'date')
                return randomDate().slice(0, 10);
            if (schema.format === 'email')
                return `${randomString(6)}@${randomString(4)}.com`;
            if (schema.format === 'uri')
                return `https://${randomString(6)}.com/${randomString(4)}`;
            if (schema.format === 'uuid') {
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
                    const r = (Math.random() * 16) | 0;
                    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
                });
            }
            return randomString(schema.minLength ?? 6);
        case 'number':
        case 'integer':
            return type === 'integer'
                ? randomInt(schema.minimum ?? 1, schema.maximum ?? 9999)
                : randomFloat(schema.minimum ?? 0, schema.maximum ?? 9999);
        case 'boolean':
            return Math.random() > 0.5;
        case 'null':
            return null;
        default:
            // no type hint — try to infer
            if (schema.properties)
                return fakeFromSchema({ ...schema, type: 'object' }, depth);
            if (schema.items)
                return fakeFromSchema({ ...schema, type: 'array' }, depth);
            return null;
    }
}
// ---- main ------------------------------------------------------------------
async function main() {
    const schemaPath = path.resolve(SCHEMA_PATH);
    const raw = JSON.parse(fs.readFileSync(schemaPath, 'utf-8'));
    // Resolve root $ref then dereference everything
    const rootRef = raw.$ref;
    if (rootRef?.startsWith('#/definitions/')) {
        const defName = rootRef.slice('#/definitions/'.length);
        raw.definitions[defName] = { ...raw.definitions[defName], definitions: raw.definitions };
        Object.assign(raw, raw.definitions[defName]);
        delete raw.$ref;
    }
    const schema = await $RefParser.dereference(raw);
    const results = Array.from({ length: COUNT }, () => fakeFromSchema(schema));
    const output = JSON.stringify(COUNT === 1 ? results[0] : results, null, 2);
    fs.writeFileSync(path.resolve(OUTPUT_PATH), output, 'utf-8');
    const kb = (Buffer.byteLength(output) / 1024).toFixed(1);
    console.log(`✅  Written to ${OUTPUT_PATH} (${kb} KB)`);
}
main().catch((err) => {
    console.error('❌  Error:', err.message ?? err);
    process.exit(1);
});
