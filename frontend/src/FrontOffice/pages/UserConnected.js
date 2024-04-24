import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';

const UserConnected = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/auth/users/${id}`, { withCredentials: true });
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des détails de l\'utilisateur :', error);
        setError('Une erreur s\'est produite lors de la récupération des détails de l\'utilisateur.');
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [id]);

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className="vh-100" style={{ backgroundColor: '#f4f5f7' }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="6" className="mb-4 mb-lg-0">
            <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
              <MDBRow className="g-0">
                <MDBCol md="4" className="gradient-custom text-center text-white" style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                  <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp" alt="Avatar" className="my-5" style={{ width: '80px' }} fluid />
                  <MDBTypography tag="h5">{user.name}</MDBTypography>
                  <MDBCardText>{user.role}</MDBCardText>
                  <MDBIcon far icon="edit mb-5" />
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody className="p-4">
                    <MDBTypography tag="h6">Information</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBCardText>Email: {user.email}</MDBCardText>
                    <MDBCardText>Adresse: {user.adresse}</MDBCardText>
                    <MDBCardText>Âge: {user.age}</MDBCardText>
                    <div className="d-flex justify-content-start">
                      <a href="#!"><MDBIcon fab icon="facebook me-3" size="lg" /></a>
                      <a href="#!"><MDBIcon fab icon="twitter me-3" size="lg" /></a>
                      <a href="#!"><MDBIcon fab icon="instagram me-3" size="lg" /></a>
                    </div>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
};

export default UserConnected;