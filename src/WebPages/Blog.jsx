import React, { useEffect, useState } from 'react'
import Navbar from '../Common/Navbar'
import Sidebar from '../Common/Sidebar'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchblogs } from '../Redux/BlogSlice/BlogSlice'
import { fetchblogcategory } from '../Redux/CategorySlice/CategorySlice'
import Swal from 'sweetalert2'

const Blog = () => {
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.Auth);
    const [loadmore, setloadmore] = useState(4);
    const { blogs, loading } = useSelector((state) => state?.Blog);
    const { blogcategory } = useSelector((state) => state.Category);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchblogs())
        dispatch(fetchblogcategory())
    }, [dispatch])

    // Remove unncessary elements here
    const removetags = (html) => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    }
    console.log(blogcategory);
    // Filter the category name
    const getCategoryName = (categoryId) => {
        const category = blogcategory.find((category) => category._id === categoryId);
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

    // Pagination Code
    const itemsPerPage = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = blogs.slice(indexOfFirstItem, indexOfLastItem);
    const totalPageCount = Math.ceil(blogs.length / itemsPerPage);
    const paginate = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPageCount) {
            setCurrentPage(pageNumber);
        }
    };
    return (
        <>
            {/* <!-- Navbar Start --> */}
            <Navbar />
            {/* <!-- Navbar End --> */}

            {/* Main Section */}
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
                                            <div class="row g-5">
                                                {
                                                    currentItems?.map((item, key) => {
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
                                    )
                                }
                                <br />
                                <div id='paginationdesign'>
                                    <nav aria-label="Page navigation example">
                                        <ul className="pagination">
                                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                                <a className="page-link" href="#" onClick={() => paginate(currentPage - 1)}>
                                                    <span aria-hidden="true">&laquo;</span>
                                                </a>
                                            </li>
                                            {Array.from({ length: totalPageCount }, (_, index) => (
                                                <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                                    <a className="page-link" href="#" onClick={() => paginate(index + 1)}>
                                                        {index + 1}
                                                    </a>
                                                </li>
                                            ))}
                                            <li className={`page-item ${currentPage === totalPageCount ? 'disabled' : ''}`}>
                                                <a className="page-link" href="#" onClick={() => paginate(currentPage + 1)}>
                                                    <span aria-hidden="true">&raquo;</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
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

export default Blog