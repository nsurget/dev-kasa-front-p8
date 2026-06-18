import { useState, MouseEvent } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { User } from "../../types/user";

export interface LoginFormData {
  email: string;
  password: string;
}

export const useLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    alert("Fonctionnalité de réinitialisation de mot de passe à venir.");
  };

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data.email, password: data.password }),
      });

      if (!res.ok) {
        const errData = (await res.json().catch(() => ({}))) as { message?: string };
        throw new Error(errData.message || "Email ou mot de passe incorrect.");
      }

      const resData = (await res.json()) as { token: string; user: User };

      // login store automatically sets cookie (auth_token & auth_user) internally
      login(resData.token, resData.user);
      router.push("/");
    } catch (err: unknown) {
      console.warn("Login error:", err);
      const message = err instanceof Error ? err.message : "Une erreur est survenue lors de la connexion.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    error,
    loading,
    onSubmit,
    handleForgotPassword,
  };
};
