import { useForm } from '@mantine/form';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';

export default function Debit() {
  const form = useForm({
    initialValues: {
      dato1: '',
      dato2: ''
    },
  });

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
          {...form.getInputProps('dato1')}
        />
        <TextField
          label="Dato 2"
          defaultValue={'L.'}
          {...form.getInputProps('dato2')}
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
        />
        <TextField
          disabled
          id="outlined-disabled"
          label="Dato 2"
          defaultValue={'L.'}
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
      />
      </Box>
      </div>
    </>
  );
}