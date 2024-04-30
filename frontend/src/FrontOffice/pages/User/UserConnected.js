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
  const [photoPreview, setPhotoPreview] = useState(null);

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
  
        if (response.data && response.data.user) {
          console.log('Réponse de l\'API:', response.data);
          setUser(response.data.user);
          // Vérifier si l'utilisateur a une photo de profil et la stocker dans le localStorage
          if (response.data.user.profilePhoto) {
            setPhotoPreview(response.data.user.profilePhoto);
            // Stocker l'URL de la photo de profil dans le localStorage
            localStorage.setItem('profilePhoto', response.data.user.profilePhoto);
          }
        } else {
          console.error('Données utilisateur manquantes dans la réponse de l\'API');
          setError('Les données de profil de l\'utilisateur ne sont pas disponibles. Veuillez réessayer.');
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
  
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setPhotoPreview(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append('file', file);

    axios.post('http://localhost:5001/auth/upload', formData)
      .then(response => {
        console.log('Fichier téléchargé avec succès:', response.data);
        // Stocker l'URL de la photo de profil dans le localStorage
        localStorage.setItem('profilePhoto', response.data.photoUrl);
      })
      .catch(error => {
        console.error('Erreur lors du téléchargement du fichier:', error.response ? error.response.data : error.message);
      });
  };

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className="vh-100" style={{ backgroundColor: '#f4f5f7' }}>
      <NavbarFront />
      <MDBContainer className="py-5 h-100 bg-white rounded-xl shadow">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="6" className="mb-4 mb-lg-0">
            <MDBCard className="mb-3" style={{ borderRadius: '.5rem', boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)' }}>
              <MDBRow className="g-0">
                {user && (
                  <>
                    <MDBCol md="4" className="gradient-custom text-center text-white" style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem', background: 'linear-gradient(45deg, #1cb5e0, #000851)' }}>
                      {photoPreview ? (
                        <img src={photoPreview} alt="Profile" className="my-5 rounded-circle border border-light" style={{ width: '120px', height: '120px', objectFit: 'cover' }} />
                      ) : (
                        <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp" alt="Avatar" className="my-5 rounded-circle border border-light" style={{ width: '120px', height: '120px', objectFit: 'cover' }} fluid />
                      )}
                      <MDBTypography tag="h5" className="mb-0">{user.name}</MDBTypography>
                      <MDBCardText>{user.role}</MDBCardText>
                      <div className="d-flex justify-content-center">
                        <a href="#!" className="text-white"><MDBIcon fab icon="facebook" size="lg" className="me-3" /></a>
                        <a href="#!" className="text-white"><MDBIcon fab icon="twitter" size="lg" className="me-3" /></a>
                        <a href="#!" className="text-white"><MDBIcon fab icon="instagram" size="lg" className="me-3" /></a>
                      </div>
                    </MDBCol>
                    <MDBCol md="8">
                      <MDBCardBody className="p-4">
                        <MDBTypography tag="h6">Informations</MDBTypography>
                        <hr className="mt-0 mb-4" />
                        <MDBCardText>Email: {user.email}</MDBCardText>
                        {user.adresse && <MDBCardText>Adresse: {user.adresse}</MDBCardText>}
                        {user.age && <MDBCardText>Âge: {user.age}</MDBCardText>}
                        {user.role && <MDBCardText>Rôle: {user.role}</MDBCardText>}
                        <div className="d-flex justify-content-between">
                          <div>
                            <Link to={`/profile/${user._id}`} className="btn btn-primary">
                              <MDBIcon icon="user-edit" className="me-2" />
                              <span>Modifier le profil</span>
                            </Link>
                          </div>
                          <div>
                            <Link to={`/changePass`} className="btn btn-primary">
                              <MDBIcon icon="lock" className="me-2" />
                              <span>Modifier le mot de passe</span>
                            </Link>
                          </div>
                        
                        </div>
                        <div className="mt-3">
                          <label htmlFor="photoInput" className="btn btn-primary">Ajouter une photo</label>
                          <input id="photoInput" type="file" accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} />
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