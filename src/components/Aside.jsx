import { collection, count, getAggregateFromServer } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";

const Aside = () => {
  const [tweetsCount, setTweetsCount] = useState(null);

  useEffect(() => {
    getAggregateFromServer(collection(db, "tweets"), {
      tweetsCount: count(),
    }).then((res) => setTweetsCount(res.data().tweetsCount));
  }, []);

  return (
    <div className="max-lg:hidden">
      <p>Total tweets: {tweetsCount}</p>
    </div>
  );
};

export default Aside;
