import { useMutation } from "@apollo/client";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import UserOperations from "../../graphql/operations/users";

interface AuthProps {
  session: Session | null;
  reloadSession: () => void;
}

const Auth: React.FC<AuthProps> = ({ session, reloadSession }) => {
  const [username, setUsername] = useState("");

  const [createUsername, { data, loading, error }] = useMutation(
    UserOperations.Mutations.createUsername
  );

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!username) return;

    try {
      const { data } = await createUsername({
        variables: {
          userId: session?.user.id,
          username,
        },
      });

      if (data.createUsername.error) {
        const {
          createUsername: { error },
        } = data;

        toast.error(error);
        return;
      }

      toast.success("Username successfully created");

      /**
       * Reload session to obtain new username
       */
      reloadSession();
    } catch (error) {
      toast.error("There was an error");
      console.log("onSubmit error", error);
    }
  };

  return (
    <div>
      <div>
        {session ? (
          <>
            <p>Create a Username</p>
            <form onSubmit={onSubmit}>
              <input
                placeholder="Enter a username"
                value={username}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setUsername(event.target.value)
                }
              />
              <button type="submit">Save</button>
            </form>
          </>
        ) : (
          <>
            <p>MessengerQL</p>
            <button onClick={() => signIn("google")}>
              {/* <img className="h-1/2" src="/images/googlelogo.png" /> */}
              Continue with Google
            </button>
          </>
        )}
      </div>
    </div>
  );
};
export default Auth;
