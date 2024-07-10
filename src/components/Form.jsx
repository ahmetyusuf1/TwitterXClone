import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { BsCardImage } from "react-icons/bs";
import { db, storage } from "../firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuid } from "uuid";
import { toast } from "react-toastify";
import { useState } from "react";
import Loader from "./Loader";

const Form = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);

  const tweetsCollection = collection(db, "tweets");

  const uploadImage = async (file) => {
    if (!file || !file.type.startsWith("image")) return null;

    const fileRef = ref(storage, uuid() + file.name);

    await uploadBytes(fileRef, file);

    return await getDownloadURL(fileRef);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const textContent = e.target[0].value;
    const imageContent = e.target[1].files[0];

    if (!textContent && !imageContent)
      return toast.info("Please enter the content");

    setIsLoading(true);

    const url = await uploadImage(imageContent);

    await addDoc(tweetsCollection, {
      textContent,
      imageContent: url,
      createdAt: serverTimestamp(),
      user: {
        id: user.uid,
        name: user.displayName,
        image: user.photoURL,
      },
      likes: [],
      isEdited: false,
    });

    e.target.reset();

    setIsLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-4 p-4 border-b border-b-gray-500"
    >
      <img
        className="w-9 h-9 md:w-10 md:h-10 rounded-full"
        src={user?.photoURL}
      />
      <div className="w-full ">
        <input
          type="text"
          className="w-full bg-transparent outline-none mb-2 md:text-lg"
          placeholder="What's going on?"
        />
        <div className="flex items-center justify-between">
          <label
            className="flex items-center justify-center rounded-full transition hover:bg-gray-600 p-4 cursor-pointer"
            htmlFor="imageInput"
          >
            <BsCardImage size={20} />
          </label>
          <input id="imageInput" type="file" className="hidden" />
          <button
            disabled={isLoading}
            className="bg-blue-600 py-2 px-6 rounded-full transition hover:bg-blue-800"
          >
            {isLoading ? <Loader style={"w-5 h-5"} /> : "Tweet"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
