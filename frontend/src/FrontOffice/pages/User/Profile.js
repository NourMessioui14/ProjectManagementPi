import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { ChakraProvider, Container, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import { Link as ChakraLink } from '@chakra-ui/react';

// Import du composant NavbarFront
import NavbarFront from '../../NavbarFront';

// CSS Styles
const styles = `
body {
    margin: 0;
    padding-top: 120px; /* Ajustez cette valeur pour donner de l'espace au Navbar */
    color: #2e323c;
    background: #f5f6fa;
    position: relative;
    height: 100%;
}

.account-settings .user-profile {
    margin: 0 0 1rem 0;
    padding-bottom: 1rem;
    text-align: center;
}
.account-settings .user-profile .user-avatar {
    margin: auto; /* Centrez horizontalement */
    display: flex;
    align-items: center; /* Centrez verticalement */
    justify-content: center; /* Centrez horizontalement */
}
.account-settings .user-profile .user-avatar img {
    width: 90px;
    height: 90px;
    -webkit-border-radius: 100px;
    -moz-border-radius: 100px;
    border-radius: 100px;
}
.account-settings .user-profile h5.user-name {
    margin: 0 0 0.5rem 0;
}
.account-settings .user-profile h6.user-email {
    margin: 0;
    font-size: 0.8rem;
    font-weight: 400;
    color: #9fa8b9;
}
.account-settings .about {
    margin: 2rem 0 0 0;
    text-align: center;
}
.account-settings .about h5 {
    margin: 0 0 15px 0;
    color: #007ae1;
}
.account-settings .about p {
    font-size: 0.825rem;
}
.form-control {
    border: 1px solid #cfd1d8;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
    font-size: .825rem;
    background: #ffffff;
    color: #2e323c;
}

.card {
    background: #ffffff;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    border: 0;
    margin-bottom: 1rem;
}

.container {
    margin-top: 160px; /* Ajustez cette valeur pour déplacer le formulaire plus bas */
}
`;

function Profile() {
  const { id } = useParams();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    adresse: '',
    age: '',
    role: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/auth/user/${id}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:5001/auth/users/update/${id}`, userData);
      alert('User updated successfully!');
    } catch (error) {
      console.error('Server error:', error.response.data);
      alert('An error occurred while updating user. Check console for details.');
    }
  };

  const handleCancel = () => {
    // Revert changes or navigate back
  };

  return (
    <div>
      {/* NavbarFront placé en haut de la page avec classe navbar-fixed */}
      <NavbarFront className="navbar-fixed" />

      <style>{styles}</style> {/* Include CSS Styles */}

      <div className='container'>
        <div className='row gutters'>
          <div className='col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12 mx-auto text-center'> {/* Ajoutez la classe text-center et mx-auto */}
            <div className='card h-100'>
              <div className='card-body'>
                <div className='account-settings'>
                  <div className='user-profile'>
                    <div className='user-avatar'>
                      <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Maxwell Admin" />
                    </div>
                    <h5 className='user-name'>{userData.name}</h5>
                    <h6 className='user-email'>{userData.email}</h6>
                  </div>
                  <div className='about'>
                    <h5>About</h5>
                    <p>{userData.about}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12'>
            <div className='card h-100'>
              <div className='card-body'>
                <div className='row gutters'>
                  <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'>
                    <h6 className='mb-2 text-primary'>Personal Details</h6>
                  </div>
                  <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'>
                    <FormControl>
                      <FormLabel htmlFor='fullName'>Full Name</FormLabel>
                      <Input type='text' className='form-control' id='fullName' value={userData.name} onChange={handleChange} name='name' />
                    </FormControl>
                  </div>
                  <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'>
                    <FormControl>
                      <FormLabel htmlFor='eMail'>Email</FormLabel>
                      <Input type='email' className='form-control' id='eMail' value={userData.email} onChange={handleChange} name='email' />
                    </FormControl>
                  </div>
                  <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'>
                    <FormControl>
                      <FormLabel htmlFor='adresse'>Adresse</FormLabel>
                      <Input type='text' className='form-control' id='adresse' value={userData.adresse} onChange={handleChange} name='adresse' />
                    </FormControl>
                  </div>
                  <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'>
                    <FormControl>
                      <FormLabel htmlFor='age'>Age</FormLabel>
                      <Input type='number' className='form-control' id='age' value={userData.age} onChange={handleChange} name='age' />
                    </FormControl>
                  </div>
                  <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'>
                    <FormControl>
                      <FormLabel htmlFor='role'>Role</FormLabel>
                      <Input type='text' className='form-control' id='role' value={userData.role} onChange={handleChange} name='role' />
                    </FormControl>
                  </div>
                  <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'>
                    <Button colorScheme="blue" onClick={handleSubmit}>Update</Button>
                    <ChakraLink as={Link} to="/userconnected" color="teal.500" _hover={{ color: 'teal.700', textDecoration: 'underline' }}>
                      Retour
                    </ChakraLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
