import React from "react";
import { api } from "~/utils/api";

const Privileged = () => {
  const { data } = api.example.privileged.useQuery();

  if (!data) return <div>NOT privileged</div>;
  return <div>Privileged</div>;
};

export default Privileged;
