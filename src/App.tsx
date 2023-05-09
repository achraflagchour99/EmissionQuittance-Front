import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import "./App.css";
import React from "react";
import Header from "./components/Header/Header";
import AppSidebar from "./components/Sidebar";
// import { MainContent } from "./components/MainContent/MainContent";

import { MainContent } from "./layout/MainContent";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from "./pages/Dashboard";
import SearchPolice from "./components/Forms/SearchPolice";
import Searchpolicepage from "./pages/Searchpolicepage";
import ConsultPolicePage from "./pages/ConsultPolicePage";
import AddPolice from "./components/Forms/AddPolice";
import Test from "./components/Forms/test";
import Example from "./components/Forms/TS";

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
                        <Route path='test'      element={<Example />} />
                        <Route path='police-search'      element={<Searchpolicepage />} />
                        <Route path='police-add'      element={<AddPolice />} />
                        <Route path="/consult-page/:codePolice" element={<ConsultPolicePage/>} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>


  );
}

export default App;
