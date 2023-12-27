import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { fetchblogcategory } from '../Redux/CategorySlice/CategorySlice';
import { BarLoader } from 'react-spinners';
import { fetchlatestposts } from '../Redux/BlogSlice/BlogSlice';
import Swal from 'sweetalert2';

const Sidebar = () => {
    const navigate = useNavigate();
    const { user, token } = useSelector((state) => state.Auth);
    const [searchQuery, setSearchQuery] = useState("");
    const { blogcategory, loading } = useSelector((state) => state.Category);
    const { latestpost } = useSelector((state) => state.Blog);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchblogcategory());
        dispatch(fetchlatestposts())
    }, [dispatch])
    // console.log(blogcategory);
    const handleSearch = () => {
        const encodedQuery = encodeURIComponent(searchQuery);
        navigate(`/SearchBlog/${encodedQuery}`);
        setSearchQuery("");
    };
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
            <div class="col-lg-4">
                <div class="wow slideInUp" data-wow-delay="0.2s">
                    <div class="section-title section-title-sm position-relative pb-3 mb-4">
                        <h3 class="mb-0">User Details</h3>
                    </div>
                    {
                        token ? (
                            <>
                                <div class="bg-light text-center" style={{ padding: "30px" }} id='usersprofile'>
                                    <h1>{user?.name}</h1>
                                    <h4>{user?.email}</h4>
                                    <Link class="btn btn-secondary py-2 px-4">Profile</Link>
                                </div>
                            </>
                        ) : (
                            <>
                                <div class="bg-light text-center" style={{ padding: "30px" }} id='usersprofile'>
                                    <h1>Not Login Yet</h1>
                                    <Link to='/Login' class="btn btn-secondary py-2 px-4">Login</Link>
                                </div>
                            </>
                        )
                    }
                </div>
                <br />
                <div class="mb-5 wow slideInUp" data-wow-delay="0.1s">
                    <div class="input-group" id='searchboxdesign'>
                        <input type="text" class="form-control p-3" placeholder="Enter Your Keyword"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    handleSearch();
                                }
                            }} />
                        <button class="btn btn-warning px-4"><i class="bi bi-search"></i></button>
                    </div>
                </div>
                <div class="mb-5 wow slideInUp" data-wow-delay="0.1s">
                    <div class="section-title section-title-sm position-relative pb-3 mb-4">
                        <h3 class="mb-0">Categories</h3>
                    </div>
                    <div class="link-animated d-flex flex-column justify-content-start">
                        {
                            loading ? (
                                <>
                                    <a class="h5 fw-semi-bold bg-light rounded py-2 px-3 mb-2" id='categorydesign'>
                                        <BarLoader color="#36d7b7" />
                                    </a>
                                </>
                            ) : (
                                <>
                                    {
                                        blogcategory?.map((item, key) => {
                                            return (
                                                <>
                                                    <Link to={`/CategoryWiseBlogs/${item._id}`} class="h5 fw-semi-bold bg-light rounded py-2 px-3 mb-2" id='categorydesign'><i
                                                        class="bi bi-arrow-right me-2"></i>{item?.category}</Link>
                                                </>
                                            )
                                        })
                                    }
                                </>
                            )
                        }
                    </div>
                </div>
                <div class="mb-5 wow slideInUp" data-wow-delay="0.1s">
                    <div class="section-title section-title-sm position-relative pb-3 mb-4">
                        <h3 class="mb-0">Recent Post</h3>
                    </div>
                    {
                        latestpost?.map((item, key) => {
                            return (
                                <>
                                    {
                                        !token ? (
                                            <>
                                                <div class="d-flex rounded overflow-hidden mb-4" id='recentpostdesign'>
                                                    <img class="img-fluid" src={`https://restapinodejs.onrender.com/api/blog/image/${item?._id}`}
                                                        style={{ width: "100px", height: "100px", objectFit: "cover" }} alt="blogimage" />
                                                    <a onClick={() => { Unauthorized() }} class="h6 fw-semi-bold d-flex align-items-center px-3 mb-0">
                                                        {item?.title}
                                                    </a>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div class="d-flex rounded overflow-hidden mb-4" id='recentpostdesign'>
                                                    <img class="img-fluid" src={`https://restapinodejs.onrender.com/api/blog/image/${item?._id}`}
                                                        style={{ width: "100px", height: "100px", objectFit: "cover" }} alt="blogimage" />
                                                    <Link to={`/BlogDetails/${item?._id}`} class="h6 fw-semi-bold d-flex align-items-center px-3 mb-0">
                                                        {item?.title}
                                                    </Link>
                                                </div>
                                            </>
                                        )
                                    }
                                </>
                            )
                        })
                    }
                </div>


                <div class="mb-5 wow slideInUp" data-wow-delay="0.1s">
                    <div class="section-title section-title-sm position-relative pb-3 mb-4">
                        <h3 class="mb-0">Tag Cloud</h3>
                    </div>
                    <div class="d-flex flex-wrap m-n1">
                        {
                            !loading ? (
                                <>
                                    {
                                        blogcategory?.map((item, key) => {
                                            return (
                                                <>
                                                    <a key={key + 1} class="btn btn-light m-1" id='tagclouddesign'>
                                                        {item?.category}
                                                    </a>
                                                </>
                                            )
                                        })
                                    }
                                </>
                            ) : (
                                <>
                                    <center><h3>No Tag Cloud Found</h3></center>
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar