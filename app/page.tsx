"use client"
import SignUpPage from "@/components/Pages/SignUpPage";
import AuthProvider from "@/providers/AuthProvider";

export default function Home() {
  return (
    <AuthProvider>
      <SignUpPage />
    </AuthProvider>
  );
}
