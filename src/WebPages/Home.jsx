import React, { useEffect } from 'react'
import Navbar from '../Common/Navbar'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { fetchlallcourses } from '../Redux/CourseSlice/CourseSlice';
import { servicesprocess, teammemberprocess } from '../Redux/ServiceSlice/ServiceSlice';

const Home = () => {
    const dispatch = useDispatch();
    const { allcourses, loading } = useSelector((state) => state.Course);
    const { services, serviceloading, teams } = useSelector((state) => state.Service);
    useEffect(() => {
        dispatch(fetchlallcourses());
        dispatch(servicesprocess());
        dispatch(teammemberprocess());
    }, [dispatch])
    return (
        <>
            {/* <!-- Navbar & Carousel Start --> */}
            <div class="container-fluid position-relative p-0">
                <Navbar />
                <div id="header-carousel" class="carousel slide carousel-fade" data-bs-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img class="w-100" src="https://img.freepik.com/free-vector/futuristic-ai-technology-template-vector-disruptive-technology-blog-banner_53876-112228.jpg" alt="Image" />
                            <div class="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                <div class="p-3" style={{ maxWidth: "900px" }}>
                                    <h5 class="text-white text-uppercase mb-3 animated slideInDown">Creative & Innovative</h5>
                                    <h1 class="display-1 text-white mb-md-4 animated zoomIn">Creative & Innovative Blog
                                        Hub</h1>
                                    <a href="#" class="btn btn-danger py-md-3 px-md-5 me-3 animated slideInLeft" id='crousalbutton'>Subscribe Now</a>
                                    <Link to='/Contact' class="btn btn-outline-light py-md-3 px-md-5 animated slideInRight" id='crousalbutton'>Contact
                                        Us</Link>
                                </div>
                            </div>
                        </div>
                        <div class="carousel-item">
                            <img class="w-100" src="https://marketplace.canva.com/EAFO8LoR2OI/2/0/1600w/canva-purple-blue-illustration-digital-course-blog-banner-IpDjPd0d-5o.jpg" alt="Image" />
                            <div class="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                <div class="p-3" style={{ maxWidth: "900px" }}>
                                    <h5 class="text-white text-uppercase mb-3 animated slideInDown">Creative & Innovative</h5>
                                    <h1 class="display-1 text-white mb-md-4 animated zoomIn">Creative & Innovative Digital
                                        Solution</h1>
                                    <a href="quote.html" class="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft">Free
                                        Quote</a>
                                    <a class="btn btn-outline-light py-md-3 px-md-5 animated slideInRight">Contact
                                        Us</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#header-carousel" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#header-carousel" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            {/* <!-- Navbar & Carousel End --> */}
            {/* <!-- About Start --> */}
            <div class="container-fluid py-5 wow fadeInUp" data-wow-delay="0.1s">
                <div class="container py-5">
                    <div class="row g-5">
                        <div class="col-lg-7">
                            <div class="section-title position-relative pb-3 mb-5">
                                <h5 class="fw-bold text-primary text-uppercase">About Us</h5>
                                <h1 class="mb-0">We Provide best blogs to our viewers</h1>
                            </div>
                            <p class="mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate quae placeat rem sint eius laborum magni ad eveniet, fuga modi, veritatis nobis voluptatum facere suscipit, et odio! Beatae ea nemo consectetur, quae voluptatum sit ex!</p>
                            <div class="row g-0 mb-3">
                                <div class="col-sm-6 wow zoomIn" data-wow-delay="0.2s">
                                    <h5 class="mb-3"><i class="fa fa-check text-warning me-3"></i>Award Winning</h5>
                                    <h5 class="mb-3"><i class="fa fa-check text-warning me-3"></i>Professional Staff</h5>
                                </div>
                                <div class="col-sm-6 wow zoomIn" data-wow-delay="0.4s">
                                    <h5 class="mb-3"><i class="fa fa-check text-warning me-3"></i>24/7 Support</h5>
                                    <h5 class="mb-3"><i class="fa fa-check text-warning me-3"></i>Fair Prices</h5>
                                </div>
                            </div>
                            <div class="d-flex align-items-center mb-4 wow fadeIn" data-wow-delay="0.6s">
                                <div class="bg-warning d-flex align-items-center justify-content-center rounded"
                                    style={{
                                        width: "60px", height: "60px"
                                    }}>
                                    <i class="fa fa-phone-alt text-white"></i>
                                </div>
                                <div class="ps-4">
                                    <h5 class="mb-2">Call to ask any question</h5>
                                    <h4 class="text-info mb-0">+012 12345 42635</h4>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-5" style={{ minHeight: "500px" }}>
                            <div class="position-relative h-100">
                                <img class="position-absolute w-100 h-100 rounded wow zoomIn" data-wow-delay="0.9s"
                                    src="https://cdn4.wpbeginner.com/wp-content/uploads/2018/07/whatisblog.png" style={{ objectFit: "cover" }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            {/* <!-- About End --> */}

            {/* <!-- Courses Start --> */}
            <div class="container-fluid py-5 wow fadeInUp" data-wow-delay="0.1s">
                <div class="container py-5">
                    <div class="section-title text-center position-relative pb-3 mb-5 mx-auto" style={{ maxWidth: "600px" }}>
                        <h2 class="fw-bold text-danger text-uppercase">Our Services</h2>
                    </div>
                    <div class="row g-5">
                        {
                            loading ? (
                                <>
                                    <div id="spinner"
                                        class="show">
                                        <div class="spinner"></div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    {
                                        services?.map((item, key) => {
                                            return (
                                                <>
                                                    <div class="col-lg-4 col-md-6 wow zoomIn" data-wow-delay="0.3s">
                                                        <div
                                                            class="service-item d-flex flex-column align-items-center justify-content-center text-center" style={{ borderRadius: "50px", background: "linear-gradient(0deg, rgba(193,196,196,1) 0%, rgba(238,228,232,1) 100%)", boxShadow: " -20px 10px 15px -3px rgba(0,0,0,0.1)" }}>
                                                            <div class="service-icon">
                                                                <i class="fa fa-shield-alt text-dark"></i>
                                                            </div>
                                                            <h4 class="mb-3">{item?.name}</h4>
                                                            <p class="m-0">{item?.details?.slice(0, 50)}</p>
                                                            <hr />
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        })
                                    }
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
            {/* <!-- Courses End --> */}
            {/* <!-- Courses Start --> */}
            <div class="container-fluid py-5 wow fadeInUp" data-wow-delay="0.1s">
                <div class="container py-5">
                    <div class="section-title text-center position-relative pb-3 mb-5 mx-auto" style={{ maxWidth: "600px" }}>
                        <h5 class="fw-bold text-danger text-uppercase">Our Courses</h5>
                        <h1 class="mb-0" style={{ color: "#1E72E3" }}>Best Courses for Your Successful Career</h1>
                    </div>
                    <div class="row g-5">
                        {
                            loading ? (
                                <>
                                    <div id="spinner"
                                        class="show">
                                        <div class="spinner"></div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    {
                                        allcourses?.map((item, key) => {
                                            return (
                                                <>
                                                    <div class="col-lg-4 col-md-6 wow zoomIn" data-wow-delay="0.3s">
                                                        <div
                                                            class="service-item bg-light rounded d-flex flex-column align-items-center justify-content-center text-center">
                                                            <div class="service-icon">
                                                                <i class="fa fa-shield-alt text-white"></i>
                                                            </div>
                                                            <h4 class="mb-3">{item?.name}</h4>
                                                            <p class="m-0">{item?.requirement}</p>
                                                            <hr />
                                                            <div style={{ display: 'flex', justifyContent: "space-evenly", width: "100%" }}>
                                                                <p class="m-0">Duration: {item?.duration}</p>
                                                                <p class="m-0">Fees: {item?.fees}</p>
                                                            </div>
                                                            <Link to={`/ApplyCourses/${item?._id}`} class="btn btn-lg btn-primary rounded">
                                                                <i class="bi bi-arrow-right"></i>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        })
                                    }
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
            {/* <!-- Courses End --> */}
            {/* Tesm Member Start */}
            <div class="container-fluid py-5 wow fadeInUp" data-wow-delay="0.1s">
                <div class="container py-5">
                    <div class="section-title text-center position-relative pb-3 mb-5 mx-auto" style={{ maxWidth: "600px" }}>
                        <h5 class="fw-bold text-primary text-uppercase">Team Members</h5>
                        <h1 class="mb-0">Professional Stuffs Ready to Help Your Business</h1>
                    </div>
                    <div class="row g-5">
                        {
                            teams?.map((item, key) => {
                                return (
                                    <>
                                        <div class="col-lg-4 wow slideInUp" data-wow-delay="0.3s">
                                            <div class="team-item bg-light rounded overflow-hidden">
                                                <div class="team-img position-relative overflow-hidden">
                                                    <img class="img-fluid" src={`https://restapinodejs.onrender.com/api/team/photo/${item?._id}`} alt="teamimage" style={{ width: "100%", height: '250px', borderRadius: "20px" }} />
                                                    <div class="team-social">
                                                        <a class="btn btn-lg btn-primary btn-lg-square rounded"><i class="fab fa-twitter fw-normal"></i></a>
                                                        <a class="btn btn-lg btn-primary btn-lg-square rounded"><i class="fab fa-facebook-f fw-normal"></i></a>
                                                        <a class="btn btn-lg btn-primary btn-lg-square rounded"><i class="fab fa-instagram fw-normal"></i></a>
                                                        <a class="btn btn-lg btn-primary btn-lg-square rounded"><i class="fab fa-linkedin-in fw-normal"></i></a>
                                                    </div>
                                                </div>
                                                <div class="text-center py-4">
                                                    <h4 class="text-primary">{item?.name}</h4>
                                                    <p class="text-uppercase m-0">{item?.possession}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            {/* Tesm Member End */}
            <a href="#" class="btn btn-lg btn-warning btn-lg-square rounded back-to-top"><i class="bi bi-arrow-up"></i></a>
        </>
    )
}

export default Home