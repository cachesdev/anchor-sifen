import { describe, expect, it } from 'vitest';
import { Big } from 'big.js';
import { applyDvDerivedFields } from './ruc-dv';
import type { DEC } from '../../sifen/types/clean/de';
import type { DerivationConfig } from './config';

function makeDec(): DEC {
  return {
    id_cdc: '',
    tipoDE: 'FacturaElectronica',
    digitoVerificadorId: 0,
    fechaFirma: new Date(),
    operacionDE: { tipoEmision: 1 },
    timbrado: {
      tipoDocumento: 1,
      numeroTimbrado: 0,
      establecimiento: 1,
      puntoExpedicion: 1,
      numeroDocumento: 1,
      fechaInicioVigencia: new Date()
    },
    datosGeneralesOperacion: {
      fechaEmisionDE: new Date(),
      emisor: { rucEmisor: '80001234-5' },
      receptor: {}
    },
    datosEspecificosPorTipoDE: {},
    subtotalesTotales: {}
  } as DEC;
}

const feConfig: DerivationConfig = {
  ea008Formula: 'estandar',
  aplicaValorItem: true,
  aplicaIvaItem: true,
  aplicaCondicionOperacion: true,
  aplicaTransporte: true,
  aplicaSubtotales: true,
  subtotalesIncluyeIva: true,
  totalBrutoFormula: 'sumaSubtotales',
  totalGsFormula: 'tipoCambio'
};

describe('derive — ruc-dv', () => {
  describe('applyDvDerivedFields', () => {
    it('deriva DV del emisor', () => {
      const de = makeDec();
      applyDvDerivedFields(de, feConfig);
      const dv = de.datosGeneralesOperacion.emisor.digitoVerificadorEmisor;
      expect(typeof dv).toBe('number');
      expect(dv).toBeGreaterThanOrEqual(0);
      expect(dv).toBeLessThanOrEqual(10);
    });

    it('deriva DV del receptor cuando tiene RUC', () => {
      const de = makeDec();
      de.datosGeneralesOperacion.receptor.rucReceptor = '616159-6';
      applyDvDerivedFields(de, feConfig);
      expect(de.datosGeneralesOperacion.receptor.digitoVerificadorReceptor).toBe(6);
    });

    it('no deriva DV del receptor sin RUC', () => {
      const de = makeDec();
      de.datosGeneralesOperacion.receptor.rucReceptor = undefined;
      applyDvDerivedFields(de, feConfig);
      expect(de.datosGeneralesOperacion.receptor.digitoVerificadorReceptor).toBeUndefined();
    });

    it('deriva DV de la procesadora de tarjeta si aplicaCondicionOperacion', () => {
      const de = makeDec();
      de.datosEspecificosPorTipoDE.condicionOperacion = {
        condicionOperacion: 1,
        pagoContadoEntregaInicial: [
          {
            tipoPago: 3,
            monedaTipoPago: 'PYG',
            montoTipoPago: new Big(0),
            pagoTarjetaCreditoDebito: {
              denominacionTarjeta: 1,
              formaProcesamientoPago: 1,
              rucProcesadoraTarjeta: '616159-6'
            }
          }
        ]
      };
      applyDvDerivedFields(de, feConfig);
      const dv =
        de.datosEspecificosPorTipoDE.condicionOperacion!.pagoContadoEntregaInicial![0]!
          .pagoTarjetaCreditoDebito!.digitoVerificadorProcesadoraTarjeta;
      expect(dv).toBe(6);
    });

    it('no deriva DV de procesadora si condicion no aplica', () => {
      const configSinCondicion = { ...feConfig, aplicaCondicionOperacion: false };
      const de = makeDec();
      de.datosEspecificosPorTipoDE.condicionOperacion = {
        condicionOperacion: 1,
        pagoContadoEntregaInicial: [
          {
            tipoPago: 3,
            monedaTipoPago: 'PYG',
            montoTipoPago: new Big(0),
            pagoTarjetaCreditoDebito: {
              denominacionTarjeta: 1,
              formaProcesamientoPago: 1,
              rucProcesadoraTarjeta: '616159-6'
            }
          }
        ]
      };
      applyDvDerivedFields(de, configSinCondicion);
      const dv =
        de.datosEspecificosPorTipoDE.condicionOperacion!.pagoContadoEntregaInicial![0]!
          .pagoTarjetaCreditoDebito!.digitoVerificadorProcesadoraTarjeta;
      expect(dv).toBeUndefined();
    });

    it('deriva DV del transportista cuando aplicaTransporte', () => {
      const de = makeDec();
      de.datosEspecificosPorTipoDE.transporte = {
        modalidadTransporte: 1,
        responsableCostoFlete: 1,
        transportista: {
          naturalezaTransportista: 1,
          nombreTransportista: '',
          domicilioFiscalTransportista: '',
          nombreChofer: '',
          numeroDocumentoIdentidadChofer: '',
          direccionChofer: '',
          rucTransportista: '616159-6'
        }
      };
      applyDvDerivedFields(de, feConfig);
      expect(
        de.datosEspecificosPorTipoDE.transporte!.transportista!.digitoVerificadorRucTransportista
      ).toBe(6);
    });

    it('deriva DV string del agente cuando aplicaTransporte', () => {
      const de = makeDec();
      de.datosEspecificosPorTipoDE.transporte = {
        modalidadTransporte: 1,
        responsableCostoFlete: 1,
        transportista: {
          naturalezaTransportista: 1,
          nombreTransportista: '',
          domicilioFiscalTransportista: '',
          nombreChofer: '',
          numeroDocumentoIdentidadChofer: '',
          direccionChofer: '',
          rucAgente: '870066-B'
        }
      };
      applyDvDerivedFields(de, feConfig);
      expect(
        de.datosEspecificosPorTipoDE.transporte!.transportista!.digitoVerificadorRucAgente
      ).toBe('4');
    });

    it('no deriva DV de transporte si aplicaTransporte es false', () => {
      const configSinTransporte = { ...feConfig, aplicaTransporte: false };
      const de = makeDec();
      de.datosEspecificosPorTipoDE.transporte = {
        modalidadTransporte: 1,
        responsableCostoFlete: 1,
        transportista: {
          naturalezaTransportista: 1,
          nombreTransportista: '',
          domicilioFiscalTransportista: '',
          nombreChofer: '',
          numeroDocumentoIdentidadChofer: '',
          direccionChofer: '',
          rucTransportista: '616159-6'
        }
      };
      applyDvDerivedFields(de, configSinTransporte);
      const tr = de.datosEspecificosPorTipoDE.transporte!.transportista!;
      expect(tr.digitoVerificadorRucTransportista).toBeUndefined();
    });
  });
});
