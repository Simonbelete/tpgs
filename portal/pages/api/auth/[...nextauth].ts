import NextAuth, { CookiesOptions, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { JWT } from "next-auth/jwt";

import "@/types/next-auth.d";

// async function refreshAccessToken(tokenObject: any) {
//   try {
//     // Get a new set of tokens with a refreshToken
//     const tokenResponse = await axios.post(
//       process.env.NEXT_API_URL + "api/token/refresh/",
//       {
//         token: tokenObject.refreshToken,
//       }
//     );

//     return {
//       ...tokenObject,
//       accessToken: tokenResponse.data.accessToken,
//       accessTokenExpiry: tokenResponse.data.accessTokenExpiry,
//       refreshToken: tokenResponse.data.refreshToken,
//     };
//   } catch (error) {
//     return {
//       ...tokenObject,
//       error: "RefreshAccessTokenError",
//     };
//   }
// }

// const cookies: Partial<CookiesOptions> = {
//   sessionToken: {
//     name: `next-auth.session-token`,
//     options: {
//       httpOnly: true,
//       sameSite: "none",
//       path: "/",
//       domain: process.env.NEXT_PUBLIC_DOMAIN,
//       secure: true,
//     },
//   },
// };

// export const jwt = async ({ token, user }: { token: JWT; user?: User }) => {
//   if (user) {
//     token.accessToken = user.access_token;
//   }

//   // on subsequent calls, token is provided and we need to check if it's expired
//   if (token?.accessTokenExpires) {
//     if (Date.now() / 1000 < token?.accessTokenExpires)
//       return { ...token, ...user };
//   } else if (token?.refreshToken) return refreshAccessToken(token);

//   return { token, user };
// };

// export const session = ({
//   session,
//   token,
// }: {
//   session: Session;
//   token: JWT;
// }): Promise<Session> => {
//   // session.accessToken = token.accessToken;
//   // return session;
//   // if (
//   //   Date.now() / 1000 > token?.accessTokenExpires &&
//   //   token?.refreshTokenExpires &&
//   //   Date.now() / 1000 > token?.refreshTokenExpires
//   // ) {
//   //   return Promise.reject({
//   //     error: new Error(
//   //       "Refresh token has expired. Please log in again to get a new refresh token."
//   //     ),
//   //   });
//   // }

//   const accessTokenData = JSON.parse(atob(token.token.split(".")?.at(1)));
//   console.log(accessTokenData);
//   // session.user = accessTokenData;
//   // token.accessTokenExpires = accessTokenData.exp;

//   session.accessToken = token.accessToken;
//   // session.token = token?.token;

//   return session;
// };

async function refreshAccessToken(token: JWT) {
  try {
    const response = await fetch(process.env.NEXT_API_URL + "/token/refresh/", {
      method: "POST",
      body: JSON.stringify({
        refresh: token?.refresh || "",
      }),
      headers: { "Content-Type": "application/json" },
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access,
      accessTokenExpires: new Date(Date.now() + 1000 * 60 * 60).getTime(), // 60 Minutes
      refresh: refreshedTokens.refresh ?? token.refresh, // Fall back to old refresh token
    };
  } catch (error) {
    console.log(error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email Address" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await fetch(process.env.NEXT_API_URL + "/token/", {
          method: "POST",
          body: JSON.stringify({
            email: credentials?.email || "",
            password: credentials?.password || "",
          }),
          headers: { "Content-Type": "application/json" },
        });
        const user = await res.json();

        // If no error and we have user data, return it
        if (res.ok && user) {
          return user;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: User }) {
      if (user) {
        token.accessToken = user.access;
        token.email = user.email;
        token.name = user.name;
        token.id = user.id;
        token.accessTokenExpires = Date.now() + 7;
      }

      console.log(token?.accessTokenExpires);

      if (Date.now() < (token?.accessTokenExpires || 0)) {
        return { ...token, ...user };
      }

      return refreshAccessToken(token);
    },
    async session({
      session,
      token,
      user,
    }: {
      session: Session;
      token: JWT;
      user: User;
    }) {
      session.accessToken = token.accessToken;

      if (session.user !== undefined) {
        session.user.id = token.id as any;
        session.user.groups = token.groups as any;
        session.user.is_superuser = (token.is_superuser as any) || false;
      }

      return session;
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/auth/signout",
    error: "/auth/error", // Error code passed in query string as ?error=
    verifyRequest: "/auth/verify-request", // (used for check email message)
    newUser: "/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
};

export default NextAuth(authOptions);
