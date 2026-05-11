import { formaAfectacionTributariaIVA } from '../../sifen/types';
import type { DEC } from '../../sifen/types';
import { getItemsOperacion } from './accessors';
import { Big, bigOrZero, HUNDRED, toBig, ZERO } from '../big';
import type { DerivationConfig } from './config';

/**
 * Deriva el descuento global por item (EA004) a partir del
 * porcentaje de descuento global (F010).
 *
 * NT-001: EA004 = F010 * E721 / 100
 *
 * Se ejecuta antes de applyItemDerivedFields para que EA008
 * ya cuente con el descuento global poblado.
 */
export function applyDescuentoGlobalDerivedFields(out: DEC): void {
  const subtotales = out.subtotalesTotales;
  if (!subtotales) return;

  const f010 = subtotales.porcentajeDescuentoGlobal;
  if (!f010 || f010.lte(0)) return;

  const items = getItemsOperacion(out);
  if (!items) return;

  for (const item of items) {
    const valorItem = item.valorItem;
    if (!valorItem) continue;

    valorItem.valorRestaItem.descuentoGlobalItem = f010
      .times(valorItem.precioUnitario)
      .div(HUNDRED);
  }
}

/**
 * Deriva los campos calculables a nivel de item:
 *
 * - EA008 (dTotOpeItem): valor total de la operacion por item.
 *   MT v150, p. 89.
 *   Formula estandar (C002 = 1, 5, 6):
 *     (E721 - EA002 - EA004 - EA006 - EA007) * E711
 *   Formula autofactura (C002 = 4):
 *     E721 * E711
 *
 * - EA009 (dTotOpeGs): valor total de la operacion por item en guaranies.
 *   MT v150, p. 89. EA008 * E725.
 *
 * - EA003 (dPorcDesIt): porcentaje de descuento particular.
 *   MT v150, p. 88. (EA002 * 100) / E721.
 *
 * - E735 (dBasGravIVA): base gravada del IVA por item.
 *   NT-13, p. 1 — formula unificada:
 *     [100 * EA008 * E733] / [10000 + (E734 * E733)]
 *
 * - E736 (dLiqIVAItem): liquidacion del IVA por item.
 *   MT v150, p. 90. E735 * (E734 / 100).
 *
 * - E737 (dBasExe): base exenta por item.
 *   NT-13, p. 1. Solo aplica para gravado parcial (E731 = 4).
 */
export function applyItemDerivedFields(out: DEC, config: DerivationConfig): void {
  if (!config.aplicaValorItem) {
    return;
  }

  const items = getItemsOperacion(out);
  if (!items) {
    return;
  }

  for (const item of items) {
    const valorItem = item.valorItem;
    if (!valorItem) {
      continue;
    }

    const valorRestaItem = valorItem.valorRestaItem;
    const cantidad = item.cantidadProductoServicio;
    const precioUnitario = valorItem.precioUnitario;

    // MT v150, p. 87, campo E727 (dTotBruOpeItem):
    // Corresponde a la multiplicacion del precio por item (E721) y la cantidad por item (E711).
    const totalBrutoOperacionItem = precioUnitario.times(cantidad);
    valorItem.totalBrutoOperacionItem = totalBrutoOperacionItem;

    const descuentoParticular = bigOrZero(valorRestaItem.descuentoParticularItem);
    const descuentoGlobal = bigOrZero(valorRestaItem.descuentoGlobalItem);
    const anticipoParticular = bigOrZero(valorRestaItem.anticipoParticularItem);
    const anticipoGlobal = bigOrZero(valorRestaItem.anticipoGlobalItem);

    // MT v150, p. 88, campo EA003 (dPorcDesIt):
    // Porcentaje de descuento particular por item: [EA002 * 100 / E721]
    valorRestaItem.porcentajeDescuentoItem = precioUnitario.gt(0)
      ? descuentoParticular.times(HUNDRED).div(precioUnitario)
      : ZERO;

    // MT v150, p. 89, campo EA008 (dTotOpeItem):
    // Formula estandar: (E721 - EA002 - EA004 - EA006 - EA007) * E711
    // Formula autofactura (C002=4): E721 * E711
    const totalOperacionItem =
      config.ea008Formula === 'autofactura'
        ? precioUnitario.times(cantidad)
        : precioUnitario
            .minus(descuentoParticular)
            .minus(descuentoGlobal)
            .minus(anticipoParticular)
            .minus(anticipoGlobal)
            .times(cantidad);

    valorRestaItem.valorTotalOperacionItem = totalOperacionItem;

    // MT v150, p. 89, campo EA009 (dTotOpeGs):
    // Corresponde al calculo aritmetico EA008 * E725.
    // Obligatorio si existe el campo E725.
    valorRestaItem.valorTotalOperacionItemGs =
      valorItem.tipoCambioItem !== undefined
        ? totalOperacionItem.times(valorItem.tipoCambioItem)
        : undefined;

    const ivaItem = item.ivaItem;
    if (!ivaItem || !config.aplicaIvaItem) {
      continue;
    }

    const forma = ivaItem.formaAfectacionTributariaIVA;
    const proporcionGravada = ivaItem.proporcionGravadaIva;
    const tasa = ivaItem.tasaIva;

    let baseGravada = ZERO;
    let liquidacion = ZERO;

    if (
      forma !== formaAfectacionTributariaIVA.Exonerado &&
      forma !== formaAfectacionTributariaIVA.Exento &&
      tasa > 0 &&
      proporcionGravada.gt(0)
    ) {
      // NT-13, p. 1, campo E735 (dBasGravIVA) — formula unificada:
      // [100 * EA008 * E733] / [10000 + (E734 * E733)]
      const numerador = HUNDRED.times(totalOperacionItem).times(proporcionGravada);
      const denominador = new Big(10000).plus(toBig(tasa).times(proporcionGravada));

      baseGravada = denominador.gt(0) ? numerador.div(denominador) : ZERO;

      // NT-13, p. 1, campo E736 (dLiqIVAItem):
      // E735 * (E734 / 100)
      liquidacion = baseGravada.times(tasa).div(HUNDRED);
    }

    ivaItem.baseGravadaIvaItem = baseGravada;
    ivaItem.liquidacionIvaItem = liquidacion;

    // NT-13, p. 1, campo E737 (dBasExe):
    // Base exenta por item. Solo aplica cuando E731 = 4 (Gravado parcial).
    let baseExenta = ZERO;
    if (forma === formaAfectacionTributariaIVA.GravadoParcial) {
      const numerador = HUNDRED.times(totalOperacionItem).times(HUNDRED.minus(proporcionGravada));
      const denominador = HUNDRED.times(HUNDRED).plus(proporcionGravada.times(tasa));

      baseExenta = denominador.gt(0) ? numerador.div(denominador) : ZERO;
    }

    ivaItem.baseExenta = baseExenta.gt(0) ? baseExenta : ZERO;
  }
}
