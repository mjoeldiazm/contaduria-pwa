import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import { EntradaImpuesto } from '../EntradaImpuesto';
import { ParImpuesto } from '../../Interfaces/interfaces';

export const Credito = forwardRef((props: any, ref) => {
  const [creditoComprasMercadoInterno15Porciento, setCreditoComprasMercadoInterno15Porciento] = useState<number>(0);
  const [creditoComprasMercadoInterno18Porciento, setCreditoComprasMercadoInterno18Porciento] = useState<number>(0);
  const [creditoImportaciones15Porciento, setCreditoImportaciones15Porciento] = useState<number>(0);
  const [creditoImportaciones18Porciento, setCreditoImportaciones18Porciento] = useState<number>(0);
  const [totalCreditoFiscal, setTotalCreditoFiscal] = useState<number>(0);

  const comprasNetasMercadoInterno = useRef<{ obtenerImpuestos(): ParImpuesto }>(null);
  const comprasExentasMercadoInterno = useRef<{ obtenerImpuestos(): ParImpuesto }>(null);
  const comprasExoneradas = useRef<{ obtenerImpuestos(): ParImpuesto }>(null);
  const importacionesFueraCA = useRef<{ obtenerImpuestos(): ParImpuesto }>(null);
  const importacionesCA = useRef<{ obtenerImpuestos(): ParImpuesto }>(null);

  const calcularCreditoTotal = (): void => {
    setCreditoComprasMercadoInterno15Porciento(
      comprasNetasMercadoInterno?.current?.obtenerImpuestos().Valor15Porciento! * 0.15 | 0);
    setCreditoComprasMercadoInterno18Porciento(
      comprasNetasMercadoInterno?.current?.obtenerImpuestos().Valor18Porciento! * 0.18 | 0);
    setCreditoImportaciones15Porciento((
      importacionesFueraCA?.current?.obtenerImpuestos().Valor15Porciento! +
      importacionesCA?.current?.obtenerImpuestos().Valor15Porciento!) * 0.15 | 0);
    setCreditoImportaciones18Porciento((
      importacionesFueraCA?.current?.obtenerImpuestos().Valor18Porciento! +
      importacionesCA?.current?.obtenerImpuestos().Valor18Porciento!) * 0.18 | 0);
    setTotalCreditoFiscal(
      (creditoComprasMercadoInterno15Porciento + creditoComprasMercadoInterno18Porciento +
      creditoImportaciones15Porciento + creditoImportaciones18Porciento)  | 0
    );
  }

  useImperativeHandle(ref, () => ({
    obtenerCreditoFiscal(): number {
      return totalCreditoFiscal | 0;
    },
    calcularCreditoTotal
  }))

  return (
    <>
      <p style={{ fontWeight: 'bold', fontSize: 20, margin: 10, fontFamily: 'sans-serif' }}>Determinación del Crédito Fiscal</p>
      <hr />
      <Box component='form' noValidate autoComplete='off' sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}>
        <EntradaImpuesto ref={comprasNetasMercadoInterno} Texto='Compras Netas en el Mercado Interno' />
        <EntradaImpuesto ref={comprasExentasMercadoInterno} Texto='Compras Exentas en el Mercado Interno' />
        <EntradaImpuesto ref={comprasExoneradas} Texto='Compras Exoneradas' />
        <EntradaImpuesto ref={importacionesFueraCA} Texto='Importaciones (Fuera de Centroamérica)' />
        <EntradaImpuesto ref={importacionesCA} Texto='Importaciones (Centroamérica)' />
      </Box>
      <p style={{ fontSize: 16, margin: 10, fontFamily: 'sans-serif' }}>Crédito por Compras en Mercado Interno</p>
      <Box component='form' noValidate autoComplete='off' sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}>
        <TextField key={'creditoComprasMercadoInterno15Porciento'} disabled label='Valor para el 15%' value={creditoComprasMercadoInterno15Porciento} />
        <TextField key={'creditoComprasMercadoInterno18Porciento'} disabled label='Valor para el 18%' value={creditoComprasMercadoInterno18Porciento} />
      </Box>
      <p style={{ fontSize: 16, margin: 10, fontFamily: 'sans-serif' }}>Crédito por Importaciones</p>
      <Box component='form' noValidate autoComplete='off' sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}>
        <TextField key={'creditoImportaciones15Porciento'} disabled label='Valor para el 15%' value={creditoImportaciones15Porciento} />
        <TextField key={'creditoImportaciones18Porciento'} disabled label='Valor para el 18%' value={creditoImportaciones18Porciento} />
      </Box>
      <p style={{ fontWeight: 'bold', fontSize: 16, margin: 10, fontFamily: 'sans-serif' }}>Total Crédito Fiscal</p>
      <Box component='form' noValidate autoComplete='off' sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}>
        <TextField key={'totalCreditoFiscal'} disabled label='Total' value={totalCreditoFiscal} />
      </Box>
    </>
  );
})