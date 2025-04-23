import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Blog.css";
import video from "../assets/video7.mp4";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [text, setText] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("http://localhost:5009/blogs");
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const handlePost = async () => {
    if (!name || !place || (!text && !videoUrl)) {
      alert("Please fill in Name, Place, and at least one content field!");
      return;
    }

    try {
      await axios.post("http://localhost:5009/blogs", { name, place, text, videoUrl });
      fetchBlogs(); // Refresh posts
      setName("");
      setPlace("");
      setText("");
      setVideoUrl("");
    } catch (error) {
      console.error("Error posting blog:", error);
    }
  };

  return (
    <div className="blog-container">
        <video className="video-background" autoPlay loop muted>
                      <source src={video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
      <h1>Coastal Tourism Blog 🌊</h1>

      {/* Blog Post Form */}
      <div className="blog-form">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Place of Experience"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
        />
        <textarea
          placeholder="Share your coastal experience..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input
          type="text"
          placeholder="YouTube Video URL (optional)"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
        />
        <button onClick={handlePost}>Post</button>
      </div>

      {/* Blog Posts */}
      <div className="blog-posts">
        {posts.length === 0 ? <p>No posts yet. Be the first to share!</p> : null}
        {posts.map((post) => (
          <div key={post._id} className="blog-post">
            <h3>{post.name} - <span>{post.place}</span></h3>
            <p>{post.text}</p>
            {post.videoUrl && (
              <iframe
                width="100%"
                height="250"
                src={post.videoUrl.replace("watch?v=", "embed/")}
                title="YouTube Video"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;