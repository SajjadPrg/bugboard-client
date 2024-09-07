import { useEffect, useState } from "react";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";

const CheckRegisterAndLogin = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      const token = Cookie.get("token");
      if (token) {
        try {
          const res = await fetch("http://localhost:3000/auth/validate-token", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          if (res.status === 200) {
            setLoading(false);
          } else {
            Cookie.remove("token");
            navigate("/auth/login");
          }
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          Cookie.remove("token");
          navigate("/login");
        }
      } else {
        setLoading(false);
      }
    };

    checkToken();
  }, [navigate]);

  return loading;
};

export default CheckRegisterAndLogin;
