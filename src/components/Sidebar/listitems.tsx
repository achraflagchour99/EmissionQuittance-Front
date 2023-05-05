import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddchartIcon from '@mui/icons-material/Addchart';
import SearchIcon from '@mui/icons-material/Search';
import ListIcon from '@mui/icons-material/List';
import { Link } from 'react-router-dom';
export const mainListItems = (
  <div>
    
    <Link to="/" style={{ textDecoration: 'none' , color: 'inherit' }} >
    <ListItemButton>
      <ListItemIcon>
        <AddchartIcon style={{ color: 'white' }}/>
      </ListItemIcon>
      <ListItemText primary={"Ajouter Police"} />
    </ListItemButton>
    </Link>
   

    <Link to="/police-search" style={{ textDecoration: 'none' , color: 'inherit' }} >
    <ListItemButton>
      <ListItemIcon>
        <SearchIcon style={{ color: 'white' }}/>
      </ListItemIcon>
      <ListItemText primary="Rechercher Police" />
    </ListItemButton>
    </Link>

    <Link to="/quittance-add" style={{ textDecoration: 'none' , color: 'inherit' }} >
    <ListItemButton>
      <ListItemIcon>
        <AddchartIcon style={{ color: 'white' }}/>
      </ListItemIcon>
      <ListItemText primary="Ajouter Quittance" />
    </ListItemButton>
    </Link>

    <Link to="/quittance" style={{ textDecoration: 'none' , color: 'inherit' }} >
    <ListItemButton>
      <ListItemIcon>
        <ListIcon style={{ color: 'white' }}/>
      </ListItemIcon>
      <ListItemText primary="Quittance" />
    </ListItemButton>
    </Link>

    <Link to="/quittance-search" style={{ textDecoration: 'none' , color: 'inherit' }} >
    <ListItemButton>
      <ListItemIcon>
        <ListIcon style={{ color: 'white' }}/>
      </ListItemIcon>
      <ListItemText primary="Rechercher Quittance" />
    </ListItemButton>
    </Link>
  </div>
);

