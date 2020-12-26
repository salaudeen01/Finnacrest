import React from "react";
import Button from "@material-ui/core/Button";
import logo from "../../../../assets/sesis.jpg";
import logos from "../../../../assets/sesis9.jpeg";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import img4 from "../../../../assets/baner.png";
import img5 from "../../../../assets/baner1.png";
import phone from "../../../../assets/phone1.png";
import SolidGameCardDemo from "./CustomCard";
import Section5 from "./Section5";
import Footer from "./Footer";
import Section1 from "./Section1";
import Section2 from "./Section2";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    marginLeft: theme.spacing(5),
  },
}));

export default function AppAppBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <nav className="navbar navbar-expand-lg navbar-dark bg-white sticky-top">
          <div className="container-fluid">
            <Link className="navbar-brand" to='/'>
              <img src={logos} width='200px' height='60px' alt='company-logo'/>
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse navbar-right" id="navbarTogglerDemo02">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              </ul>

              <ul className="navbar-nav mb-2 mb-lg-0 navbar-right">
                <li className="nav-item">
                    {props.user != null ? (
                      <Link to='/dashboard' className="nav-link">
                        <Button
                          variant='outlined'
                          color='secondary'
                          style={{ color: "" }}
                        >
                          Login
                        </Button>
                      </Link>
                    ) : (
                      <Link to='/signin' className="nav-link">
                        <Button
                          variant='outlined'
                          color='secondary'
                          style={{ color: "" }}
                        >
                          Login
                        </Button>
                      </Link>
                    )}
                </li>
                <li className="nav-item">
                    <Link to='/signin' className="nav-link">
                        <Button
                          variant='outlined'
                          color='secondary'
                          style={{ color: "" }}
                        >
                          Create An Account 
                        </Button>
                  </Link>
                </li>
              </ul>
            </div>                
          </div>
        </nav>
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active" style={{position:'relative'}}>
              <div className="carousel-caption d-none d-md-block text-dark" style={{top:100,right:600, width:400}}>
                <h5>First slide label</h5>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.
                    Nulla vitae elit libero, a pharetra augue mollis interdum
                    Nulla vitae elit libero, a pharetra augue mollis interdum</p>
                <p><a className="btn btn-secondary text-dark" style={{background:'#FFDF4D', borderColor:'#FFDF4D'}} href="#" role="button">Get Started &raquo;</a></p>
              </div>
              <img src={img4} className="d-block" width="100%" height="80%" alt="..." />
            </div>
            <div className="carousel-item" style={{position:'relative'}}>
              <div className="carousel-caption d-none d-md-block text-white" style={{top:100,right:600, width:400}}>
                <h5 className="text-white">First slide label</h5>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.
                    Nulla vitae elit libero, a pharetra augue mollis interdum
                    Nulla vitae elit libero, a pharetra augue mollis interdum</p>
                <p><a className="btn btn-secondary text-dark" style={{background:'#FFDF4D', borderColor:'#FFDF4D'}} href="#" role="button">Get Started &raquo;</a></p>
              </div>
              <img src={img4} className="d-block" width="100%" height="80%" alt="..." />
            </div>
            <div className="carousel-item" style={{position:'relative'}}>
              <div className="carousel-caption d-none d-md-block text-dark" style={{top:100,right:600, width:400}}>
                <h5>First slide label</h5>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.
                    Nulla vitae elit libero, a pharetra augue mollis interdum
                    Nulla vitae elit libero, a pharetra augue mollis interdum</p>
                <p><a className="btn btn-secondary text-dark" style={{background:'#FFDF4D', borderColor:'#FFDF4D'}} href="#" role="button">Get Started &raquo;</a></p>
              </div>
              <img src={img4} className="d-block" width="100%" height="80%" alt="..." />
            </div>
          </div>
          <a className="carousel-control-prev" href="#carouselExampleFade" role="button" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </a>
          <a className="carousel-control-next" href="#carouselExampleFade" role="button" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </a>
        </div> 
        <div className="container-fluid">
          <div className="row featurette text-center">
            <Section1 />
          </div>
          <hr className="featurette-divider" />
          <div className="row featurette text-center">
            <Section2 />
          </div>
          <div className="row">
            <div className="text-center my-10">
              <h3 className="mb-8">OUR SERVICES</h3>
              <div className="row row-cols-1 row-cols-md-3 g-3">          
                <div className="col-lg-3 col-md-6">
                  <div className="card h-280">
                    <img src={logo} className="card-img-top" alt="..." />
                    <div className="card-body">
                      <h5 className="card-title">Savings</h5>
                      <p className="card-text">Fast, secure and reliable. Saving and withdrawing your money at your convinient and also make a target .</p>
                      <p><a className="btn btn-secondary text-dark" style={{background:'#FFDF4D', borderColor:'#FFDF4D'}} href="#" role="button">Get Started &raquo;</a></p>             
                    </div>
                  </div>
                </div> 
                <div className="col-lg-3 col-md-6">
                  <div className="card h-280">
                    <img src={logo} className="card-img-top" alt="..." />
                    <div className="card-body">
                      <h5 className="card-title">Interest Free Loan</h5>
                      <p className="card-text">Say bye-bye to high interest rates. Get access to zero interest Personal or Business loans to take care of your most pressing needs, loans with workable payback periods. Build your credit ratings to unlock larger loan amounts.</p>
                      <p><a className="btn btn-secondary text-dark" style={{background:'#FFDF4D', borderColor:'#FFDF4D'}} href="#" role="button">Get Started &raquo;</a></p>
                    </div>
                  </div>
                </div>          
                <div className="col-lg-3 col-md-6">
                  <div className="card h-280">
                    <img src={logo} className="card-img-top" alt="..." />
                    <div className="card-body">
                      <h5 className="card-title">Business Financing</h5>
                      <p className="card-text">Say bye-bye to high interest rates. Get access to zero interest Personal or Business loans to take care of your most pressing needs, loans with workable payback periods. Build your credit ratings to unlock larger loan amounts.</p>
                      <p><a className="btn btn-secondary text-dark" style={{background:'#FFDF4D', borderColor:'#FFDF4D'}} href="#" role="button">Get Started &raquo;</a></p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className="card h-280">
                    <img src={logo} className="card-img-top" alt="..." />
                    <div className="card-body">
                      <h5 className="card-title">Product Financing</h5>
                      <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                      <p><a className="btn btn-secondary text-dark" style={{background:'#FFDF4D', borderColor:'#FFDF4D'}} href="#" role="button">Get Started &raquo;</a></p>
                    </div>
                  </div>
                </div>                          
              </div>
            </div>
          </div>
          <hr className="featurette-divider" />
            
          <div className="row text-center mt-10">
              <h3 className="mb-8">Consumer Product Categories</h3>
            <div className="">
              <Link to='/product_financing' className="nav-link">
                <SolidGameCardDemo user={props.user} />
              </Link>
            </div>
            <div className="m-6 ">
              <a className="btn btn-secondary text-dark" style={{background:'#FFDF4D', borderColor:'#FFDF4D'}} href="/product_financing" role="button">View all Products &raquo;</a>
            </div>
          </div>
          <hr className="featurette-divider" />
          <div>
            <Section5 />
          </div>
          <br className="featurette-divider" />
          <footer className="">
            <Footer />
          </footer>

      </div>
    </div>
  );
}
