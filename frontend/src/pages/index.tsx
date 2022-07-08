import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Auth from "../components/Auth/Auth";
import Chat from "../components/Chat";

const Home: NextPage = () => {
  const { data: session } = useSession();

  const reloadSession = () => {
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
  };

  return (
    <div className="flex h-screen border border-red-500">
      {session && session?.user?.username ? (
        <Chat />
      ) : (
        <Auth session={session} reloadSession={reloadSession} />
      )}
    </div>
  );
};

export default Home;
