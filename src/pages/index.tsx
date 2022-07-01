import axios from "axios";
import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import React, { useState } from "react";
import Auth from "../components/Auth";
import Spinner from "../components/globals/Spinner";

const Home: NextPage = () => {
  const { data: session } = useSession();
  console.log("HERE IS SESSION", session);

  return (
    <div className="flex h-screen border border-red-500">
      {session && session?.user?.username ? (
        <div>
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
