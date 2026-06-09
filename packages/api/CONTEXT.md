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
- `SIFEN Event`: SIFEN lifecycle occurrence that can mark, modify, or describe the state of a DE or DTE. This is broader than events submitted by the taxpayer, and the base SDK representation should preserve event data before requiring event-specific interpretation.
- `Registrable SIFEN Event`: SIFEN Event submitted to SIFEN through `siRecepEvento`; this is a narrower subset of SIFEN Event. Send-side construction follows the event types accepted for registration by the MT/NTs and request schema, while consultation event ledgers can contain a broader event catalog.
- `SIFEN Event XML group`: XML group rooted at `gGroupGesEve`, as carried by `xEvento` in consultation responses or by `dEvReg` in event submission. It can contain one or more signed SIFEN Event XML records.
- `Signed SIFEN Event XML`: XML record rooted at `rGesEve`, containing one SIFEN Event record (`rEve`) and its XML signature. It is distinct from both the enclosing SIFEN Event XML group and the event-type payload inside `gGroupTiEvt`.
- `SIFEN Event interpretation`: Mapping a preserved SIFEN Event payload into event-type-specific clean fields; distinct from preserving events in a SIFEN Event ledger.
- `SIFEN Event identifier`: Identifier of a specific event record. It is distinct from a CDC; event payloads expose a CDC only when the event is tied to a specific DE or DTE. For registrable events submitted through `siRecepEvento`, the emitter generates this identifier and SIFEN echoes it in the event reception result.
- `SIFEN Event submission container`: Consulta-side grouping that pairs one SIFEN Event XML group with optional event reception information. The XML group can contain one or more individual SIFEN Event records because event registration supports batch submissions.
- `SIFEN Event ledger`: Typed SDK view of the SIFEN Event submission containers associated with a CDC as returned by SIFEN; SIFEN remains the source of truth. Consulta-side ledgers cover the full documented SIFEN Event catalog, which is broader than `Registrable SIFEN Event`.
- `SIFEN Event construction`: Typed SDK capability for building `Registrable SIFEN Event` XML before submission; distinct from parsing SIFEN-returned event ledgers.
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
