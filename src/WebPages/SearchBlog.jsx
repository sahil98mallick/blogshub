import React, { useEffect } from 'react'
import Sidebar from '../Common/Sidebar'
import Navbar from '../Common/Navbar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchblogs } from '../Redux/BlogSlice/BlogSlice'
import { fetchblogcategory } from '../Redux/CategorySlice/CategorySlice'
import Swal from 'sweetalert2'

const SearchBlog = () => {
    const { searchQuery } = useParams();
    console.log(searchQuery);
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.Auth);
    const { blogs, loading } = useSelector((state) => state.Blog);
    const { blogcategory } = useSelector((state) => state.Category);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchblogs())
        dispatch(fetchblogcategory())
    }, [dispatch])
    const removetags = (html) => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    }
    const getCategoryName = (categoryId) => {
        const category = blogcategory.find((category) => category._id === categoryId);
        return category ? category?.category : 'Uncategorized';
    }
    // Filter the allblog data based on the searchQuery
    const filteredBlogs = blogs.filter((blog) => {
        // Check if searchQuery is found in the title, category name, or postText
        const searchQueryLower = searchQuery.toLowerCase();
        const titleLower = blog.title.toLowerCase();
        const categoryNameLower = getCategoryName(blog.category).toLowerCase();
        const postTextLower = removetags(blog.postText).toLowerCase();

        return (
            titleLower.includes(searchQueryLower) ||
            categoryNameLower.includes(searchQueryLower) ||
            postTextLower.includes(searchQueryLower)
        );
    });

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

    // console.log("filtered blogs are", filteredBlogs);
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
                                                filteredBlogs?.length > 0 ? (
                                                    <>
                                                        <div class="row g-5">
                                                            <h3>Search Result: {searchQuery}</h3>
                                                            {
                                                                filteredBlogs?.slice(0, 6)?.map((item, key) => {
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
                                                                                            !token ? (
                                                                                                <>
                                                                                                    <a onClick={() => { Unauthorized() }} id='blogcardbutton' class="text" >Read More <i class="bi bi-arrow-right"></i></a>
                                                                                                </>
                                                                                            ) : (
                                                                                                <>
                                                                                                    <Link to={`/BlogDetails/${item?._id}`} id='blogcardbutton' class="text" >Read More <i class="bi bi-arrow-right"></i></Link>
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
                    </div>
                </div >
                {/* <!-- Blog End --> */}
                <a href="#" class="btn btn-lg btn-warning btn-lg-square rounded back-to-top"><i class="bi bi-arrow-up"></i></a>
            </div>
        </>
    )
}

export default SearchBlog