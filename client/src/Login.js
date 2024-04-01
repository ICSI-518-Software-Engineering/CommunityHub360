
import React, { useState, useContext } from 'react'; // Add useContext
import axios from 'axios';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './Auth_files/AuthProvider';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { logIn } = useContext(AuthContext);  // Extract logIn method from context
    // console.log(logIn)
    const navigate = useNavigate(); 
    const [welcomeStyle, setWelcomeStyle] = useState({});

    const handleWelcomeClick = () => {
        // This function will toggle the welcome message style
        setWelcomeStyle({
            color: welcomeStyle.color === 'black' ? '#333' : 'red', // Toggles color between red and default
            transform: welcomeStyle.transform ? '' : 'scale(1.1)', // Toggles scale effect
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const loginValues = { username, password };
      
        axios.get('http://localhost:9000/getUser', { params: loginValues })
          .then((res) => {
            const userData = res.data; // Assuming `res.data` contains the user data
            if(userData) {
                if (userData.role == "tenant" && userData.isAccepted == false){
                    alert('Admin authentication pending');
                    navigate('/login');
                    return
                }
              console.log(userData)
              alert('Login Successful');
              logIn(userData); // Pass the userData to the logIn function
              
                // Redirect user based on their role
                switch (userData.role) {
                  case 'admin':
                      navigate('/admin');
                      break;
                  case 'maintenance':
                      navigate('/maintenance');
                      break;
                  case 'tenant':
                      navigate('/tenant');
                      break;
                  case 'security':
                      navigate('/security');
                      break;
                  default:
                      navigate('/home'); // Or another appropriate default route
                      break;
              }
            } else {
              alert('Wrong Credentials');
            }
          })
          .catch((err) => {
            console.error('Error in Login', err);
            alert('Error in Login');
          });
      };

      return (
        <>
            <section className="vh-100 col-md-12 d-flex justify-content-center align-items-center">
                <div className="container h-custom">
                    <div className="row justify-content-center align-items-center h-100">
                        <div onClick={handleWelcomeClick}>
                        <div className="col-md-12 text-center">
                            <h1>Welcome to CommunityHub360</h1>
                        </div></div>
                        <div className="col-md-9 col-lg-6 col-xl-5">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                className="img-fluid" alt="Sample image" />
                        </div>
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <form>
                        {/* <!-- Email input --> */}
                        <div className="form-outline mb-4">
                        <input type="text" id="form3Example3" className="form-control form-control-lg"
                            placeholder="Enter a valid username" value={username} onChange={ (e) => {setUsername(e.target.value);}} />
                        
                        </div>
            
                        {/* <!-- Password input --> */}
                        <div className="form-outline mb-3">
                        <input type="password" id="form3Example4" className="form-control form-control-lg" 
                            placeholder="Enter password" value={password} onChange={(e) => { setPassword(e.target.value);}}/>
                
                        </div>
            
                        <div className="text-center text-lg-start mt-4 pt-2">
                        <button type="button" className="btn btn-primary btn-lg"
                             onClick={handleSubmit}>Login</button>
                        <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="/signup"
                            className="link-danger">Register</a></p>
                        </div>
            
                    </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
    
};