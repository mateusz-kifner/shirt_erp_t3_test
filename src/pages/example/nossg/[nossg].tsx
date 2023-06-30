import { api } from "@/utils/api";
import { useRouter } from "next/router";

const Nossg = () => {
  const router = useRouter();
  const { nossg } = router.query;
  const { data, isLoading } = api.example.hello.useQuery({
    text:
      nossg === undefined ? "" : Array.isArray(nossg) ? nossg[0] ?? "" : nossg,
  });
  if (!data) return <div>404</div>;
  if (isLoading) return <div>Loading...</div>;
  console.log(data);
  return <div>{data.message}</div>;
};

export default Nossg;
