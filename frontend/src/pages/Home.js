import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom'; 
import { scroller } from 'react-scroll';
import Swiper from 'swiper/bundle';
import axios from 'axios';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import Header from '../components/Header';
import Footers from '../components/Footer';

const Home = () => {
  const location = useLocation();
  const footerRef = useRef(null); // Define footerRef
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      scroller.scrollTo(hash.substring(1), {
        smooth: true,
        duration: 500,
        offset: -70,
      });
    }

    const menu = document.querySelector('#menu-bars');
    const navbar = document.querySelector('.navbar');

    menu.onclick = () => {
      menu.classList.toggle('fa-times');
      navbar.classList.toggle('active');
    };

    window.onscroll = () => {
      menu.classList.remove('fa-times');
      navbar.classList.remove('active');
    };

    const homeSwiper = new Swiper('.home-slider', {
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 2,
        slideShadows: true,
      },
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
    });

    const reviewSwiper = new Swiper('.review-slider', {
      slidesPerView: 1,
      grabCursor: true,
      loop: true,
      spaceBetween: 10,
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        700: {
          slidesPerView: 2,
        },
        1050: {
          slidesPerView: 3,
        },
      },
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
    });

    return () => {
      homeSwiper.destroy();
      reviewSwiper.destroy();
    };
  }, [location]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:8070/employee');
        setEmployees(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch employee details. Try again later.');
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const scrollToFooter = () => {
    scroller.scrollTo('footer', {
      smooth: true,
      duration: 500,
      offset: -70,
    });
  };

  const Footer = React.forwardRef((props, ref) => (
    <footer ref={ref}></footer>
  ));

  return (
    <div>
      <Header />
      <section className="home" id="home">
        <div className="content">
          <h3>
            Master craftsmanship for ultimate <span>performance</span>
          </h3>
          <Link to="/Vehicle" className="btn" onClick={scrollToFooter}>
            Register Your Vehicle
          </Link>
        </div>
        <div className="swiper-container home-slider">
          <div className="swiper-wrapper">
            <div className="swiper-slide">
              <img src="assets/images/Slider3.jpg" alt="" />
            </div>
            <div className="swiper-slide">
              <img src="assets/images/V11.JPG" alt="" />
            </div>
            <div className="swiper-slide">
              <img src="assets/images/V23.JPG" alt="" />
            </div>
            <div className="swiper-slide">
              <img src="assets/images/V14.JPG" alt="" />
            </div>
            <div className="swiper-slide">
              <img src="assets/images/V1.JPG" alt="" />
            </div>
            <div className="swiper-slide">
              <img src="assets/images/V2.JPG" alt="" />
            </div>
          </div>
        </div>
      </section>

                <section class="service" id="service">

                <h1 class="heading"> our <span>services</span> </h1>

                <div class="box-container">

                    <div class="box">
                        <i class="fas fa-oil-can"></i> 
                        <h3>Vehicle Repair</h3>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro, suscipit.</p>
                    </div>

                    <div class="box">
                        <i class="fas fa-truck-monster"></i>
                        <h3>Vehicle Modification</h3>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro, suscipit.</p>
                    </div>

                    <div class="box">
                        <i class="fas fa-boxes"></i>
                        <h3>Spare Parts</h3>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro, suscipit.</p>
                    </div>
                </div>

                </section>

                <section class="about" id="about">

                    <h1 class="heading"><span>about</span> us </h1>

                    <div class="row">

                        <div class="image">
                            <img src="assets/images/about-img.jpg" alt=""/>
                        </div>

                        <div class="content">
                            <h3>we will give a very special offers for you</h3>
                            <p>"At ES Customs, we specialize in providing top-quality vehicle repair, modification, and spare parts. Our expert team is dedicated to enhancing your vehicle's performance and aesthetics with precision and care. Whether it's routine maintenance, custom modifications, or sourcing the perfect part, we’ve got you covered. Trust us to keep your ride in peak condition, tailored to your unique style and needs."</p>
                        
                            <a href="#contact" className="btn" onClick={scrollToFooter}>
                        Contact us
                    </a>
                    <p>Contact us at ES Customs</p>

                    <Footer ref={footerRef} />
                        </div>

                    </div>

                </section>


                <section class="gallery" id="gallery">

                    <h1 class="heading">our <span>gallery</span></h1>

                    <div class="box-container">

                        <div class="box">
                            <img src="assets/images/prius.jpg" alt="prius"/>
                            <h3 class="title">done projects</h3>
                            <div class="icons">
                                <a href="#" class="fas fa-heart"></a>
                                <a href="#" class="fas fa-share"></a>
                                <a href="#" class="fas fa-eye"></a>
                            </div>
                        </div>

                        <div class="box">
                            <img src="assets\images\back prius.jpg" alt=""/>
                            <h3 class="title">done projects</h3>
                            <div class="icons">
                                <a href="#" class="fas fa-heart"></a>
                                <a href="#" class="fas fa-share"></a>
                                <a href="#" class="fas fa-eye"></a>
                            </div>
                        </div>

                        <div class="box">
                            <img src="assets\images\civic bl.jpg" alt=""/>
                            <h3 class="title">done projects</h3>
                            <div class="icons">
                                <a href="#" class="fas fa-heart"></a>
                                <a href="#" class="fas fa-share"></a>
                                <a href="#" class="fas fa-eye"></a>
                            </div>
                        </div>

                        <div class="box">
                            <img src="assets\images\civic.jpg" alt=""/>
                            <h3 class="title">done projects</h3>
                            <div class="icons">
                                <a href="#" class="fas fa-heart"></a>
                                <a href="#" class="fas fa-share"></a>
                                <a href="#" class="fas fa-eye"></a>
                            </div>
                        </div>

                        <div class="box">
                            <img src="assets\images/bmw.jpg" alt=""/>
                            <h3 class="title">done projects</h3>
                            <div class="icons">
                                <a href="#" class="fas fa-heart"></a>
                                <a href="#" class="fas fa-share"></a>
                                <a href="#" class="fas fa-eye"></a>
                            </div>
                        </div>

                        <div class="box">
                            <img src="assets\images\toyo.jpg" alt=""/>
                            <h3 class="title">done projects</h3>
                            <div class="icons">
                                <a href="#" class="fas fa-heart"></a>
                                <a href="#" class="fas fa-share"></a>
                                <a href="#" class="fas fa-eye"></a>
                            </div>
                        </div>

                        <div class="box">
                            <img src="assets\images\hilux bl.jpg" alt=""/>
                            <h3 class="title">done projects</h3>
                            <div class="icons">
                                <a href="#" class="fas fa-heart"></a>
                                <a href="#" class="fas fa-share"></a>
                                <a href="#" class="fas fa-eye"></a>
                            </div>
                        </div>

                        <div class="box">
                            <img src="assets\images\yel.jpg" alt=""/>
                            <h3 class="title">done projects</h3>
                            <div class="icons">
                                <a href="#" class="fas fa-heart"></a>
                                <a href="#" class="fas fa-share"></a>
                                <a href="#" class="fas fa-eye"></a>
                            </div>
                        </div>

                        <div class="box">
                            <img src="assets\images\alion.jpg" alt=""/>
                            <h3 class="title">done projects</h3>
                            <div class="icons">
                                <a href="#" class="fas fa-heart"></a>
                                <a href="#" class="fas fa-share"></a>
                                <a href="#" class="fas fa-eye"></a>
                            </div>
                        </div>

                    </div>

            </section>

            <section class="price" id="price">

                <h1 class="heading"> our <span> packages </span> </h1>

                <div class="box-container">

                    <div class="box">
                        <h3 class="title">Basic Maintenance</h3>
                        <h3 class="amount">LKR.55,000</h3>
                        <ul>
                            <li><i class="fas fa-check"></i>Oil change</li>
                            <li> <i class="fas fa-check"></i> Brake inspection and adjustment </li>
                            <li> <i class="fas fa-check"></i>Tire rotation and alignment check </li>
                            <li> <i class="fas fa-check"></i> Battery check and replacement  </li>
                            <li> <i class="fas fa-check"></i> Fluid top-ups (coolant, brake fluid) </li>
                            <li> <i class="fas fa-check"></i> Filter replacements (air filter, oil filter) </li>
                        </ul>

                        {/* Use Link to navigate to the Package page */}
                        <Link to="/job" className="btn">check out</Link>

                    </div>

                    <div class="box">
                        <h3 class="title">Advanced Maintenance </h3>
                        <h3 class="amount">LKR.95,000</h3>
                        <ul>
                            <li><i class="fas fa-check"></i>All services in the Basic Maintenance</li>
                            <li><i class="fas fa-check"></i>Engine tuning and optimization</li>
                            <li> <i class="fas fa-check"></i> Transmission fluid replacement </li>
                            <li> <i class="fas fa-check"></i> Complete brake system inspection and service </li>
                            <li> <i class="fas fa-check"></i> Suspension check and adjustment </li>
                            <li> <i class="fas fa-check"></i> Exhaust system inspection </li>
                        </ul>
                        {/* Use Link to navigate to the Job page */}
                        <Link to="/job" class="btn">check out</Link>
                    </div>

                    <div class="box">
                        <h3 class="title">Exterior Modification</h3>
                        <h3 class="amount">LKR.175,000</h3>
                        <ul>
                            <li><i class="fas fa-check"></i>Custom paint job or wrap</li>
                            <li> <i class="fas fa-check"></i> Body kit installation </li>
                            <li> <i class="fas fa-check"></i> Window tinting </li>
                            <li> <i class="fas fa-check"></i> Wheel and tire upgrade </li>
                            <li> <i class="fas fa-check"></i> Spoiler or roof rack installation </li>
                        </ul>
                        {/* Use Link to navigate to the Job page */}
                        <Link to="/job" class="btn">check out</Link>
                    </div>

                    <div class="box">
                        <h3 class="title">Interior Enhancement</h3>
                        <h3 class="amount">LKR.375,000</h3>
                        <ul>
                            <li><i class="fas fa-check"></i>Upholstery upgrades</li>
                            <li> <i class="fas fa-check"></i> Sound system upgrade </li>
                            <li> <i class="fas fa-check"></i> Dashboard customization </li>
                            <li> <i class="fas fa-check"></i> Interior lighting upgrade </li>
                        </ul>
                        {/* Use Link to navigate to the Job page */}
                        <Link to="/job" class="btn">check out</Link>
                    </div>

                    <div class="box">
                        <h3 class="title">Safety and Tech</h3>
                        <h3 class="amount">LKR.285,000</h3>
                        <ul>
                            <li><i class="fas fa-check"></i>Installation of advanced safety systems</li>
                            <li> <i class="fas fa-check"></i> Infotainment system upgrade (touchscreen, navigation) </li>
                            <li> <i class="fas fa-check"></i> Alarm system installation </li>
                            <li> <i class="fas fa-check"></i> Dashcam installation </li>
                        </ul>
                         {/* Use Link to navigate to the Job page */}
                         <Link to="/job" class="btn">check out</Link>
                    </div>

                    <div class="box">
                        <h3 class="title">Luxury Detailing Package</h3>
                        <h3 class="amount">LKR.55,000</h3>
                        <ul>
                            <li><i class="fas fa-check"></i>Exterior hand wash and wax</li>
                            <li> <i class="fas fa-check"></i> Interior deep cleaning and conditioning </li>
                            <li> <i class="fas fa-check"></i> Engine bay cleaning </li>
                            <li> <i class="fas fa-check"></i> Paint protection </li>
                            <li> <i class="fas fa-check"></i> Wheel and tire detailing </li>
                        </ul>
                        {/* Use Link to navigate to the Job page */}
                        <Link to="/job" class="btn">check out</Link>
                    </div>

                    <div class="box">
                        <h3 class="title">Off-Road Package</h3>
                        <h3 class="amount">LKR.800,000</h3>
                        <ul>
                            <li><i class="fas fa-check"></i>Suspension lift kit installation</li>
                            <li> <i class="fas fa-check"></i> Off-road tire and wheel upgrade </li>
                            <li> <i class="fas fa-check"></i> Installation of skid plates and off-road bumpers </li>
                            <li> <i class="fas fa-check"></i> Winch installation </li>
                        </ul>
                         {/* Use Link to navigate to the Job page */}
                         <Link to="/job" class="btn">check out</Link>
                    </div>

                    <div class="box">
                        <h3 class="title">Electric Vehicle Service </h3>
                        <h3 class="amount">LKR.200,000</h3>
                        <ul>
                            <li><i class="fas fa-check"></i>Battery health check and optimization</li>
                            <li> <i class="fas fa-check"></i>Electric motor inspection and maintenance</li>
                            <li> <i class="fas fa-check"></i>Brake system maintenance (regenerative braking systems) </li>
                            <li> <i class="fas fa-check"></i>Charging system check</li>
                        </ul>
                        {/* Use Link to navigate to the Job page */}
                        <Link to="/job" class="btn">check out</Link>
                    </div>

                </div>
                
            </section>

            {/* Employee Card Section */}
            <section className="employee-section">
                <div className="employee-container">
                <h1>TEAM OF<span> experts</span></h1>
                {loading ? (
                    <div>Loading...</div>
                ) : error ? (
                    <div>Error: {error}</div>
                ) : (
                    <div className="employee-grid">
                    {employees.length > 0 ? (
                        employees.map((employee) => (
                        <div key={employee._id} className="employee-card">
                            <div className="employee-image">
                            <img
                                src={`http://localhost:8070/uploads/${employee.imageUrl}`}
                                alt={employee.fullName}
                            />
                            </div>
                            <div className="employee-info">
                            <h2>{employee.fullName}</h2>
                            <p>{employee.jobRole}</p>
                            </div>
                        </div>
                        ))
                    ) : (
                        <p>No employees found.</p>
                    )}
                    </div>
                )}
                </div>
            </section>

            <section class="reivew" id="review"> 
    
                <h1 class="heading">client's <span>review</span></h1>

                <div class="review-slider swiper-container">

                    <div class="swiper-wrapper">

                        <div class="swiper-slide box">
                            <i class="fas fa-quote-right"></i>
                            <div class="user">
                                <img src="assets/images/p11 (2).jpg" alt=""/>
                                <div class="user-info">
                                    <h3>Mr.Janith De Silva</h3>
                                    <span>happy clients</span>
                                </div>
                            </div>
                            <p>"I had my car repaired at ES Customs, and the service was top-notch! The team was professional, and they used high-quality spare parts. My vehicle now runs smoother than ever. Highly recommend them for any repair needs!"</p>
                        </div>

                        <div class="swiper-slide box">
                            <i class="fas fa-quote-right"></i>
                            <div class="user">
                                <img src="assets/images/p11 (5).jpg" alt=""/>
                                <div class="user-info">
                                    <h3>Mrs.Dilshani Perera</h3>
                                    <span>happy clients</span>
                                </div>
                            </div>
                            <p>"ES Customs transformed my car with their custom modifications. From the body kit to the performance upgrades, everything was done perfectly. They exceeded my expectations, and I couldn’t be happier with the results."</p>
                        </div>

                        <div class="swiper-slide box">
                            <i class="fas fa-quote-right"></i>
                            <div class="user">
                                <img src="assets/images/p11 (4).jpg" alt=""/>
                                <div class="user-info">
                                    <h3>Kevin D Fonseka</h3>
                                    <span>happy clients</span>
                                </div>
                            </div>
                            <p>"I needed some hard-to-find spare parts for my vehicle, and ES Customs had exactly what I needed. Their inventory is impressive, and the staff is knowledgeable. They made the entire process easy and hassle-free."

                            </p>
                        </div>

                        <div class="swiper-slide box">
                            <i class="fas fa-quote-right"></i>
                            <div class="user">
                                <img src="assets/images/p11 (6).jpg" alt=""/>
                                <div class="user-info">
                                    <h3>Miss.Janani Perera</h3>
                                    <span>happy clients</span>
                                </div>
                            </div>
                            <p>"I brought my car in for some custom modifications, and ES Customs did an outstanding job. The attention to detail was incredible, and the bike looks amazing. They truly know what they’re doing!"

                            </p>
                        </div>

                        <div class="swiper-slide box">
                            <i class="fas fa-quote-right"></i>
                            <div class="user">
                                <img src="assets/images/p11 (8).jpg" alt=""/>
                                <div class="user-info">
                                    <h3>Mr.Sasanka Virajith </h3>
                                    <span>happy clients</span>
                                </div>
                            </div>
                            <p>"ES Customs is my go-to place for all my car repair needs. Whether it's routine maintenance or major repairs, they always deliver excellent service. Their customer care is unmatched!"</p>
                        </div>

                        <div class="swiper-slide box">
                            <i class="fas fa-quote-right"></i>
                            <div class="user">
                                <img src="assets/images/p11 (9).jpg" alt=""/>
                                <div class="user-info">
                                    <h3>Mrs.Senuri Bandara</h3>
                                    <span>happy clients</span>
                                </div>
                            </div>
                            <p>"The team at ES Customs is very skilled in modifications. They helped me customize my SUV exactly the way I wanted. From paint jobs to interior upgrades, everything was handled professionally."</p>
                        </div>

                        <div class="swiper-slide box">
                            <i class="fas fa-quote-right"></i>
                            <div class="user">
                                <img src="assets/images/p11 (10).jpg" alt=""/>
                                <div class="user-info">
                                    <h3>Mr.Kalana Herath</h3>
                                    <span>happy clients</span>
                                </div>
                            </div>
                            <p>"I was impressed by how quickly ES Customs sourced and installed the spare parts for my car. The pricing was fair, and the service was prompt. I'll definitely be returning for future repairs."</p>
                        </div>

                        <div class="swiper-slide box">
                            <i class="fas fa-quote-right"></i>
                            <div class="user">
                                <img src="assets/images/p11 (1).jpg" alt=""/>
                                <div class="user-info">
                                    <h3>Mr.Anjana Alwis</h3>
                                    <span>happy clients</span>
                                </div>
                            </div>
                            <p>"My experience with ES Customs was fantastic. They repaired my car's engine efficiently, and now it runs like new. The staff was friendly and explained everything clearly. Highly recommended!"</p>
                        </div>

                        <div class="swiper-slide box">
                            <i class="fas fa-quote-right"></i>
                            <div class="user">
                                <img src="assets/images/p1.jpg" alt=""/>
                                <div class="user-info">
                                    <h3>Mr.Hasidu Nethmina</h3>
                                    <span>happy clients</span>
                                </div>
                            </div>
                            <p>"If you’re looking for expert modifications or hard-to-find spare parts, ES Customs is the place to go. Their service is top-tier, and they really know their stuff. I'm thrilled with how my car turned out after the modifications!"</p>
                        </div>

                    </div>

                </div>

            </section>
            <Footers />
            
</div>
        );
    }

export default Home;