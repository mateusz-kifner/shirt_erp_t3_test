import { useRouter } from "next/router";
import React from "react";
import { api } from "~/utils/api";
const logout = () => {
  const router = useRouter();

  const logout = api.session.logout.useMutation({
    onSuccess() {
      router.push("/profile");
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

export default logout;
