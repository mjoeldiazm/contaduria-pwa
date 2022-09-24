import { Box, Button, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Credito } from "../Credito/Credito";
import { Debito } from "../Debito/Debito";

export default function Body() {
  const [saldoFavorObligadoTributario, setSaldoFavorObligadoTributario] = useState<number>(0);
  const [saldoFavorFisco, setSaldoFavorFisco] = useState<number>(0);
  const [saldoFavorPeriodoAnterior, setSaldoFavorPeriodoAnterior] = useState<number>(0);
  const [impuestoRetenidoVentasEstado, setImpuestoRetenidoVentasEstado] = useState<number>(0);
  const [impuestoRetenidoAcuerdo215_2010, setImpuestoRetenidoAcuerdo215_2010] = useState<number>(0);
  const [impuestoRetenidoVentasTC_TD, setImpuestoRetenidoVentasTC_TD] = useState<number>(0);
  const [creditoSiguientePeriodoObligadoTributario, setCreditoSiguientePeriodoObligadoTributario] = useState<number>(0);
  const [saldoDefinitivoPeriodoFavorFisco, setSaldoDefinitivoPeriodoFavorFisco] = useState<number>(0);
  const [tiempo, setTiempo] = useState(Date.now());

  const debitoFormulario = useRef<{ obtenerDebitoFiscal(): number, calcularDebitoTotal(): void }>(null);
  const creditoFormulario = useRef<{ obtenerCreditoFiscal(): number, calcularCreditoTotal(): void }>(null);
  
  useEffect(() => {
    const interval = setInterval(() => { calcularValores(); setTiempo(Date.now()) }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [tiempo]);

  const calcularValores = (): void => {
    debitoFormulario?.current?.calcularDebitoTotal();
    creditoFormulario?.current?.calcularCreditoTotal();
    let debitoFiscal: number = debitoFormulario?.current?.obtenerDebitoFiscal()!;
    let creditoFiscal: number = creditoFormulario?.current?.obtenerCreditoFiscal()!

    if (debitoFiscal < creditoFiscal) {
      setSaldoFavorObligadoTributario(creditoFiscal - debitoFiscal);
    }
    else {
      setSaldoFavorObligadoTributario(0);
    }

    if (debitoFiscal > creditoFiscal) {
      setSaldoFavorFisco(debitoFiscal - creditoFiscal);
    }
    else {
      setSaldoFavorFisco(0);
    }

    if (saldoFavorObligadoTributario > 0) {
      setCreditoSiguientePeriodoObligadoTributario(
        saldoFavorPeriodoAnterior + impuestoRetenidoVentasEstado +
        impuestoRetenidoAcuerdo215_2010 + impuestoRetenidoVentasTC_TD
      );
    }
    else {
      setCreditoSiguientePeriodoObligadoTributario(0);
    }

    if (saldoFavorFisco > 0) {
      setSaldoDefinitivoPeriodoFavorFisco(
        saldoFavorFisco - (
          saldoFavorPeriodoAnterior + impuestoRetenidoVentasEstado +
          impuestoRetenidoAcuerdo215_2010 + impuestoRetenidoVentasTC_TD)
      );
    }
    else {
      setSaldoDefinitivoPeriodoFavorFisco(0);
    }
  }

  return (
    <>
      <Debito ref={debitoFormulario} />
      <Credito ref={creditoFormulario} />
      <p style={{ fontWeight: 'bold', fontSize: 20, margin: 10, fontFamily: 'sans-serif' }}>Saldos Obligado Tributario / Fisco</p>
      <hr />
      <Box component='form' noValidate autoComplete='off' sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}>
        <TextField key={'saldoFavorObligadoTributario'} disabled label='Subtotal a Favor Obligado Tributario'
          value={saldoFavorObligadoTributario} type='number' />
        <TextField key={'saldoFavorFisco'} disabled label='Subtotal a Favor Fisco' value={saldoFavorFisco} type='number' />
      </Box>
      <p style={{ fontWeight: 'bold', fontSize: 20, margin: 10, fontFamily: 'sans-serif' }}>Saldo Anterior / Impuesto Retenido</p>
      <Box component='form' noValidate autoComplete='off' sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}>
        <TextField key={'saldoFavorPeriodoAnterior'} label='Saldo a Favor Periodo Anterior'
          value={saldoFavorPeriodoAnterior} type='number'
          onChange={(e) => {
            setSaldoFavorPeriodoAnterior(parseFloat(e.currentTarget.value));
          }} />
        <TextField key={'impuestoRetenidoVentasEstado'} label='Impuesto Retenido por Ventas al Estado'
          value={impuestoRetenidoVentasEstado} type='number'
          onChange={(e) => {
            setImpuestoRetenidoVentasEstado(parseFloat(e.currentTarget.value));
          }} />
      </Box>
      <Box component='form' noValidate autoComplete='off' sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}>
        <TextField key={'impuestoRetenidoAcuerdo215_2010'} label='Impuesto Retenido por Acuerdo 215-2010'
          value={impuestoRetenidoAcuerdo215_2010} type='number'
          onChange={(e) => {
            setImpuestoRetenidoAcuerdo215_2010(parseFloat(e.currentTarget.value));
          }} />
        <TextField key={'impuestoRetenidoVentasTC_TD'} label='Impuesto Retenido por Ventas con T/C o T/D'
          value={impuestoRetenidoVentasTC_TD} type='number'
          onChange={(e) => {
            setImpuestoRetenidoVentasTC_TD(parseFloat(e.currentTarget.value));
          }} />
      </Box>
      <p style={{ fontWeight: 'bold', fontSize: 20, margin: 10, fontFamily: 'sans-serif' }}>Saldos Totales</p>
      <Box component='form' noValidate autoComplete='off' sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}>
        <TextField key={'creditoSiguientePeriodoObligadoTributario'} disabled label='Crédito Siguiente Periodo a Favor Obligado Tributario'
          value={creditoSiguientePeriodoObligadoTributario} type='number' onChange={(e) => {
          setCreditoSiguientePeriodoObligadoTributario(parseFloat(e.currentTarget.value));
        }} />
        <TextField key={'saldoDefinitivoPeriodoFavorFisco'} disabled label='Saldo Definitivo Periodo a Favor Fisco'
          value={saldoDefinitivoPeriodoFavorFisco} type='number'
          onChange={(e) => {
            setSaldoDefinitivoPeriodoFavorFisco(parseFloat(e.currentTarget.value));
          }} />
      </Box>
      <Box>
        <Button sx={{ width: '445px', marginX: '5px', marginBottom: '5px' }} variant="contained" onClick={() => calcularValores()} >Calcular</Button>
      </Box>
    </>
  );
}