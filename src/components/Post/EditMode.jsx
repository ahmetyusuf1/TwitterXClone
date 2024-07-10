import { doc, updateDoc } from "firebase/firestore";
import { useRef, useState } from "react";
import { BiSolidSave } from "react-icons/bi";
import { ImCancelCircle } from "react-icons/im";
import { db } from "../../firebase/config";
import { BsTrashFill } from "react-icons/bs";
import { IoMdReturnLeft } from "react-icons/io";

const EditMode = ({ tweet, close }) => {
  const inputRef = useRef();

  const [isImgDeleting, setIsImgDeleting] = useState(false);

  const handleSave = async () => {
    const newText = inputRef.current.value;

    const tweetRef = doc(db, "tweets", tweet.id);

    if (isImgDeleting) {
      await updateDoc(tweetRef, {
        textContent: newText,
        imageContent: null,
        isEdited: true,
      });
    } else {
      await updateDoc(tweetRef, {
        textContent: newText,
        isEdited: true,
      });
    }

    close();
  };
  return (
    <div>
      <input
        defaultValue={tweet.textContent}
        ref={inputRef}
        type="text"
        className="rounded p-1 px-2 text-black"
      />
      <button
        onClick={handleSave}
        className="mx-5 p-2 text-green-400 rounded-full shadow hover:shadow-green-500"
      >
        <BiSolidSave />
      </button>
      <button
        onClick={close}
        className="mx-5 p-2 text-red-400 rounded-full shadow hover:shadow-red-500"
      >
        <ImCancelCircle />
      </button>

      {tweet.imageContent && (
        <div className="relative">
          <img
            className="my-2 rounded-md w-full object-cover max-h-96"
            src={tweet.imageContent}
          />
          <button
            onClick={() => setIsImgDeleting(!isImgDeleting)}
            className="absolute top-0 right-0 text-xl p-2 bg-white transition text-red-600 hover:scale-90 rounded-full"
          >
            {isImgDeleting ? <IoMdReturnLeft /> : <BsTrashFill />}
          </button>
        </div>
      )}
    </div>
  );
};

export default EditMode;
