import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import "./App.css";
import React, { useState } from "react";


import { MainContent } from "./layout/MainContent";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from "./pages/Dashboard";
import SearchPolice from "./components/Forms/Police/Search/SearchPolice";
import Searchpolicepage from "./pages/Searchpolicepage";
import ConsultPolicePage from "./components/Forms/Police/Consult/Consult";
import AddPolice from "./components/Forms/Police/Add/AddPolice";
import Example from "./components/Forms/TS";
import Examples from "./components/Forms/Quittance/Search/searchQuittance";
import QuittanceAdd from "./components/Forms/Quittance/Add/QuittanceAdd";
import SignInSide from "./components/LoginPage/Login";
import SignUpSide from "./components/LoginPage/Logup";  
import { combineReducers, createStore, applyMiddleware } from 'redux';
import PrivateRoute from "./routage/PrivateRoute";
 
import store from "./routage/store";
import { Provider } from 'react-redux';
import StepperQuittanceAdd from "./components/Forms/Quittance/Add/stepperQuittanceAdd";
import { RecoilRoot } from "recoil";
import UpdatePolice from "./components/Forms/Police/Update/UpdatePolice";
 


const mdTheme = createTheme();

function App() {

  const [, setDataFromFille1] = useState("");

  const handleDataReceived = (data: React.SetStateAction<string>) => {
    setDataFromFille1(data);
  };


  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

 
 

    return (
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <MainContent />
                </PrivateRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="test" element={<Example />} />
              <Route path="police-search" element={<SearchPolice />} />
              {/* <Route path="quittance-add" element={<QuittanceAdd />} /> */} 
              
              <Route path="quittance-add" element={<StepperQuittanceAdd />} />
               
               <Route path="police-add" element={<AddPolice />} />   
              <Route path="consult-page/:codePolice" element={<ConsultPolicePage />} />
              <Route path="police-update/:codePolice" element={<UpdatePolice />} />
              <Route path="quittance-search" element={<Examples />} />
            </Route>
            <Route path="/loginUp" element={<SignUpSide />} />
            <Route path="/signIn" element={<SignInSide />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    );
  };

export default App;
