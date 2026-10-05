"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProjectsRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/solutions#client-projects");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-slate-800">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-[#0D8B99] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm font-semibold text-slate-600">Redirecting to Solutions...</p>
      </div>
    </div>
  );
}
