# @anchorsoft/sifen Context

## Purpose

`@anchorsoft/sifen` is a TypeScript client for Paraguay's SIFEN electronic invoicing system. It generates, signs, sends, and queries Documentos Electronicos.

## Domain Vocabulary

- `SIFEN`: Paraguay electronic invoicing system.
- `Documento Electronico` / `DE`: Electronic document handled by the library.
- `CDC`: Control code generated for a DE.
- `PKCS12 certificate`: Certificate source used to sign documents.
- `CSC`: Credential data required by SIFEN.
- `DE builder`: Typed API for constructing a specific electronic document type.

## Architectural Notes

- The package aims for strongly typed APIs for each DE type.
- XML schema fields are modeled in TypeScript.
- Money should avoid floating point precision issues and is handled with `big.js`.
- Local validation is planned so errors can be found before sending a DE to SIFEN.

## ADRs

Context-specific ADRs live in `packages/api/docs/adr/`.

## Organizational Notes

This package is part of the `@anchorsoft` monorepo. To find additional context files and documentation, see the `docs/` directory at the monorepo root, the AGENTS.md file and the CONTEXT-MAP.md file.
