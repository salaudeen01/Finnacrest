import React from "react";
import Button from "@material-ui/core/Button";
import logo from "../../../../assets/sesis.jpg";
import logos from "../../../../assets/logo4.jpeg";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import mane from "../../../../assets/mane_img.jpg";
import leptop from "../../../../assets/leptop.jpg";
import tet1 from "../../../../assets/te1.png";
import tet2 from "../../../../assets/te2.png";
import './css/style.css'
import './css/responsive.css'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflowX:'hidden'
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
    <div>
      <header>
         <div  class="head_top">           
            <nav className="navbar navbar-expand-lg navbar-dark bg-transparent sticky-top">
                <div className="container-fluid">
                    <Link className="navbar-brand" to='/'>
                    <img src={logos} alt='company-logo'/>
                    </Link>
                    <button className="navbar-toggler bg-dark" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse navbar-right" id="navbarTogglerDemo02">
                    <ul className="navbar-nav me-auto mb-lg-0">
                    </ul>

                    <ul className="navbar-nav mb-lg-0 navbar-right">
                    <li className="nav-item mt-2">
                        <a className="nav-link text-dark active" aria-current="page" href="#home-section">Home</a>
                    </li>
                    <li className="nav-item mt-2">
                        <a className="nav-link text-dark" href="#about-section">About</a>
                    </li>
                    {/* <li className="nav-item mt-2">
                        <a className="nav-link text-dark" href="#services-section">Services</a>
                    </li> */}
                    {/* <li className="nav-item mt-2">
                        <a className="nav-link text-dark" href="#faq">FAQ</a>
                    </li> */}
                    <li className="nav-item mt-2">
                        <a className="nav-link text-dark" href="#contact-section">Contact</a>
                    </li>
                        <li className="nav-item">
                            {props.user != null ? (
                            <Link to='/dashboard' className="nav-link">
                                <Button
                                variant='outlined'
                                color='primary'
                                className='bg-primary text-white'
                                // className='sign_btn'
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
                                // className='sign_btn'
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
                                // className='sign_btn'
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
            <section class="banner_main">
               <div class="container-fluid">
                  <div class="row d_flex">
                     <div class="col-md-5">
                        <div class="text-bg">
                           <h1>Find fun in saving or <br/>get loan for your next purchase</h1>
                           <strong>Free Easy to use web app</strong>
                           <span>Some other contents will go here</span>
                           <Link to='/signin' className="nav-link">Register</Link>
                        </div>
                     </div>
                     <div class="col-md-7 padding_right1">
                        <div class="text-img">
                           <figure><h1 class="fw-bold text-white my-5 mx-auto px-5 text-center">Savings And Loaning Gets Easier<br/> With Few Clicks </h1></figure>
                           <h3>01</h3>
                        </div>
                     </div>
                  </div>
               </div>
            </section>
         </div>
      </header>
      
        <div id="about" class="about">
         <div class="container">
            <div class="row">
               <div class="col-md-12">
                  <div class="titlepage">
                     <h2>About Finnacrest</h2>
                     <span>We are a Financial Cooperative that provides financial solutions to transform businesses and ideas.</span>
                     <br/><span>And also help to achieve your targetted goals.</span>
                  </div>
               </div>
            </div>
            <div class="row">
               <div class="col-md-8 offset-md-2 ">
                  <div class="about_box ">
                     {/* <!-- <figure>
                     <img src={loan} alt='company-logo'/></figure> --> */}
                     <a class="read_more" href="#">Read more</a>
                  </div>
               </div>
            </div>
         </div>
      </div>        
        <div id="" class="best">
          <div class="container">
              <div class="row">
                <div class="col-md-12">
                    <div class="titlepage">
                      <h2>Meet Up With Your Budgets</h2>
                      <span></span>
                    </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-4">
                    <div class="best_box">
                      <h4>Regular <br/>Savings</h4>
                      <p>Save periodically, automatically or manually. You can also save as you go, 
                         on your own terms. You’re the boss of your savings, choose how you want to save.
                          Save more inorder get more Loans.</p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="best_box">
                      <h4>Target <br/> Savings</h4>
                      <p>Reach all your unique savings goals. Got a savings goal in mind? We’ll help you reach it!
                          Saving for a new phone? Check. Dad’s surprise birthday? Check. A new car, special vacation?
                           Check and check. Target Savings helps you reach all your savings goals easily and faster.</p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="best_box">
                      <h4>Loan <br/> </h4>
                      <p>Say bye-bye to high interest rates. Get access to zero interest Personal or Business loans to take 
                         care of your most pressing needs, loans with workable payback periods.
                          Build your Savings Account to unlock larger loan amounts.</p>
                    </div>
                </div>
                <div class="col-md-12">
                    <a class="read_more" href="#">Read more</a>
                </div>
              </div>
          </div>
        </div>      
        <div id="contact" class="request">
         <div class="container">
            <div class="row">
               <div class="col-md-12">
                  <div class="titlepage">
                     <h2>Request a Call back</h2>
                     {/* <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor <br/>
                     incididunt ut labore et dolore magna</span> */}
                  </div>
               </div>
            </div>
            <div class="row">
               <div class="col-sm-12">
                  <div class="black_bg">
                     <div class="row">
                        <div class="col-md-7 ">
                           <form class="main_form">
                              <div class="row">
                                 <div class="col-md-12 ">
                                    <input class="contactus" placeholder="Name" type="text" name="Name" />
                                 </div>
                                 <div class="col-md-12">
                                    <input class="contactus" placeholder="Phone number" type="text" name=" Phone number" />
                                 </div>
                                 <div class="col-md-12">
                                    <input class="contactus" placeholder="Email" type="text" name="Email" />
                                 </div>
                                 <div class="col-md-12">
                                    <textarea class="textarea" placeholder="Message" type="text" name="Message "> Message </textarea>
                                 </div>
                                 <div class="col-sm-12">
                                    <button class="send_btn">Send</button>
                                 </div>
                              </div>
                           </form>
                        </div>
                        <div class="col-md-5">
                           <div class="mane_img">
                              <figure>
                              <img src={mane} alt='company-logo'/></figure>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
        <div  class="two_box">
          <div class="container-fluid">
              <div class="row d_flex">
                <div class="col-md-6">
                    <div class="two_box_img">
                      <figure>
                      <img src={leptop} alt='company-logo'/></figure>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="two_box_img">
                      <h2><span class="offer">Budgeting failed? </span></h2>
                      <p>Say bye-bye to budget failure. Get easy access to Personal or Business loans to 
                         take care of your most pressing needs, loans with workable payback periods. Build your Savings 
                         Account to unlock larger loan amounts.</p>
                    </div>
                </div>
              </div>
          </div>
        </div>
        <div class="testimonial">
         <div class="container">
            <div class="row">
               <div class="col-md-12">
                  <div class="titlepage">
                     <h2>Testimonial</h2>
                  </div>
               </div>
            </div>
            <div class="row">
               <div class="col-md-12">
                  <div id="myCarousel" class="carousel slide testimonial_Carousel " data-ride="carousel">
                     <ol class="carousel-indicators">
                        <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
                        <li data-target="#myCarousel" data-slide-to="1"></li>
                        <li data-target="#myCarousel" data-slide-to="2"></li>
                     </ol>
                     <div class="carousel-inner">
                        <div class="carousel-item active">
                           <div class="container">
                              <div class="carousel-caption ">
                                 <div class="row">
                                    <div  class="col-md-12">
                                       <div class="test_box">
                                          <h3>Michl ro</h3>
                                          <p><i class="padd_rightt0">
                                          <img src={tet1} alt='company-logo'/></i>At first, I thought it wasn't legit, but I have saved my sister's School fee here with Finnacrest Target Savings.<i class="padd_leftt0">
                                          <img src={tet2} alt='company-logo'/></i> <br /> Best savings platform </p>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div class="carousel-item">
                           <div class="container">
                              <div class="carousel-caption">
                                 <div class="row">
                                    <div  class="col-md-12">
                                       <div class="test_box">
                                          <h3>Michl ro</h3>
                                          <p><i class="padd_rightt0">
                                          <img src={tet1} alt='company-logo'/></i>At first, I thought it wasn't legit, but I have saved my sister's School fee here with Finnacrest Target Savings.<i class="padd_leftt0">
                                          <img src={tet2} alt='company-logo'/></i> <br /> Best savings platform </p>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div class="carousel-item">
                           <div class="container">
                              <div class="carousel-caption">
                                 <div class="row">
                                    <div  class="col-md-12">
                                       <div class="test_box">
                                          <h3>Michl ro</h3>
                                          <p><i class="padd_rightt0">
                                          <img src={tet1} alt='company-logo'/></i>At first, I thought it wasn't legit, but I have saved my sister's School fee here with Finnacrest Target Savings.<i class="padd_leftt0">
                                          <img src={tet2} alt='company-logo'/></i> <br /> Best savings platform </p>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <a class="carousel-control-prev" href="#myCarousel" role="button" data-slide="prev">
                     <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                     <span class="sr-only">Previous</span>
                     </a>
                     <a class="carousel-control-next" href="#myCarousel" role="button" data-slide="next">
                     <span class="carousel-control-next-icon" aria-hidden="true"></span>
                     <span class="sr-only">Next</span>
                     </a>
                  </div>
               </div>
            </div>
         </div>
      </div>
        <footer>
          <div class="footer">
              <div class="container">
                <div class="row">
                    <div class="col-md-6">
                      <div class="cont">
                          <h3> <strong class="multi"> Easy and Reliable</strong><br />
                            Trusted Financial Cooperative
                          </h3>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="cont_call">
                          <h3> <strong class="multi"> Call Now</strong><br />
                            (+234) 706 974 1474
                          </h3>
                      </div>
                    </div>
                </div>
              </div>
              <div class="copyright">
                <div class="container">
                    <div class="row">
                      <div class="col-md-12">
                          <p>© 2019 All Rights Reserved.  Techend Limited</p>
                      </div>
                    </div>
                </div>
              </div>
          </div>
        </footer>

    </div>
  );
}
