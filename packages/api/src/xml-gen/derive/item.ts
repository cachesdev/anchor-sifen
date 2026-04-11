import { formaAfectacionTributariaIVA, type FacturaElectronica } from '../../sifen/types';
import { bigOrZero, HUNDRED, ONE, quantizeGeneral, ZERO } from './big';

export function applyItemDerivedFields(out: FacturaElectronica): void {
  for (const item of out.datosEspecificosPorTipoDE.itemsOperacion) {
    const valorItem = item.valorItem;
    const valorRestaItem = valorItem.valorRestaItem;

    const cantidad = item.cantidadProductoServicio;
    const precioUnitario = valorItem.precioUnitario;

    const totalBrutoOperacionItem = quantizeGeneral(precioUnitario.times(cantidad));
    valorItem.totalBrutoOperacionItem = totalBrutoOperacionItem;

    const descuentoParticular = bigOrZero(valorRestaItem.descuentoParticularItem);
    const descuentoGlobal = bigOrZero(valorRestaItem.descuentoGlobalItem);
    const anticipoParticular = bigOrZero(valorRestaItem.anticipoParticularItem);
    const anticipoGlobal = bigOrZero(valorRestaItem.anticipoGlobalItem);

    valorRestaItem.porcentajeDescuentoItem = quantizeGeneral(
      precioUnitario.gt(0) ? descuentoParticular.times(HUNDRED).div(precioUnitario) : ZERO
    );

    const totalOperacionItem = quantizeGeneral(
      precioUnitario
        .minus(descuentoParticular)
        .minus(descuentoGlobal)
        .minus(anticipoParticular)
        .minus(anticipoGlobal)
        .times(cantidad)
    );

    valorRestaItem.valorTotalOperacionItem = totalOperacionItem;
    valorRestaItem.valorTotalOperacionItemGs =
      valorItem.tipoCambioItem !== undefined
        ? quantizeGeneral(totalOperacionItem.times(valorItem.tipoCambioItem))
        : undefined;

    const ivaItem = item.ivaItem;
    if (!ivaItem) {
      continue;
    }

    const forma = ivaItem.formaAfectacionTributariaIVA;
    const proporcion = ivaItem.proporcionGravadaIva;
    const tasa = ivaItem.tasaIva;

    let baseGravada = ZERO;
    let liquidacion = ZERO;

    if (
      forma !== formaAfectacionTributariaIVA.Exonerado &&
      forma !== formaAfectacionTributariaIVA.Exento &&
      tasa.gt(0) &&
      proporcion.gt(0)
    ) {
      const baseCalculo = totalOperacionItem.times(proporcion).div(HUNDRED);

      if (tasa.eq(10)) {
        baseGravada = baseCalculo.div(1.1);
      } else if (tasa.eq(5)) {
        baseGravada = baseCalculo.div(1.05);
      } else {
        baseGravada = baseCalculo.div(ONE.plus(tasa.div(HUNDRED)));
      }

      liquidacion = baseGravada.times(tasa).div(HUNDRED);
    }

    ivaItem.baseGravadaIvaItem = quantizeGeneral(baseGravada);
    ivaItem.liquidacionIvaItem = quantizeGeneral(liquidacion);
    const baseExenta = totalOperacionItem.minus(baseGravada).minus(liquidacion);
    ivaItem.baseExenta = quantizeGeneral(baseExenta.gt(0) ? baseExenta : ZERO);
  }
}
