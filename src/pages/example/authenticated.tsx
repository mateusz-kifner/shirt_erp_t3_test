import { api } from "@/utils/api";

const Authenticated = () => {
  const { data, isError } = api.example.authenticated.useQuery();

  if (isError) return <div>NOT authenticated</div>;
  return <div>Authenticated</div>;
};

export default Authenticated;
