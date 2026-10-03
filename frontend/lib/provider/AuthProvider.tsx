"use client";

import { ReactNode, useEffect, useState } from "react";
import Cookies from "js-cookie";

import AuthContext from "../context/AuthContext";
import { CredentialType, IUserDetail } from "../types/AuthTypes";
import axiosClient from "../services/apiclient";

export default function AuthProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [loggedInUser, setLoggedInUser] = useState<IUserDetail | null>(null);
  const [loading, setLoading] = useState(true);

  const userLogin = async (
    credentials: CredentialType
  ): Promise<IUserDetail> => {
    try {
      const loginResponse = await axiosClient.post<{
        accessToken: string;
      }>("/auth/login", credentials);

      const token = loginResponse.data.accessToken;

      Cookies.set("auAc_59", token, {
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        expires: 1,
      });

      return await getLoggedInUser();
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const getLoggedInUser = async (): Promise<IUserDetail> => {
    const token = Cookies.get("auAc_59");

    if (!token) {
      setLoggedInUser(null);
      setLoading(false);
      throw new Error("No authentication token");
    }

    try {
      const response = await axiosClient.get<IUserDetail>("/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setLoggedInUser(response.data);

      return response.data;
    } catch (error) {
      console.error("GetLoggedInUser:", error);

      // If token is invalid/expired, remove it
      Cookies.remove("auAc_59");
      setLoggedInUser(null);

      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    const token = Cookies.get("auAc_59");

    try {
      if (token) {
        await axiosClient.post(
          "/auth/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      Cookies.remove("auAc_59");
      setLoggedInUser(null);
      setLoading(false);
    }
  };

  useEffect(() => {
    getLoggedInUser().catch(() => {
      // User is simply not authenticated
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loggedInUser,
        login: userLogin,
        getLoggedInUser,
        logout,
      }}
    >
      {loading ? <>Loading...</> : children}
    </AuthContext.Provider>
  );
}
