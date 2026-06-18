"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useLogin } from "@/hooks/useLogin";

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const {
    register,
    handleSubmit,
    errors,
    error,
    loading,
    onSubmit,
    handleForgotPassword,
  } = useLogin();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="w-full bg-[#fffbf9] flex flex-col items-center justify-center px-4 py-12 md:py-16">
      <div className="bg-white border border-[#f5f5f5] rounded-[10px] w-full max-w-[742px] p-6 sm:p-12 md:p-[80px] shadow-[0px_4px_4px_0px_rgba(182,182,182,0.05)] flex flex-col gap-8 md:gap-[38px] items-center">
        {/* Header content */}
        <div className="flex flex-col gap-2 items-center text-center w-full">
          <h1 className="font-bold text-[28px] md:text-[32px] text-[#99331a] leading-tight">
            Heureux de vous revoir
          </h1>
          <p className="text-[14px] text-black leading-relaxed max-w-[390px]">
            Connectez-vous pour retrouver vos réservations, vos annonces et tout ce qui rend vos séjours uniques.
          </p>
        </div>

        {/* Error alert */}
        {error && (
          <div
            role="alert"
            className="w-full max-w-[360px] p-3 text-xs text-red-600 bg-red-50 border border-red-100 rounded-md text-center"
          >
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-6 items-center">
          <div className="w-full max-w-[360px] flex flex-col gap-[22px] items-start">
            {/* Email field */}
            <div className="w-full flex flex-col gap-1 items-start">
              <label
                htmlFor="email"
                className="text-[14px] font-medium text-[#0d0d0d] font-sans"
              >
                Adresse email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Ex: user@example.com"
                {...register("email", { required: "Veuillez remplir ce champ." })}
                className="w-full h-[40px] border border-[#f5f5f5] bg-white rounded-[4px] px-[16px] py-[10px] text-[14px] text-[#0d0d0d] placeholder:text-[#565656]/50 focus:outline-none focus:border-[#99331a] transition-all font-sans"
              />
              {errors.email && (
                <span className="text-[12px] text-red-600 font-sans mt-0.5">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Password field */}
            <div className="w-full flex flex-col gap-1 items-start">
              <label
                htmlFor="password"
                className="text-[14px] font-medium text-[#0d0d0d] font-sans"
              >
                Mot de passe
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register("password", { required: "Veuillez remplir ce champ." })}
                className="w-full h-[40px] border border-[#f5f5f5] bg-white rounded-[4px] px-[16px] py-[10px] text-[14px] text-[#0d0d0d] placeholder:text-[#565656]/50 focus:outline-none focus:border-[#99331a] transition-all font-sans"
              />
              {errors.password && (
                <span className="text-[12px] text-red-600 font-sans mt-0.5">
                  {errors.password.message}
                </span>
              )}
            </div>
          </div>

          {/* Call to action & Links */}
          <div className="w-full max-w-[360px] flex flex-col gap-[22px] items-center mt-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#99331a] hover:bg-[#802a15] text-white font-medium text-[14px] px-[32px] py-[8px] rounded-[10px] w-[230px] h-[36px] flex items-center justify-center cursor-pointer transition-all duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Connexion..." : "Se connecter"}
            </button>

            <div className="flex flex-col gap-3 items-center text-[14px] text-[#99331a] text-center w-full">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="hover:underline focus:outline-none focus:ring-2 focus:ring-[#99331a] focus:ring-offset-2 rounded-sm cursor-pointer"
              >
                Mot de passe oublié
              </button>
              <p className="text-[#0d0d0d]">
                Pas encore de compte ?{" "}
                <Link
                  href="/register"
                  className="font-medium text-[#99331a] hover:underline focus:outline-none focus:ring-2 focus:ring-[#99331a] focus:ring-offset-2 rounded-sm"
                >
                  Inscrivez-vous
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
