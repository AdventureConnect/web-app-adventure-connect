import React, {useState, useContext} from 'react';
import { RecoveryContext } from '../App';
import { useNavigate } from 'react-router';

const PasswordReset = () => {
    const [password, setPassword] = useState('');
    const { email } = useContext(RecoveryContext);
    const navigate = useNavigate();
  
    const changePassword = () => {
      if (password) {
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
  
    return (
      <div>
        <h2> Change Password </h2>
          <form>
            <label> New Password: </label>
            <input 
              type='password'
              placeholder='........'
              required=''
              value={password}
              onChange={(e) => setPassword(e.target.value)} />
            <button onClick={changePassword}>Reset passwod </button>
          </form>
      </div>
    );
}
export default PasswordReset;