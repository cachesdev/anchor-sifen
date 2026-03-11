import type { DdTipIdRec } from "./DdTipIdRec.js";

/**
 * rGEveNom
 * @targetNSAlias `__tns__`
 * @targetNamespace `http://ekuatia.set.gov.py/sifen/xsd`
 */
export interface RgEveNom {
    /** tId|xs:string|pattern,length */
    Id?: string;
    /** tmotEve|xs:string|minLength,maxLength */
    mOtEve?: string;
    /** tiTipEve|xs:positiveInteger|totalDigits,1,2 */
    iNatRec?: string;
    /** tiTiOpeEv|xs:string|whiteSpace,pattern */
    iTiOpe?: string;
    /** paisType|xs:string|MKD,TWN,DZA,EGY,LBY,MAR,SDN,TUN,ESH,IOT,BDI,COM,DJI,ERI,ETH,ATF,KEN,MDG,MWI,MUS,MYT,MOZ,REU,RWA,SYC,SOM,SSD,UGA,TZA,ZMB,ZWE,AGO,CMR,CAF,TCD,COG,COD,GNQ,GAB,STP,BWA,LSO,NAM,ZAF,SWZ,BEN,BFA,CPV,CIV,GMB,GHA,GIN,GNB,LBR,MLI,MRT,NER,NGA,SHN,SEN,SLE,TGO,AIA,ATG,ABW,BHS,BRB,BES,VGB,CYM,CUB,CUW,DMA,DOM,GRD,GLP,HTI,JAM,MTQ,MSR,PRI,BLM,KNA,LCA,MAF,VCT,SXM,TTO,TCA,VIR,BLZ,CRI,SLV,GTM,HND,MEX,NIC,PAN,ARG,BOL,BRA,CHL,COL,ECU,FLK,GUF,GUY,PRY,PER,SGS,SUR,URY,VEN,BMU,CAN,GRL,SPM,USA,ATA,KAZ,KGZ,TJK,TKM,UZB,CHN,HKG,MAC,PRK,JPN,MNG,KOR,BRN,KHM,IDN,LAO,MYS,MMR,PHL,SGP,THA,TLS,VNM,AFG,BGD,BTN,IND,IRN,MDV,NPL,PAK,LKA,ARM,AZE,BHR,CYP,GEO,IRQ,ISR,JOR,KWT,LBN,OMN,QAT,SAU,PSE,SYR,TUR,ARE,YEM,BLR,BGR,CZE,HUN,POL,MDA,ROU,RUS,SVK,UKR,ALA,GGY,JEY,DNK,EST,FRO,FIN,ISL,IRL,IMN,LVA,LTU,NOR,SJM,SWE,GBR,ALB,AND,BIH,HRV,GIB,GRC,VAT,ITA,MLT,MNE,PRT,SMR,SRB,SVN,ESP,MKD,AUT,BEL,FRA,DEU,LIE,LUX,MCO,NLD,CHE,AUS,CXR,CCK,HMD,NZL,NFK,FJI,NCL,PNG,SLB,VUT,GUM,KIR,MHL,FSM,NRU,MNP,PLW,UMI,ASM,COK,PYF,NIU,PCN,WSM,TKL,TON,TUV,WLF,NN */
    cPaisRec?: string;
    /** tDesPais|noEmptyString|whiteSpace,minLength,maxLength */
    dDesPaisRe?: string;
    /** tiTipCont|xs:integer|whiteSpace,pattern */
    iTiContRec?: string;
    /** tRuc|xs:string|minLength,maxLength,pattern */
    dRucRec?: string;
    /** tDVer|xs:integer|pattern,whiteSpace */
    dDVRec?: string;
    /** tiTipDocRec|xs:integer|whiteSpace,pattern */
    iTipIDRec?: string;
    /** dDTipIDRec */
    dDTipIDRec?: DdTipIdRec;
    /** tdNumDocId|xs:string|pattern */
    dNumIDRec?: string;
    /** tdNomRec|xs:string|minLength,maxLength */
    dNomRec?: string;
    /** tdNomRec|xs:string|minLength,maxLength */
    dNomFanRec?: string;
    /** tdDirEnt|xs:string|minLength,maxLength */
    dDirRec?: string;
    /** tdNumCas|xs:integer|minInclusive,totalDigits */
    dNumCasRec?: string;
    /** tcDepEnt|xs:integer|pattern,minInclusive,maxInclusive */
    cDepRec?: string;
    /** tdDesDepEnt|xs:string|minLength,maxLength */
    dDesDepRec?: string;
    /** tcDisEnt|xs:integer|pattern,minInclusive,maxInclusive */
    cDisRec?: string;
    /** tdDesDisEnt|xs:string|minLength,maxLength */
    dDesDisRec?: string;
    /** tcCiuEnt|xs:integer|pattern,minInclusive,maxInclusive */
    cCiuRec?: string;
    /** tdDesCiuEnt|xs:string|minLength,maxLength */
    dDesCiuRec?: string;
    /** tdTel|xs:string|pattern,minLength,maxLength */
    dTelRec?: string;
    /** tdCel|xs:string|pattern,minLength,maxLength */
    dCelRec?: string;
    /** tEmail|xs:string|pattern */
    dEmailRec?: string;
    /** xs:string|minLength,whiteSpace,maxLength */
    dCodCliente?: string;
}
