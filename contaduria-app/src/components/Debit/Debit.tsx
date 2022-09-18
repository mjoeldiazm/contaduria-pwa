import React from 'react';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';

export default function Debit() {
    const [ventasNetas15, setventasNetas15] = React.useState<number>(0)
    const [impuesto15, setImpuesto15] = React.useState<number>(0)
    const [ventasNetas18, setventasNetas18] = React.useState<number>(0)
    const [impuesto18, setImpuesto18] = React.useState<number>(0)

    return (
    <>
      <p style={{ fontWeight: 'bold', fontSize:20, margin:10, fontFamily:'sans-serif' }}>Determinación Del Débito Fiscal</p>
      <hr/>
      <p style={{ fontSize: 16, margin:10, fontFamily:'sans-serif' }}>Ventas Netas en el Mercado Interno</p>
      <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      >
      <div>
      <TextField
          label="Dato 1"
          defaultValue={'L.'}
          type='number'
          value={ventasNetas15}
          onChange={(e)=>{
            setventasNetas15(parseFloat(e.currentTarget.value))
            setImpuesto15(parseFloat(e.currentTarget.value)*.15 || 0)
        }}
        />
        <TextField
          label="Dato 2"
          defaultValue={'L.'}
          type='number'
          value={ventasNetas18}
          onChange={(e)=>{
            setventasNetas18(parseFloat(e.currentTarget.value))
            setImpuesto18(parseFloat(e.currentTarget.value)*.18 || 0)
        }}
        />
      </div>
      </Box>
      <p style={{ fontSize: 16, margin:10, fontFamily:'sans-serif' }}>Débito Por Ventas</p>
      <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      >
      <div>
      <TextField
          disabled
          id="outlined-disabled"
          label="Dato 1"
          defaultValue={'L.'}
          value={impuesto15}
        />
        <TextField
          disabled
          id="outlined-disabled"
          label="Dato 2"
          defaultValue={'L.'}
          value={impuesto18}
        />
      </div>
      </Box>
      <p style={{ fontWeight: 'bold', fontSize: 16, margin:10, fontFamily:'sans-serif' }}>Total Débito Fiscal</p>
      <div>
      <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      >
      <TextField
        disabled
        id="outlined-disabled"
        label="TOTAL"
        defaultValue={'L.'}
        value={impuesto15+impuesto18}
      />
      </Box>
      </div>
    </>
  );
}