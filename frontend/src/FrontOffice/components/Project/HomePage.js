import React from 'react';
import NavbarHome from './NavbarHome';
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import FooterFront from '../../FooterFront';

function HomePage() {
  const [typeEffect] = useTypewriter({
    words: ['  Scrum Manager ', '  Project  Manager ', '  Software developer'],
    loop: {},
    typeSpeed: 100,
    delaySpeed: 40
  });

  const centerImageStyle = {
    display: 'block',
    marginLeft: 'auto',
    marginRight: '50px',
    width: '70%'
  };

  const blurredImageStyle = {
    boxShadow: '0 0 10px 10px rgba(255, 255, 255, 0.5)', // Modifier le flou ici
  };

  return (
    <div>
      <NavbarHome />

      <div className="welcome-area" id="welcome">
        <div style={{ textAlign: 'center' }}>
          <img
            src={`${process.env.PUBLIC_URL}/templateFront/images/scrum.jpg`}
            style={{ ...centerImageStyle, ...blurredImageStyle, marginLeft: '200px', width: '400px' }}
            alt="Logo"
          />
        </div>

        <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8 col-md-12 col-sm-12">
          <div>
            <h1 style={{ margin: '50px',color: 'white' }}>
              I'm a
              <span style={{ fontWeight: 'bold', color: 'fuchsia' }}>
                {typeEffect}
              </span>
              <span style={{ color: 'red' }}>
                <Cursor />
              </span>
            </h1>
          </div>

          <h1 style={{ color: 'white' }}>
          Elevate your ideas <strong>to success with DeamTim:</strong>
          <br />
          Simplify, <strong>Organize, Succeed</strong>
        </h1>
        
          
        </div>
      </div>
      <div className="about-us-section" style={{ background: '#fff', padding: '50px' }}>
      <div className="container">
        <h2 style={{ textAlign: 'center' }}>About Us</h2>
        <p style={{ textAlign: 'center' }}>
        Define the different phases of a task. When starting out, look no further than “To Do,” “In Progress,” and “Done.” You can also build a custom workflow to meet your team's needs. 
        There's no wrong way to do things in DRIMTIM..
        </p>
        {/* Add more content or images here as needed */}
      </div>
    </div>
      <div className="row">
        {/* Testimonial Item 1 */}
        <div className="col-lg-4 col-md-6 col-sm-12">
          <div className="team-item">
            <div className="team-content">
              <i>
                <img src="assets/images/testimonial-icon.png" alt="" />
              </i>
              <p>
              Streamline project management tasks, 
              improve collaboration, and 
              efficiently achieve your project goals.
              </p>
              <div className="user-image">
                <img src="/templateFront/images/project.png" />
              </div>
              <div className="team-info">
                <h3 className="user-name">Project Management </h3>
                <span>Software developer</span>
              </div>
            </div>
          </div>
        </div>
        {/* Testimonial Items */}
        <div className="col-lg-4 col-md-6 col-sm-12">
          <div className="team-item">
            <div className="team-content">
              <i>
                <img src="assets/images/testimonial-icon.png" alt="" />
              </i>
              <p>
              Supercharge your agile project with our 
              sprint management app. Plan, track, and 
              execute sprints seamlessly for maximum productivity.
              </p>
              <div className="user-image">
                <img src="/templateFront/images/ss.jpg" />
              </div>
              <div className="team-info">
                <h3 className="user-name">Sprint Management </h3>
                <span>Software developer</span>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial Item 3 */}
        <div className="col-lg-4 col-md-6 col-sm-12">
          <div className="team-item">
            <div className="team-content">
              <i>
                <img src="assets/images/testimonial-icon.png" alt="" />
              </i>
              <p>
              Elevate your Scrum management to new heights with 
              our application. Effortlessly plan, execute, and monitor 
              Scrum projects with enhanced visibility and efficiency.
              </p>
              <div className="user-image">
                <img src="/templateFront/images/scrumm.png" />
              </div>
              <div className="team-info">
                <h3 className="user-name">Scrum Management </h3>
                <span>Software developer</span>
              </div>
            </div>
          </div>
        </div>

        
      </div>

      {/* About Us Section */}
     <FooterFront/>
    </div>
  );
}

export default HomePage;
