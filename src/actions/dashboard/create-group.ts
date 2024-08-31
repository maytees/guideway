"use server";

import { type ClubCategory } from "@prisma/client";
import { GroupWithMembers } from "~/lib/types";
import { createGroupSchema, type ICreateGroup } from "~/lib/validation";
import { validateRequest } from "~/server/auth";
import { db } from "~/server/db";

interface ActionResult {
  error?: string;
  success?: string;
  group?: GroupWithMembers;
}

// Function to generate a random 8-digit code
function generateCode() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters[randomIndex];
  }
  return code;
}

// Function to check if a code is unique
async function isCodeUnique(join_code: string): Promise<boolean> {
  const existingCode = await db.group.findUnique({
    where: { join_code },
  });
  return !existingCode;
}

// Function to generate a unique code
async function generateUniqueCode(): Promise<string> {
  let code: string;
  let isUnique: boolean;
  do {
    code = generateCode();
    isUnique = await isCodeUnique(code);
  } while (!isUnique);
  return code;
}

export async function createGroup(values: ICreateGroup): Promise<ActionResult> {
  "use server";

  const fields = createGroupSchema.safeParse(values);

  if (!fields.success) {
    return {
      error: "Invalid fields",
    };
  }

  const { user } = await validateRequest();

  if (!user) {
    return {
      error: "User is not validated",
    };
  }

  const { category, description, name } = fields.data;

  const existingUser = await db.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!existingUser) {
    return {
      error: "User does not exist",
    };
  }

  const newGroup = await db.group.create({
    data: {
      // Does this work??!?!
      category: category as ClubCategory,
      name,
      description,
      owner_id: existingUser.id,
      members: {
        connect: { id: existingUser.id },
      },
      join_code: await generateUniqueCode(),
    },
    include: {
      members: true,
    },
  });

  if (!newGroup) {
    return {
      error: "There was a problem creating the group",
    };
  }

  return {
    success: "Successfully created new group",
    group: newGroup,
  };
}
