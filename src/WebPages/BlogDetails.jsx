import React, { useEffect, useState } from 'react'
import Sidebar from '../Common/Sidebar'
import Navbar from '../Common/Navbar'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchsingleblogs } from '../Redux/BlogSlice/BlogSlice'
import { addBlogComment, fetchblogcomments } from '../Redux/CommentSlice/CommentSlice'
import { useForm } from 'react-hook-form'
import { instance } from '../API/AxiosInstance'
import { toast } from 'react-toastify'

const BlogDetails = () => {
    const [like, setlike] = useState(true);
    const [loadbtn, setloadbtn] = useState(false)
    const [dislike, setdislike] = useState(true);
    const [loadcomment, setloadcomment] = useState(3);
    const { id } = useParams();
    const dispatch = useDispatch()
    const { singleblog, loading } = useSelector((state) => state.Blog);
    const { blogcomments, commentloading } = useSelector((state) => state.Comment);
    useEffect(() => {
        dispatch(fetchsingleblogs(id))
        dispatch(fetchblogcomments(id))
    }, [dispatch, id])
    const removetags = (html) => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    }
    // Load More Comment Part
    const morecomment = () => {
        setloadcomment(loadcomment + 3)
    }
    // Add Comments
    const { register, formState: { errors }, handleSubmit, setValue } = useForm();
    const onSubmit = (data) => {
        // console.log(data);
        dispatch(addBlogComment({ blogId: id, commentData: data })).then((result) => {
            if (result.payload) {
                setValue("name", "")
                setValue("email", "")
                setValue("comment", "")
            }
        })
    }

    const sortedComments = [...blogcomments]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, loadcomment);

    // Like Function
    const likework = async () => {
        try {
            const likedata = await instance.put(`blog/like/${id}`);
            if (likedata.data) {
                setlike(false);
                setloadbtn(true);
                toast.success("You Liked");
                const savedData = JSON.parse(localStorage.getItem("likedData")) || {};
                savedData[id] = true;
                localStorage.setItem("likedData", JSON.stringify(savedData));
            } else {
                setlike(false);
                setloadbtn(false);
                const savedData = JSON.parse(localStorage.getItem("likedData")) || {};
                savedData[id] = false;
                localStorage.setItem("likedData", JSON.stringify(savedData));
            }
        } catch (error) {
            console.log(error.message);
        }
    }
    const unlikework = async () => {
        try {
            const dislikedata = await instance.put(`blog/unlike/${id}`);
            if (dislikedata.data) {
                setdislike(false);
                setloadbtn(true);
                toast.success("You unLiked");
                const savedData = JSON.parse(localStorage.getItem("dislikedData")) || {};
                savedData[id] = true;
                localStorage.setItem("dislikedData", JSON.stringify(savedData));
            } else {
                setdislike(false);
                setloadbtn(false);
                const savedData = JSON.parse(localStorage.getItem("dislikedData")) || {};
                savedData[id] = false;
                localStorage.setItem("dislikedData", JSON.stringify(savedData));
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const likedData = JSON.parse(localStorage.getItem("likedData")) || {};
    const isLiked = likedData[id] === true;
    const dislikedData = JSON.parse(localStorage.getItem("dislikedData")) || {};
    const isdisLiked = dislikedData[id] === true;
    return (
        <>
            <Navbar />
            <div className="mainsection">
                <div class="container-fluid py-5 wow fadeInUp" data-wow-delay="0.1s">
                    <div class="container py-5">
                        <div class="row g-5">
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
                                            <div class="mb-5">
                                                <img class="img-fluid w-100 rounded mb-5" src={`https://restapinodejs.onrender.com/api/blog/image/${singleblog?._id}`} alt="" id='blogdetailsimage' />
                                                <h1 class="mb-4">{singleblog?.title}</h1>
                                                <div id='commentslikesdislikes'>
                                                    <div className="totalcomments">
                                                        <b>Total Comments: {blogcomments?.length}</b>
                                                    </div>
                                                    <div className="totallikes">
                                                        <b>Total Likes: {singleblog?.likes}</b>
                                                    </div>
                                                    <div className="totaldislikes">
                                                        <b>Total Dislikes: {singleblog?.unlikes}</b>
                                                    </div>

                                                </div>
                                                <p style={{ textAlign: "justify" }}>{removetags(singleblog?.postText)}</p>
                                                <h5>Did you Like this Post?... (Like Or Dislike Here)</h5>
                                                <div className="buttonlike">

                                                    {
                                                        isLiked ? (
                                                            <>
                                                                {
                                                                    isdisLiked ? (
                                                                        <>
                                                                            <button className='btn btn-danger' disabled={loadbtn}><i class='bx bxs-dislike' ></i></button>
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <button className='btn btn-danger' onClick={unlikework}><i class='bx bxs-dislike' ></i></button>
                                                                        </>
                                                                    )
                                                                }
                                                            </>
                                                        ) : (
                                                            <>
                                                                <button className='btn btn-primary' onClick={likework}><i class='bx bxs-like'></i></button>
                                                            </>
                                                        )
                                                    }
                                                    <button className='btn btn-success'><i class='bx bxl-google'></i></button>
                                                    <button className='btn btn-primary'><i class='bx bxl-whatsapp-square' ></i></button>
                                                </div>
                                            </div>
                                            <div id='commentboxdesign'>
                                                <div class="mb-6" style={{ padding: "20px" }}>
                                                    {
                                                        blogcomments?.length > 0 ? (
                                                            <>
                                                                <div class="section-title section-title-sm position-relative pb-3 mb-4">
                                                                    <h3 class="mb-0">{blogcomments?.length} Comments</h3>
                                                                </div>
                                                                {
                                                                    sortedComments?.slice(0, loadcomment)?.map((item, key) => {
                                                                        return (
                                                                            <>
                                                                                <div class="d-flex mb-5" key={key + 1}>
                                                                                    <img src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png" class="img-fluid rounded" style={{ width: "45px", height: "45px" }} />
                                                                                    <div class="ps-3">
                                                                                        <h6><a href="">{item?.name}</a>&nbsp;&nbsp;<small><i>Created At: {item?.createdAt?.slice(0, 10)}</i></small></h6>
                                                                                        <p>{item?.comment}</p>
                                                                                    </div>
                                                                                </div>
                                                                            </>
                                                                        )
                                                                    })
                                                                }
                                                                {
                                                                    loadcomment < blogcomments.length && <button
                                                                        style={{ marginLeft: "30px" }} onClick={morecomment} className='btn btn-warning btn-sm' color='warning'>More</button>
                                                                }
                                                            </>
                                                        ) : (
                                                            <>
                                                                <div class="section-title section-title-sm position-relative pb-3 mb-4">
                                                                    <h3 class="mb-0">No Comments</h3>
                                                                </div>

                                                            </>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                            <br /><br />
                                            <div class="bg-light rounded p-5" id='commentbox'>
                                                <div class="section-title section-title-sm position-relative pb-3 mb-4">
                                                    <h3 class="mb-0">Leave A Comment</h3>
                                                </div>
                                                <form onSubmit={handleSubmit(onSubmit)}>
                                                    <div class="row g-3">
                                                        <div class="col-12 col-sm-6">
                                                            <input type="text" class="form-control bg-white border-0" placeholder="Your Name" style={{ height: "55px" }}
                                                                {...register("name", { required: true })} />
                                                        </div>
                                                        <div class="col-12 col-sm-6">
                                                            <input type="email" class="form-control bg-white border-0" placeholder="Your Email" style={{ height: "55px" }}
                                                                {...register("email", { required: true })} />
                                                        </div>
                                                        <div class="col-12">
                                                            <textarea class="form-control bg-white border-0" rows="5" placeholder="Your Comments"
                                                                {...register("comment", { required: true })} />
                                                        </div>
                                                        <div class="col-12">
                                                            <button class="btn btn-warning" type="submit" style={{ borderRadius: "20px", padding: "10px" }}>
                                                                {commentloading ? 'Loading.....' : 'Leave Your Comment'}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </>
                                    )
                                }
                            </div>
                            {/* Sidebar */}
                            <Sidebar />
                        </div>
                    </div>
                </div>
                <a href="#" class="btn btn-lg btn-warning btn-lg-square rounded back-to-top"><i class="bi bi-arrow-up"></i></a>
            </div>
        </>
    )
}

export default BlogDetails