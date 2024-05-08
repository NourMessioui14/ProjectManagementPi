import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, AlertIcon } from '@chakra-ui/react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalWrapperChat';
import UserList from '../../Backoffice/pages/UserList';
import {MDBIcon } from 'mdb-react-ui-kit';


const RegisterForm = () => {






 const{getUserIDByToken} = useContext(GlobalContext);


 const [loginData, setLoginData] = useState({}); // État pour stocker les données de connexion des utilisateurs




  const navigate = useNavigate(); 


  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });


  const [registerForm, setRegisterForm] = useState({
    name: '',
    adresse: '',
    age: '',
    email: '',
    password: '',
    role: '',
  });
  
  const resetForm = () => {
    setRegisterForm({
      name: '',
      adresse: '',
      age: '',
      email: '',
      password: '',
      role: '',
    });
  };


  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);


  useEffect(() => {
    const sign_in_btn = document.querySelector("#sign-in-btn");
    const sign_up_btn = document.querySelector("#sign-up-btn");
    const container_sig = document.querySelector(".container_sig");


    const handleSignUpClick = () => {
      container_sig.classList.add("sign-up-mode");
    };


    const handleSignInClick = () => {
      container_sig.classList.remove("sign-up-mode");
    };


    sign_up_btn.addEventListener("click", handleSignUpClick);
    sign_in_btn.addEventListener("click", handleSignInClick);


    return () => {
      sign_up_btn.removeEventListener("click", handleSignUpClick);
      sign_in_btn.removeEventListener("click", handleSignInClick);
    };
  }, []); 


  const handleSignUp = async (values) => {
    try {
      const response = await fetch('https://nestjspi.onrender.com/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
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
  
  const handleSignIn = async (values) => {
    try {
      const response = await fetch('https://nestjspi.onrender.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error during login:', errorData.message || 'Failed to sign in. Please try again later.');
      } else {
        const responseData = await response.json();
        console.log('Login successful! Received token:', responseData.token);
        console.log('Role:', responseData.role);


        setLoginData(prevData => ({
          ...prevData,
          [values.email]: (prevData[values.email] || 0) + 1,
        }));
        console.log('Login Data:', loginData); // Afficher les données de connexion de l'utilisateur






       getUserIDByToken(responseData.token);
  
        localStorage.setItem('token', responseData.token);
  
        // Ajoutez des conditions pour chaque type de rôle ici
        if (responseData.role === 'admin') {
          localStorage.setItem('role', responseData.role); 
          navigate('/backoffice');
        } else {
          // Rediriger les utilisateurs simple_user vers /home
          navigate('/cardproject'); 
        }
      }
    } catch (error) {
      console.error('Error during login request:', error);
    }
  };
  


  return (
    <div className="container_sig">
      <div className="forms-container_sig">
        <div className="signin-signup">
          {/* Sign in Form */}
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string().email('Invalid email format').required('Email is required'),
              password: Yup.string().required('Password is required'),
            })}
            onSubmit={(values) => {
              handleSignIn(values);
            }}
          >
            {({ errors, touched }) => (
              <Form className="sign-in-form">
                <h2 className="title">Sign in</h2>
                <div className="input-field">
                  <i className="fas fa-user"></i>
                  <Field
                    type="text"
                    placeholder="Email"
                    name="email"
                    className={`${errors.email && touched.email ? 'input-error' : ''}`}
                  />
                  <ErrorMessage name="email">
                    {(msg) => <div className="error-message">{msg}</div>}
                  </ErrorMessage>
                </div>
                <div className="input-field">
                  <i className="fas fa-lock"></i>
                  <Field
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    name="password"
                    className={`${errors.password && touched.password ? 'input-error' : ''}`}
                  />
                  <i
                    className={`${showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'} password-icon`}
                    onClick={() => setShowPassword(!showPassword)}
                  ></i>
                  <ErrorMessage name="password">
                    {(msg) => <div className="error-message">{msg}</div>}
                  </ErrorMessage>
                </div>
                <button type="submit" className="btn btn-primary buttonSH" style={{ width: '125px', height: '30px' }}>
  <span class="buttonSH-content" style={{ width: '100%', height: '60%' }}>
    <MDBIcon icon="user-edit" className="me-2" />
   Login
  </span>
</button>

                <a href="/forgetPassword" className="forgot-password-link">Forgot password?</a> 
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
              </Form>
            )}
          </Formik>


          {/* Sign up Form */}
          <Formik
            initialValues={{
              name: '',
              adresse: '',
              age: '',
              email: '',
              password: '',
              role: '',
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string().required('Name is required'),
              adresse: Yup.string().required('Address is required'),
              age: Yup.number().required('Age is required'),
              email: Yup.string().email('Invalid email format').required('Email is required'),
              password: Yup.string().required('Password is required'),
              role: Yup.string().required('Role is required'),
            })}
            onSubmit={(values) => {
              handleSignUp(values);
            }}
          >
            {({ errors, touched }) => (
              <Form className="sign-up-form">
                <h2 className="title">Sign up</h2>
                <div className="input-field">
  <i className="fas fa-user"></i>
  <Field
    type="text"
    placeholder="Username"
    name="name"
    className={`form-control ${errors.name && touched.name ? 'is-invalid' : ''}`}
  />
  <ErrorMessage name="name">
    {(msg) => <div className="error-message">{msg}</div>}
  </ErrorMessage>
</div>
                <div className="input-field">
                  <i className="fas fa-envelope"></i>
                  <Field
                    type="email"
                    placeholder="Email"
                    name="email"
                    className={`${errors.email && touched.email ? 'input-error' : ''}`} />
                  <ErrorMessage name="email">
                    {(msg) => <div className="error-message">{msg}</div>}
                  </ErrorMessage>
                </div>
                <div className="input-field">
                  <i className="fas fa-lock"></i>
                  <Field
                    type="password"
                    placeholder="Password"
                    name="password"
                    className={`${errors.password && touched.password ? 'input-error' : ''}`}
                  />
                  <ErrorMessage name="password">
                    {(msg) => <div className="error-message">{msg}</div>}
                  </ErrorMessage>
                </div>
                <div className="input-field">
                  <i className="fas fa-map-marker-alt"></i>
                  <Field
                    type="text"
                    placeholder="Address"
                    name="adresse"
                    className={`${errors.adresse && touched.adresse ? 'input-error' : ''}`}
                  />
                  <ErrorMessage name="adresse">
                    {(msg) => <div className="error-message">{msg}</div>}
                  </ErrorMessage>
                </div>
                <div className="input-field" style={{ display: 'flex', alignItems: 'center' }}>
                  <i className="fas fa-calendar"></i>
                  <Field
                    type="number" 
                    placeholder="Age"
                    name="age"
                    className={`${errors.age && touched.age ? 'input-error' : ''}`}
                  />
                  <ErrorMessage name="age">
                    {(msg) => <div className="error-message">{msg}</div>}
                  </ErrorMessage>
                </div>
                <div className="input-field">
                  <i className="fas fa-cogs"></i>
                  <Field as="select" name="role" className={`${errors.role && touched.role ? 'input-error' : ''}`}>
                    <option value="">Select a role</option>
                    <option value="admin">Admin</option>
                    <option value="scrum_master">Scrum Master</option>
                    <option value="product_owner">Product Owner</option>
                    <option value="simple_user">Simple User</option>
                  </Field>
                  <ErrorMessage name="role">
                    {(msg) => <div className="error-message">{msg}</div>}
                  </ErrorMessage>
                </div>
                <button type="submit" className="btn">Sign up</button>
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
              </Form>
            )}
          </Formik>


          {isSignUpSuccess && (
            <Alert status='success' variant='solid'>
              <AlertIcon />
              {successMessage}
            </Alert>
          )}
        </div>
      </div>
      <div className="panels-container_sig">
        <div className="panel left-panel">
          <div className="content">
            <h3>You don't have an account?</h3>
            <p>Sign up to our application and start managing your projects!</p>
            <button className="btn transparent" id="sign-up-btn">Sign up</button>
          </div>
          <img src="/signup/img/log.svg" className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>You have an account?</h3>
            <p>Enter your personal details and start journey with us!</p>
            <button className="btn transparent" id="sign-in-btn">Sign in</button>
          </div>
          <img src="/signup/img/register.svg" className="image" alt="" />
        </div>
      </div>
    </div>
  );
};


export default RegisterForm;
