import React from 'react';

function HomePage() {
  return (
    <div className="welcome-area" id="welcome">
      <div className="header-text">
        <div className="container">
          <div className="row">
            <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8 col-md-12 col-sm-12">
              <h1>Elevate your ideas  <strong>to success with DeamTim:</strong><br />Simplify ,<strong>Organize, Succeed</strong></h1>
              <a href="#features" className="main-button-slider">Discover More</a>





            </div>
          </div>
        </div>
      </div>

      <section className="section home-feature">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="row">
                <div className="col-lg-4 col-md-6 col-sm-6 col-12" data-scroll-reveal="enter bottom move 50px over 0.6s after 0.2s">
                  
                </div>

                
              </div>
            </div>
          </div>
        </div>
      </section>

      
    </div>
  );
}

export default HomePage;