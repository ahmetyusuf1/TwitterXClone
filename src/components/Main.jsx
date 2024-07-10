import { useEffect, useState } from "react";
import Form from "./Form";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/config";
import Loader from "./Loader";
import Post from "./Post/Post";

const Main = ({ user }) => {
  const [tweets, setTweets] = useState(null);

  const tweetsCol = collection(db, "tweets");

  useEffect(() => {
    const q = query(tweetsCol, orderBy("createdAt", "desc"));

    const unsub = onSnapshot(q, (snapshot) => {
      const tempTweets = [];

      snapshot.forEach((doc) => {
        tempTweets.push({ id: doc.id, ...doc.data() });
      });

      setTweets(tempTweets);
    });

    return () => unsub;
  }, []);

  return (
    <main className="border-l border-r border-gray-500 overflow-y-auto">
      <header className="p-4 text-xl font-bold border-b border-b-gray-500">
        Home
      </header>
      <Form user={user} />
      {!tweets ? (
        <Loader style={"w-8 h-8 mx-auto my-12"} />
      ) : (
        tweets.map((tweet, index) => <Post key={index} tweet={tweet} />)
      )}
    </main>
  );
};

export default Main;
