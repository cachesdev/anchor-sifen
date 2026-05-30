import { describe, expect, it } from 'vitest';
import * as v from 'valibot';
import { enumsSchema } from './schema';

describe('schema — validacion enum itemsOperacion', () => {
  const baseInput = {
    operacionDE: { tipoEmision: 1 },
    timbrado: { tipoDocumento: 1 },
    datosGeneralesOperacion: {
      operacionComercial: { tipoTransaccion: 1 },
      emisor: { tipoContribuyente: 1 },
      receptor: { naturalezaReceptor: 1 }
    },
    datosEspecificosPorTipoDE: {
      facturaElectronica: { indicadorPresencia: 1 },
      condicionOperacion: { condicionOperacion: 1 }
    }
  };

  it('acepta itemsOperacion con unidadMedida valida', () => {
    const input = {
      ...baseInput,
      datosEspecificosPorTipoDE: {
        ...baseInput.datosEspecificosPorTipoDE,
        itemsOperacion: [{ unidadMedida: 77 }]
      }
    };
    const result = v.safeParse(enumsSchema, input);
    expect(result.success).toBe(true);
  });

  it('rechaza itemsOperacion con unidadMedida invalida', () => {
    const input = {
      ...baseInput,
      datosEspecificosPorTipoDE: {
        ...baseInput.datosEspecificosPorTipoDE,
        itemsOperacion: [{ unidadMedida: 99999 }]
      }
    };
    const result = v.safeParse(enumsSchema, input);
    expect(result.success).toBe(false);
  });

  it('acepta itemsOperacion con formaAfectacionTributariaIVA valida', () => {
    const input = {
      ...baseInput,
      datosEspecificosPorTipoDE: {
        ...baseInput.datosEspecificosPorTipoDE,
        itemsOperacion: [{ ivaItem: { formaAfectacionTributariaIVA: 1 } }]
      }
    };
    const result = v.safeParse(enumsSchema, input);
    expect(result.success).toBe(true);
  });

  it('rechaza itemsOperacion con formaAfectacionTributariaIVA invalida', () => {
    const input = {
      ...baseInput,
      datosEspecificosPorTipoDE: {
        ...baseInput.datosEspecificosPorTipoDE,
        itemsOperacion: [{ ivaItem: { formaAfectacionTributariaIVA: 99999 } }]
      }
    };
    const result = v.safeParse(enumsSchema, input);
    expect(result.success).toBe(false);
  });

  it('acepta itemsOperacion vacio', () => {
    const input = {
      ...baseInput,
      datosEspecificosPorTipoDE: {
        ...baseInput.datosEspecificosPorTipoDE,
        itemsOperacion: []
      }
    };
    const result = v.safeParse(enumsSchema, input);
    expect(result.success).toBe(true);
  });

  it('acepta sin itemsOperacion', () => {
    const result = v.safeParse(enumsSchema, baseInput);
    expect(result.success).toBe(true);
  });
});
