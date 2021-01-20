import React, { Component } from 'react'
import { Typography, Grid, Card, CardMedia, CardActionArea, CardContent, Button } from '@material-ui/core'
import SimpleForm from 'app/views/material-kit/forms/SimpleForm'
import CustomForm from './CustomForm'
import { Link } from "react-router-dom";
import logos from "../../../../assets/logo3.png";
import img4 from "../../../../assets/savings.svg";
import img5 from "../../../../assets/image4.png";
class Section4 extends Component {
    render() {
        const {user} =this.props
        const style = {
            typo:{
                fontFamily:"Dancing Script, cursive",
                color:"#000"
            }
        }
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-transparent sticky-top">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to='/'>
                        <img src={logos} alt='company-logo'/>
                        </Link>
                        <button className="navbar-toggler bg-dark" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse navbar-right" id="navbarTogglerDemo02">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        </ul>

                        <ul className="navbar-nav mb-2 mb-lg-0 navbar-right">
                        <li className="nav-item mt-2">
                            <a className="nav-link text-dark active" aria-current="page" href="#home-section">Home</a>
                        </li>
                        <li className="nav-item mt-2 dropdown">
                            <a className="nav-link text-dark dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                About
                            </a>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <li><a className="dropdown-item" href="#team-section">Team</a></li>
                            <li><a className="dropdown-item" href="#faq-section">FAQ</a></li>
                            <li><a className="dropdown-item" href="#testimonials-section">Testimonials</a></li>
                        </ul>
                        </li>
                        <li className="nav-item mt-2">
                            <a className="nav-link text-dark" href="#about-section">About</a>
                        </li>
                        <li className="nav-item mt-2">
                            <a className="nav-link text-dark" href="#services-section">Services</a>
                        </li>
                            <li className="nav-item">
                                {user != null ? (
                                <Link to='/dashboard' className="nav-link">
                                    <Button
                                    variant='outlined'
                                    color='primary'
                                    className='bg-primary text-white'
                                    style={{ color: "" }}
                                    >
                                    Login
                                    </Button>
                                </Link>
                                ) : (
                                <Link to='/signin' className="nav-link">
                                    <Button
                                    variant='outlined'
                                    color='primary'
                                    className='bg-primary text-white'
                                    style={{ color: "" }}
                                    >
                                    Login
                                    </Button>
                                </Link>
                                )}
                            </li>
                            <li className="nav-item">
                                <Link to='/signup' className="nav-link">
                                    <Button
                                    variant='outlined'
                                    color='primary'
                                    className='bg-primary text-white'
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
                <div className="site-blocks-cover overlay" data-bs-slide="fade" id="home-section" style={{
                    backgroundImage: `url(${"/assets/baner.png"})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center center",
                    backgroundSize: "cover",
                    backgroundAttachment: "fixed",
                    minHeight: "500px",
                    overflowX:'hidden',
                    height: "calc(100vh)"
                }}>
                    <div className="contaner">
                        <div className="row align-items-center justify-content-center text-center">
                            <div className="col-md-10 mt-lg-5 text-center">
                                <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">
                                <ol className="carousel-indicators">
                                    <li data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active"></li>
                                    <li data-bs-target="#carouselExampleDark" data-bs-slide-to="1"></li>
                                    <li data-bs-target="#carouselExampleDark" data-bs-slide-to="2"></li>
                                </ol>
                                <div className="carousel-inner" style={{paddingTop:400}}>
                                    <div className="carousel-item active" data-bs-interval="10000">
                                    {/* <img  src={img4} className="d-block w-100" alt="..." /> */}
                                    <div className="carousel-caption d-none d-md-block">
                                        <h5>First slide label</h5>
                                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                                    </div>
                                    </div>
                                    <div className="carousel-item" data-bs-interval="2000">
                                    {/* <img  src={img4} className="d-block w-100" alt="..." /> */}
                                    <div className="carousel-caption d-none d-md-block">
                                        <h5>Second slide label</h5>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                    </div>
                                    </div>
                                    <div className="carousel-item">
                                    {/* <img  src={img4} className="d-block w-100" alt="..." /> */}
                                    <div className="carousel-caption d-none d-md-block">
                                        <h5>Third slide label</h5>
                                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                                    </div>
                                    </div>
                                </div>
                                {/* <a className="carousel-control-prev" href="#carouselExampleDark" role="button" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </a>
                                <a className="carousel-control-next" href="#carouselExampleDark" role="button" data-bs-slide="next"> */}
                                    {/* <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </a> */}
                                </div>
                            </div>
                            <a href="#next" className="mouse smoothscroll text-white">
                                <span className="fas fa-mouse text-white">
                                <span className="fas fa-mouse-alt text-white"></span>
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="" id="next">
                    <div className="container">
                        <div className="row p-10">
                            <div className="col-md-4 text-center" data-bs-slide="fade-up" data-bs-delay="">                            
                                <img src={img4} alt="Free Website Template by Free-Template.co" className="img-fluid w-25 mb-4" />
                                <h2 className="card-title">Money Savings</h2>
                                <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                            </div>
                            <div className="col-md-4 text-center" data-bs-slide="fade-up" data-bs-delay="">                            
                                <img src={img4} alt="Free Website Template by Free-Template.co" className="img-fluid w-25 mb-4" />
                                <h2 className="card-title">Money Savings</h2>
                                <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                            </div>
                            <div className="col-md-4 text-center" data-bs-slide="fade-up" data-bs-delay="">                            
                                <img src={img4} alt="Free Website Template by Free-Template.co" className="img-fluid w-25 mb-4" />
                                <h2 className="card-title">Money Savings</h2>
                                <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6 mb-5" data-bs-slide="fade-up" data-bs-delay="">
                                <figure className="circle-bg">
                                    <img src={"images/about_2.jpg"} alt="Free Website Template by Free-Template.co" className="img-fluid" />
                                </figure>
                            </div>
                            <div className="col-lg-5 ml-auto" data-bs-slide="fade-up" data-bs-delay="100">
                                <div className="mb-4">
                                    <h3 className="h3 mb-4 text-black">Amortization Computation</h3>
                                    <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                                </div>
                                <div className="mb-4">
                                    <ul className="list-unstyled ul-check success">
                                        <li>Officia quaerat eaque neque</li>
                                        <li>Lorem ipsum dolor sit amet</li>
                                        <li>Consectetur adipisicing elit</li>
                                    </ul>       
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="site-section cta-big-image" id="about-section">
                    <div className="container">
                        <div className="row mb-5 justify-content-center">
                            <div className="col-md-8 text-center">
                                <h2 className="section-title mb-3" data-bs-slide="fade-up" data-bs-delay="">About Us</h2>
                                <p className="lead" data-bs-slide="fade-up" data-bs-delay="100">Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus minima neque tempora reiciendis.</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6 mb-5" data-bs-slide="fade-up" data-bs-delay="">
                                <figure className="circle-bg">
                                    <img src={img5} alt="Free Website Template by Free-Template.co" className="img-fluid" />
                                </figure>
                            </div>
                            <div className="col-lg-5 ml-auto" data-bs-slide="fade-up" data-bs-delay="100">
                                <h3 className="text-black mb-4">We Solve Your Financial Problem</h3>
                                <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
                                <p>A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="site-section">
                    <div className="container">
                        <div className="row mb-5 justify-content-center">
                            <div className="col-md-7 text-center">
                                <h2 className="section-title mb-3" data-bs-slide="fade-up" data-bs-delay="">How It Works</h2>
                                <p className="lead" data-bs-slide="fade-up" data-bs-delay="100">A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>  
                            </div>
                        </div>
                        <div className="row align-items-lg-center">
                            <div className="col-lg-6 mb-5" data-bs-slide="fade-up" data-bs-delay="">
                                <div className="owl-carousel slide-one-item-alt">
                                    <img src="images/slide_1.jpg" alt="Image" className="img-fluid" />
                                    <img src="images/slide_2.jpg" alt="Image" className="img-fluid" />
                                    <img src="images/slide_3.jpg" alt="Image" className="img-fluid" />
                                </div>
                                <div className="custom-direction">
                                    <a href="#" className="custom-prev"><span><span className="icon-keyboard_backspace"></span></span></a><a href="#" className="custom-next"><span><span className="icon-keyboard_backspace"></span></span></a>
                                </div>
                            </div>
                            <div className="col-lg-5 ml-auto" data-bs-slide="fade-up" data-bs-delay="100">
                                <div className="owl-carousel slide-one-item-alt-text">
                                    <div>
                                        <h2 className="section-title mb-3">01. Online Applications</h2>
                                        <p>A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.</p>
                                        <p><a href="#" className="btn btn-primary mr-2 mb-2">Learn More</a></p>
                                    </div>
                                    <div>
                                        <h2 className="section-title mb-3">02. Get an approval</h2>
                                        <p>A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.</p>
                                        <p><a href="#" className="btn btn-primary mr-2 mb-2">Learn More</a></p>
                                    </div>
                                    <div>
                                        <h2 className="section-title mb-3">03. Card delivery</h2>
                                        <p>A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.</p>
                                        <p><a href="#" className="btn btn-primary mr-2 mb-2">Learn More</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="site-section border-bottom bg-light" id="services-section">
                    <div className="container">
                        <div className="row mb-5">
                            <div className="col-12 text-center" data-bs-slide="fade">
                                <h2 className="section-title mb-3">Our Services</h2>
                            </div>
                        </div>
                        <div className="row align-items-stretch">
                            <div className="col-md-6 col-lg-4 mb-4 mb-lg-4" data-bs-slide="fade-up">
                                <div className="unit-4">
                                    <div className="unit-4-icon">
                                        <img src="images/flaticon-svg/svg/001-wallet.svg" alt="Free Website Template by Free-Template.co" className="img-fluid w-25 mb-4" />
                                    {/* </div> */}
                                    <div>
                                        <h3>Business Consulting</h3>
                                        <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                                        <p><a href="#">Learn More</a></p>
                                    </div>
                                    </div>
                                </div>
                            </div>  
                            <div className="col-md-6 col-lg-4 mb-4 mb-lg-4" data-bs-slide="fade-up" data-bs-delay="100">
                                <div className="unit-4">
                                    <div className="unit-4-icon">
                                        <img src="images/flaticon-svg/svg/001-wallet.svg" alt="Free Website Template by Free-Template.co" className="img-fluid w-25 mb-4" />
                                    {/* </div> */}
                                    <div>
                                        <h3>Business Consulting</h3>
                                        <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                                        <p><a href="#">Learn More</a></p>
                                    </div>
                                    </div>
                                </div>
                            </div> 
                            <div className="col-md-6 col-lg-4 mb-4 mb-lg-4" data-bs-slide="fade-up" data-bs-delay="200">
                                <div className="unit-4">
                                    <div className="unit-4-icon">
                                        <img src="images/flaticon-svg/svg/001-wallet.svg" alt="Free Website Template by Free-Template.co" className="img-fluid w-25 mb-4" />
                                    {/* </div> */}
                                    <div>
                                        <h3>Business Consulting</h3>
                                        <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                                        <p><a href="#">Learn More</a></p>
                                    </div>
                                    </div>
                                </div>
                            </div> 
                            <div className="col-md-6 col-lg-4 mb-4 mb-lg-4" data-bs-slide="fade-up">
                                <div className="unit-4">
                                    <div className="unit-4-icon">
                                        <img src="images/flaticon-svg/svg/001-wallet.svg" alt="Free Website Template by Free-Template.co" className="img-fluid w-25 mb-4" />
                                    {/* </div> */}
                                    <div>
                                        <h3>Business Consulting</h3>
                                        <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                                        <p><a href="#">Learn More</a></p>
                                    </div>
                                    </div>
                                </div>
                            </div>  
                            <div className="col-md-6 col-lg-4 mb-4 mb-lg-4" data-bs-slide="fade-up" data-bs-delay="100">
                                <div className="unit-4">
                                    <div className="unit-4-icon">
                                        <img src="images/flaticon-svg/svg/001-wallet.svg" alt="Free Website Template by Free-Template.co" className="img-fluid w-25 mb-4" />
                                    {/* </div> */}
                                    <div>
                                        <h3>Business Consulting</h3>
                                        <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                                        <p><a href="#">Learn More</a></p>
                                    </div>
                                    </div>
                                </div>
                            </div> 
                            <div className="col-md-6 col-lg-4 mb-4 mb-lg-4" data-bs-slide="fade-up" data-bs-delay="200">
                                <div className="unit-4">
                                    <div className="unit-4-icon">
                                        <img src="images/flaticon-svg/svg/001-wallet.svg" alt="Free Website Template by Free-Template.co" className="img-fluid w-25 mb-4" />
                                    {/* </div> */}
                                    <div>
                                        <h3>Business Consulting</h3>
                                        <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                                        <p><a href="#">Learn More</a></p>
                                    </div>
                                    </div>
                                </div>
                            </div>                                                       
                        </div>
                    </div>
                </section>                
           </div>
        )
    }
}

export default Section4
