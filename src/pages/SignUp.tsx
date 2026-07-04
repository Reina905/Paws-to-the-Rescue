import React from "react"
import { PaddingLayout } from "../layouts/PaddingLayout"
import { SignUpBranding } from "../features/auth/SignUpBranding"
import { SignUpForm } from "../features/auth/SignUpForm"

export const SignUp = () => {
  return (
    <main className="min-h-screen bg-tertiary-light flex items-center">
      <PaddingLayout>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <SignUpBranding />
          <SignUpForm />
        </div>
      </PaddingLayout>
    </main>
  )
}
