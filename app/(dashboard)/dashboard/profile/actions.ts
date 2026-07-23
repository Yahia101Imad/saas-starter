"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/session";
import { deleteCloudinaryImage } from "@/lib/cloudinary/server";

export async function saveImagePublicId(publicId: string) {
  const session = await getSession();
  if (!session) return { success: false };

  await prisma.user.update({
    where: { id: session.user.id },
    data: { imagePublicId: publicId },
  });

  return { success: true };
}

export async function removeProfileImage() {
  const session = await getSession();
  if (!session) return { success: false, error: "Not authenticated" };

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { imagePublicId: true },
  });

  if (user?.imagePublicId) {
    try {
      await deleteCloudinaryImage(user.imagePublicId);
    } catch {
      // if deleteCloudinaryImage failed, profile img will be remove from the interface (better UX)
    }
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: { image: null, imagePublicId: null },
  });

  revalidatePath("/dashboard");
  return { success: true };
}
