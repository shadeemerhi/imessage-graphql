import { signOut } from "next-auth/react";
import React from "react";

interface FeedProps {}

const Feed: React.FC<FeedProps> = () => {
  return (
    <div>
      THIS IS FEED
      <button className="btn btn-primary" onClick={() => signOut()}>
        Logout
      </button>
    </div>
  );
};
export default Feed;
