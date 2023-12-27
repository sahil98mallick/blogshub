import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { workingprogress } from '../CustomFunction/CustomFunction'
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const Footer = () => {
    const [loading, setloading] = useState(false)
    const { register, formState: { errors }, handleSubmit, setValue } = useForm();
    const subscribedemail = localStorage.getItem("subscribedEmail")
    const onSubmit = async (data) => {
        console.log(data);
        try {
            const storedEmail = localStorage.getItem('subscribedEmail');

            if (storedEmail === data.email) {
                Swal.fire({
                    icon: 'warning',
                    title: 'You are already subscribed with this email.',
                    timer: 2000,
                    showConfirmButton: true,
                });
                setValue("email", "");
            } else {
                if (data) {
                    localStorage.setItem('subscribedEmail', data.email);
                    setValue("email", "");
                    Swal.fire({
                        icon: 'success',
                        title: "You Subscribed Successfully.",
                        timer: 2000,
                        showConfirmButton: true,
                    });
                    setloading(false)
                }
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: error,
                timer: 3000,
                showConfirmButton: true,
            });
        }
    };

    const removesubscribe = () => {
        localStorage.removeItem("subscribedEmail")
        toast.warn("Subscribed Email Removed")
        setloading(true)
    }
    return (
        <>
            {/* <!-- Footer Start --> */}
            <div class="container-fluid bg-dark text-light">
                <div class="container">
                    <div class="row gx-5">
                        <div class="col-lg-4 col-md-6 footer-about">
                            <div class="d-flex flex-column align-items-center justify-content-center text-center h-190 bg-success p-4" id='footersideback'>
                                <a class="navbar-brand">
                                    <h1 class="m-0 text-dark"><i class="fa fa-newspaper"></i> Blog Hub</h1>
                                </a>
                                <p class="mt-3 mb-4">Lorem diam sit erat dolor elitr et, diam lorem justo amet clita stet eos
                                    sit. Elitr dolor duo lorem, elitr clita ipsum sea. Diam amet erat lorem stet eos. Diam amet
                                    et kasd eos duo.</p>
                                {
                                    subscribedemail && !loading ? (
                                        <>
                                            <h4>Your Subscribed Email-Id</h4>
                                            <h4 style={{ color: "blueviolet" }}>{subscribedemail}<i class='bx bxs-message-alt-x'
                                                style={{ color: "red" }} onClick={() => { removesubscribe() }}></i></h4>
                                        </>
                                    ) : (
                                        <>
                                            <form onSubmit={handleSubmit(onSubmit)}>
                                                <div class="input-group">
                                                    <input type="email" class="form-control border-white p-3" placeholder="Your Email" style={{ borderRadius: "20px" }}
                                                        {...register("email", { required: true })} />&nbsp;&nbsp;
                                                    <button class="btn btn-warning" type='submit' style={{ borderRadius: "20px" }}>Subscribe</button>
                                                </div>
                                            </form>
                                        </>
                                    )
                                }
                            </div>
                        </div>
                        <div class="col-lg-8 col-md-6">
                            <div class="row gx-5">
                                <div class="col-lg-4 col-md-12 pt-5 mb-5">
                                    <div class="section-title section-title-sm position-relative pb-3 mb-4">
                                        <h3 class="text-light mb-0">Get In Touch</h3>
                                    </div>
                                    <div class="d-flex mb-2">
                                        <i class="bi bi-geo-alt text-primary me-2"></i>
                                        <p class="mb-0">123 Street, New York, USA</p>
                                    </div>
                                    <div class="d-flex mb-2">
                                        <i class="bi bi-envelope-open text-primary me-2"></i>
                                        <p class="mb-0">info@example.com</p>
                                    </div>
                                    <div class="d-flex mb-2">
                                        <i class="bi bi-telephone text-primary me-2"></i>
                                        <p class="mb-0">+012 345 67890</p>
                                    </div>
                                    <div class="d-flex mt-4">
                                        <a class="btn btn-primary btn-square me-2" ><i
                                            class="fab fa-twitter fw-normal"></i></a>
                                        <a class="btn btn-primary btn-square me-2" ><i
                                            class="fab fa-facebook-f fw-normal"></i></a>
                                        <a class="btn btn-primary btn-square me-2" ><i
                                            class="fab fa-linkedin-in fw-normal"></i></a>
                                        <a class="btn btn-primary btn-square" ><i
                                            class="fab fa-instagram fw-normal"></i></a>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-12 pt-0 pt-lg-5 mb-5">
                                    <div class="section-title section-title-sm position-relative pb-3 mb-4">
                                        <h3 class="text-light mb-0">Quick Links</h3>
                                    </div>
                                    <div class="link-animated d-flex flex-column justify-content-start">
                                        <Link to='/' class="text-light mb-2" ><i
                                            class="bi bi-arrow-right text-primary me-2"></i>Home</Link>
                                        <Link onClick={() => { workingprogress() }} class="text-light mb-2" ><i
                                            class="bi bi-arrow-right text-primary me-2"></i>About Us</Link>
                                        <Link to='/Courses' class="text-light mb-2" ><i
                                            class="bi bi-arrow-right text-primary me-2"></i>Our Courses</Link>
                                        <Link class="text-light mb-2" ><i
                                            class="bi bi-arrow-right text-primary me-2"></i>Our Blogs</Link>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-12 pt-0 pt-lg-5 mb-5">
                                    <div class="section-title section-title-sm position-relative pb-3 mb-4">
                                        <h3 class="text-light mb-0">Popular Links</h3>
                                    </div>
                                    <div class="link-animated d-flex flex-column justify-content-start">
                                        <Link to='/' class="text-light mb-2" ><i
                                            class="bi bi-arrow-right text-primary me-2"></i>Home</Link>
                                        <Link onClick={() => { workingprogress() }} class="text-light mb-2" ><i
                                            class="bi bi-arrow-right text-primary me-2"></i>About Us</Link>
                                        <Link to='/Courses' class="text-light mb-2" ><i
                                            class="bi bi-arrow-right text-primary me-2"></i>Our Courses</Link>
                                        <Link class="text-light mb-2" ><i
                                            class="bi bi-arrow-right text-primary me-2"></i>Our Blogs</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container-fluid text-white" style={{ background: "radial-gradient(circle, rgba(167,179,240,1) 0%, rgba(91,188,237,1) 100%)" }}>
                <div class="container text-center">
                    <div class="row justify-content-end">
                        <div class="col-lg-12 col-md-6">
                            <div class="d-flex align-items-center justify-content-center" style={{ height: "75px" }}>
                                <p class="mb-0">&copy; <a class="text-white border-bottom">Blog Hub</a>. All
                                    Rights Reserved.
                                    Designed by <a class="text-white border-bottom">Sahil Mallick</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Footer End --> */}
        </>
    )
}

export default Footer