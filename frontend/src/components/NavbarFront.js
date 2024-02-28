import React from 'react';

function NavbarFront() {
  return (
    <header>
    <div className="container">
    <div className="row">
    <div className="span12 clearfix">
    <div className="top1">
      <a href="index.html" className="logo"><img src="images/logo.png" alt="" /></a>
    </div>	
    <div className="top2">
    <div className="search-form-wrapper clearfix">
      <form id="search-form" action="search.php" method="GET" accept-charset="utf-8" className="navbar-form" >
        <input type="text" name="s" value='Search' onBlur="if(this.value=='') this.value='Search'" onFocus="if(this.value =='Search' ) this.value=''"  />
        <a href="#" onClick="document.getElementById('search-form').submit()"></a>
      </form>
    </div>
    <div className="navbar navbar_">
      <div className="navbar-inner navbar-inner_">
        <a className="btn btn-navbar btn-navbar_" data-toggle="collapse" data-target=".nav-collapse_">
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </a>
        <div className="nav-collapse nav-collapse_ collapse">
          <ul className="nav sf-menu clearfix">
            <li className="active"><a href="index.html">Home</a></li>				
            <li className="sub-menu sub-menu-1"><a href="index-1.html">Company<em></em></a>
              <ul>
                <li><a href="index-1.html">About us</a></li>
                <li className="sub-menu sub-menu-2"><a href="index-1.html">History<em></em></a>
                  <ul>
                    <li><a href="index-1.html">lorem ipsum dolor</a></li>
                    <li><a href="index-1.html">sit amet</a></li>
                    <li><a href="index-1.html">adipiscing elit</a></li>
                    <li><a href="index-1.html">nunc suscipit</a></li>
                    <li><a href="404.html">404 page not found</a></li>
                  </ul>
                </li>
                <li className="sub-menu sub-menu-2"><a href="index-1.html">Our team<em></em></a>
                  <ul>
                    <li><a href="index-1.html">lorem ipsum dolor</a></li>
                    <li><a href="index-1.html">sit amet</a></li>
                    <li><a href="index-1.html">adipiscing elit</a></li>
                    <li><a href="index-1.html">nunc suscipit</a></li>									
                  </ul>
                </li>
                <li><a href="index-1.html">Media</a></li>						
              </ul>						
            </li>
            <li className="sub-menu sub-menu-1"><a href="index-2.html">Services<em></em></a>
              <ul>
                <li><a href="index-2.html">Lorem ipsum dolor</a></li>						
                <li><a href="index-2.html">Sit amet consectetue</a></li>
                <li><a href="index-2.html">Adipiscing elit</a></li>						
                <li><a href="index-2.html">Nunc suscipit</a></li>						
              </ul>						
            </li>
            <li><a href="index-3.html">Products</a></li>
            <li><a href="index-4.html">Solutions</a></li>											
            <li><a href="index-5.html">Contacts</a></li>											
          </ul>
        </div>
      </div>
    </div>
    
    
    
    
    
    
    </div>
    </div>	
    </div>	
    </div>	
    </header>
  );
}

export default NavbarFront;
