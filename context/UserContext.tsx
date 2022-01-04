import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { AxiosRequestConfig } from "axios";
import { nextApi } from "../config/index";

type Context = {
  user: {
    id_user: string;
    login: string;
    name: string;
    email: string;
    status: number;
    roles: [ { id_role: number, unique_key: string, description: string, link: string, id_role_child: number } ]
    vendor: { id_vendor: string, CNPJ: string, description: string }
  };
  error: any;
  setError: (error: any) => any;
  loading: boolean;
  logIn: (user: any) => any;
  logOut: () => any;
};

const UserContext = createContext({} as Context);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => checkUserLoggedIn(), []);

  //Login user
  const logIn = async (user: { login: string; password: string }) => {
    setLoading(true)
    setError(null)
    const config: AxiosRequestConfig = {
      url: "api/login",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        login: user.login,
        password: user.password,
      },
    };

    const res = await nextApi.request(config).catch((e: any) => {
      setError(e.response.data.message);
    });

    setLoading(false);

    if (res) {
      setUser(res.data.user);
      router.push("/");
    }
  };

  //logout user
  const logOut = async () => {
    const res = await nextApi.post("api/logout");
    if (res) {
      setUser(null);
      router.push("/");
    }
  };

  //check if user is logged in
  const checkUserLoggedIn = async () => {
    try {
      const res = await nextApi.get("api/user");
      if (res) {
        setUser(res.data.user);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    }
  };

  return (
    <UserContext.Provider value={{ user, error, setError, loading, logIn, logOut }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
