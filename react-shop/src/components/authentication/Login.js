import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useAppContext } from "../../lib/contextLib";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../../helpers/cookies";
import { COOKIE_JWT_TOKEN_NAME, API_URL } from "../../constants";
import {
  setAuthenticated,
  setUsername,
  setJwtToken,
} from "./authenticationSlice";

//todo -  refresh, access token
//https://stackoverflow.com/questions/27067251/where-to-store-jwt-in-browser-how-to-protect-against-csrf?rq=1
//https://dev.to/cotter/localstorage-vs-cookies-all-you-need-to-know-about-storing-jwt-tokens-securely-in-the-front-end-15id

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const user = await loginUser({ Email: email, Password: password });
    if (user.token) {
      dispatch(setAuthenticated(true));
      dispatch(setUsername(email));
      dispatch(setJwtToken(user.token));
      localStorage.setItem("email", email);
      document.cookie = setCookie(COOKIE_JWT_TOKEN_NAME, user.token, 5);
      navigate("/");
    } else {
      alert("wrong username/password");
    }
  };

  async function loginUser(credentials) {
    return fetch(API_URL + "/api/authentication", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }).then((data) => data.json());
  }

  return (
    <div className="Login">
      <Form onSubmit={handleLogin}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            autoFocus
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" disabled={!validateForm()}>
          Login
        </Button>
      </Form>
    </div>
  );
}
