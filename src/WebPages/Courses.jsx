import React, { useEffect } from 'react'
import Navbar from '../Common/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { fetchlallcourses } from '../Redux/CourseSlice/CourseSlice';
import { Link } from 'react-router-dom';

const Courses = () => {
  const dispatch = useDispatch();
  const { allcourses, loading } = useSelector((state) => state.Course);
  useEffect(() => {
    dispatch(fetchlallcourses())
  }, [dispatch])
  return (
    <>
      {/* <!-- Navbar Start --> */}
      <Navbar />
      {/* <!-- Navbar End --> */}
      <div className="mainsection">
        {/* <!-- Courses Start --> */}
        <div class="container-fluid py-5 wow fadeInUp" data-wow-delay="0.1s">
          <div class="container">
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
                                <div>
                                  <img src={`https://restapinodejs.onrender.com/api/course/photo/${item?._id}`} alt="Coursesimage" style={{ width: "70%", height: "130px", borderRadius: "50px" }} />
                                </div>
                                <h4 class="mb-3">{item?.name}</h4>
                                <p class="m-0">{item?.requirement}</p>
                                <hr />
                                <div style={{ display: 'flex', justifyContent: "space-evenly", width: "100%" }}>
                                  <p class="m-0">Duration: {item?.duration}</p>
                                  <p class="m-0">Fees: {item?.fees}</p>
                                </div>
                                <Link to={`/ApplyCourses/${item?._id}`} class="btn btn-lg btn-primary rounded" href="">
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
      </div>
    </>
  )
}

export default Courses