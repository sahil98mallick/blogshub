import './App.css';
// import './css/bootstrap.min.css';
// import './css/style.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './WebPages/Home';
import Login from './WebPages/Login';
import Register from './WebPages/Register';
import Blog from './WebPages/Blog';
import Footer from './Common/Footer';
import BlogDetails from './WebPages/BlogDetails';
import Courses from './WebPages/Courses';
import Contact from './WebPages/Contact';
import SearchBlog from './WebPages/SearchBlog';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CategoryWiseBlogs from './WebPages/CategoryWiseBlogs';
import ApplyCourses from './WebPages/ApplyCourses';
import MyCourses from './WebPages/MyCourses';
import Topbar from './Common/Topbar';
function App() {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  function PrivateRoute({ children }) {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    return token !== null && token !== undefined ? (
      children
    ) : (
      <Navigate to="/Login" />
    );
  }

  const PublicRoute = [
    {
      path: "/",
      components: <Home />
    },
    {
      path: "/Login",
      components: token ? <Navigate to="/" /> : <Login />
    },
    {
      path: "/Register",
      components: token ? <Navigate to="/" /> : <Register />
    },
    {
      path: "/SearchBlog/:searchQuery",
      components: <SearchBlog />
    },
    {
      path: "/Blog",
      components: <Blog />
    },
    {
      path: "/Contact",
      components: <Contact />
    },
    {
      path: "/CategoryWiseBlogs/:id",
      components: <CategoryWiseBlogs />
    },
  ]
  const ProtectedRoute = [
    {
      path: "/MyCourses",
      components: <MyCourses />
    },
    {
      path: "/Courses",
      components: <Courses />
    },
    {
      path: "/BlogDetails/:id",
      components: <BlogDetails />
    },
    {
      path: "/ApplyCourses/:id",
      components: <ApplyCourses />
    },
  ]
  return (
    <>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Router>
        <Topbar />
        <Routes>
          {/* Public Route */}
          {
            PublicRoute?.map((item, key) => {
              return (
                <>
                  <Route
                    key={key + 1}
                    path={item.path}
                    element={item.components} />
                </>
              )
            })
          }
          {/* Private Route */}
          {
            ProtectedRoute?.map((item, key) => {
              return (
                <>
                  <Route
                    key={key + 1}
                    path={item.path}
                    element={<PrivateRoute>{item.components}</PrivateRoute>} />
                </>
              )
            })
          }
          {/* <Route path='/' element={<Home />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Register' element={<Register />} />
          <Route path='/Courses' element={<Courses />} />
          <Route path='/Contact' element={<Contact />} />
          <Route path='/Blog' element={<Blog />} />
          <Route path='/BlogDetails/:id' element={<BlogDetails />} />
          <Route path='/ApplyCourses/:id' element={<ApplyCourses />} />
          <Route path='/MyCourses' element={<MyCourses />} />
          <Route path='/SearchBlog/:searchQuery' element={<SearchBlog />} />
          <Route path='/CategoryWiseBlogs/:id' element={<CategoryWiseBlogs />} /> */}
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
