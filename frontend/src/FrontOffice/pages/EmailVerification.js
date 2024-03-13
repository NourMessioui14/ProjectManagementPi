import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import emailjs from '@emailjs/browser';

function EmailVerification() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!email) {
        toast.error('Please fill in all the fields');
        return;
      }

      // Fetch data from your API
      const response = await axios.get(`http://localhost:5000/auth/${email}`);
      const responseData = response.data;

      // Extract data from the response
      const { name, email: emailFromResponse, Verification, id } = responseData;

      if (email === emailFromResponse) {
        // Prepare email data
        const emailData = {
          to_name: name,
          message: Verification,
          from_name: 'Team-Notify',
        };

        // Use EmailJS to send the email
        await emailjs.send('service_t20b3rv', 'template_ou1e3gd', emailData, 'Z14sqvbqFSCBB7Khq');

        toast.warn('We have sent you a 4-Digit Verification Number on your given Email');
        navigate(`/NewPassword/${id}`);
      } else {
        toast.error('This Email Does not Exist');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred. Please try again later.');
    }
  };

  return (
    <>
      <section className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2">
        <article className="writing-section flex justify-center items-center p-8 text-center"></article>
        <article className="form-section bg-gray-100 flex justify-center items-center p-4">
          <form action="/" className="bg-white p-6 w-96 rounded-lg" onSubmit={onSubmit}>
            <div className="my-4">
              <h1 className="text-blue-500 text-2xl text-center">Forget Password</h1>
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-3 py-2 border rounded"
                placeholder="Enter Your email"
                value={email}
                onChange={onEmailChange}
              />
            </div>
            <button type="submit" className="w-full bg-blue-500 p-2">
              Submit
            </button>
            <p className="text-center mt-8 italic">Don't have any Account?</p>
            <p className="text-center font-semibold mb-6 text-blue-500 italic">
              <Link to={'/Signup'}>SignUp</Link>
            </p>
            <p className="font-semibold mt-8 text-blue-500 italic">
              <Link to={'/Login'}>Back to Login</Link>
            </p>
          </form>
        </article>
      </section>
    </>
  );
}

export default EmailVerification;
