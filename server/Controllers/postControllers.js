import postMessage from "../model/postSchema.js";
import mongoose from "mongoose";

export const getPosts = async (req, res) => {
  try {
    const postMessages = await postMessage.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const reqBody = req.body;
  try {
    const Post = new postMessage(reqBody);
    const newPost = await Post.save();
    // 201 successful creation
    res.status(201).json(newPost);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    res.status(404).send("No post with that id");
  const updatePost = await postMessage.findOneAndUpdate({ _id }, post, {
    new: true,
  });
  res.status(200).json(updatePost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    res.status(404).send("No post with that id");
  await postMessage.findByIdAndDelete(id);
  res.status(200).json({ message: "Deleted successfully" });
};

export const likePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    res.status(404).send("No post with that id");

  const post = await postMessage.findById(id);
  const updatePost = await postMessage.findByIdAndUpdate(
    id,
    { likeCount: post.likeCount + 1 },
    { new: true }
  );
  res.status(200).json(updatePost);
};
