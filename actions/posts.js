"use server";
//check for server-only npm package in next.js docs
//it can be used for better security & ensure the code only runs on server
import { redirect } from "next/navigation";
import { storePost } from "@/lib/posts";
import { uploadImage } from "@/lib/cloudinary";

//this is used to define server actions inside its own file
//server actions can be organized to a folder in actions folder(any name)
//multiple server actions can be added to this file itself

export async function createPost(prevState, formData) {
  //the below is added if server actions is defined inside a component file
  //"use server"; //add this to convert a function into server action - a function which executes on server
  //server actions should also be async functions
  const title = formData.get("title");
  const image = formData.get("image");
  const content = formData.get("content");

  let errors = [];

  if (!title || title.trim().length === 0) {
    errors.push("Title is required.");
  }

  if (!content || content.trim().length === 0) {
    errors.push("Content is required.");
  }

  if (!image || image.size === 0) {
    errors.push("Image is required.");
  }

  if (errors.length > 0) {
    return { errors };
  }

  let imageUrl;

  try {
    imageUrl = await uploadImage(image);
  } catch (error) {
    throw new Error(
      "Image upload failed, post was not created. Please try again later."
    );
  }

  await storePost({
    imageUrl: imageUrl,
    title,
    content,
    userId: 1,
  });

  redirect("/feed");
}
