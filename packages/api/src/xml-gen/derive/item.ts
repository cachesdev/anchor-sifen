import { formaAfectacionTributariaIVA, type FacturaElectronica } from '../../sifen/types';
import { getItemsOperacion } from '../fe-accessors';
import { bigOrZero, HUNDRED, ONE, ZERO } from './big';

export function applyItemDerivedFields(out: FacturaElectronica): void {
  for (const item of getItemsOperacion(out)) {
    const valorItem = item.valorItem;
    const valorRestaItem = valorItem.valorRestaItem;

    const cantidad = item.cantidadProductoServicio;
    const precioUnitario = valorItem.precioUnitario;

    // dTotBrutOpeItem
    const totalBrutoOperacionItem = precioUnitario.times(cantidad);
    valorItem.totalBrutoOperacionItem = totalBrutoOperacionItem;

    // FIXME: No revisado segun MT
    const descuentoParticular = bigOrZero(valorRestaItem.descuentoParticularItem);
    const descuentoGlobal = bigOrZero(valorRestaItem.descuentoGlobalItem);
    const anticipoParticular = bigOrZero(valorRestaItem.anticipoParticularItem);
    const anticipoGlobal = bigOrZero(valorRestaItem.anticipoGlobalItem);

    // FIXME: No revisado segun MT
    valorRestaItem.porcentajeDescuentoItem = precioUnitario.gt(0)
      ? descuentoParticular.times(HUNDRED).div(precioUnitario)
      : ZERO;

    // FIXME: Descuentos y anticipos no revisados segun MT
    const totalOperacionItem = precioUnitario
      .minus(anticipoGlobal)
      .minus(descuentoParticular)
      .minus(descuentoGlobal)
      .minus(anticipoParticular)
      .times(cantidad);

    valorRestaItem.valorTotalOperacionItem = totalOperacionItem;
    valorRestaItem.valorTotalOperacionItemGs =
      valorItem.tipoCambioItem !== undefined
        ? totalOperacionItem.times(valorItem.tipoCambioItem)
        : undefined;

    const ivaItem = item.ivaItem;
    if (!ivaItem) {
      continue;
    }

    const forma = ivaItem.formaAfectacionTributariaIVA;
    // INFO: La proporcion gravada es generalmente 100% en todos los casos, con excepcion a exenta y exonerada donde es 0% y parcial, donde es variable entre 0 a 100.
    const proporcionGravada = ivaItem.proporcionGravadaIva;
    // FIXME: Tasa es una enumeracion, no hace falta usar Big
    const tasa = ivaItem.tasaIva;

    let baseGravada = ZERO;
    let liquidacion = ZERO;

    if (
      forma !== formaAfectacionTributariaIVA.Exonerado &&
      forma !== formaAfectacionTributariaIVA.Exento &&
      tasa.gt(0) &&
      proporcionGravada.gt(0)
    ) {
      const baseCalculo = totalOperacionItem.times(proporcionGravada).div(HUNDRED);

      if (tasa.eq(10)) {
        baseGravada = baseCalculo.div(1.1);
      } else if (tasa.eq(5)) {
        baseGravada = baseCalculo.div(1.05);
      } else {
        // Fallback
        baseGravada = baseCalculo.div(ONE.plus(tasa.div(HUNDRED)));
      }

      liquidacion = baseGravada.times(tasa).div(HUNDRED);
    }

    ivaItem.baseGravadaIvaItem = baseGravada;
    ivaItem.liquidacionIvaItem = liquidacion;
    let baseExenta = ZERO;
    if (forma === formaAfectacionTributariaIVA.GravadoParcial) {
      const numerador = HUNDRED
        .times(totalOperacionItem)
        .times(HUNDRED.minus(proporcionGravada));
      const denominador = HUNDRED.times(HUNDRED).plus(tasa.times(proporcionGravada));

      baseExenta = denominador.gt(0) ? numerador.div(denominador) : ZERO;
    }

    ivaItem.baseExenta = baseExenta.gt(0) ? baseExenta : ZERO;
  }
}
