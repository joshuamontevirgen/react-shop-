import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Login from "./components/authentication/Login";
import Registration from "./components/authentication/Registration";
import Profile from "./components/user/profile/index";
import { Index as Catalog } from "./components/catalog/index";
import { Index as Checkout } from "./components/checkout/Index";
import { CheckoutResult } from "./components/checkout/CheckoutResult";
import { Order } from "./components/user/orders/Order";
import { useAuth } from "./components/authentication/useAuth";

export function AppRoutes() {
  const [isAuthLoading, isAuthenticated] = useAuth();
  const PrivateRoute = () => {
    if (isAuthLoading) return null;
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
  };

  return (
    <Routes>
      <Route exact path="/home" element={<Catalog />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/register" element={<Registration />} />

      <Route exact path="/order/:id" element={<PrivateRoute />}>
        <Route exact path="/order/:id" element={<Order />} />
      </Route>

      <Route exact path="/checkout" element={<PrivateRoute />}>
        <Route exact path="/checkout" element={<Checkout />} />
      </Route>
      <Route exact path="/checkoutresult" element={<PrivateRoute />}>
        <Route exact path="/checkoutresult" element={<CheckoutResult />} />
      </Route>
      <Route exact path="/profile" element={<PrivateRoute />}>
        <Route exact path="/profile" element={<Profile />} />
      </Route>
      <Route exact path="/catalog/" element={<Catalog />}>
        <Route exact path=":category/:subcategory" element={<Catalog />} />
        <Route path=":category" element={<Catalog />} />
      </Route>
    </Routes>
  );
}

//https://www.digitalocean.com/community/tutorials/how-to-handle-routing-in-react-apps-with-react-router
//https://www.nicknish.co/blog/react-router-authenticated-routes
//privateroute - https://stackoverflow.com/questions/69864165/error-privateroute-is-not-a-route-component-all-component-children-of-rou
//https://dev.to/iamandrewluca/private-route-in-react-router-v6-lg5
