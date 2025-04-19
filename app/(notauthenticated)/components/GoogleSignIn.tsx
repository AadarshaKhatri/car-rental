// components/GoogleSignInButton.tsx

"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "@/components/ui/button";

export default function GoogleSignInButton() {
  const supabase = createClientComponentClient();

  const handleGoogleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return (
    <Button onClick={handleGoogleSignIn} className="w-full bg-white text-black hover:bg-gray-100 border">
      Continue with Google
    </Button>
  );
}
