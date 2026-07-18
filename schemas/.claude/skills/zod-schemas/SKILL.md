---
name: zod-schemas
description: Reference and conventions for writing Zod v4 validation schemas in this project's schemas/ folder. Use when creating, editing, or reviewing any file under schemas/.
---

# Zod schemas

This skill applies only to files inside `schemas/`. It documents the Zod v4 API (installed in this project as the `zod` dependency) so schemas here stay consistent and use current, non-deprecated APIs.

Source: https://zod.dev and https://zod.dev/api (Zod v4).

## Conventions for this folder

- One schema (and its inferred type) per file, named after the entity it validates, e.g. `user.ts` exports `UserSchema` and `type User = zod.infer<typeof UserSchema>`.
- Import as `import * as zod from "zod"`.
- Compose larger schemas with `.extend()`, `.pick()`, `.omit()`, `.partial()` rather than duplicating fields.
- Use the built-in string formats (`z.email()`, `z.url()`, `z.uuid()`, `z.iso.datetime()`, etc.) instead of hand-rolled regexes when an equivalent exists.

## Core API reference

### Primitives & literals

`z.string()`, `z.number()`, `z.bigint()`, `z.boolean()`, `z.symbol()`, `z.undefined()`, `z.null()`, `z.literal(value)`, `z.any()`, `z.unknown()`, `z.never()`.

### Coercion

`z.coerce.string()`, `z.coerce.number()`, `z.coerce.boolean()`, `z.coerce.bigint()` — coerce input via `String()`/`Number()`/`Boolean()`/`BigInt()` before validating.

### Strings

Constraints: `.min()`, `.max()`, `.length()`, `.regex()`, `.startsWith()`, `.endsWith()`, `.includes()`, `.trim()`, `.toLowerCase()`, `.toUpperCase()`, `.uppercase()`, `.lowercase()`, `.normalize()`.

Formats: `z.email()`, `z.url()`, `z.uuid()` / `z.uuidv4()` / `z.uuidv6()` / `z.uuidv7()`, `z.hostname()`, `z.e164()`, `z.emoji()`, `z.base64()`, `z.base64url()`, `z.hex()`, `z.jwt()`, `z.hash("sha256")`, `z.ipv4()`, `z.ipv6()`, `z.mac()`, `z.cidrv4()`, `z.cidrv6()`, `z.iso.date()`, `z.iso.time()`, `z.iso.datetime({ offset, local, precision })`, `z.iso.duration()`.

Custom format: `z.stringFormat("name", (val) => boolean)`.

### Numbers & bigints

`z.number()` (finite only), `.gt()`, `.gte()`, `.lt()`, `.lte()`, `.positive()`, `.nonnegative()`, `.negative()`, `.nonpositive()`, `.multipleOf()`. `z.int()`, `z.int32()`. `z.nan()`. `z.bigint()` with the same comparison methods.

### Booleans & dates

`z.boolean()`. `z.date()` with `.min()` / `.max()`.

### Enums

```ts
const Fish = z.enum(["Salmon", "Tuna", "Trout"]);
```

`.enum` (object form), `.exclude([...])`, `.extract([...])`. `z.stringbool()` parses `"true"/"1"/"yes"/"on"` etc. into booleans.

### Optional / nullable

`z.optional(schema)`, `z.nullable(schema)`, `z.nullish(schema)` — each has `.unwrap()`.

### Objects

```ts
const PersonSchema = zod.object({
  name: zod.string(),
  age: zod.number().optional(),
});
```

- `z.object()` strips unknown keys, `z.strictObject()` throws on them, `z.looseObject()` passes them through.
- `.catchall(schema)`, `.shape`, `.keyof()`, `.extend(fields)`, `.safeExtend(fields)`, `.pick({...})`, `.omit({...})`, `.partial()`, `.required()`.
- Recursive schemas use a getter:

```ts
const Category = z.object({
  name: z.string(),
  get subcategories() {
    return z.array(Category);
  },
});
```

### Arrays, tuples, collections

- `z.array(schema)` — `.min()`, `.max()`, `.length()`.
- `z.tuple([a, b, c])`, variadic: `z.tuple([z.string()], z.number())`.
- `z.map(keySchema, valueSchema)`, `z.set(schema)` — `.min()`, `.max()`, `.size()`.
- `z.record(keySchema, valueSchema)`, `z.partialRecord()`, `z.looseRecord()`.
- `z.file()` — `.min(bytes)`, `.max(bytes)`, `.mime(type | type[])`.

### Unions & intersections

- `z.union([a, b])`, `.options`.
- `z.discriminatedUnion("key", [a, b])` for tagged unions — prefer this over plain unions when a discriminant field exists.
- `z.xor([a, b])` — exactly one must match.
- `z.intersection(a, b)` — prefer `.extend()` for merging object schemas.

### Refinements

- `.refine((val) => boolean, { error, abort, path })` for a single custom check.
- `.superRefine((val, ctx) => { ctx.addIssue({ code, message, ... }); })` for multiple/custom issues.
- Async refinements require `.parseAsync()` / `.safeParseAsync()`.

### Transforms & pipes

- `.transform(fn)`, `z.preprocess(fn, schema)`, `.pipe(otherSchema)`.
- `z.NEVER` to abort a transform without breaking the inferred type.

### Defaults, prefaults, catch

- `.default(value | fn)` — used when input is `undefined`, applied before parsing.
- `.prefault(value | fn)` — parses the default through the schema.
- `.catch(value | fn)` — fallback used when validation fails.

### Codecs

```ts
z.codec(z.iso.datetime(), z.date(), {
  decode: (s) => new Date(s),
  encode: (d) => d.toISOString(),
});
```

`z.decode()`, `z.encode()`, `z.invertCodec()`.

### Advanced

- Branded types: `schema.brand<"Cat">()`.
- `.readonly()` — freezes at runtime.
- `z.instanceof(Class)`.
- `z.custom<Type>((val) => boolean)`.
- `z.json()` — validates JSON-encodable values.
- `z.function({ input: [...], output: schema }).implement(fn)`.

### Type inference

- `z.infer<typeof schema>` / `z.output<typeof schema>` — output type.
- `z.input<typeof schema>` — input type (pre-transform).

### Parsing & error handling

- `.parse(data)` — throws `ZodError`.
- `.safeParse(data)` — returns `{ success, data | error }`.
- `.parseAsync()` / `.safeParseAsync()` — for schemas with async refinements/transforms.
