"use client";
import { useSelector, useDispatch } from "react-redux";
import { addPost, deletePost } from "@/redux/slices/postsSlice";
import { useState } from "react";

export default function Posts() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const posts = useSelector((state: any) => state.posts);
  const dispatch = useDispatch();

  const handleAddPost = (e: any) => {
    e.preventDefault();
    if (!title && !description) return;
    const newPost = {
      id: Date.now(),
      title,
      description,
    };
    dispatch(addPost(newPost));
    setTitle("");
    setDescription("");
  };

  const handleRemovePost = (postId: any) => {
    dispatch(deletePost(postId));
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleAddPost} className="mb-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full py-2 px-4 border rounded text-black"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full py-2 px-4 border rounded mt-2 text-black"
        ></textarea>
        <button
          onClick={handleAddPost}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
        >
          Add New Post
        </button>
      </form>
      <h1 className="text-2xl font-bold">Posts</h1>
      {posts &&
        posts.map((post: any) => (
          <div key={post.id} className="border rounded p-4 mt-2">
            <h3 className="text-xl font-semibold">{post.title}</h3>
            <p className="mt-2">{post.description}</p>
            <button
              onClick={() => handleRemovePost(post.id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 mt-2 rounded"
            >
              Delete
            </button>
          </div>
        ))}
    </div>
  );
}
