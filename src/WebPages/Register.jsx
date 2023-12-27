import React, { useState } from 'react'
import Navbar from '../Common/Navbar'
import { useForm } from 'react-hook-form';
import { instance } from '../API/AxiosInstance';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [loading, setloading]=useState(false)
    const { register, formState: { errors }, handleSubmit } = useForm();
    const onSubmit = async (data) => {
        console.log(data);
        setloading(true)
        try {
            const response = await instance.post("register", data);
            if (response?.data) {
                toast.success(response?.data?.message)
                navigate("/Login")
            } else {
                toast.error(response?.data?.message)
            }
        } catch (error) {
            toast.error(error.response?.data?.message)
        }finally{
            setloading(false)
        }
    }
    return (
        <>
            {/* <!-- Navbar Start --> */}
            <Navbar />
            {/* <!-- Navbar End --> */}
            <div className="loginmainsection">
                <div className="registercontainer" style={{ margin: "0 auto" }}>
                    <div class="col-lg-12">
                        <center>
                            <img src="https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg" alt="UserImage" style={{ width: "150px", height: "150px", borderRadius: "50%" }} />
                        </center>
                        <center><h1>Register Here</h1></center>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div class="row g-4">
                                <div class="col-md-6">
                                    <input type="text" class="form-control border-0 bg-light px-4" placeholder="Your Name" style={{ height: "55px" }} id='registerinput'  {...register("name", { required: true })} />
                                </div>
                                {errors.name?.type === "required" && <p>Name is Required</p>}
                                <div class="col-md-6">
                                    <input type="number" class="form-control border-0 bg-light px-4" placeholder="Your Phone" style={{ height: "55px" }} id='registerinput'  {...register("mobile", { required: true })} />
                                </div>
                                {errors.mobile?.type === "required" && <p>Phone is Required</p>}
                                <div class="col-12">
                                    <input type="email" class="form-control border-0 bg-light px-4" placeholder="Your Email-id" style={{ height: "55px" }} id='registerinput'  {...register("email", { required: true })} />
                                </div>
                                {errors.email?.type === "required" && <p>Email is Required</p>}
                                <div class="col-12">
                                    <input type="password" class="form-control border-0 bg-light px-4" placeholder="Your password" style={{ height: "55px" }} id='registerinput'  {...register("password", { required: true })} />
                                </div>
                                {errors.password?.type === "required" && <p>Password is Required</p>}
                                <div class="col-12">
                                    <button class="btn btn-primary py-3" type="submit" style={{ borderRadius: "50px", width: "100px" }}>
                                        {loading?'Loading..':"Register"}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <br /><br />
        </>
    )
}

export default Register