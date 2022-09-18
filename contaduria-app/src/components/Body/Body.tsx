import { useForm } from '@mantine/form';
import Credit from '../Credit/Credit';
import Debit from '../Debit/Debit'

export default function Body() {
  const form = useForm({
    initialValues: {
      dato1: '',
      dato2: '',
      compra1: '',
      compra2: '',
      valor1: '',
      valor2: ''
    },
  });

  return (
    <>
      <Debit/>
      <Credit/>
    </>
  );
}