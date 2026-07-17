# Contributing to Manky

Thanks for taking the time to contribute.

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Before you start

> **Note on Next.js:** this project pins a version of Next.js with breaking
> changes from the widely known releases — APIs, conventions, and file
> structure may differ. Read the bundled guides under
> `node_modules/next/dist/docs/` before writing any code, and heed any
> deprecation notices. See `AGENTS.md` for details.

## Making changes

1. Create a branch off `main`.
2. Make your changes, keeping them focused and scoped to the task at hand.
3. Run the checks below before opening a pull request.

## Checks

These run in CI on every pull request (see
`.github/workflows/code-quality.yml`) and should pass locally first:

```bash
pnpm typecheck
pnpm lint
```

Use `pnpm lint:fix` to auto-fix lint issues and `pnpm fmt` to format code with
oxfmt.

| Command          | Description           |
| ---------------- | --------------------- |
| `pnpm typecheck` | Type-check with `tsc` |
| `pnpm lint`      | Lint with oxlint      |
| `pnpm lint:fix`  | Lint and auto-fix     |
| `pnpm fmt`       | Format with oxfmt     |

## Pull requests

- Keep PRs small and focused on a single change.
- Write a clear description of what changed and why.
- Make sure `pnpm typecheck` and `pnpm lint` pass before requesting review.
