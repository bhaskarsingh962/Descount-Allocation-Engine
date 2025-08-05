# Discount Allocation Backend

## Approach

- Normalize each agent's attributes to 0–1 range.
- Configurable weights per factor.
- Allocate kitty in proportion to total scores.
- Edge cases (all same values, rounding) are handled.
- Justification is based on each agent's strongest normalized factor.

## Setup

