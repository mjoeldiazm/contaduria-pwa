import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Avatar } from '@mui/material';

export default function ResponsiveAppBar() {
  const logo = 'https://unitec.edu/unidos-podemos/wp-content/uploads/2020/12/diamante.png'
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Impuestos App
          </Typography>
          <Avatar src={logo} alt='Logo Ceutec'/>
        </Toolbar>
      </AppBar>
    </Box>
  );
}