/**
 * rGeVeEnd
 * @targetNSAlias `__tns__`
 * @targetNamespace `http://ekuatia.set.gov.py/sifen/xsd`
 */
export interface RGeVeEnd {
  /** tId|xs:string|pattern,length */
  Id?: string;
  /** tiTipEve|xs:positiveInteger|totalDigits,1,2 */
  iTipRec?: string;
  /** tdNom|xs:string|minLength,maxLength */
  dNomRec?: string;
  /** tRuc|xs:string|minLength,maxLength,pattern */
  dRucRec?: string;
  /** tDVer|xs:integer|pattern,whiteSpace */
  dDVRec?: string;
  /** tiTipDoc|xs:integer|whiteSpace,pattern */
  dTipIDRec?: string;
  /** tdNumDocId|xs:string|pattern */
  dNumIDRec?: string;
  /** tRuc|xs:string|minLength,maxLength,pattern */
  dRucEmi?: string;
  /** tDVer|xs:integer|pattern,whiteSpace */
  dDVEmi?: string;
  /** tdNom|xs:string|minLength,maxLength */
  dNomEmi?: string;
  /** tdTipEnd|xs:short|totalDigits,1,2 */
  dTipEnd?: string;
  /** tiTipFac|xs:positiveInteger|totalDigits,1 */
  iTipFac?: string;
  /** tdNom|xs:string|minLength,maxLength */
  dNomFac?: string;
  /** tRuc|xs:string|minLength,maxLength,pattern */
  dRucFac?: string;
  /** tDVer|xs:integer|pattern,whiteSpace */
  dDVFac?: string;
  /** tdContr|xs:string|minLength,maxLength */
  dNumCon?: string;
  /** tdContr|xs:string|minLength,maxLength */
  dNumRegPubCon?: string;
  /** tMontoBase|xs:decimal|totalDigits,fractionDigits,minInclusive,maxInclusive */
  dTotalGs?: string;
  /** tMontoBasePorc|xs:decimal|totalDigits,fractionDigits,minInclusive,maxInclusive */
  dPorDes?: string;
  /** tMontoBase|xs:decimal|totalDigits,fractionDigits,minInclusive,maxInclusive */
  dMonDesMonExt?: string;
  /** tMontoBase|xs:decimal|totalDigits,fractionDigits,minInclusive,maxInclusive */
  dTipCamDesMonExt?: string;
  /** tMontoBase|xs:decimal|totalDigits,fractionDigits,minInclusive,maxInclusive */
  dMonDesGs?: string;
  /** tMontoBase|xs:decimal|totalDigits,fractionDigits,minInclusive,maxInclusive */
  dTotOpeEndGs?: string;
}
