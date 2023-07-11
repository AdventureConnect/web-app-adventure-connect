import React from "react";
import { useNavigate } from "react-router";

const AccountMgmt = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate("/account/password")
  }

  return (
    <>
      <h1>Account management</h1>
      <h4>Email</h4>
      <label htmlFor="email">Enter your email:</label>
      <br />
      <input type="email" name="email" id="email" />

      <h2>Change your password</h2>
      <p>If you change your password, you will automatically be signed out from your session.</p>
      <button type="submit" onClick={handleClick}>Change password</button>
    </>
  )
}

export default AccountMgmt;