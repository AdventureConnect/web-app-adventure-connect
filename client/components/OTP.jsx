import React, { useState, useContext, useEffect } from 'react';
// import { RecoveryContext } from '../App';
import { useNavigate } from 'react-router';

const OTP = () => {
  const { email, otp } = useContext(RecoveryContext);
  const [ OTPinput , setOTPinput] = useState('');
  const [disable, setDisable] = useState(true);
  const [timerCount, setTimer] = useState(60);
  const navigate = useNavigate();

  const verifyOTP = () => {
    if (parseInt(OTPinput) === otp) {
      navigate('/passwordreset')
    } else {
      alert('The code you have entered is not correct, please try again.');
    }
  }

//function to resend OTP 
const resendOTP = async () => {
    if (disable) return;
    try {
        await fetch(`http://localhost:8080/api/send_email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
            },
          credentials: 'include',
          body: JSON.stringify({
              OTP: otp,
              recipient_email: email
          })
        });
        setDisable(true)
        alert("A new OTP has succesfully been sent to your email.")
        setTimer(60)
      }
      catch (err) {
        console.log(response.data.message);
      }
    }
    
  useEffect(() => {
    let interval = setInterval(() => {
      setTimer(lastTimerCount => {
        lastTimerCount <= 1 && clearInterval(interval);
        if (lastTimerCount <= 1) setDisable(false);
        return lastTimerCount - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [disable]);

  return (
    <div className="container">
      <h3>Email Verification</h3>
      <p>We have sent a verification code to your email.</p>
      <form>
         <input type="text" className="verification-input" value={OTPinput} onChange={(e) => { setOTPinput(e.target.value) }} /> 
          <button className="verify-code" onClick={() => verifyOTP()}>Verify Account</button>
                
          <a className="resend-otp" onClick={() => resendOTP()} > Didn't receive code? 
            {disable ? ` Resend OTP in ${timerCount}s` : " Resend OTP"}
          </a>
             
      </form>
    </div>
  );
}

export default OTP;