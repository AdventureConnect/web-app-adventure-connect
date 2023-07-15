import React, { useState, useContext, useEffect } from 'react';
import { RecoveryContext } from '../App';
import { useNavigate } from 'react-router';


const OTP = () => {
  const { email, otp } = useContext(RecoveryContext);
  const [ OTPinput , setOTPinput] = useState('');
  const navigate = useNavigate();

  const verifyOTP = () => {
    if (parseInt(OTPinput) === otp) {
      navigate('/passwordreset')
    } else {
      alert('The code you have entered is not correct, try again re-send the link');
    }
  }
  return (
    <div>
      <h3>Email Verification</h3>
      <p>We have sent a verification code to your email.</p>
      <form>
         <input type='text' value={OTPinput} onChange={(e) => { setOTPinput(e.target.value) }} /> 
          <button onClick={() => verifyOTP()}>Verify Account</button> 
          <a onClick={() => resendOTP()} > Didn't receive code? 
            {/* {disable ? `Resend OTP in ${timerCount}s` : ' Resend OTP'} */}
          </a> 
      </form>
    </div>
  );}

export default OTP;