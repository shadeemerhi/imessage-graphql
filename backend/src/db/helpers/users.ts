import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createUsername = async (
  userId: string,
  username: string
): Promise<boolean> => {
  try {
    /**
     * Check if username taken by another user
     */
    const existingUser = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (existingUser) {
      return false;
    }

    // /**
    //  * update username
    //  */
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        username,
      },
    });

    return true;
  } catch (error) {
    console.log("createUsername error", error);
    return false;
  }
};
