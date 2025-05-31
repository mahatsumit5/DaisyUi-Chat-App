import React, { useState } from "react"

function ForgotPassword() {
  const [email, setEmail] = useState<string>("")
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) {
      alert("Please enter your email address.")
      return
    }
    // Handle password reset logic here
    console.log("Password reset link sent to:", email)
  }
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl rounded-lg p-6 sm:p-8">
        <div className="w-full">
          <button
            className="btn btn-xs btn-ghost"
            onClick={() => {
              window.history.back()
            }}
          >
            Back
          </button>
        </div>
        <div className="card-body items-center text-center">
          <h2 className="card-title text-3xl font-poppins font-bold mb-4">
            Forgot Your Password?
          </h2>
          <p className="text-base-content/80 mb-6">
            No worries! Enter your email address below and we'll send you a link
            to reset your password.
          </p>

          <form
            className="form-control w-full mb-6"
            method="POST"
            onSubmit={handleSubmit}
          >
            <label className="label">
              <span className="label-text text-base-content">
                Email Address
              </span>
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="input input-bordered input-primary w-full rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
              onChange={e => setEmail(e.target.value)}
              value={email}
            />
          </form>

          <div className="card-actions justify-center w-full">
            <button
              className="btn btn-primary w-full rounded-md text-lg font-semibold py-3 transition-all duration-300 ease-in-out hover:scale-105"
              type="submit"
              onClick={handleSubmit}
              disabled={!email}
            >
              Reset Password
            </button>
          </div>

          <div className="mt-6 text-sm">
            <a
              href="/"
              className="link link-hover text-primary-content hover:text-primary transition-colors duration-200"
            >
              Remembered your password? Back to Login
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
