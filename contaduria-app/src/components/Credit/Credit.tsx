import { useForm } from '@mantine/form';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';

export default function Credit() {
  const form = useForm({
    initialValues: {
      compra1: '',
      compra2: '',
      importacion1: '',
      importacion2: '',
      import1: '',
      import2: ''
    },
  });

  return (
    <>
      <p style={{ fontWeight: 'bold', fontSize:20, margin:10, fontFamily:'sans-serif' }}>Determinación Del Crédito Fiscal</p>
      <hr/>
      <p style={{ fontSize: 16, margin:10, fontFamily:'sans-serif' }}>Compras Netas en el Mercado Interno</p>
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
          label="Dato"
          defaultValue={'L.'}
          {...form.getInputProps('compra1')}
        />
        <TextField
          label="Dato"
          defaultValue={'L.'}
          {...form.getInputProps('compra2')}
        />
      </div>
      </Box>
      <p style={{ fontSize: 16, margin:10, fontFamily:'sans-serif' }}>Importaciones Fuera de Region CA</p>
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
          label="Dato"
          defaultValue={'L.'}
          {...form.getInputProps('importacion1')}
        />
        <TextField
          label="Dato"
          defaultValue={'L.'}
          {...form.getInputProps('importacion2')}
        />
      </div>
      </Box>
      <p style={{ fontSize: 16, margin:10, fontFamily:'sans-serif' }}>Importaciones dentro de Region CA</p>
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
          label="Dato"
          defaultValue={'L.'}
          {...form.getInputProps('import1')}
        />
        <TextField
          label="Dato"
          defaultValue={'L.'}
          {...form.getInputProps('import2')}
        />
      </div>
      </Box>
      <p style={{ fontSize: 16, margin:10, fontFamily:'sans-serif' }}>Credito Por Compras en el Mercado Interno</p>
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
          label="Credito"
          defaultValue={'L.'}
        />
        <TextField
          disabled
          id="outlined-disabled"
          label="Credito"
          defaultValue={'L.'}
        />
      </div>
      </Box>
      <p style={{ fontSize: 16, margin:10, fontFamily:'sans-serif' }}>Credito Por Importaciones</p>
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
          label="Credito"
          defaultValue={'L.'}
        />
        <TextField
          disabled
          id="outlined-disabled"
          label="Credito"
          defaultValue={'L.'}
        />
      </div>
      </Box>
      <p style={{ fontWeight: 'bold', fontSize: 16, margin:10, fontFamily:'sans-serif' }}>Total Crédito Fiscal</p>
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