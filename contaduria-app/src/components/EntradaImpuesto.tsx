import { FormControl, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material'
import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { ParImpuesto, EntradaParImpuestoProps } from '../Interfaces/interfaces'

export const EntradaImpuesto = forwardRef((props: EntradaParImpuestoProps, ref) => {
    const [impuesto15Porciento, setimpuesto15Porciento] = useState<number>(0)
    const [impuesto18Porciento, setimpuesto18Porciento] = useState<number>(0)

    useImperativeHandle(ref,() => ({
        obtenerImpuestos(): ParImpuesto {
            let impuestos: ParImpuesto = {
                Valor15Porciento: impuesto15Porciento,
                Valor18Porciento: impuesto18Porciento,
            }
            return impuestos;
        }
    }))

    return (
        <div>
            <p style={{ fontSize: 16, margin: 10, fontFamily: 'sans-serif' }}>{props.Texto}</p>
            <FormControl margin='normal'>
            <InputLabel htmlFor="outlined-adornment-amount">Cantidad para 15%</InputLabel>
            <OutlinedInput
                label='Valor para el 15%'
                value={impuesto15Porciento}
                type='number'
                startAdornment={<InputAdornment position="start">L</InputAdornment>}
                onChange={(e) => {
                    setimpuesto15Porciento(parseFloat(e.currentTarget.value))
                }}
            />
            </FormControl>
            <FormControl margin='normal'>
            <InputLabel htmlFor="outlined-adornment-amount">Cantidad para 18%</InputLabel>
            <OutlinedInput
                label='Valor para el 18%'
                type='number'
                value={impuesto18Porciento}
                startAdornment={<InputAdornment position="start">L</InputAdornment>}
                onChange={(e) => {
                    setimpuesto18Porciento(parseFloat(e.currentTarget.value))
                }}
            />
            </FormControl>
        </div>
    )
})
