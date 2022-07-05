// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "./auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  const { username } = req.body;
  console.log("HERE IS SESSION", req.body, session);

  const user = await prisma.user.update({
    where: {
      id: session?.user.id,
    },
    data: { username },
  });

  res.status(200).json({ user });
}
