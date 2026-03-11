/**
 * rGeVeTr
 * @targetNSAlias `__tns__`
 * @targetNamespace `http://ekuatia.set.gov.py/sifen/xsd`
 */
export interface RGeVeTr {
  /** tId|xs:string|pattern,length */
  Id?: string;
  /** tdMotEv|xs:short|totalDigits,1,2,3,4 */
  dMotEv?: string;
  /** tcDepEnt|xs:integer|pattern,minInclusive,maxInclusive */
  cDepEnt?: string;
  /** tdDesDepEnt|xs:string|minLength,maxLength */
  dDesDepEnt?: string;
  /** tcDisEnt|xs:integer|pattern,minInclusive,maxInclusive */
  cDisEnt?: string;
  /** tdDesDisEnt|xs:string|minLength,maxLength */
  dDesDisEnt?: string;
  /** tcCiuEnt|xs:integer|pattern,minInclusive,maxInclusive */
  cCiuEnt?: string;
  /** tdDesCiuEnt|xs:string|minLength,maxLength */
  dDesCiuEnt?: string;
  /** tdDirEnt|xs:string|minLength,maxLength */
  dDirEnt?: string;
  /** tdNumCasTr|xs:integer|pattern,minInclusive,maxInclusive */
  dNumCas?: string;
  /** tdDirEnt|xs:string|minLength,maxLength */
  dCompDir1?: string;
  /** tdNomRec|xs:string|minLength,maxLength */
  dNomChof?: string;
  /** tdNumDocId|xs:string|pattern */
  dNumIDChof?: string;
  /** tiTipEve|xs:positiveInteger|totalDigits,1,2 */
  iNatTrans?: string;
  /** tRuc|xs:string|minLength,maxLength,pattern */
  dRucTrans?: string;
  /** tDVer|xs:integer|pattern,whiteSpace */
  dDVTrans?: string;
  /** tdNomRec|xs:string|minLength,maxLength */
  dNomTrans?: string;
  /** tiTipDoc|xs:integer|whiteSpace,pattern */
  iTipIDTrans?: string;
  /** tdDtipDoc|xs:string|Cédula paraguaya,Pasaporte,Cédula extranjera,Carnet de residencia */
  dDTipIDTrans?: string;
  /** tdNumDocId|xs:string|pattern */
  dNumIDTrans?: string;
  /** tiTipTrans|xs:integer|whiteSpace,pattern */
  iTipTrans?: string;
  /** tdDesTipTrans|xs:string|minLength,maxLength */
  dDesTipTrans?: string;
  /** tdMotEv|xs:short|totalDigits,1,2,3,4 */
  iModTrans?: string;
  /** tdDesModTrans|xs:string|Terrestre,Fluvial,Aéreo,Multimodal */
  dDesModTrans?: string;
  /** tdTiVehTras|xs:string|minLength,maxLength */
  dTiVehTras?: string;
  /** tdMarVeh|xs:string|minLength,maxLength */
  dMarVeh?: string;
  /** tdTipIdenVeh|xs:short|totalDigits,1,2 */
  dTipIdenVeh?: string;
  /** tdNroIDVeh|xs:string|minLength,maxLength */
  dNroIDVeh?: string;
  /** tdNroMatVeh|xs:string|length */
  dNroMatVeh?: string;
}
