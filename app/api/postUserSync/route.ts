import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";

export async function POST() {
  const supabase = createServerActionClient( { cookies }); // ✅ Fix: this injects auth context from cookies

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user || !user.email) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const existingUser = await prisma.user_model.findUnique({
    where: { email: user.email },
  });

  if (!existingUser) {
    await prisma.user_model.create({
      data: {
        name: user.user_metadata?.full_name || "Google User",
        email: user.email,
        password: "", // leave blank or make it nullable in schema
      },
    });
  }

  return new Response(JSON.stringify({ message: "User synced!" }), { status: 200 });
}
