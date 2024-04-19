import { useMutation } from "@tanstack/react-query";
import { logout } from "../http/api";
import { useAuthStore } from "../store";

export const useLogoutUser = () => {
  const { logout: logoutFromStore } = useAuthStore();

  const { mutate: logoutUser } = useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,
    onSuccess: async () => {
      logoutFromStore();
      return;
    },
  });

  return logoutUser;
};
