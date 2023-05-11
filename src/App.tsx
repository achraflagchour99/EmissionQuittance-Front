import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import "./App.css";
import React, { useState } from "react";


import { MainContent } from "./layout/MainContent";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from "./pages/Dashboard";
import SearchPolice from "./components/Forms/SearchPolice";
import Searchpolicepage from "./pages/Searchpolicepage";
import ConsultPolicePage from "./pages/ConsultPolicePage";
import AddPolice from "./components/Forms/AddPolice";
import Example from "./components/Forms/TS";
import Examples from "./components/Forms/Quittance/Search/searchQuittance";
import QuittanceAdd from "./components/Forms/Quittance/Add/QuittanceAdd";
import SignInSide from "./components/LoginPage/Login";
import { Provider } from "react-redux"; 
import PrivateRoute from "./routage/PrivateRoute";

const mdTheme = createTheme();

function App() {

  const [dataFromFille1, setDataFromFille1] = useState("");

  const handleDataReceived = (data: React.SetStateAction<string>) => {
    setDataFromFille1(data);
  };


  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  
  // if (!localStorage.getItem('token')) {
  //   return ( 
  //             <BrowserRouter> 
  //                 <Routes>
  //                     <Route> 
  //                         <Route path="/SignIn" element={<SignInSide/>} />
  //                     </Route>
  //                 </Routes>
  //             </BrowserRouter> 
  //       );
  //     }else
  {
  return (

 
        <BrowserRouter> 
            <Routes>
                <Route>
                    <Route path='/' element={<PrivateRoute><MainContent /> </PrivateRoute>}>
                    
                     


                        <Route index  element={<Dashboard />} />
                        <Route path='test'      element={<Example />} /> 
                        <Route path='police-search'      element={<SearchPolice />} />
                        <Route path='police-add'      element={<AddPolice />} />
                        <Route path="/quittance-add" element={<QuittanceAdd  />} />
                        <Route path="/consult-page/:codePolice" element={<ConsultPolicePage/>} />
                       <Route path="/quittance-search" element={<Examples/>} />  
                         
 
                       
                    </Route>
                    <Route path="/SignIn" element={<SignInSide onDataReceived={handleDataReceived}/>} />
                </Route>
            </Routes>
        </BrowserRouter> 

  );
}}

export default App;
