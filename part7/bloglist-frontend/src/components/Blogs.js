import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { blogLike, removeBlog } from "../reducers/blogReducer";
import { changeNotification } from "../reducers/notificationReducer";
import Blog from "./Blog";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";

const Blogs = () => {
    const dispatch = useDispatch();
    const blogs = useSelector((state) => state.blogs);
    const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);
    const blogFormRef = useRef();

    const handleLike = (blog) => {
        dispatch(blogLike(blog));
        dispatch(
            changeNotification(`You liked ${blog.title} by ${blog.author}`)
        );
    };
    const handleBlogToDelete = (blog) => dispatch(removeBlog(blog));

    const loggedUser = useSelector((state) => state.loggedinUser);
    return (
        <div>
            <Togglable buttonLabel="new blog post" ref={blogFormRef}>
                <BlogForm />
            </Togglable>
            <h2>bloglist</h2>

            <div className="blogs">
                {sortedBlogs.map((blog) => (
                    <Blog
                        key={blog.id}
                        blog={blog}
                        handleLikes={() => handleLike(blog)}
                        handleDelete={() => handleBlogToDelete(blog)}
                        loggedUser={loggedUser}
                    />
                ))}
            </div>
        </div>
    );
};

export default Blogs;
