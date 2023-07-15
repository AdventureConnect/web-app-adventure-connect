import React from "react";

const ChangePassword = () => {

  return (
    <>
      <h1>Change Your Password</h1>
      <p>Password must be at least 6 characters including one special chracter</p>
      <label htmlFor="Current Password"></label>
      <input type="text" name="currentPassword" id="currentPassword" />
      <label htmlFor="New Password"></label>
      <input type="text" name="newPassword" id="newPassword" />
      <label htmlFor="Confirm New Password"></label>
      <input type="text" name="confirmPassword" id="confirmPassword" />

      <input type="submit" value="Submit" />
    </>
  )
}

export default ChangePassword;