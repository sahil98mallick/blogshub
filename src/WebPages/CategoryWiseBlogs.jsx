import React, { useEffect } from 'react'
import Sidebar from '../Common/Sidebar'
import Navbar from '../Common/Navbar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { categorywiseblogs } from '../Redux/BlogSlice/BlogSlice'
import Swal from 'sweetalert2'

const CategoryWiseBlogs = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.Auth);
    const { categorywiseblogdata, loading } = useSelector((state) => state.Blog);
    const { blogcategory } = useSelector((state) => state.Category);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(categorywiseblogs(id))
    }, [dispatch, id])

    // console.log("Category wise post", categorywiseblogdata);
    const removetags = (html) => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    }
    console.log(blogcategory);
    // Filter the category name
    const getCategoryName = () => {
        const category = blogcategory.find((category) => category._id === id);
        return category ? category?.category : 'Uncategorized';
    }

    const Unauthorized = () => {
        Swal.fire({
            title: 'You Are Not Authorized....',
            text: 'Plese Login First.',
            icon: 'warning',
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/Login')
            }
        });
    };
    return (
        <>
            {/* <!-- Navbar Start --> */}
            <Navbar />
            {/* <!-- Navbar End --> */}

            <div className="mainsection">
                {/* <!-- Blog Start --> */}
                <div class="container-fluid py-6 wow fadeInUp" data-wow-delay="0.1s">
                    <div class="container py-5">
                        <div class="row g-5">
                            {/* <!-- Blog list Start --> */}
                            <div class="col-lg-8">
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
                                                categorywiseblogdata?.length > 0 ? (
                                                    <>
                                                        <div class="row g-5">
                                                            <h3>Total Blog Found {categorywiseblogdata?.length}</h3>
                                                            {
                                                                categorywiseblogdata?.slice(0, 6)?.map((item, key) => {
                                                                    return (
                                                                        <>
                                                                            <div class="col-md-6 wow slideInUp" data-wow-delay="0.1s">
                                                                                <div class="blog-item bg-light rounded overflow-hidden" id='blogcarddesign'>
                                                                                    <div class="blog-img position-relative overflow-hidden">
                                                                                        <img class="img-fluid" src={`https://restapinodejs.onrender.com/api/blog/image/${item?._id}`} alt="" style={{ background: "cover", height: "200px", width: "100%" }} />
                                                                                        <a class="position-absolute top-0 start-0 bg-secondary text-white rounded-end mt-4 py-2 px-4" style={{ borderRadius: "50px" }}
                                                                                        >{getCategoryName(item?.category)}</a>
                                                                                    </div>
                                                                                    <div class="p-4">
                                                                                        <div class="d-flex mb-3" style={{ color: "black", fontSize: "16px", justifyContent: "space-evenly" }}>
                                                                                            <small class="me-3"><i class="far fa-user text-primary me-2"></i>John
                                                                                                Doe</small>
                                                                                            <small className='me-3'><i class="far fa-calendar-alt text-primary me-2"></i>01 Jan, 2045</small>
                                                                                            <small className='me-3'><i class="far fa-calendar-alt text-primary me-2"></i>{getCategoryName(item?.category)}</small>
                                                                                        </div>
                                                                                        <h4 class="mb-3">{item?.title?.slice(0, 30)}</h4>
                                                                                        <p>{removetags(item?.postText?.slice(0, 80))}....</p>
                                                                                        {
                                                                                            token ? (
                                                                                                <>
                                                                                                    <Link to={`/BlogDetails/${item?._id}`} id='blogcardbutton' class="text" >Read More <i class="bi bi-arrow-right"></i></Link>
                                                                                                </>
                                                                                            ) : (
                                                                                                <>
                                                                                                    <a onClick={() => { Unauthorized() }} id='blogcardbutton' class="text" >Read More <i class="bi bi-arrow-right"></i></a>
                                                                                                </>
                                                                                            )
                                                                                        }
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <center><h1>No Data Found Here for this Category</h1></center>
                                                    </>
                                                )
                                            }
                                        </>
                                    )
                                }
                            </div>
                            {/* <!-- Blog list End --> */}
                            {/* <!-- Sidebar Start --> */}
                            <Sidebar />
                            {/* <!-- Sidebar End --> */}
                        </div>
                    </div >
                </div >
                {/* <!-- Blog End --> */}
                < a href="#" class="btn btn-lg btn-warning btn-lg-square rounded back-to-top" > <i class="bi bi-arrow-up"></i></a >
            </div>
        </>
    )
}

export default CategoryWiseBlogs