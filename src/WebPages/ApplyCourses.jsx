import React from 'react'
import Navbar from '../Common/Navbar'
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addCourses } from '../Redux/CourseSlice/CourseSlice';

const ApplyCourses = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading } = useSelector((state) => state.Course)
    const { register, formState: { errors }, handleSubmit } = useForm();
    const onSubmit = async (data) => {
        console.log(data);
        dispatch(addCourses({ courseid: id, coursedata: data })).then((result) => {
            if (result.payload) {
                navigate('/Courses')
            }
        })
    }

    // console.log(id);
    return (
        <>
            {/* <!-- Navbar Start --> */}
            <Navbar />
            {/* <!-- Navbar End --> */}
            <div className="mainsection">
                <div className="coursescontainer" style={{ margin: "0 auto" }}>
                    <div class="col-lg-12">
                        <center>
                            <img src={`https://restapinodejs.onrender.com/api/course/photo/${id}`} alt="UserImage" style={{ width: "150px", height: "150px", borderRadius: "50%" }} />
                        </center>
                        <center><h3>Fill all the details Here</h3></center>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div class="row g-4">
                                <div class="col-md-6">
                                    <input type="text" class="form-control border-0 bg-light px-4" placeholder="Your Name" style={{ height: "55px" }}
                                        {...register("name", { required: true })}
                                    />
                                    {errors.name?.type === "required" && <p>Name is Required</p>}
                                </div>
                                {errors.name?.type === "required" && <p>Name is Required</p>}
                                <div class="col-md-6">
                                    <input type="number" class="form-control border-0 bg-light px-4" placeholder="Your Phone" style={{ height: "55px" }}
                                        {...register("phone", { required: true })} />
                                </div>
                                {errors.phone?.type === "required" && <p>Phone is Required</p>}
                                <div class="col-md-6">
                                    <input type="text" class="form-control border-0 bg-light px-4" placeholder="Your Qualification" style={{ height: "55px" }}
                                        {...register("qualification", { required: true })} />
                                </div>
                                {errors.qualification?.type === "required" && <p>Qualification is Required</p>}
                                <div class="col-md-6">
                                    <input type="text" class="form-control border-0 bg-light px-4" placeholder="Your City" style={{ height: "55px" }}
                                        {...register("city", { required: true })} />
                                </div>
                                {errors.city?.type === "required" && <p>City is Required</p>}
                                <div class="col-md-6">
                                    <input type="text" class="form-control border-0 bg-light px-4" placeholder="Your Programming Knowledge" style={{ height: "55px" }}
                                        {...register("programing_knowledge", { required: true })} />
                                </div>
                                {errors.programing_knowledge?.type === "required" && <p>Programing Knowledge is Required</p>}
                                <div class="col-md-6">
                                    <input type="text" class="form-control border-0 bg-light px-4" placeholder="Your Experience" style={{ height: "55px" }}
                                        {...register("experiance", { required: true })} />
                                </div>
                                {errors.experiance?.type === "required" && <p>Experiance is Required</p>}
                                <div class="col-12">
                                    <input type="email" class="form-control border-0 bg-light px-4" placeholder="Your Email-id" style={{ height: "55px" }}
                                        {...register("email", { required: true })} />
                                </div>
                                {errors.email?.type === "required" && <p>Email is Required</p>}
                                <div class="col-12">
                                    <input type="text" class="form-control border-0 bg-light px-4" placeholder="Your Address" style={{ height: "75px" }}
                                        {...register("address", { required: true })} />
                                </div>
                                {errors.address?.type === "required" && <p>Address is Required</p>}
                                <center>
                                    <button className='btn btn-primary' type="submit" style={{ borderRadius: "50px", width: "100px" }}>
                                        {loading ? 'Loadding' : "Apply"}
                                    </button>
                                </center>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <br /><br />
        </>
    )
}

export default ApplyCourses