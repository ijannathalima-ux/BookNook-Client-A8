import LoginFormPage from "@/components/shared/LoginForm";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-stone-500">Loading...</div>}>
      <LoginFormPage />
    </Suspense>
  );
}