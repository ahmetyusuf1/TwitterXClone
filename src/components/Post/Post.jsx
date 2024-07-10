import { AiOutlineHeart } from "react-icons/ai";
import { BiMessageRounded } from "react-icons/bi";
import { LiaRetweetSolid } from "react-icons/lia";
import { FcLike } from "react-icons/fc";
import { FiShare2 } from "react-icons/fi";
import moment from "moment";
import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../../firebase/config";
import Dropdown from "./Dropdown";
import { useState } from "react";
import EditMode from "./EditMode";

const Post = ({ tweet }) => {
  const [isEditedMode, setIsEditedMode] = useState(false);

  const isLiked = tweet.likes.includes(auth.currentUser.uid);

  const date = moment(tweet?.createdAt?.toDate()).fromNow();

  const handleLike = async () => {
    const ref = doc(db, "tweets", tweet.id);

    await updateDoc(ref, {
      likes: isLiked
        ? arrayRemove(auth.currentUser.uid)
        : arrayUnion(auth.currentUser.uid),
    });
  };

  const handleDelete = async () => {
    if (confirm("Do you agree to delete the tweet?")) {
      const tweetRef = doc(db, "tweets", tweet.id);

      await deleteDoc(tweetRef);
    }
  };

  return (
    <div className="relative flex gap-3 py-6 px-3 border-b border-gray-700">
      <img className="w-12 h-12 rounded-full" src={tweet.user.image} />
      <div className="w-full">
        <div className="flex justify-between">
          <div className="flex items-center gap-4 whitespace-nowrap">
            <p className="font-bold">{tweet.user.name}</p>
            <p className="text-gray-500">{tweet.user.name}</p>
            <p className="text-gray-500">{date}</p>
            {tweet.isEdited && <p className="text-gray-500 text-xs">Edited</p>}
          </div>
          {tweet.user.id == auth.currentUser.uid && (
            <Dropdown
              handleDelete={handleDelete}
              setIsEditedMode={setIsEditedMode}
            />
          )}
        </div>
        <div className="my-4">
          {isEditedMode && (
            <EditMode tweet={tweet} close={() => setIsEditedMode(false)} />
          )}

          {tweet.textContent && !isEditedMode && <p>{tweet.textContent}</p>}
          {tweet.imageContent && !isEditedMode && (
            <img
              src={tweet.imageContent}
              className="my-2 rounded w-full object-cover max-h-96"
            />
          )}
        </div>
        <div className="flex justify-between">
          <div className="flex items-center justify-center gap-2 py-2 px-3 rounded-full cursor-pointer transition">
            <BiMessageRounded size={20} />
          </div>
          <div className="flex items-center justify-center gap-2 py-2 px-3 rounded-full cursor-pointer transition">
            <LiaRetweetSolid size={20} />
          </div>
          <div
            onClick={handleLike}
            className="flex items-center justify-center gap-2 py-2 px-3 rounded-full cursor-pointer transition"
          >
            {isLiked ? <FcLike size={20} /> : <AiOutlineHeart size={20} />}
            <span className="select-none">{tweet.likes.length}</span>
          </div>
          <div className="flex items-center justify-center gap-2 py-2 px-3 rounded-full cursor-pointer transition">
            <FiShare2 size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
