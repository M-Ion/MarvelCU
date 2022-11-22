import React, { FC, Fragment, ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../services/store/slices/user.slice";

interface AuthOnlyProps {
  children?: ReactNode | ReactNode[];
  roles?: string[];
}
const AuthOnly: FC<AuthOnlyProps> = ({ children, roles }) => {
  const user = useSelector(selectUser);
  const [auth, setAuth] = useState<boolean>(false);

  const isAuthorized = (): boolean => {
    let authorized = false;
    if (user) {
      authorized = true;

      if (roles) {
        roles.forEach((r) => {
          if (!user.roles.includes(r)) authorized = false;
        });
      }
    }

    return authorized;
  };

  useEffect(() => {
    setAuth(isAuthorized());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return auth ? <>{children}</> : null;
};

export default AuthOnly;
