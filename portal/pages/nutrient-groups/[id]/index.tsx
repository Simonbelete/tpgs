import { Loading } from "@/components";
import { NextPageContext } from "next";

const Page = ({ id }: { id: number }) => {
  return <Loading />
}

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;

  return {
    redirect: {
      permanent: false,
      // @ts-ignore
      destination: `${context.resolvedUrl}/edit`
    }
  };
}

export default Page;