import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import PrivateRoute from './PrivateRoute'; 
import Dashboard from '../pages/Dashboard';
import Products from '../pages/Products';
import Sales from '../pages/Sales';
import Purchases from '../pages/Purchases';
import Firms from '../pages/Firms';
import Categories from '../pages/Categories';
import Brands from '../pages/Brands';
import NavBar from '../components/layout/NavBar';
import Profile from '../pages/Profile';
import MapView from '../components/layout/MapView';

import NotFound from '../pages/NotFound';

// const API_KEY = "wfhBOAN6ISjmiwdHZBhVvc7m9CCJSDbnihc7BvPQwWI";
function AppRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/stock/*" element={<PrivateRoute />}>
          <Route path="" element={<NavBar />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="sales" element={<Sales />} />
            <Route path="purchases" element={<Purchases />} />
            <Route path="firms" element={<Firms />} />
            <Route path="map/id" element={<MapView />} />
            <Route path="categories" element={<Categories />} />
            <Route path="brands" element={<Brands />} />
            <Route path="profile" element={<Profile />} />

            <Route path="*" element={<NotFound />} />

          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default AppRouter;
