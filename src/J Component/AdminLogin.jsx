import { useState } from 'react';


const AdminLogin = () => {


    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const _hUserName = (e) => {
        setUserName(e.target.value);
    };
    const _hUserPassword = (e) => {
        setPassword(e.target.value);
    };

    const _handleSubmit = async (e) => {
        e.preventDefault();
        const loginResponse = await fetch(
          `http://127.0.0.1:3232/login/sitelogin`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: username,
              password: password,
              table:'admin'
            }),
          }
        )
          .then((response) => response.json())
          .catch((err) => {
            console.log(err.message);
            setUserName("");
            setPassword("");
          });
    
        
      };

    return (
        <div>

            <h1>Admin Login</h1>
           
            <form onSubmit={_handleSubmit}>
                <label>
                    Username:
                    <input
                        type='text'
                        name='username'
                        value={username}
                        onChange={_hUserName}
                    />
                </label>
                <br/>
                <label>
                    Password:
                    <input
                        type='password'
                        name='password'
                        value={password}
                        onChange={_hUserPassword}
                    />
                </label>
                <br/>
                <button type='submit'>Add Car</button>
            </form>
        
        </div>
    )
}

export default AdminLogin
