# pe-mfe-stylus — Claude Context

## What This Is

The writing MFE for the personal-enterprise project. Talks to `go-write` (Go REST). A Project renders as a board: Subjects are columns, Texts are cards within a column, both reorderable via drag-and-drop.

**Nothing described below is implemented yet.** `src/pages/*.tsx` currently render hardcoded fake data and navigate with hardcoded ids; `src/api/*.ts` are thin `BaseApi` subclasses with no domain-specific methods. This file documents the intended architecture so implementation follows a single agreed design rather than re-deriving it.

---

## Domain Hierarchy

Fixed three levels: Project → Subject → Text. No nested Subjects, no arbitrary depth. See `go-write`'s `CLAUDE.md` for the backend-side reasoning — this MFE's UI is built around exactly two drag-and-drop interactions (reorder within a column, move a card between columns), and a fixed hierarchy is what keeps that bounded.

---

## Data Fetching & Organization

Opening a Project does **one fetch**: all Texts where `projectId` matches (`GET /texts?projectId=...`), not a per-subject fetch. This is a **summary** fetch — each item is a `TextSummary` (`id`, `title`, `description`, `subjectId`, `projectId`, `order`), not the full `Text`. `content` is the largest field on a Text and isn't needed to render a Project board (columns of cards showing only title + description), so it isn't fetched here. See `go-write`'s `CLAUDE.md` ("Fetching: List vs Detail") for the backend side of this split.

From that one array, derive two structures client-side:

1. **Id map** (`{ [textId]: TextSummary }`) — for direct lookup, e.g. finding a card's summary data without scanning. Standard `reduce` into an object.
2. **Grouped-and-sorted** (`{ [subjectId]: TextSummary[] }`) — for rendering columns. Group the flat array by `subjectId`, then sort each group by `order` ascending. Both structures hold the same object references — no copying, no duplicated data.

Opening a Subject or Text view fetches the full `Text` (including `content`) for that one text via `GET /texts/:id` — a separate, on-demand fetch, not something pulled from the project-level summary data. Cache it independently (its own TanStack Query key per text id) rather than trying to merge it into the summary structures above.

Do not re-fetch the project-level summary list to reorganize after a mutation — see below.

---

## Drag-and-Drop Reordering

On drop, compute the new `order` value from data already in memory — the rendered column already contains every sibling in order, so the neighboring items at the drop position are already available without an extra fetch.

- **Reorder within a column**: `newOrder = neighborBefore.order + 1` (see `go-write` `CLAUDE.md` for why this is a plain integer, not a float average, and why the `+1`-from-neighbor scheme has enough headroom that a rebalance is effectively never needed at realistic per-subject text counts).
- **Move to a different column**: same computation, plus set the text's `subjectId` to the destination column's subject id. This is expected to hit its own backend operation (owned by the `subject` domain) once that exists, not the general text update.
- Apply the reorder **optimistically** to local state immediately (splice the moved item into the new position in your React state), then fire the PATCH in the background. Do not wait on the network response before updating the UI, and do not refetch the whole project's texts after a successful move — the local splice already reflects the new state.
- Render with `.map()` and a stable `key={text.id}`; wrap the card component in `React.memo` so a reorder only re-renders the cards whose props actually changed, not the whole column.

---

## REST Client Pattern

Same as the other REST MFEs (`pe-mfe-job-search`, `pe-mfe-budget`):

- `AUTH_URL` — go-auth base URL, used by `axiosPublic` for token refresh (`/token/exchange`)
- `API_URL` — go-write base URL, used by `axiosAuth` for authenticated requests
- `createAuthClient` wires the JWT interceptors onto `axiosAuth`; public/unauthenticated calls use a plain `axios.create()` instance

---

## Current State

- `src/pages/Main.tsx`, `Project.tsx`, `Subject.tsx`, `Text.tsx` — placeholder pages with hardcoded fake data, no real fetching
- `src/api/baseApi.ts`, `projectApi.ts`, `subjectApi.ts`, `textApi.ts` — thin `BaseApi` subclasses, no domain methods added yet
- No hooks, no drag-and-drop library chosen yet, no auth client wiring yet
- Backend (`go-write`) is itself mid-scaffold — `subject` and `project` domains don't exist yet, and `Text` doesn't have an `order` field yet either. See `go-write`'s `CLAUDE.md` for exact status.
