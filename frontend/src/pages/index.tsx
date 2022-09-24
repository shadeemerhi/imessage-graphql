import { Box } from "@chakra-ui/react";
import type { NextPage, NextPageContext } from "next";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Auth from "../components/Auth/Auth";
import Chat from "../components/Chat";

const Home: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const reloadSession = () => {
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
  };

  useEffect(() => {
    if (!session?.user && router.query.conversationId) {
      router.replace(process.env.NEXT_PUBLIC_BASE_URL as string);
    }
  }, [session?.user, router.query]);

  return (
    <Box>
      {session && session?.user?.username ? (
        <Chat session={session} />
      ) : (
        <Auth session={session} reloadSession={reloadSession} />
      )}
    </Box>
  );
};

export async function getServerSideProps(ctx: NextPageContext) {
  const session = await getSession(ctx);

  return {
    props: {
      session,
    },
  };
}

export default Home;
