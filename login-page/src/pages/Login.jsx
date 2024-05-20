import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../styles/Login.css';
import { FaUser } from "react-icons/fa";
import { TbEyeClosed, TbEyeUp } from "react-icons/tb";
const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        
        const userData = {
            username: username,
            password: password
        };

        try {
            const response = await axios.post('http://localhost:8080/user/login', userData);
            if (response.status === 200) {
                const token = response.headers.get('jwt-token')
                localStorage.setItem('token', token)
                navigate('/cs-slip-admin')
            } else {
                console.error('Login failed:', response.statusText);
                alert('Login failed. Please check your credentials and try again.');
            }
        } catch (error) {
            console.error('Error:', error.message);
            if (error.response && error.response.data && error.response.data.message) {
                alert(error.response.data.message);
            } else {
                alert('An error occurred while processing your request.');
            }
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="wrapper">
            <div className="form-box-login">
                <form onSubmit={handleLogin}>
                    <h1>Login</h1>
                    <div className="input-box">
                        <label>Username</label>
                        <input type="text" required onChange={(e) => setUsername(e.target.value)} />
                        <FaUser className="icon" />  
                    </div>
                    <div className="input-box">
                        <label>Password</label>
                        <input type={showPassword ? "text" : "password"} required onChange={(e) => setPassword(e.target.value)} />
                        {showPassword ? (
                            <TbEyeUp className="icon" onClick={togglePasswordVisibility} />
                        ) : (
                            <TbEyeClosed className="icon" onClick={togglePasswordVisibility} />
                        )}
                    </div> 
                    <div className="forgot-password">
                        <a href="/password">Forgot password?</a>
                    </div>
                    <button type="submit">Login</button>
                    <div className="register-link">
                        <p>Don't have an Account?<a href="create-account">Click here</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
