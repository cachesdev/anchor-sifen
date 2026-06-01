# DE XML Parser Preserves Decimal Lexical Values

The DE XML parser converts XML text into the raw `DocumentoElectronico` shape, but decimal numeric fields that reverse-map into `big.js` values remain strings instead of JavaScript numbers. SIFEN can require more decimal precision than is safe or useful in `number`, so the parser only coerces raw fields that are modeled as ordinary numeric codes/counts in the raw types; precision-sensitive decimal values stay lexical until the reverse mapper converts them to `Big`.
