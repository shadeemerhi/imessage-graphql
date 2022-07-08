import type { NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import Auth from "../components/Auth";

const Home: NextPage = () => {
  const { data: session } = useSession();

  const reloadSession = () => {
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
  };

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
        <Auth session={session} reloadSession={reloadSession} />
      )}
    </div>
  );
};

export default Home;
