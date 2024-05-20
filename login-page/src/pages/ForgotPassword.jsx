import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/ForgotPassword.css';
import { TbEyeClosed, TbEyeUp } from "react-icons/tb";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordAndOTP, setShowPasswordAndOTP] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!showPasswordAndOTP) {
            const userData = { username };
            setIsButtonDisabled(true);
            try {
                const response = await axios.post('http://localhost:8080/user/forgot-password', userData); 
                if (response.status === 200) {
                    setShowPasswordAndOTP(true);
                    setIsButtonDisabled(false);
                } else {
                    console.error('Request failed:', response.statusText);
                    alert('Request failed. Please check your credentials and try again.');
                }
            } catch (error) {
                console.error('Error:', error.message);
                if (error.response && error.response.data && error.response.data.message) {
                    alert(error.response.data.message);
                } else {
                    alert('An error occurred while processing your request.');
                }
            }
        } else {
            const updateData = {
                username,
                otp,
                password,
            };

            try {
                const response = await axios.post('http://localhost:8080/user/verify-forgot-password', updateData);

                if (response.status === 200) {
                    navigate('/Login');
                } else {
                    console.error('Request failed:', response.statusText);
                    alert('Request failed. Please check your credentials and try again.');
                }
            } catch (error) {
                console.error('Error:', error.message);
                if (error.response && error.response.data && error.response.data.message) {
                    alert(error.response.data.message);
                } else {
                    alert('An error occurred while processing your request.');
                }
            }
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword); 
    };

    return (
        <div className="wrapper">
            <div className="form-box-login">
                <form onSubmit={handleSubmit}>
                    <h1>Forgot Password</h1>
                    <div className="input-box">
                        <label>Username</label>
                        <input type="text" required onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    {showPasswordAndOTP && (
                        <>
                            <div className="input-box">
                                <label>OTP</label>
                                <input type="text" required onChange={(e) => setOtp(e.target.value)} />
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
                        </>
                    )}
                    <button 
                        type="submit" 
                        disabled={isButtonDisabled}
                        className={isButtonDisabled ? 'button-disabled' : 'button-enabled'}
                    >
                        {showPasswordAndOTP ? 'Change Password' : 'Check Username'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
