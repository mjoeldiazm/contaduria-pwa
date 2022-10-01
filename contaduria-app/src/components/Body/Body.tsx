import { Box, Button, FormControl, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
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
        saldoFavorObligadoTributario +
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
      <Box marginLeft={2} component='form' noValidate autoComplete='off' sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}>
      <FormControl margin='normal'>
        <InputLabel htmlFor="outlined-adornment-amount">Subtotal a Favor Obligado Tributario</InputLabel>
        <OutlinedInput 
          key={'saldoFavorObligadoTributario'} 
          disabled label='Subtotal a Favor Obligado Tributario'
          startAdornment={<InputAdornment position="start">L</InputAdornment>}
          value={saldoFavorObligadoTributario} type='number' />
        </FormControl>
        <FormControl margin='normal'>
        <InputLabel htmlFor="outlined-adornment-amount">Subtotal a Favor Fisco</InputLabel>
        <OutlinedInput  
        key={'saldoFavorFisco'} 
        disabled label='Subtotal a Favor Fisco' 
        startAdornment={<InputAdornment position="start">L</InputAdornment>}
        value={saldoFavorFisco} 
        type='number' />
        </FormControl>
      </Box>
      <p style={{ fontWeight: 'bold', fontSize: 20, margin: 10, fontFamily: 'sans-serif' }}>Saldo Anterior / Impuesto Retenido</p>
      <Box marginLeft={2} component='form' noValidate autoComplete='off' sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}>
      <FormControl margin='normal'>
        <InputLabel htmlFor="outlined-adornment-amount">Saldo a Favor Periodo Anterior</InputLabel>
        <OutlinedInput 
          key={'saldoFavorPeriodoAnterior'} 
          label='Saldo a Favor Periodo Anterior'
          value={saldoFavorPeriodoAnterior} type='number'
          startAdornment={<InputAdornment position="start">L</InputAdornment>}
          onChange={(e) => {
            setSaldoFavorPeriodoAnterior(parseFloat(e.currentTarget.value));
          }} />
        </FormControl>
        <FormControl margin='normal'>
        <InputLabel htmlFor="outlined-adornment-amount">Impuesto Retenido por Ventas al Estado</InputLabel>
        <OutlinedInput 
          key={'impuestoRetenidoVentasEstado'} 
          label='Impuesto Retenido por Ventas al Estado'
          value={impuestoRetenidoVentasEstado} type='number'
          startAdornment={<InputAdornment position="start">L</InputAdornment>}
          onChange={(e) => {
            setImpuestoRetenidoVentasEstado(parseFloat(e.currentTarget.value));
          }} />
        </FormControl>
      </Box>
      <Box marginLeft={2} component='form' noValidate autoComplete='off' sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}>
        <FormControl margin='normal'>
        <InputLabel htmlFor="outlined-adornment-amount">Impuesto Retenido por Acuerdo 215-2010</InputLabel>
        <OutlinedInput 
          key={'impuestoRetenidoAcuerdo215_2010'} 
          label='Impuesto Retenido por Acuerdo 215-2010'
          value={impuestoRetenidoAcuerdo215_2010} type='number'
          startAdornment={<InputAdornment position="start">L</InputAdornment>}
          onChange={(e) => {
            setImpuestoRetenidoAcuerdo215_2010(parseFloat(e.currentTarget.value));
          }} />
        </FormControl>
        <FormControl margin='normal'>
        <InputLabel htmlFor="outlined-adornment-amount">Impuesto Retenido por Ventas con T/C o T/D</InputLabel>
        <OutlinedInput 
          key={'impuestoRetenidoVentasTC_TD'} 
          label='Impuesto Retenido por Ventas con T/C o T/D'
          value={impuestoRetenidoVentasTC_TD} type='number'
          startAdornment={<InputAdornment position="start">L</InputAdornment>}
          onChange={(e) => {
            setImpuestoRetenidoVentasTC_TD(parseFloat(e.currentTarget.value));
          }} />
        </FormControl>
      </Box>
      <p style={{ fontWeight: 'bold', fontSize: 20, margin: 10, fontFamily: 'sans-serif' }}>Saldos Totales</p>
      <Box marginLeft={2} component='form' noValidate autoComplete='off' sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}>
        <FormControl margin='normal'>
        <InputLabel htmlFor="outlined-adornment-amount">Crédito Siguiente Periodo a Favor Obligado Tributario</InputLabel>
        <OutlinedInput 
          key={'creditoSiguientePeriodoObligadoTributario'} 
          disabled label='Crédito Siguiente Periodo a Favor Obligado Tributario'
          startAdornment={<InputAdornment position="start">L</InputAdornment>}
          value={creditoSiguientePeriodoObligadoTributario} type='number' onChange={(e) => {
          setCreditoSiguientePeriodoObligadoTributario(parseFloat(e.currentTarget.value));
        }} />
        </FormControl>
        <FormControl margin='normal'>
        <InputLabel htmlFor="outlined-adornment-amount">Saldo Definitivo Periodo a Favor Fisco</InputLabel>
        <OutlinedInput 
          key={'saldoDefinitivoPeriodoFavorFisco'} 
          disabled label='Saldo Definitivo Periodo a Favor Fisco'
          startAdornment={<InputAdornment position="start">L</InputAdornment>}
          value={saldoDefinitivoPeriodoFavorFisco} type='number'
          onChange={(e) => {
            setSaldoDefinitivoPeriodoFavorFisco(parseFloat(e.currentTarget.value));
          }} />
        </FormControl>
      </Box>
    </>
  );
}