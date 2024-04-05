import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import { jwtDecode } from 'jwt-decode';
import NavbarFront from '../../NavbarFront';
import { Link } from 'react-router-dom';

const UserConnected = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Jeton récupéré:', token);

        if (!token) {
          console.error('Aucun jeton trouvé. Veuillez vous connecter.');
          setError('Aucun jeton trouvé. Veuillez vous connecter.');
          setLoading(false);
          return;
        }
        const decodedToken = jwtDecode(token);
        console.log('Contenu du jeton:', decodedToken);


        const response = await axios.get('http://localhost:5001/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data) {
          console.log('Réponse de l\'API:', response.data);
          if (response.data.user) {
            setUser(response.data.user);
          } else {
            console.error('Données utilisateur manquantes dans la réponse de l\'API');
            setError('Les données de profil de l\'utilisateur ne sont pas disponibles. Veuillez réessayer.');
          }
        } else {
          console.error('Réponse de l\'API vide ou non structurée correctement');
          setError('Les données de profil ne sont pas disponibles. Veuillez réessayer.');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des détails de l\'utilisateur:', error.response ? error.response.data : error.message);
        setError('Une erreur s\'est produite lors de la récupération des détails de l\'utilisateur.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    
    <section className="vh-100" style={{ backgroundColor: '#f4f5f7' }}>
      <NavbarFront/>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="6" className="mb-4 mb-lg-0">
            <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
              <MDBRow className="g-0">
                {user && (
                  <>
                    <MDBCol md="4" className="gradient-custom text-center text-white" style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                      <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp" alt="Avatar" className="my-5" style={{ width: '80px' }} fluid />
                      <MDBTypography tag="h5">{user.name}</MDBTypography>
                      <MDBCardText>{user.role}</MDBCardText>
                      <div className="mb-5">
  <Link to={`/profile/${user._id}`} className="align-middle">
    <i className="align-middle" data-feather="user-plus"></i> 
    <span className="align-middle">Edit Profile</span>
  </Link>
</div>
<div>
<Link to={`/changePass`} className="align-middle">
    <i className="align-middle" data-feather="user-plus"></i> 
    <span className="align-middle">Edit Password</span>
  </Link>
</div>

                    </MDBCol>
                    <MDBCol md="8">
                      <MDBCardBody className="p-4">
                        <MDBTypography tag="h6">Information</MDBTypography>
                        <hr className="mt-0 mb-4" />
                        <MDBCardText>Email: {user.email}</MDBCardText>
                        {user.adresse && <MDBCardText>Adresse: {user.adresse}</MDBCardText>}
                        {user.age && <MDBCardText>Âge: {user.age}</MDBCardText>}
                        {user.role && <MDBCardText>Rôle: {user.role}</MDBCardText>}
                        <div className="d-flex justify-content-start">
                          <a href="#!"><MDBIcon fab icon="facebook me-3" size="lg" /></a>
                          <a href="#!"><MDBIcon fab icon="twitter me-3" size="lg" /></a>
                          <a href="#!"><MDBIcon fab icon="instagram me-3" size="lg" /></a>
                        </div>
                      </MDBCardBody>
                    </MDBCol>
                  </>
                )}
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
};

export default UserConnected;
