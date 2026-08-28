# AutomatonSoft agent rules

## Codebase discovery

- Use `codebase-memory-mcp` for source-code discovery before text search:
  `search_graph`, `trace_path`, `get_code_snippet`, `query_graph`,
  `get_architecture`, then `search_code`.
- The project identifier is
  `Users-saidaka-Desktop-DW-WORK-AutomatonSoft-automatonsoft-automatonsoft`.
- The persistent index is `.codebase-memory/graph.db.zst`. Re-index it after
  material source-code changes and verify with `index_status`.
- Use `rg` only for non-code files, exact string literals, logs, or when the
  graph cannot answer the question.

## Implementation style

- Apply the `ponytail` skill to every code change: choose the smallest correct
  change, prefer deletion and platform features, and add no dependency or
  abstraction without a present need.
- Preserve existing unrelated work. Validate every changed behavior with the
  smallest relevant check.
