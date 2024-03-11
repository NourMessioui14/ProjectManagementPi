import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, AlertIcon } from '@chakra-ui/react';
import { Select } from '@chakra-ui/react';

const RegisterForm = () => {
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const [registerForm, setRegisterForm] = useState({
    name: '',
    adresse: '',
    age: new Date(),
    email: '',
    password: '',
    role: '',
  });
  const resetForm = () => {
    setRegisterForm({
      name: '',
      adresse: '',
      age: new Date(),
      email: '',
      password: '',
      role: '',
    });
  };



  const navigate = useNavigate(); 
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);

  const onChange = (e) => {
    setRegisterForm({
      ...registerForm,
      
      [e.target.name]: e.target.value,
    });
  };
  
  
  const handleSignUp = async (e) => {
    e.preventDefault();
      const ageAsNumber = parseInt(registerForm.age, 10);

  
    try {
      const response = await fetch('http://localhost:5000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerForm),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error during signup:', errorData.message);
      } else {
        const responseData = await response.json();
        console.log('Signup successful! Token received:', responseData.token);
  
        localStorage.setItem('token', responseData.token);
        setIsSignUpSuccess(true);
        setSuccessMessage('You signed up to our application. Now you can sign in.');
        resetForm();
      }
    } catch (error) {
      console.error('Error during signup request:', error);
    }
  };
  
  

  const handleSignIn = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginForm),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error during login:', errorData.message);
      } else {
        const responseData = await response.json();
        console.log('Login successful! Received token:', responseData.token);
        console.log('Role:', responseData.role);
  
        // Log pour indiquer que le code atteint ce point
        console.log('Before redirection');
  
        if (responseData.role === 'admin') {
          try {
            navigate('/backoffice');
            console.log('After navigating to /backoffice');
          } catch (error) {
            console.error('Error during navigation:', error);
          }
        } else {
          try {
            navigate('/dashboard');
            console.log('After navigating to /dashboard');
          } catch (error) {
            console.error('Error during navigation:', error);
          }
        }
      }
    } catch (error) {
      console.error('Error during login request:', error);
    }
  };
  
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };


  useEffect(() => {
    const sign_in_btn = document.querySelector("#sign-in-btn");
    const sign_up_btn = document.querySelector("#sign-up-btn");
    const container = document.querySelector(".container");

    const handleSignUpClick = () => {
      container.classList.add("sign-up-mode");
    };

    const handleSignInClick = () => {
      container.classList.remove("sign-up-mode");
    };

    sign_up_btn.addEventListener("click", handleSignUpClick);
    sign_in_btn.addEventListener("click", handleSignInClick);

    return () => {
      sign_up_btn.removeEventListener("click", handleSignUpClick);
      sign_in_btn.removeEventListener("click", handleSignInClick);
    };
  }, []); 

  return (
    <div className="container">
      <div className="forms-container">
        <div className="signin-signup">
          {/* Sign in Form */}
          <form onSubmit={handleSignIn} className="sign-in-form">
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Email"
                name="email"
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
              />
            </div>
            <input type="submit" value="Login" className="btn solid" />
            <p className="social-text">Or Sign in with social platforms</p>
            <div className="social-media">
              <a href="#" className="social-icon">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-google"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </form>


{/* Sign up Form */}
<form onSubmit={handleSignUp} className="sign-up-form">
  <h2 className="title">Sign up</h2>
  <div className="input-field">
    <i className="fas fa-user"></i>
    <input
      type="text"
      placeholder="Username"
      name="name"
      value={registerForm.name}
      onChange={onChange}
    />
  </div>
  <div className="input-field">
    <i className="fas fa-envelope"></i>
    <input
      type="email"
      placeholder="Email"
      name="email"
      value={registerForm.email}
      onChange={onChange}
    />
  </div>
  <div className="input-field">
    <i className="fas fa-lock"></i>
    <input
      type="password"
      placeholder="Password"
      name="password"
      value={registerForm.password}
      onChange={onChange}
    />
  </div>
  <div className="input-field">
    <i className="fas fa-map-marker-alt"></i>
    <input
      type="text"
      placeholder="Address"
      name="adresse"
      value={registerForm.adresse}
      onChange={onChange}
    />
  </div>
  
<div className="input-field" style={{ display: 'flex', alignItems: 'center' }}>
  <i className="fas fa-calendar"></i>
  <input
    type="number" 
    placeholder='Age'
    name="age"
    value={registerForm.age}
    onChange={(e) => setRegisterForm({ ...registerForm, age: parseInt(e.target.value, 10) })}
    style={{ marginLeft: '8px' }}
  />
</div>

<div className="input-field">
  <i className="fas fa-cogs"></i>
  <Select
    name="role"
    value={registerForm.role}
    onChange={onChange}
    placeholder="Select a role"
  >
    <option value="admin">Admin</option>
    <option value="scrum_master">Scrum Master</option>
    <option value="product_owner">Product Owner</option>
    <option value="simple_user">Simple User</option>
  </Select>
</div>

  {/* Ajoutez d'autres champs au besoin */}
  <input type="submit" className="btn" value="Sign up" />
  <p className="social-text">Or Sign up with social platforms</p>
  <div className="social-media">
    <a href="#" className="social-icon">
      <i className="fab fa-facebook-f"></i>
    </a>
    <a href="#" className="social-icon">
      <i className="fab fa-twitter"></i>
    </a>
    <a href="#" className="social-icon">
      <i className="fab fa-google"></i>
    </a>
    <a href="#" className="social-icon">
      <i className="fab fa-linkedin-in"></i>
    </a>
  </div>
</form>
{isSignUpSuccess && (
        <Alert status='success' variant='solid'>
          <AlertIcon />
          {successMessage}
        </Alert>
      )}


        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>You don't have an account?</h3>
            <p>
              Sign up to our application and start managing your projects!
          </p>
            <button className="btn transparent" id="sign-up-btn">
              Sign up
            </button>
          </div>
          <img src="/signup/img/log.svg" className="image" alt="" />
        </div>

        <div className="panel right-panel">
          <div className="content">
            <h3>You have an account?</h3>
            <p>
              Enter your personal details and start journey with us!
            </p>
            <button className="btn transparent" id="sign-in-btn">
              Sign in
            </button>
          </div>
          <img src="/signup/img/register.svg" className="image" alt="" />
        </div>
      </div>
    </div>
  );
};


export default RegisterForm;
