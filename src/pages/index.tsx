import axios from "axios";
import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import React, { useState } from "react";
import Spinner from "../components/globals/Spinner";

const Home: NextPage = () => {
  const { data: session } = useSession();

  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!username) return;

    setLoading(true);

    try {
      await axios.post("/api/hello", {
        username,
      });
      reloadSession();
    } catch (error) {
      console.log("onSubmit error", error);
    }
  };

  const reloadSession = () => {
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
    setLoading(false);
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col border border-red-600">
        {session?.user ? (
          <>
            <button onClick={() => signOut()}>Sign Out</button>
            {session.user.username ? (
              <div>Welcome {session.user.username}</div>
            ) : (
              <form onSubmit={onSubmit}>
                <input
                  placeholder="Enter a username"
                  value={username}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setUsername(event.target.value)
                  }
                />
                <button type="submit">Save</button>
                {loading && <span>LOADING</span>}
              </form>
            )}
          </>
        ) : (
          <button onClick={() => signIn("google")}>Login With Google</button>
        )}
        <h1 className="text-3xl font-bold">Hello world!</h1>
        <button className="btn btn-primary">Button</button>
        <Spinner />
      </div>
    </div>
  );
};

export default Home;
