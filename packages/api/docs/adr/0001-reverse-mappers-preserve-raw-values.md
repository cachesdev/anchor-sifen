# Reverse Mappers Preserve Raw Values

Reverse mappers convert raw SIFEN-shaped data into clean DE data for validation and UI display, not for resubmission. They preserve values as received from raw/XML data, including calculated fields and verifier digits, instead of recomputing or silently correcting them; validation can separately compare preserved values against expected derived values.

Reverse mappers ignore raw description fields when producing clean types because clean types carry codes, not SIFEN description text. Description consistency belongs in validation/parser checks rather than in the deterministic raw-to-clean mapper layer.
