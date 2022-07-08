import { signOut } from "next-auth/react";
import React from "react";

interface FeedProps {}

const Feed: React.FC<FeedProps> = () => {
  return (
    <div className="w-full border border-blue-500">
      <button className="btn btn-primary" onClick={() => signOut()}>
        Logout
      </button>
    </div>
  );
};
export default Feed;
