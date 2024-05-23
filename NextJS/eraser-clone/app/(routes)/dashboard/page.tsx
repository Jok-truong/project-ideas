"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Header from "./components/Header";
import { useConvex, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEffect } from "react";

function DashboardPage() {
  const convex = useConvex();
  const { user } = useKindeBrowserClient();
  //const getUser=useQuery(api.user.getUser,{email:user?.email});

  const createUser = useMutation(api.user.createUser);

  const checkUser = async () => {
    if (user && user.email && user.given_name && user.picture) {
      const result = await convex.query(api.user.getUser, {
        email: user.email,
      });

      if (!result.length) {
        createUser({
          name: user.given_name,
          email: user.email,
          image: user.picture,
        }).then((res) => {
          console.log(res, "res");

          return res;
        });
      }
    }
  };

  useEffect(() => {
    if (user) {
      checkUser();
    }
  }, [user]);

  return (
    <div className="p-8">
      <Header />
    </div>
  );
}

export default DashboardPage;
