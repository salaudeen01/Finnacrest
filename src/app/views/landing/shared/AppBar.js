import React from "react";
import Button from "@material-ui/core/Button";
import logo from "../../../../assets/sesis.jpg";
import logos from "../../../../assets/logo3.png";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import img4 from "../../../../assets/baner.png";
import phone from "../../../../assets/phone1.png";
import SolidGameCardDemo from "./CustomCard";
import Section5 from "./Section5";
import Footer from "./Footer";
import Section1 from "./Section1";
import Section2 from "./Section2";
import img5 from "../../../../assets/wallet.svg";
import img6 from "../../../../assets/finanace.svg";
import un from "../../../../assets/un.svg";
import target from "../../../../assets/untarget.svg";
import invest from "../../../../assets/uninvest.svg";
import process from "../../../../assets/rich.svg";
import finance from "../../../../assets/unfinance.svg";
import cart from "../../../../assets/uncart.svg";

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
            {/* <li className="nav-item mt-2 dropdown">
                <a className="nav-link text-dark dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    About
                </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <li><a className="dropdown-item" href="#team-section">Team</a></li>
                <li><a className="dropdown-item" href="#faq-section">FAQ</a></li>
                <li><a className="dropdown-item" href="#testimonials-section">Testimonials</a></li>
            </ul>
            </li> */}
            <li className="nav-item mt-2">
                <a className="nav-link text-dark" href="#about-section">About</a>
            </li>
            <li className="nav-item mt-2">
                <a className="nav-link text-dark" href="#services-section">Services</a>
            </li>
            <li className="nav-item mt-2">
                <a className="nav-link text-dark" href="#faq">FAQ</a>
            </li>
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
      <div className=''>
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
                    <ol className="carousel-indicators" >
                        <li data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active text-white"></li>
                        <li data-bs-target="#carouselExampleDark" data-bs-slide-to="1" className="text-white"></li>
                        <li data-bs-target="#carouselExampleDark" data-bs-slide-to="2" className="text-white"></li>
                    </ol>
                    <div className="carousel-inner" style={{paddingTop:400}}>
                        <div className="carousel-item active" data-bs-interval="10000">
                        {/* <img  src={img4} className="d-block w-100" alt="..." /> */}
                        <div className="carousel-caption d-none d-md-block">
                          <h4 className="text-white">Savings</h4>
                          <p className="text-white">Save periodically, automatically or manually. You can also save as you go, on your own terms. </p>
                        </div>
                        </div>
                        <div className="carousel-item" data-bs-interval="2000">
                        {/* <img  src={img4} className="d-block w-100" alt="..." /> */}
                        <div className="carousel-caption d-none d-md-block">
                          <h4 className="text-white">Free Interest Loan</h4>
                          <p className="text-white">Say bye-bye to high interest rates. Get access to zero interest Personal or Business loans to take care of
                            your most pressing needs, loans with workable payback periods. </p>
                        </div>
                        </div>
                        <div className="carousel-item">
                        {/* <img  src={img4} className="d-block w-100" alt="..." /> */}
                        <div className="carousel-caption d-none d-md-block">
                          <h4 className="text-white">Business Finance</h4>
                          <p className="text-white">We financially support Small Scale Business or Personnal Business in other to achieve you business goal and plans   </p>
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
               
        <div className="container-fluid">              
          <div className="row featurette text-center" id="about-section">
            <Section1  />
          </div>
          {/* <hr className="featurette-divider" /> */}
          <div className="row featurette text-center">
            {/* <Section2 /> */}
          </div>
          <section className="site-section border-bottom bg-light text-center" id="services-section">
            <div className="container">
                <div className="row mb-5">
                    <div className="col-12 text-center" data-bs-slide="fade">
                        <h2 className="section-title mt-5 mb-3">Our Services</h2>
                    </div>
                </div>
                <div className="row align-items-stretch">
                    <div className="col-md-6 col-lg-4 mb-4 mb-lg-4" data-bs-slide="fade-up">
                        <div className="unit-4">
                            <div className="unit-4-icon">
                                <img src={img5} alt="Free Website Template by Free-Template.co" className="img-fluid w-25 mb-4" />
                            {/* </div> */}
                            <div>
                                <h3>Regular Savings</h3>
                                <p>Save periodically, automatically or manually. You can also save as you go, on your
                                   own terms. You’re the boss of your savings, choose how you want to save.
                                   Save more inorder get more Loans.</p>
                                {/* <p><a href="/signin">Get Started</a></p> */}
                            </div>
                            </div>
                        </div>
                    </div>  
                    <div className="col-md-6 col-lg-4 mb-4 mb-lg-4" data-bs-slide="fade-up" data-bs-delay="100">
                        <div className="unit-4">
                            <div className="unit-4-icon">
                                <img src={target} alt="Free Website Template by Free-Template.co" className="img-fluid w-25 mb-4" />
                            {/* </div> */}
                            <div>
                                <h3>Target Savings</h3>
                                <p>Reach all your unique savings goals.
                                   Got a savings goal in mind? We’ll help you reach it! Saving for a new phone? Check.
                                    Dad’s surprise birthday? Check. A new car, special vacation? Check and check. 
                                    Target Savings helps you reach all your savings goals easily and faster.
                                </p>
                                {/* <p><a href="/signin">Get Started</a></p> */}
                            </div>
                            </div>
                        </div>
                    </div> 
                    <div className="col-md-6 col-lg-4 mb-4 mb-lg-4" data-bs-slide="fade-up" data-bs-delay="200">
                        <div className="unit-4">
                            <div className="unit-4-icon">
                                <img src={process} alt="Free Website Template by Free-Template.co" className="img-fluid w-25 mb-4" />
                            {/* </div> */}
                            <div>
                                <h3>Loan</h3>
                                <p>Say bye-bye to high interest rates. Get access to zero interest Personal or Business loans 
                                  to take care of your most pressing needs, loans with workable payback periods. Build your 
                                  Savings Account to unlock larger loan amounts.</p>
                                  {/* <p><a href="/signin">Get Started</a></p> */}
                            </div>
                            </div>
                        </div>
                    </div> 
                    {/* <div className="col-md-6 col-lg-4 mb-4 mb-lg-4" data-bs-slide="fade-up">
                        <div className="unit-4">
                            <div className="unit-4-icon">
                                <img src={finance} alt="Free Website Template by Free-Template.co" className="img-fluid w-25 mb-4" />
                           
                            <div>
                                <h3>Business Financing</h3>
                                <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                                <p><a href="/signin">Get Started</a></p>
                            </div>
                            </div>
                        </div>
                    </div>   */}
                    {/* <div className="col-md-6 col-lg-4 mb-4 mb-lg-4" data-bs-slide="fade-up" data-bs-delay="100">
                        <div className="unit-4">
                            <div className="unit-4-icon">
                                <img src={cart} alt="Free Website Template by Free-Template.co" className="img-fluid w-25 mb-4" />
                            
                            <div>
                                <h3>Product Financing</h3>
                                <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                                <p><a href="/signin">Get Started</a></p>
                            </div>
                            </div>
                        </div>
                    </div>  */}
                    {/* <div className="col-md-6 col-lg-4 mb-4 mb-lg-4" data-bs-slide="fade-up" data-bs-delay="200">
                        <div className="unit-4">
                            <div className="unit-4-icon">
                                <img src={un} alt="Free Website Template by Free-Template.co" className="img-fluid w-25 mb-4" />
                            
                            <div>
                                <h3>Shareholding</h3>
                                <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                                <p><a href="/signin">Get Started</a></p>
                            </div>
                            </div>
                        </div>
                    </div>                                                        */}
                </div>
            </div>
        </section>                
        <div className="container" id="faq">
            <div className="row mb-5">
              <div className="col-12 text-center" data-bs-slide="fade">
                  <h2 className="section-title text-primary mt-5 mb-3">Frequently Ask Questions</h2>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div class="accordion accordion-flush" id="accordionFlushExample">
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-headingOne">
                      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                        How do I register with sesis?
                      </button>
                    </h2>
                    <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                      <div class="accordion-body">
                          Make a payment of N2,000 to sesis GTBank account. send your teller to office or scan to our 
                          email, get a form, fill and submit . Get registered and receive your membership card, pass book,
                          bye-law etc.
                      </div>
                    </div>
                  </div>                  
                </div>
                <div class="accordion accordion-flush" id="accordionFlushExample">
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-headingTwo">
                      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                        How much do I pay monthly?
                      </button>
                    </h2>
                    <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                      <div class="accordion-body">
                        The minimum savings per month is N2,000. You can pay more than that if willingly up to N100,000
                      </div>
                    </div>
                  </div>                  
                </div>
                <div class="accordion accordion-flush" id="accordionFlushExample">
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-headingThree">
                      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                         Do you accept cash for any payment?
                      </button>
                    </h2>
                    <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                      <div class="accordion-body">
                          NO! we advise you to pay directly to our Gtbank account or make a transfer for with payer ID showing in the
                          transfer 
                      </div>
                    </div>
                  </div>                  
                </div>
                <div class="accordion accordion-flush" id="accordionFlushExample">
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-headingFour">
                      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
                        When do I get loan?
                      </button>
                    </h2>
                    <div id="flush-collapseFour" class="accordion-collapse collapse" aria-labelledby="flush-headingFour" data-bs-parent="#accordionFlushExample">
                      <div class="accordion-body">
                          You can get your loan after consecutive savings for 6 months and collect double of the 6 months savings.
                      </div>
                    </div>
                  </div>                  
                </div>
                      
                <div class="accordion accordion-flush" id="accordionFlushExample">
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-headingFive">
                      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFive" aria-expanded="false" aria-controls="flush-collapseFive">
                          Do I need guarantor?
                      </button>
                    </h2>
                    <div id="flush-collapseFive" class="accordion-collapse collapse" aria-labelledby="flush-headingFive" data-bs-parent="#accordionFlushExample">
                      <div class="accordion-body">
                          YES! 1 or 2 guarantors is required depending on the ability of 1 guarantor to secure the total sum of money requested.
                      </div>
                    </div>
                  </div>                  
                </div>
                <div class="accordion accordion-flush" id="accordionFlushExample">
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-headingSix">
                      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseSix" aria-expanded="false" aria-controls="flush-collapseSix">
                          Can I get full withdrawal without guarantor?
                      </button>
                    </h2>
                    <div id="flush-collapseSix" class="accordion-collapse collapse" aria-labelledby="flush-headingSix" data-bs-parent="#accordionFlushExample">
                      <div class="accordion-body">
                        YES! You can withdraw, if you do not request for double payment upon your savings
                      </div>
                    </div>
                  </div>                  
                </div>
                <div class="accordion accordion-flush" id="accordionFlushExample">
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-headingSeven">
                      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseSeven" aria-expanded="false" aria-controls="flush-collapseSeven">
                        Can I bring guarantor from outside sesis members’ forum
                      </button>
                    </h2>
                    <div id="flush-collapseSeven" class="accordion-collapse collapse" aria-labelledby="flush-headingSeven" data-bs-parent="#accordionFlushExample">
                      <div class="accordion-body">
                         NO! he/she (guarantor) should be a member of sesis cooperative
                      </div>
                    </div>
                  </div>                  
                </div>                
                <div class="accordion accordion-flush" id="accordionFlushExample">
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-headingEight">
                      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseEight" aria-expanded="false" aria-controls="flush-collapseEight">
                          Do I pay interest on loan collected?
                      </button>
                    </h2>
                    <div id="flush-collapseEight" class="accordion-collapse collapse" aria-labelledby="flush-headingEight" data-bs-parent="#accordionFlushExample">
                      <div class="accordion-body">
                        NO!!! we do not collect interest on loan, it is interest free. A token fee of N200.00 is charged for 
                        form, N1.00 per mile is recovered from bank as account maintenance charges and N50 stamp duty paid to 
                        the Federal Government effect from 1st January 2016. 
                      </div>
                    </div>
                  </div>                  
                </div>
              </div>
              <div className="col-md-6">                
                <div class="accordion accordion-flush" id="accordionFlushExample">
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-headingNine">
                      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseNine" aria-expanded="false" aria-controls="flush-collapseNine">
                          Then, how does sesis make money to run its overhead and expenses?
                      </button>
                    </h2>
                    <div id="flush-collapseNine" class="accordion-collapse collapse" aria-labelledby="flush-headingNine" data-bs-parent="#accordionFlushExample">
                      <div class="accordion-body">
                        Each member pay some statutory fees such as development levy –N1,000; AGM fee - N1,500 yearly and shares – N5,000.
                      </div>
                    </div>
                  </div>                  
                </div>
                <div class="accordion accordion-flush" id="accordionFlushExample">
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-headingTen">
                      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTen" aria-expanded="false" aria-controls="flush-collapseTen">
                         Shares N5,000 for what?
                      </button>
                    </h2>
                    <div id="flush-collapseTen" class="accordion-collapse collapse" aria-labelledby="flush-headingTen" data-bs-parent="#accordionFlushExample">
                      <div class="accordion-body">
                        We use members’ share funds to invest in different Halal businesses which returns are partly use
                         for overheads and profit/loss after accounting year are disburse as dividends to members based on share value/ratio.
                      </div>
                    </div>
                  </div>                  
                </div>
                <div class="accordion accordion-flush" id="accordionFlushExample">
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-headingEleven">
                      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseEleven" aria-expanded="false" aria-controls="flush-collapseEleven">
                          Can I contribute more than N5,000 for my shares?
                      </button>
                    </h2>
                    <div id="flush-collapseEleven" class="accordion-collapse collapse" aria-labelledby="flush-headingEleven" data-bs-parent="#accordionFlushExample">
                      <div class="accordion-body">
                         YES! You can invest any amount for shares and returns/dividends will be shared based on your investment funds
                      </div>
                    </div>
                  </div>                  
                </div>
              
                <div class="accordion accordion-flush" id="accordionFlushExample">
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-headingTwelve">
                      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwelve" aria-expanded="false" aria-controls="flush-collapseTwelve">
                        Do I need to be coming to meeting every month?
                      </button>
                    </h2>
                    <div id="flush-collapseTwelve" class="accordion-collapse collapse" aria-labelledby="flush-headingTwelve" data-bs-parent="#accordionFlushExample">
                      <div class="accordion-body">
                         YES! Meeting attendance carries 75% as criteria in granting loans and gives opportunity to
                          participate friendly in the means of members.
                      </div>
                    </div>
                  </div>                  
                </div>
                <div class="accordion accordion-flush" id="accordionFlushExample">
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-headingThirteen">
                      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThirteen" aria-expanded="false" aria-controls="flush-collapseThirteen">
                        If am leaving in diaspora, can join SESIS?
                      </button>
                    </h2>
                    <div id="flush-collapseThirteen" class="accordion-collapse collapse" aria-labelledby="flush-headingThirteen" data-bs-parent="#accordionFlushExample">
                      <div class="accordion-body">
                        YES! You get a form and complete with same N2,000 payable to our Gtbank account
                      </div>
                    </div>
                  </div>                  
                </div>
                <div class="accordion accordion-flush" id="accordionFlushExample">
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-headingFourteen">
                      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFourteen" aria-expanded="false" aria-controls="flush-collapseFourteen">
                         Does coming to meeting still compulsory for me in diaspora?
                      </button>
                    </h2>
                    <div id="flush-collapseFourteen" class="accordion-collapse collapse" aria-labelledby="flush-headingFourteen" data-bs-parent="#accordionFlushExample">
                      <div class="accordion-body">
                         Not necessarily but we want a participatory role either by mails or calls to get information about the progress.
                      </div>
                    </div>
                  </div>                  
                </div>
                <div class="accordion accordion-flush" id="accordionFlushExample">
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-headingFifteen">
                      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFifteen" aria-expanded="false" aria-controls="flush-collapseFifteen">
                        Can I close my account at any time?
                      </button>
                    </h2>
                    <div id="flush-collapseFifteen" class="accordion-collapse collapse" aria-labelledby="flush-headingFifteen" data-bs-parent="#accordionFlushExample">
                      <div class="accordion-body">
                      Yes! We just a need a month notification and state reason for closure of your account.
                      </div>
                    </div>
                  </div>                  
                </div>
               
              </div>
              
            </div>
          </div>
          {/* <br className="featurette-divider" /> */}
          <section class="site-section bg-light" id="contact-section" data-aos="fade">
            <div class="container">
              <div class="row mb-5">
                <div class="col-12 text-center">
                  <h2 class="section-title mt-5 mb-3">Contact Us</h2>
                </div>
              </div>
              <div class="row mb-5">
                <div class="col-md-4 text-center">
                  <p class="mb-4">
                    <span class="fas fa-map-marker-alt d-block h2 text-primary"></span>
                    {/* <i class="fas fa-map-marker-alt"></i> */}
                    <span>
                      *Head office:* <br/>
                       Suite 1, 2nd floor, 
                       Alhaji safar jolaosho plaza, 
                       First bank building, 107 Mafoluku Road, via Lagos international airport road, Mafoluku oshodi, Lagos
                    </span>
                  </p>
                </div>
                <div class="col-md-4 text-center">
                  <p class="mb-4">
                    <span class="fas fa-phone d-block h2 text-primary"></span>
                    <a href="#">01 316 077 00</a>
                  </p>
                </div>
                <div class="col-md-4 text-center">
                  <p class="mb-0">
                    <span class="far fa-envelope d-block h2 text-primary"></span>
                    {/* <i class="far fa-envelope"></i> */}
                    <a href="#"><span class="__cf_email__" data-cfemail="324b5d4740575f535b5e72565d5f535b5c1c515d5f">sesiscoop@yahoo.com</span></a>
                  </p>
              </div>
              </div>
              <div class="row d-flex justify-content-center">
                <div class="card col-md-8 mb-5">
                  <form action="#" class="p-5">
                    <h2 class="h4 text-black mb-5">Contact Form</h2>
                      <div class="row form-group">
                        <div class="col-md-12">
                          <label class="text-black" for="email">Email</label>
                          <input type="email" id="email" class="form-control" />
                        </div>
                      </div>
                      <div class="row form-group">
                        <div class="col-md-12">
                          <label class="text-black" for="message">Message</label>
                          <textarea name="message" id="message" cols="30" rows="7" class="form-control" placeholder="Write your notes or questions here..."></textarea>
                        </div>
                      </div><br/>
                      <div class="row form-group">
                        <div class="col-md-12">
                          <input type="submit" value="Send Message" class="btn btn-primary btn-md text-white" />
                        </div>
                      </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
      </div>
      <footer className="bg-primary container-fluid">
         <Footer />
      </footer>
      </div>
    </div>
  );
}
