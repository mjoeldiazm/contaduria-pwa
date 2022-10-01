import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { FormControl, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import { EntradaImpuesto } from '../EntradaImpuesto';
import { ParImpuesto } from '../../Interfaces/interfaces';

export const Debito = forwardRef((props: any, ref) => {
  const [debitoVentas15Porciento, setDebitoVentas15Porciento] = useState<number>(0);
  const [debitoVentas18Porciento, setDebitoVentas18Porciento] = useState<number>(0);
  const [totalDebitoFiscal, setTotalDebitoFiscal] = useState<number>(0);

  const ventasNetasMercadoInterno = useRef<{ obtenerImpuestos(): ParImpuesto }>(null);
  const ventasExentasMercadoInterno = useRef<{ obtenerImpuestos(): ParImpuesto }>(null);
  const exportacionesFueraCA = useRef<{ obtenerImpuestos(): ParImpuesto }>(null);
  const exportacionesCA = useRef<{ obtenerImpuestos(): ParImpuesto }>(null);
  const ventasExoneradas = useRef<{ obtenerImpuestos(): ParImpuesto }>(null);

  const calcularDebitoTotal = (): void => {
    setDebitoVentas15Porciento((
      ventasNetasMercadoInterno?.current?.obtenerImpuestos().Valor15Porciento! +
      ventasExentasMercadoInterno?.current?.obtenerImpuestos().Valor15Porciento! +
      exportacionesFueraCA?.current?.obtenerImpuestos().Valor15Porciento! +
      exportacionesCA?.current?.obtenerImpuestos().Valor15Porciento! +
      ventasExoneradas?.current?.obtenerImpuestos().Valor15Porciento!) * 0.15 | 0);
    setDebitoVentas18Porciento((
      ventasNetasMercadoInterno?.current?.obtenerImpuestos().Valor18Porciento! +
      ventasExentasMercadoInterno?.current?.obtenerImpuestos().Valor18Porciento! +
      exportacionesFueraCA?.current?.obtenerImpuestos().Valor18Porciento! +
      exportacionesCA?.current?.obtenerImpuestos().Valor18Porciento! +
      ventasExoneradas?.current?.obtenerImpuestos().Valor18Porciento!) * 0.18 | 0);
    setTotalDebitoFiscal(debitoVentas15Porciento + debitoVentas18Porciento  | 0);
  }

  useImperativeHandle(ref, () => ({
    obtenerDebitoFiscal(): number {
      return totalDebitoFiscal  | 0;
    },
    calcularDebitoTotal
  }))

  return (
    <>
      <p style={{ fontWeight: 'bold', fontSize: 20, margin: 10, fontFamily: 'sans-serif' }}>Determinación del Débito Fiscal</p>
      <hr />
      <Box marginLeft={2} component='form' noValidate autoComplete='off' sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}>
        <EntradaImpuesto ref={ventasNetasMercadoInterno} Texto='Ventas Netas en el Mercado Interno' />
        <EntradaImpuesto ref={ventasExentasMercadoInterno} Texto='Ventas Exentas en el Mercado Interno' />
        <EntradaImpuesto ref={exportacionesFueraCA} Texto='Exportaciones (Fuera de Centroamerica)' />
        <EntradaImpuesto ref={exportacionesCA} Texto='Exportaciones (Centroamerica)' />
        <EntradaImpuesto ref={ventasExoneradas} Texto='Ventas Exoneradas' />
      </Box>
      <p style={{ fontSize: 16, margin: 10, fontFamily: 'sans-serif' }}>Débito Por Ventas</p>
      <Box marginLeft={2} component='form' noValidate autoComplete='off' sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}>
        <FormControl margin='normal'>
        <InputLabel htmlFor="outlined-adornment-amount">Total para 15%</InputLabel>
        <OutlinedInput
          key={'debitoVentas15Porciento'} 
          disabled label='Valor para el 15%' 
          startAdornment={<InputAdornment position="start">L</InputAdornment>}
          value={debitoVentas15Porciento} />
        </FormControl>
        <FormControl margin='normal'>
        <InputLabel htmlFor="outlined-adornment-amount">Total para 18%</InputLabel>
        <OutlinedInput 
          key={'debitoVentas185Porciento'} 
          disabled label='Valor para el 18%' 
          startAdornment={<InputAdornment position="start">L</InputAdornment>}
          value={debitoVentas18Porciento} />
        </FormControl>
      </Box>
      <p style={{ fontWeight: 'bold', fontSize: 16, margin: 10, fontFamily: 'sans-serif' }}>Total Débito Fiscal</p>
      <Box marginLeft={2} component='form' noValidate autoComplete='off' sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}>
        <FormControl margin='normal'>
        <InputLabel htmlFor="outlined-adornment-amount">Total</InputLabel>
        <OutlinedInput 
        key={'totalDebitoFiscal'} 
        disabled label='Total' 
        startAdornment={<InputAdornment position="start">L</InputAdornment>}
        value={totalDebitoFiscal} />
        </FormControl>
      </Box>
    </>
  );
})