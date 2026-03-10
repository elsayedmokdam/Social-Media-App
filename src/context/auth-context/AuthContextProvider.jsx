import { createContext, useEffect, useState } from "react";
import { $Services } from "../../services/services-repository";
import { $Utilities } from "../../utilities/utilities-repository";

export const AuthContext = createContext();
export default function AuthContextProvider({ children }) {
  const [socialAppToken, setSocialAppToken] = useState(
    () => localStorage.getItem("social-app-token") || null,
  );
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!socialAppToken;

  function logout() {
    setSocialAppToken(null);
    setUserProfile(null);
    localStorage.removeItem("social-app-token");
  }

  useEffect(() => {
    async function fetchProfile() {
      if (!socialAppToken) {
        setUserProfile(null);
        setIsLoading(false);
        return;
      }

      try {
        const {
          value: { data },
        } = (
          await Promise.allSettled([$Services.USER_REPOSITORY.getMyProfile()])
        )[0];
        setUserProfile(data.user || null);
      } catch (err) {
        logout();
        $Utilities.Alerts.displayError(
          new Error("An Error occurred while fetching user profile.", {
            cause: err,
          }),
        );
      } finally {
        setIsLoading(false);
      }
    }
    fetchProfile();
  }, [socialAppToken]);

  useEffect(() => {
    if (socialAppToken)
      localStorage.setItem("social-app-token", socialAppToken);
    else localStorage.removeItem("social-app-token");
  }, [socialAppToken]);

  return (
    <AuthContext.Provider
      value={{
        socialAppToken,
        setSocialAppToken,
        userProfile,
        setUserProfile,
        isAuthenticated,
        isLoading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
