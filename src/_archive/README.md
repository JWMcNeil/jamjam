# Archive Policy

This directory is for deprecated code that is no longer part of the active runtime path but is kept for reference.

## What belongs here

- Components, blocks, or utilities removed from active imports.
- Older implementations that may still be useful for historical context.
- Experiments that should not ship but are worth preserving.

## What does not belong here

- Active app code.
- New features.
- Temporary WIP changes.

## Reactivation checklist

Before moving any archived file back into active paths:

1. Confirm there is a current product need.
2. Update imports to canonical paths under `src/components`.
3. Make the code pass linting and type checks.
4. Add or update tests for restored behavior.
5. Remove dead alternatives to avoid duplicate implementations.
