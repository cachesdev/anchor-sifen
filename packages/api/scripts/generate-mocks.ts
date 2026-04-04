/* eslint-disable no-console */
import * as fs from 'fs';
import * as path from 'path';
import { $RefParser } from '@apidevtools/json-schema-ref-parser';

// ---- config (edit these) ---------------------------------------------------

const SCHEMA_PATH = './schema.json';
const OUTPUT_PATH = './fake-data.json';
const COUNT = 1; // number of objects to generate

// ---- fake data generator ---------------------------------------------------

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFloat(min: number, max: number) {
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

interface SchemaLike {
  allOf?: unknown[];
  anyOf?: unknown[];
  oneOf?: unknown[];
  enum?: unknown[];
  const?: unknown;
  type?: string | string[];
  properties?: Record<string, unknown>;
  items?: unknown;
  minItems?: number;
  maxItems?: number;
  format?: string;
  minLength?: number;
  minimum?: number;
  maximum?: number;
}

function asSchemaLike(value: unknown): SchemaLike | null {
  if (!value || typeof value !== 'object') {
    return null;
  }

  return value as SchemaLike;
}

function fakeFromSchema(schemaInput: unknown, depth = 0): unknown {
  const schema = asSchemaLike(schemaInput);
  if (!schema) return null;
  if (depth > 10) return null; // safety limit

  // handle allOf / anyOf / oneOf by picking first
  if (Array.isArray(schema.allOf) && schema.allOf.length > 0) {
    const merged = asSchemaLike(schema.allOf[0]);
    return fakeFromSchema({ ...schema, ...(merged ?? {}), allOf: undefined }, depth);
  }

  if (Array.isArray(schema.anyOf) && schema.anyOf.length > 0) {
    return fakeFromSchema(schema.anyOf[0], depth);
  }

  if (Array.isArray(schema.oneOf) && schema.oneOf.length > 0) {
    return fakeFromSchema(schema.oneOf[0], depth);
  }

  // enum
  if (Array.isArray(schema.enum) && schema.enum.length > 0) {
    return schema.enum[randomInt(0, schema.enum.length - 1)];
  }

  // const
  if ('const' in schema) return schema.const;

  const type = Array.isArray(schema.type) ? schema.type[0] : schema.type;

  switch (type) {
    case 'object': {
      const result: Record<string, unknown> = {};
      const props = schema.properties ?? {};
      for (const [key, val] of Object.entries(props)) {
        result[key] = fakeFromSchema(val, depth + 1);
      }
      return result;
    }
    case 'array': {
      const len = randomInt(schema.minItems ?? 1, schema.maxItems ?? 3);
      return Array.from({ length: len }, () => fakeFromSchema(schema.items, depth + 1));
    }
    case 'string':
      if (schema.format === 'date-time') return randomDate();
      if (schema.format === 'date') return randomDate().slice(0, 10);
      if (schema.format === 'email') return `${randomString(6)}@${randomString(4)}.com`;
      if (schema.format === 'uri') return `https://${randomString(6)}.com/${randomString(4)}`;
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
      if (schema.properties) return fakeFromSchema({ ...schema, type: 'object' }, depth);
      if (schema.items) return fakeFromSchema({ ...schema, type: 'array' }, depth);
      return null;
  }
}

// ---- main ------------------------------------------------------------------

async function main() {
  const schemaPath = path.resolve(SCHEMA_PATH);
  const parsed = JSON.parse(fs.readFileSync(schemaPath, 'utf-8')) as unknown;
  if (!parsed || typeof parsed !== 'object') {
    throw new Error('El schema.json no es un objeto JSON valido.');
  }

  const raw = parsed as Record<string, unknown>;

  // Resolve root $ref then dereference everything
  const rootRef = typeof raw.$ref === 'string' ? raw.$ref : undefined;
  if (rootRef?.startsWith('#/definitions/')) {
    const definitions = raw.definitions;
    if (!definitions || typeof definitions !== 'object') {
      throw new Error('No se encontro "definitions" para resolver el $ref raiz.');
    }

    const definitionsObject = definitions as Record<string, unknown>;
    const defName = rootRef.slice('#/definitions/'.length);
    const definition = definitionsObject[defName];

    if (!definition || typeof definition !== 'object') {
      throw new Error(`No se encontro la definicion raiz "${defName}".`);
    }

    const resolvedDefinition = {
      ...(definition as Record<string, unknown>),
      definitions: definitionsObject
    };

    definitionsObject[defName] = resolvedDefinition;
    Object.assign(raw, resolvedDefinition);
    delete raw.$ref;
  }

  const schema = await $RefParser.dereference(raw);

  const results = Array.from({ length: COUNT }, () => fakeFromSchema(schema));
  const output = JSON.stringify(COUNT === 1 ? results[0] : results, null, 2);
  fs.writeFileSync(path.resolve(OUTPUT_PATH), output, 'utf-8');

  const kb = (Buffer.byteLength(output) / 1024).toFixed(1);
  console.log(`✅  Written to ${OUTPUT_PATH} (${kb} KB)`);
}

main().catch((error: unknown) => {
  console.error('❌  Error:', error instanceof Error ? error.message : String(error));
  process.exit(1);
});
