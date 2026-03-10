// Custom hook to use the AuthContext

import { useContext } from "react";
import { AuthContext } from "../context/auth-context/AuthContextProvider";

/**
 * @returns {{ socialAppToken: string | null, setSocialAppToken: () => void, userProfile: any, setUserProfile: () => void, isAuthenticated: boolean, logout: () => void }} An object containing the authentication token and a function to update it.
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
}
