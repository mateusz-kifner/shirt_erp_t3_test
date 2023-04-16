import React from "react";
import { createServerSideHelpers } from "@trpc/react-query/server";

import { appRouter } from "~/server/api/root";
import SuperJSON from "superjson";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { prisma } from "~/server/db";
import { api } from "~/utils/api";

export const getStaticProps: GetStaticProps = async (context) => {
  // session is null, so only public pages can be statically generated
  const ssg = createServerSideHelpers({
    router: appRouter,
    ctx: { prisma, session: null },
    transformer: SuperJSON,
  });

  const input = context.params?.ssg;
  if (typeof input !== "string") throw new Error("No input");
  await ssg.example.hello.prefetch({ text: input });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      input,
    },
  };
};

// uncomment if you use dynamic paths
export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

const Ssg = ({ input }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { data, isLoading } = api.example.hello.useQuery(
    { text: input as string },
    { refetchOnMount: false } // data is provided by getStaticProps, refresh is not needed
  );
  if (!data) return <div>404</div>;
  if (isLoading) return <div>Loading...</div>;
  console.log(data);
  return <div>{data.message}</div>;
};

export default Ssg;
