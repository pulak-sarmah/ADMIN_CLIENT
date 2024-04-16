import { User } from "../store";

export const usePermission = () => {
  const allowedRole = ["admin", "manager"];

  const _hasPermission = (user: User | null) => {
    if (user) {
      return allowedRole.includes(user.role);
    }

    return false;
  };

  return { isAllowed: _hasPermission };
};
