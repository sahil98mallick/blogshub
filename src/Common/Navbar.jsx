import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { fetchblogcategory } from '../Redux/CategorySlice/CategorySlice';
import { logout, logoutUser } from '../Redux/AuthSlice/AuthSlice';
import Swal from 'sweetalert2';
import { workingprogress } from '../CustomFunction/CustomFunction';

const Navbar = () => {
  const navigate = useNavigate()
  const { token, user } = useSelector((state) => state.Auth);
  const { blogcategory, loading } = useSelector((state) => state.Category);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchblogcategory());
  }, [dispatch])
  console.log(blogcategory);
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
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
      <nav class="navbar navbar-expand-lg navbar-dark px-5 py-3 py-lg-0" id='navbardesignpart'>
        <Link to='/' class="navbar-brand p-0">
          <h1 class="m-0" style={{ color: "#F5B041" }}><i class="fa fa-newspaper"></i>&nbsp;Blog Hub</h1>
        </Link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
          <span class="fa fa-bars"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <div class="navbar-nav ms-auto py-0">
            <Link to='/' class="nav-item nav-link">Home</Link>
            {
              !token ? (
                <>
                  <a onClick={() => { Unauthorized() }} class="nav-item nav-link">Courses</a>
                </>
              ) : (
                <><Link to='/Courses' class="nav-item nav-link">Courses</Link></>
              )
            }
            {/* <Link to='/Courses' class="nav-item nav-link">Courses</Link> */}
            <Link to='/Contact' class="nav-item nav-link">Contact</Link>
            <Link to='/Blog' class="nav-item nav-link">Blogs</Link>
            <div class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown">Category</a>
              <div class="dropdown-menu m-0">
                {
                  blogcategory?.map((item, key) => {
                    return (
                      <>
                        <Link to={`/CategoryWiseBlogs/${item._id}`} class="dropdown-item">{item?.category}</Link><br />
                      </>
                    )
                  })
                }
              </div>
            </div>
            <div class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown">Accounts</a>
              <div class="dropdown-menu m-0">
                {
                  token ? (
                    <>
                      <a className="dropdown-item">{user?.name}</a>
                      <a onClick={() => { workingprogress() }} className="dropdown-item">Profile</a>
                      <Link to='/MyCourses' className="dropdown-item">My Courses</Link>
                      <a className="dropdown-item" onClick={handleLogout}>
                        Logout
                      </a>
                    </>
                  ) : (
                    <>
                      <Link to='/Login' className="dropdown-item">Login</Link>
                      <Link to='/Register' className="dropdown-item">Register</Link>
                      <a onClick={workingprogress} className="dropdown-item">Forgot Password</a>
                    </>
                  )
                }
              </div>
            </div>
          </div>
          <a class="btn btn-warning py-2 px-4 ms-3" style={{ borderRadius: "20px" }}>Subscribe Now</a>
        </div>
      </nav>
    </>
  )
}

export default Navbar