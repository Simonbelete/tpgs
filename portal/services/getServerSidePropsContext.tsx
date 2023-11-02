import { AxiosResponse } from "axios";
import { NextPageContext } from "next";
import { Response } from "@/models";

// TODO: Add next and previous
export async function getServerSidePropsContext<T>({
  context,
  id,
  getByIdSSR,
}: {
  context: NextPageContext;
  id: number;
  getByIdSSR: (
    context: NextPageContext,
    id: number
  ) => Promise<AxiosResponse<Response<T>>>;
}) {
  try {
    const res = await getByIdSSR(context, id);

    if (res.status != 200)
      return {
        redirect: {
          permanent: false,
          destination: `/${res.status}?id=${id}&code=${res.status}`,
        },
      };

    return { props: { data: res.data } };
  } catch (ex) {
    return {
      redirect: {
        permanent: false,
        destination: `/404?id=${id}`,
      },
    };
  }
}
