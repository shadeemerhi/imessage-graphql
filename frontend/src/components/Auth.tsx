import axios from "axios";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import React, { useState } from "react";

interface AuthProps {
  session: Session | null;
}

const Auth: React.FC<AuthProps> = ({ session }) => {
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
    <div className="flex w-full justify-center items-center border-2 border-blue-900">
      <div className="flex flex-col items-center w-1/3">
        {session ? (
          <>
            <p className="text-2xl text-gray-100">Create a Username</p>
            <form
              className="flex flex-col items-center w-full"
              onSubmit={onSubmit}
            >
              <input
                className="input input-bordered w-full max-w-xs my-6"
                placeholder="Enter a username"
                value={username}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setUsername(event.target.value)
                }
              />
              <button
                className={`btn btn-info w-1/3 ${loading && "loading"}`}
                type="submit"
              >
                Save
              </button>
            </form>
          </>
        ) : (
          <>
            <p className="text-3xl mb-10 text-gray-100">MessengerQL</p>
            <button className="btn gap-4" onClick={() => signIn("google")}>
              <img className="h-1/2" src="/images/googlelogo.png" />
              Continue with Google
            </button>
          </>
        )}
      </div>
    </div>
  );
};
export default Auth;
