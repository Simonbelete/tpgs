import { baseApi } from "@/services/baseApi";
import { Response, Invitation } from "@/models";
import { AxiosResponse } from "axios";

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

export const {
  useGetInvitationsQuery,
  useLazyGetInvitationsQuery,
  useCreateInvitationMutation,
  useDeleteInvitationMutation,
  useResendInvitationEmailMutation,
} = invitationApi;
