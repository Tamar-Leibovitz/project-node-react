import logo from './logo.svg';
import './App.css';
import './components/Login'
import Login from './components/Login';
import Navbar from './components/Navbar';
import Payement from './components/Payement';


import Manager from './components/Manager';
import "primereact/resources/themes/arya-blue/theme.css"
import "primereact/resources/primereact.min.css"
import "primeicons/primeicons.css"
import "primeflex/primeflex.css"
import Register from './components/Register';
import { Route, Routes } from "react-router-dom";
import Chanut from './components/Chanut';
import Petifures from './components/Product/Petifures';
import Bars from './components/Product/Bars';
import Cakes from './components/Product/Cakes';
import FruitDesigns from './components/Product/FruitDesigns';
import ShowcaseCakes from './components/Product/ShowcaseCakes';
import GlutenFree from './components/Product/GlutenFree';
import { Navigate } from 'react-router-dom';
import BasketDesign from './components/BasketDesign';
import { useEffect } from 'react';
import useAuth from './hooks/useAuth';
import HomePage from './components/HomePage';
import PaymentRightSide from './components/PaymentRightSide';
import Checkkkk from './components/Checkkkk';
function App() {
  const {isAdmin} = useAuth()
  console.log("isAdmin++++",isAdmin);
  return (

    <div className="App">  
      <Navbar></Navbar>
      {/* <Manager></Manager> */}
      <Routes>
        <Route path="/" element={<Checkkkk />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Petifures" element={<Petifures />} />
        <Route path="/Bars" element={<Bars />} />
        <Route path="/Cakes" element={<Cakes />} />
        <Route path="/FruitDesigns" element={<FruitDesigns />} />
        <Route path="/GlutenFree" element={<GlutenFree />} />
        <Route path="/ShowcaseCakes" element={<ShowcaseCakes />} />
        <Route path="/BasketDesign" element={<BasketDesign />} />
        <Route path="/Chanut/:category" element={<Chanut />} />
      </Routes>
    </div>
  );
}

export default App;
