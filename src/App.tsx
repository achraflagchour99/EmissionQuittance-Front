import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import "./App.css";
import React from "react";
import Header from "./components/Header/Header";
import AppSidebar from "./components/Sidebar";
import 'bootstrap/dist/css/bootstrap.min.css';
// import { MainContent } from "./components/MainContent/MainContent";

import { MainContent } from "./layout/MainContent";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from "./pages/Dashboard";
import SearchPolice from "./components/Forms/SearchPolice";
import Searchpolicepage from "./pages/Searchpolicepage";
import AddQuittance from "./components/Forms/Quittance/Add/AddQuittance";
import SearchForm from "./components/Forms/Quittance/Search/SearchForm";

const mdTheme = createTheme();

function App() {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  return (

    
        <BrowserRouter> 
            <Routes>
                <Route>
                    <Route path='/' element={<MainContent />}>
                        <Route index                         element={<Dashboard />} />
                        <Route path='police-search'      element={<Searchpolicepage />} />
                        <Route path='quittance-add'      element={<AddQuittance />} />
                        <Route path='quittance-search'      element={<SearchForm />} />
                        
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
        

  );
}

export default App;
