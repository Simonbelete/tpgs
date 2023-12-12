import { baseApi } from "@/services/baseApi";
import { Response, Invitation } from "@/models";
import { AxiosResponse } from "axios";
import { NextPageContext } from "next";
import clientSSR from "@/services/client_ssr";

export const URL = "/invitations";
const VERIFY_URL = "verify-invitation";

export const invitationApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      getInvitations: build.query<Response<Invitation[]>, Object>({
        query: (query?: Object) => ({
          url: `${URL}/`,
          method: "get",
          params: query,
        }),
      }),
      getInvitationDetail: build.query<Response<Invitation>, string>({
        query: (token?: string) => ({
          url: `invitation-detail/${token}/`,
          method: "get",
        }),
      }),
      createInvitation: build.mutation<
        Promise<AxiosResponse<Invitation>>,
        Partial<Invitation>
      >({
        query: (data: Partial<Invitation>) => ({
          url: `${URL}/`,
          method: "post",
          data: data,
        }),
      }),
      resendInvitationEmail: build.mutation<
        Promise<AxiosResponse<Invitation>>,
        number
      >({
        query: (id: number) => ({
          url: `${URL}/${id}/resend/`,
          method: "post",
        }),
      }),
      deleteInvitation: build.mutation<any, number>({
        query: (id: number) => ({ url: `${URL}/${id}/`, method: "delete" }),
      }),
    };
  },
  overrideExisting: false,
});

export const getInvitationDetailSSR = async (
  context: NextPageContext,
  token: string
): Promise<AxiosResponse<Response<Invitation>>> =>
  clientSSR(context).get(`/invitation-detail/${token}`);

export const {
  useGetInvitationsQuery,
  useLazyGetInvitationsQuery,
  useCreateInvitationMutation,
  useDeleteInvitationMutation,
  useResendInvitationEmailMutation,
  useGetInvitationDetailQuery,
} = invitationApi;
