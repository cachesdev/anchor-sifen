
/**
 * rGeVeConf
 * @targetNSAlias `__tns__`
 * @targetNamespace `http://ekuatia.set.gov.py/sifen/xsd`
 */
export interface RGeVeConf {
    /** tId|xs:string|pattern,length */
    Id?: string;
    /** tiTipEve|xs:positiveInteger|totalDigits,1,2 */
    iTipConf?: string;
    /** fecHhmmss|xs:dateTime|pattern */
    dFecRecep?: string;
}
