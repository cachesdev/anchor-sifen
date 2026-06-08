import type { EventoRegistrable } from '../../sifen/types/clean';
import type { RGesEve } from '../../sifen/types/raw';
import {
  descripcionModalidadTransporte,
  descripcionTipoDocumentoReceptor,
  descripcionTipoDocumentoTransportista,
  descripcionTipoTransporte
} from '../../sifen/types/enums';
import { asLiteral } from '../../sifen/types/union';
import { descripcionCodigoCiudad } from '../../gen/ciudades';
import { descripcionCodigoDepartamento } from '../../gen/departamentos';
import { descripcionCodigoDistrito } from '../../gen/distritos';
import { descripcionCodigoPais } from '../../gen/paises';
import { toBig } from '../big';
import { calcularDv, extraerRuc } from '../ruc';
import { formatDate } from './helpers';

export function mapEventoRegistrableToRaw(evento: EventoRegistrable, fechaFirma: Date): RGesEve {
  return {
    idEvento: evento.idEvento,
    rEve: {
      dFecFirma: formatDate(fechaFirma, 'date-time'),
      dVerFor: 150,
      gGroupTiEvt: mapEventoPayloadToRaw(evento)
    }
  };
}

function mapEventoPayloadToRaw(evento: EventoRegistrable): RGesEve['rEve']['gGroupTiEvt'] {
  switch (evento.tipo) {
    case 'cancelacion':
      return { rGeVeCan: { Id: evento.cdc, mOtEve: evento.motivo } };

    case 'inutilizacion':
      return {
        rGeVeInu: {
          dNumTim: evento.numeroTimbrado,
          dEst: evento.establecimiento,
          dPunExp: evento.puntoExpedicion,
          dNumIn: evento.numeroInicio,
          dNumFin: evento.numeroFin,
          iTiDE: String(asLiteral(evento.tipoDE)),
          mOtEve: evento.motivo,
          dSerieNum: evento.serie
        }
      };

    case 'notificacionRecepcion': {
      const tipoReceptor = asLiteral(evento.tipoReceptor);
      const tipoDocumentoReceptor = asLiteral(evento.tipoDocumentoReceptor);
      return {
        rGeVeNotRec: {
          Id: evento.cdc,
          dFecEmi: formatDate(evento.fechaEmision, 'date-time'),
          dFecRecep: formatDate(evento.fechaRecepcion, 'date-time'),
          iTipRec: String(tipoReceptor),
          dNomRec: evento.nombreReceptor,
          dRucRec: evento.rucReceptor !== undefined ? extraerRuc(evento.rucReceptor) : undefined,
          dDVRec:
            evento.rucReceptor !== undefined
              ? String(calcularDv(extraerRuc(evento.rucReceptor)))
              : undefined,
          dTipIDRec:
            tipoDocumentoReceptor !== undefined ? String(tipoDocumentoReceptor) : undefined,
          dNumID: evento.numeroDocumentoReceptor,
          dTotalGs: toBig(evento.totalGuaranies).toFixed(8)
        }
      };
    }

    case 'conformidad':
      return {
        rGeVeConf: {
          Id: evento.cdc,
          iTipConf: String(asLiteral(evento.tipoConformidad)),
          dFecRecep: formatDate(evento.fechaRecepcion, 'date-time')
        }
      };

    case 'disconformidad':
      return { rGeVeDisconf: { Id: evento.cdc, mOtEve: evento.motivo } };

    case 'desconocimiento': {
      const tipoReceptor = asLiteral(evento.tipoReceptor);
      const tipoDocumentoReceptor = asLiteral(evento.tipoDocumentoReceptor);
      return {
        rGeVeDescon: {
          Id: evento.cdc,
          dFecEmi: formatDate(evento.fechaEmision, 'date-time'),
          dFecRecep: formatDate(evento.fechaRecepcion, 'date-time'),
          iTipRec: String(tipoReceptor),
          dNomRec: evento.nombreReceptor,
          dRucRec: evento.rucReceptor !== undefined ? extraerRuc(evento.rucReceptor) : undefined,
          dDVRec:
            evento.rucReceptor !== undefined
              ? String(calcularDv(extraerRuc(evento.rucReceptor)))
              : undefined,
          dTipIDRec:
            tipoDocumentoReceptor !== undefined ? String(tipoDocumentoReceptor) : undefined,
          dNumID: evento.numeroDocumentoReceptor,
          mOtEve: evento.motivo
        }
      };
    }

    case 'endoso': {
      const tipoReceptor = asLiteral(evento.tipoReceptor);
      const tipoDocumentoReceptor = asLiteral(evento.tipoDocumentoReceptor);
      const tipoEndoso = asLiteral(evento.tipoEndoso);
      const tipoFactor = asLiteral(evento.tipoFactor);
      return {
        rGeVeEnd: {
          Id: evento.cdc,
          iTipRec: String(tipoReceptor),
          dNomRec: evento.nombreReceptor,
          dRucRec: evento.rucReceptor !== undefined ? extraerRuc(evento.rucReceptor) : undefined,
          dDVRec:
            evento.rucReceptor !== undefined
              ? String(calcularDv(extraerRuc(evento.rucReceptor)))
              : undefined,
          dTipIDRec:
            tipoDocumentoReceptor !== undefined ? String(tipoDocumentoReceptor) : undefined,
          dNumIDRec: evento.numeroDocumentoReceptor,
          dRucEmi: extraerRuc(evento.rucEmisor),
          dDVEmi: String(calcularDv(extraerRuc(evento.rucEmisor))),
          dNomEmi: evento.nombreEmisor,
          dTipEnd: String(tipoEndoso),
          iTipFac: String(tipoFactor),
          dNomFac: evento.nombreFactor,
          dRucFac: extraerRuc(evento.rucFactor),
          dDVFac: String(calcularDv(extraerRuc(evento.rucFactor))),
          dNumCon: evento.numeroContrato,
          dNumRegPubCon: evento.numeroRegistroPublicoContrato,
          dTotalGs: toBig(evento.totalGuaranies).toFixed(8),
          dPorDes: toBig(evento.porcentajeDescuento).toFixed(8),
          dMonDesMonExt:
            evento.montoDescuentoMonedaExtranjera !== undefined
              ? toBig(evento.montoDescuentoMonedaExtranjera).toFixed(8)
              : undefined,
          dTipCamDesMonExt:
            evento.tipoCambioDescuentoMonedaExtranjera !== undefined
              ? toBig(evento.tipoCambioDescuentoMonedaExtranjera).toFixed(8)
              : undefined,
          dMonDesGs: toBig(evento.montoDescuentoGuaranies).toFixed(8),
          dTotOpeEndGs: toBig(evento.totalOperacionEndosoGuaranies).toFixed(8)
        }
      };
    }

    case 'actualizacionTransporte': {
      const motivo = asLiteral(evento.motivo);
      const codigoDepartamentoEntrega = asLiteral(evento.codigoDepartamentoEntrega);
      const codigoDistritoEntrega = asLiteral(evento.codigoDistritoEntrega);
      const codigoCiudadEntrega = asLiteral(evento.codigoCiudadEntrega);
      const naturalezaTransportista = asLiteral(evento.naturalezaTransportista);
      const tipoDocumentoTransportista = asLiteral(evento.tipoDocumentoTransportista);
      const tipoTransporte = asLiteral(evento.tipoTransporte);
      const modalidadTransporte = asLiteral(evento.modalidadTransporte);
      const tipoIdentificacionVehiculo = asLiteral(evento.tipoIdentificacionVehiculo);
      return {
        rGeVeTr: {
          Id: evento.cdc,
          dMotEv: String(motivo),
          cDepEnt:
            codigoDepartamentoEntrega !== undefined ? String(codigoDepartamentoEntrega) : undefined,
          dDesDepEnt:
            codigoDepartamentoEntrega !== undefined
              ? descripcionCodigoDepartamento[codigoDepartamentoEntrega]
              : undefined,
          cDisEnt: codigoDistritoEntrega !== undefined ? String(codigoDistritoEntrega) : undefined,
          dDesDisEnt:
            codigoDistritoEntrega !== undefined
              ? descripcionCodigoDistrito[codigoDistritoEntrega]
              : undefined,
          cCiuEnt: codigoCiudadEntrega !== undefined ? String(codigoCiudadEntrega) : undefined,
          dDesCiuEnt:
            codigoCiudadEntrega !== undefined
              ? descripcionCodigoCiudad[codigoCiudadEntrega]
              : undefined,
          dDirEnt: evento.direccionEntrega,
          dNumCas: evento.numeroCasaEntrega,
          dCompDir1: evento.complementoDireccionEntrega,
          dNomChof: evento.nombreChofer,
          dNumIDChof: evento.numeroDocumentoChofer,
          iNatTrans:
            naturalezaTransportista !== undefined ? String(naturalezaTransportista) : undefined,
          dRucTrans:
            evento.rucTransportista !== undefined ? extraerRuc(evento.rucTransportista) : undefined,
          dDVTrans:
            evento.rucTransportista !== undefined
              ? String(calcularDv(extraerRuc(evento.rucTransportista)))
              : undefined,
          dNomTrans: evento.nombreTransportista,
          iTipIDTrans:
            tipoDocumentoTransportista !== undefined
              ? String(tipoDocumentoTransportista)
              : undefined,
          dDTipIDTrans:
            tipoDocumentoTransportista !== undefined
              ? descripcionTipoDocumentoTransportista[tipoDocumentoTransportista]
              : undefined,
          dNumIDTrans: evento.numeroDocumentoTransportista,
          iTipTrans: tipoTransporte !== undefined ? String(tipoTransporte) : undefined,
          dDesTipTrans:
            tipoTransporte !== undefined ? descripcionTipoTransporte[tipoTransporte] : undefined,
          iModTrans: modalidadTransporte !== undefined ? String(modalidadTransporte) : undefined,
          dDesModTrans:
            modalidadTransporte !== undefined
              ? descripcionModalidadTransporte[modalidadTransporte]
              : undefined,
          dTiVehTras: evento.tipoVehiculo,
          dMarVeh: evento.marcaVehiculo,
          dTipIdenVeh:
            tipoIdentificacionVehiculo !== undefined
              ? String(tipoIdentificacionVehiculo)
              : undefined,
          dNroIDVeh: evento.numeroIdentificacionVehiculo,
          dNroMatVeh: evento.matriculaVehiculo
        }
      };
    }

    case 'nominacionFacturaElectronica': {
      const naturalezaReceptor = asLiteral(evento.naturalezaReceptor);
      const tipoOperacion = asLiteral(evento.tipoOperacion);
      const codigoPaisReceptor = asLiteral(evento.codigoPaisReceptor);
      const tipoContribuyenteReceptor = asLiteral(evento.tipoContribuyenteReceptor);
      const tipoDocumentoReceptor = asLiteral(evento.tipoDocumentoReceptor);
      const codigoDepartamentoReceptor = asLiteral(evento.codigoDepartamentoReceptor);
      const codigoDistritoReceptor = asLiteral(evento.codigoDistritoReceptor);
      const codigoCiudadReceptor = asLiteral(evento.codigoCiudadReceptor);
      return {
        rGEveNom: {
          Id: evento.cdc,
          mOtEve: evento.motivo,
          iNatRec: String(naturalezaReceptor),
          iTiOpe: String(tipoOperacion),
          cPaisRec: codigoPaisReceptor,
          dDesPaisRe: descripcionCodigoPais[codigoPaisReceptor],
          iTiContRec:
            tipoContribuyenteReceptor !== undefined ? String(tipoContribuyenteReceptor) : undefined,
          dRucRec: evento.rucReceptor !== undefined ? extraerRuc(evento.rucReceptor) : undefined,
          dDVRec:
            evento.rucReceptor !== undefined
              ? String(calcularDv(extraerRuc(evento.rucReceptor)))
              : undefined,
          iTipIDRec:
            tipoDocumentoReceptor !== undefined ? String(tipoDocumentoReceptor) : undefined,
          dDTipIDRec:
            tipoDocumentoReceptor !== undefined
              ? descripcionTipoDocumentoReceptor[tipoDocumentoReceptor]
              : undefined,
          dNumIDRec: evento.numeroDocumentoReceptor,
          dNomRec: evento.nombreReceptor,
          dNomFanRec: evento.nombreFantasiaReceptor,
          dDirRec: evento.direccionReceptor,
          dNumCasRec: evento.numeroCasaReceptor,
          cDepRec:
            codigoDepartamentoReceptor !== undefined
              ? String(codigoDepartamentoReceptor)
              : undefined,
          dDesDepRec:
            codigoDepartamentoReceptor !== undefined
              ? descripcionCodigoDepartamento[codigoDepartamentoReceptor]
              : undefined,
          cDisRec:
            codigoDistritoReceptor !== undefined ? String(codigoDistritoReceptor) : undefined,
          dDesDisRec:
            codigoDistritoReceptor !== undefined
              ? descripcionCodigoDistrito[codigoDistritoReceptor]
              : undefined,
          cCiuRec: codigoCiudadReceptor !== undefined ? String(codigoCiudadReceptor) : undefined,
          dDesCiuRec:
            codigoCiudadReceptor !== undefined
              ? descripcionCodigoCiudad[codigoCiudadReceptor]
              : undefined,
          dTelRec: evento.telefonoReceptor,
          dCelRec: evento.celularReceptor,
          dEmailRec: evento.emailReceptor,
          dCodCliente: evento.codigoCliente
        }
      };
    }
  }
}
