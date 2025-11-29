import React, { useEffect, useState } from "react";

interface Props {
  children: React.ReactElement;
}

const PrivateRoute: React.FC<Props> = ({ children }) => {
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/employee/get", {
      credentials: "include",
    }).then(res => {
      if (res.status === 200) {
        setAllowed(true);
      } else {
        setAllowed(false);
      }
    });
  }, []);

  // still loading auth status
  if (allowed === null) return <div>Loading...</div>;

  // backend says user not logged in
  if (allowed === false) {
    window.location.href = "/";
    return null;
  }

  // backend confirmed authentication
  return children;
};

export default PrivateRoute;
