import React from 'react'
import Navbar from '../Common/Navbar'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { loginprocess, loginsetup } from '../Redux/AuthSlice/AuthSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { loading } = useSelector((state) => state.Auth)
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const onSubmit = (data) => {
        console.log(data);
        dispatch(loginprocess(data)).then((result) => {
            if (result.payload) {
                navigate('/Blog')
            }
        })
    }

    return (
        <>
            {/* <!-- Navbar Start --> */}
            <Navbar />
            {/* <!-- Navbar End --> */}
            <div className="loginmainsection">
                <div className="logincontainer" style={{ margin: "0 auto" }}>
                    <div class="col-lg-12">
                        <center>
                            <img src="https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg" alt="UserImage" style={{ width: "150px", height: "150px", borderRadius: "50%" }} />
                        </center>
                        <center><h1>Login Here</h1></center>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div class="row g-4">
                                <div class="col-12">
                                    <input type="email" class="form-control border-0 bg-light px-4" placeholder="Enter Email-id" style={{ height: "55px" }} id='logininput'
                                        {...register("email", { required: true })} />
                                </div>
                                {errors.email?.type === "required" && <p>Email is Required</p>}
                                <div class="col-12">
                                    <input type="password" class="form-control border-0 bg-light px-4" placeholder="Enter Password" style={{ height: "55px" }} id='logininput'
                                        {...register("password", { required: true })} />
                                </div>
                                {errors.password?.type === "required" && <p>Password is Required</p>}
                                <div class="col-12">
                                    <center>
                                        <button type="submit" id='loginbutton'>
                                            {loading ? 'Loading...' : 'Login'}
                                        </button>
                                    </center>
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

export default Login