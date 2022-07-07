import { useMutation, useQuery } from "@apollo/client";
import type { NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import Auth from "../components/Auth";
import PostOperations from "../graphql/operations/posts";

const Home: NextPage = () => {
  const { data: session } = useSession();
  console.log("HERE IS SESSION", session);

  return (
    <div className="flex h-screen border border-red-500">
      {session && session?.user?.username ? (
        <div>
          <div>WELCOME TO THE MESSAGING APPLICATION</div>
          <button className="btn btn-primary" onClick={() => signOut()}>
            Logout
          </button>
        </div>
      ) : (
        <Auth session={session} />
      )}
    </div>
  );
};

export default Home;
