import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useParams, useNavigate } from "react-router-dom";
import InstallButton from './InstallButton';

// Create the context
const AppBarTitleContext = React.createContext();

export const AppBarTitleProvider = ({ children }) => {
  const [title, setTitle] = React.useState("Intern");

  return (
    <AppBarTitleContext.Provider value={{ title, setTitle }}>
      {children}
    </AppBarTitleContext.Provider>
  );
};

export const useAppBarTitle = () => React.useContext(AppBarTitleContext);

export default function ButtonAppBar() {
  const { title } = useAppBarTitle();
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => navigate(-1)}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
          </Typography>
          <InstallButton />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
