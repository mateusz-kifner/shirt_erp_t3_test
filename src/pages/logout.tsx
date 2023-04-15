import { useRouter } from "next/router";
import React from "react";
import { api } from "~/utils/api";
const Logout = () => {
  const router = useRouter();

  const logout = api.session.logout.useMutation({
    onSuccess() {
      void router.push("/profile");
    },
    onError(err) {
      console.log(err.message);
    },
  });

  return (
    <button
      onClick={() => {
        logout.mutate();
      }}
    >
      logout
    </button>
  );
};

export default Logout;
