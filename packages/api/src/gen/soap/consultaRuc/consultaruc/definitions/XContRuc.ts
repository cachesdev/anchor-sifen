/**
 * xContRUC
 * @targetNSAlias `__tns__`
 * @targetNamespace `http://ekuatia.set.gov.py/sifen/xsd`
 */
export interface XContRuc {
  /** tRuc|xs:string|minLength,maxLength,pattern */
  dRUCCons?: string;
  /** xs:string|whiteSpace,minLength,maxLength */
  dRazCons?: string;
  /** xs:string|length */
  dCodEstCons?: string;
  /** xs:string|maxLength */
  dDesEstCons?: string;
  /** xs:string|length */
  dRUCFactElec?: string;
}
