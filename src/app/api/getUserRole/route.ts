import { type NextRequest, NextResponse } from "next/server";
import { getUserRoleInGroup } from "~/actions/dashboard/group/get-user-role";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const userId = searchParams.get("userId");
  const groupId = searchParams.get("groupId");

  if (!userId || !groupId) {
    return NextResponse.json(
      { error: "Invalid userId or groupId" },
      { status: 400 },
    );
  }

  const result = await getUserRoleInGroup(userId, groupId);

  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json(result.role);
}
