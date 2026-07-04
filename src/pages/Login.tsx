import React from "react";
import { PaddingLayout } from "../layouts/PaddingLayout"
import { LoginBranding } from "../features/auth/LoginBranding"
import { LoginForm } from "../features/auth/LoginForm"

export const Login = () => {
  return (
    <>
    <main className="min-h-screen bg-tertiary-light flex items-center">
      <PaddingLayout>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <LoginBranding />
          <LoginForm />
        </div>
      </PaddingLayout>
    </main>
    </>
  );
}
