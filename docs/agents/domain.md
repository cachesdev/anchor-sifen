# Domain Docs

How the engineering skills should consume this repo's domain documentation when exploring the codebase.

## Layout

This is a multi-context pnpm monorepo.

Start with root `CONTEXT-MAP.md`. It maps each package or bounded context to its own `CONTEXT.md` and context-scoped ADR directory.

## Before exploring, read these

- `CONTEXT-MAP.md` at the repo root.
- The relevant context file listed in `CONTEXT-MAP.md`.
- Relevant ADRs listed for that context.
- Root `docs/adr/`, if present, for repo-wide decisions.

If any listed context or ADR file does not exist yet, proceed silently. Do not flag its absence unless the task is specifically about domain documentation.

## Use the glossary's vocabulary

When your output names a domain concept, use the term as defined in the relevant `CONTEXT.md`.

If the concept you need is not in the glossary yet, note it as a candidate for `/grill-with-docs`.

## Flag ADR conflicts

If your output contradicts an existing ADR, surface it explicitly rather than silently overriding it.
