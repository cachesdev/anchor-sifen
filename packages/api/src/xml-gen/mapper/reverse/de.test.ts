import { describe, expect, it } from 'vitest';
import { descripcionTipoDocumentoElectronico, descripcionTipoEmision } from '../../../sifen/types';
import type { DE } from '../../../sifen/types/raw';
import { mapDEToClean } from './de';

describe('mapper reverse — de', () => {
  describe('mapDEToClean', () => {
    it('construye el CDC preservando el dDVId raw', () => {
      const raw: DE = {
        dDVId: 9,
        dFecFirma: '2024-01-02T03:04:05',
        dSisFact: 1,
        gOpeDE: {
          iTipEmi: 1,
          dDesTipEmi: descripcionTipoEmision[1],
          dCodSeg: '000123456'
        },
        gTimb: {
          iTiDE: 1,
          dDesTiDE: descripcionTipoDocumentoElectronico[1],
          dNumTim: 12345678,
          dEst: '001',
          dPunExp: '002',
          dNumDoc: '0000003',
          dFeIniT: '2024-01-01'
        },
        gDatGralOpe: {
          dFeEmiDE: '2024-02-03T04:05:06',
          gEmis: {
            dRucEm: '80001234',
            dDVEmi: 5,
            iTipCont: 2,
            dNomEmi: 'Emisor SA',
            dDirEmi: 'Direccion',
            dNumCas: 0,
            cDepEmi: 1,
            dDesDepEmi: 'CAPITAL',
            cCiuEmi: 1,
            dDesCiuEmi: 'ASUNCION' as never,
            dTelEmi: '021123456',
            dEmailE: 'emisor@example.com',
            gActEco: []
          },
          gDatRec: {
            iNatRec: 2,
            iTiOpe: 2,
            cPaisRec: 'PRY',
            dDesPaisRe: 'Paraguay',
            dNomRec: 'Receptor'
          }
        },
        gDtipDE: {
          gCamItem: []
        }
      };

      const clean = mapDEToClean(raw);

      expect(clean.id_cdc).toBe('01800012345001002000000322024020310001234569');
      expect(clean.digitoVerificadorId).toBe(9);
    });
  });
});
