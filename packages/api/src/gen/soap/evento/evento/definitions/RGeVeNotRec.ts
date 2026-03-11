/**
 * rGeVeNotRec
 * @targetNSAlias `__tns__`
 * @targetNamespace `http://ekuatia.set.gov.py/sifen/xsd`
 */
export interface RGeVeNotRec {
  /** tId|xs:string|pattern,length */
  Id?: string;
  /** fecHhmmss|xs:dateTime|pattern */
  dFecEmi?: string;
  /** fecHhmmss|xs:dateTime|pattern */
  dFecRecep?: string;
  /** tiTipEve|xs:positiveInteger|totalDigits,1,2 */
  iTipRec?: string;
  /** tdNomRec|xs:string|minLength,maxLength */
  dNomRec?: string;
  /** tRuc|xs:string|minLength,maxLength,pattern */
  dRucRec?: string;
  /** tDVer|xs:integer|pattern,whiteSpace */
  dDVRec?: string;
  /** tiTipDocRec|xs:integer|whiteSpace,pattern */
  dTipIDRec?: string;
  /** tdNumDocId|xs:string|pattern */
  dNumID?: string;
  /** tMontoBase|xs:decimal|totalDigits,fractionDigits,minInclusive,maxInclusive */
  dTotalGs?: string;
}
