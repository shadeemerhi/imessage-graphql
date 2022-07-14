import { PrismaClient } from "@prisma/client";
import { CreateUsernameResponse } from "../../../util/types";

const prisma = new PrismaClient();

export const verifyAndCreateUsername = async (
  userId: string,
  username: string
): Promise<CreateUsernameResponse> => {
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
      return {
        error: "Username already taken. Try another",
      };
    }

    /**
     * update username
     */
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        username,
      },
    });

    return { success: true };
  } catch (error: any) {
    console.log("createUsername error", error);
    return {
      error: error?.message as string,
    };
  }
};
