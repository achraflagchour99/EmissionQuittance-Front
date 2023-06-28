import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Divider, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import PostAddIcon from '@mui/icons-material/PostAdd';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ArticleIcon from '@mui/icons-material/Article';
import DescriptionIcon from '@mui/icons-material/Description';
import DifferenceIcon from '@mui/icons-material/Difference';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
const ListItems = () => {
  const [policeOpen, setPoliceOpen] = useState(false);
  const [quittanceOpen, setQuittanceOpen] = useState(false);

  const handlePoliceClick = () => {
    setPoliceOpen(!policeOpen);
  };

  const handleQuittanceClick = () => {
    setQuittanceOpen(!quittanceOpen);
  };

  return (
    <div>
      <ListItemButton onClick={handlePoliceClick}>
        <ListItemIcon>
          <ArticleIcon style={{ color: 'white' }} />
        </ListItemIcon>
        <ListItemText primary="Police" />
        {policeOpen ? <ExpandLessIcon style={{ color: 'white' }} /> : <ExpandMoreIcon style={{ color: 'white' }} />}
      </ListItemButton>
      {policeOpen && (
        <div>
          <Link to="/police-add" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemButton>
              <ListItemIcon>
                <PostAddIcon style={{ color: 'white' }}/>
              </ListItemIcon>
              <ListItemText primary="Ajouter Police" />
            </ListItemButton>
          </Link>
          <Link to="/police-search" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemButton>
              <ListItemIcon>
              <FindInPageIcon style={{ color: 'white' }}/>
              </ListItemIcon>
              <ListItemText primary="Liste de Polices" />
            </ListItemButton>
          </Link>
        </div>
      )}
      <div style={{ margin: '10px 0' }}></div>
      <Divider style={{ backgroundColor: 'white' }} />
      <Divider style={{ backgroundColor: 'white' }} />
      <div style={{ margin: '10px 0' }}></div>

      <ListItemButton onClick={handleQuittanceClick}>
        <ListItemIcon>
          <DescriptionIcon style={{ color: 'white' }} />
        </ListItemIcon>
        <ListItemText primary="Quittance" />
        {quittanceOpen ? <ExpandLessIcon style={{ color: 'white' }} /> : <ExpandMoreIcon style={{ color: 'white' }} />}
      </ListItemButton>
      {quittanceOpen && (
        <div>
          <Link to="/quittance-add" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemButton>
              <ListItemIcon>
                <DifferenceIcon style={{ color: 'white' }}/>
              </ListItemIcon>
              <ListItemText primary="Ajouter Quittance" />
            </ListItemButton>
          </Link>
          <Link to="/quittance-search" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemButton>
              <ListItemIcon>
              <ContentPasteSearchIcon style={{ color: 'white' }}/>
              </ListItemIcon>
              <ListItemText primary="Liste de Quittances" />
            </ListItemButton>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ListItems;
