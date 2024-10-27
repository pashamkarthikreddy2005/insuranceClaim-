import React from 'react';
import { 
  BrowserRouter as Router,
  Route, 
  Routes 
} from 'react-router-dom';

import Navbar from './components/general/Navbar';
import Home from './components/general/Home';
import NewClaim from './components/general/NewClaim';
import Policy from './components/general/Policy';
import MyClaims from './components/general/MyClaims';
import HealthForm from './components/claim-types/HealthForm';
import ClaimDesc from './components/general/ClaimDesc';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import CarForm from './components/claim-types/CarForm';
import LifeForm from './components/claim-types/LifeForm';
import BikeForm from './components/claim-types/BikeForm';
import How from './components/general/How';
import Agenthome from './components/general/Agenthome';
import AllClaims from './components/general/AllClaims';
import Update from './components/general/Update';
import Approved from './components/general/Approved';
import Rejected from './components/general/Rejected';
import Pending from './components/general/Pending';
import AgentHome from './components/general/Agenthome';
import RegisterAgent from './components/auth/RegisterAgent';
import MainHome from './components/auth/Mainhome';
import AllAgents from './components/general/AllAgents';
import AllUsers from './components/general/AllUsers';
import HomeClaim from './components/claim-types/HomeClaim';
import Analysis from './components/general/Analysis';

function App() {
  
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/new-claim" element={<NewClaim />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/my-claims" element={<MyClaims />} />
        <Route path="/new-claim/car-claim" element={<CarForm />} />
        <Route path="/new-claim/life-claim" element={<LifeForm />} />
        <Route path="/new-claim/health-claim" element={<HealthForm />} />
        <Route path="/new-claim/bike-claim" element={<BikeForm />} />
        <Route path="/new-claim/home-claim" element={<HomeClaim />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/new-claim/our" element={<How />} />
        <Route path="/my-claims/:claimId/:claimType" element={<ClaimDesc />} />
        <Route path="/Agenthome" element={<Agenthome />} />
        <Route path="/all-claims" element={<AllClaims />} />
        <Route path="/admin/claim/:claimId/:claimType" element={<Update />} />
        <Route path="/approved" element={<Approved />} />
        <Route path="/pending" element={<Pending />} />
        <Route path="/rejected" element={<Rejected />} />
        <Route path="/adminHome" element={<AgentHome />} />
        <Route path="/admin-register" element={<RegisterAgent />} />
        <Route path="/Organizationhome" element={<MainHome />} />
        <Route path="/all-agents" element={<AllAgents />} />
        <Route path="/all-users" element={<AllUsers />} />
        <Route path="/analysis" element={<Analysis />} />
      </Routes>
    </Router>
  );
}

export default App;
