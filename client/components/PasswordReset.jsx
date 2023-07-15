import React, {useState, useContext} from 'react';
import { RecoveryContext } from '../App';
import { useNavigate } from 'react-router';

const PasswordReset = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [mismatch, setMismatch] = useState(false);
    const { email } = useContext(RecoveryContext);
    const navigate = useNavigate();
  
    const changePassword = () => {

      if (password && !mismatch) {
        try {
            fetch(`http://localhost:8080/api/update-password`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
                },
            credentials: 'include',
            body: JSON.stringify({
                email: email,
                newPassword: password
            })  
        });
            navigate('/');
            return alert('Password changed successfully, please login!');
        } 
        catch (error) {
            console.log(error);
            return alert('Please enter your new Password');     
        }
   }}

   const checkPasswords = () => {
    setTimeout(() => {
      if (confirmPassword !== password) {
        setMismatch(true);
      } else {
        setMismatch(false);
      }
    }, 1000)
   }
  
    return (
      <div style={{display:'flex', flexDirection: 'column'}}>
        <h2> Change Password </h2>
          <form>
            <div>
              <label> New Password: </label>
              <input 
                type='password'
                required=''
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div>
              <label> Confirm Password: </label>
              <input 
                type='password'
                required=''
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onKeyUp={checkPasswords} />
            </div>
            <div>
              {mismatch && <label>The passwords don't match, please check again</label>}
            </div>
            <button className='btn' onClick={changePassword}>Reset passwod </button>
          </form>
      </div>
    );
}
export default PasswordReset;