# @anchorsoft/sifen Context

## Purpose

`@anchorsoft/sifen` is a TypeScript client for Paraguay's SIFEN electronic invoicing system. It generates, signs, sends, and queries Documentos Electronicos.

## Domain Vocabulary

- `SIFEN`: Paraguay electronic invoicing system.
- `Documento Electronico` / `DE`: Electronic document handled by the library.
- `CDC`: Control code generated for a DE.
- `PKCS12 certificate`: Certificate source used to sign documents.
- `CSC`: Credential data required by SIFEN.
- `RUC`: Paraguayan taxpayer identifier. Canonical clean DE data keeps the RUC number and verifier digit as separate values; hyphenated RUC strings are tolerated at input boundaries for users who provide them unknowingly.
- `DE builder`: Typed API for constructing a specific electronic document type.
- `Clean type`: User-facing, domain-shaped TypeScript object for a DE or DE group.
- `Raw type`: XML-shaped TypeScript object whose fields match SIFEN XML element names.
- `DE XML parser`: Parser that converts `rDE`/`DE` XML into the raw `Documento Electronico` shape; signature, QR, namespace, and schema metadata are outside this raw DE boundary.
- `Reverse mapper`: Mapper that converts a raw type back into its corresponding clean type.
- `Reverse-mapped DE`: Clean representation of a DE as received from raw/XML data, primarily for validation or UI display rather than resubmission to SIFEN.
- `MT 150`: Technical specification for the SIFEN electronic invoicing system. md version can be find under /docs.
- `NT`: "Nota Tecnica" or technical note, a document that provides clarifications and updates to the MT 150 specification. md version can be find under /docs/notas-tecnicas. an index file 'Indice.md' can be found in the same directory to help navigate the NTs and the MT 150.

## Architectural Notes

- The package aims for strongly typed APIs for each DE type.
- XML schema fields are modeled in TypeScript.
- Money should avoid floating point precision issues and is handled with `big.js`.
- DE XML parsing preserves precision-sensitive decimal values as strings until reverse mappers convert them to `big.js`.
- Local validation is planned so errors can be found before sending a DE to SIFEN.

## ADRs

Context-specific ADRs live in `packages/api/docs/adr/`.

## Organizational Notes

This package is part of the `@anchorsoft` monorepo. To find additional context files and documentation, see the `docs/` directory at the monorepo root, the AGENTS.md file and the CONTEXT-MAP.md file.
