import React, { useEffect, useState } from "react";
import { API_URL } from "../../constants";
import { getCookieValue } from "../../helpers/cookies";
import { COOKIE_JWT_TOKEN_NAME } from "../../constants";

export default function Profile() {
  const [isLoading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  var token = getCookieValue(COOKIE_JWT_TOKEN_NAME);

  useEffect(() => {
    async function fetchData() {
      var user = await fetch(API_URL + "/api/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }).then((data) => data.json());
      setEmail(user.email);
      setAddress(user.address);
      setLoading(false);
    }
    fetchData();
  });
  return (
    <div>
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <form className="">
          <div className="form-group">
            <label>Email</label>
            <input className="form-control" readOnly value={email} />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input className="form-control" readOnly value={address} />
          </div>
        </form>
      )}
    </div>
  );
}
