import { useQuery, useQueryClient } from "@tanstack/react-query";

function useRQCache<T>(key: string, initialData: T): [T, (value: T) => void] {
  const client = useQueryClient();
  return [
    useQuery<T>([key], () => initialData, {
      enabled: false,
      initialData,
    }).data,
    (value) => client.setQueryData([key], value),
  ];
}

export default useRQCache;
