import React, { useEffect } from 'react'
import Navbar from '../Common/Navbar'
import { fetchblogcategory } from '../Redux/CategorySlice/CategorySlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchlallcourses } from '../Redux/CourseSlice/CourseSlice';

const MyCourses = () => {
    const UserCourses = JSON.parse(localStorage.getItem("UserCourses"))?JSON.parse(localStorage.getItem("UserCourses")):null
    const dispatch = useDispatch();
    const { allcourses, loading } = useSelector((state) => state.Course);
    useEffect(() => {
        dispatch(fetchlallcourses())
    }, [dispatch])


    const getcoursename = (courseID) => {
        const coursedetails = allcourses.find((category) => category._id === courseID);
        return coursedetails ? coursedetails?.name : 'Uncategorized';
    }
    
    console.log(allcourses);
    return (
        <>
            {/* <!-- Navbar Start --> */}
            <Navbar />
            {/* <!-- Navbar End --> */}
            {/* <!-- Course Start --> */}
            <div className="mainsection">
                <br /><br />
                <center><h2>All Applied Courses</h2></center>
                <div className="tableconatiner">
                    <table class="table">
                        <thead className='tablehead'>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Course Name</th>
                                <th scope="col">Qualification</th>
                                <th scope="col">Applied Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {UserCourses?.length > 0 ? (
                                UserCourses.map((item, key) => (
                                    <tr key={key}>
                                        <th scope="row">{key + 1}</th>
                                        <td>{getcoursename(item.course)}</td>
                                        <td>{item?.qualification}</td>
                                        <td>{item?.createdAt?.slice(0, 10)}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4">No applied courses found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <br /><br /><br /><br />
            </div>
        </>
    )
}

export default MyCourses