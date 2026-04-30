import { describe, expect, it } from 'vitest';
import { createDocumentoElectronicoAsociado } from '../../test-utils/factories/base';
import { mapDocumentoElectronicoAsociadoToRaw } from './h';

describe('mapper — h', () => {
  it('formatea fechaEmisionDocumentoImpreso como fecha ISO', () => {
    const input = createDocumentoElectronicoAsociado({
      fechaEmisionDocumentoImpreso: new Date(2024, 5, 15)
    });
    expect(mapDocumentoElectronicoAsociadoToRaw(input).dFecEmiDI).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it('resuelve descripcion de tipoDocumentoAsociado 1', () => {
    const input = createDocumentoElectronicoAsociado({ tipoDocumentoAsociado: 1 });
    expect(mapDocumentoElectronicoAsociadoToRaw(input).dDesTipDocAso).toBe('Electrónico');
  });

  it('resuelve descripcion de tipoDocumentoImpreso 1', () => {
    const input = createDocumentoElectronicoAsociado({ tipoDocumentoImpreso: 1 });
    expect(mapDocumentoElectronicoAsociadoToRaw(input).dDTipoDocAso).toBe('Factura');
  });

  it('transfiere CDC del documento referenciado tal cual', () => {
    const cdc = '01800195515031005001331122026030517018918303';
    const input = createDocumentoElectronicoAsociado({ cdcDocumentoReferenciado: cdc });
    expect(mapDocumentoElectronicoAsociadoToRaw(input).dCdCDERef).toBe(cdc);
  });
});
