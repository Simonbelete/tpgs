import NextAuth, { CookiesOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

import "@/types/next-auth.d";

async function refreshAccessToken(tokenObject: any) {
  try {
    // Get a new set of tokens with a refreshToken
    const tokenResponse = await axios.post(
      process.env.NEXT_API_URL + "api/token/refresh/",
      {
        token: tokenObject.refreshToken,
      }
    );

    return {
      ...tokenObject,
      accessToken: tokenResponse.data.accessToken,
      accessTokenExpiry: tokenResponse.data.accessTokenExpiry,
      refreshToken: tokenResponse.data.refreshToken,
    };
  } catch (error) {
    return {
      ...tokenObject,
      error: "RefreshAccessTokenError",
    };
  }
}

const cookies: Partial<CookiesOptions> = {
  sessionToken: {
    name: `next-auth.session-token`,
    options: {
      httpOnly: true,
      sameSite: "none",
      path: "/",
      domain: process.env.NEXT_PUBLIC_DOMAIN,
      secure: true,
    },
  },
};

export const jwt = async ({ token, user }: { token: JWT; user?: User }) => {
  // console.log("-----------------------");
  // console.log(user);
  // console.log("**");
  // console.log(token);

  if (user) {
    token.accessToken = user.access_token;
  }

  // on subsequent calls, token is provided and we need to check if it's expired
  if (token?.accessTokenExpires) {
    if (Date.now() / 1000 < token?.accessTokenExpires)
      return { ...token, ...user };
  } else if (token?.refreshToken) return refreshAccessToken(token);

  return { token, user };
};

export const session = ({
  session,
  token,
}: {
  session: Session;
  token: JWT;
}): Promise<Session> => {
  // session.accessToken = token.accessToken;
  // return session;
  // if (
  //   Date.now() / 1000 > token?.accessTokenExpires &&
  //   token?.refreshTokenExpires &&
  //   Date.now() / 1000 > token?.refreshTokenExpires
  // ) {
  //   return Promise.reject({
  //     error: new Error(
  //       "Refresh token has expired. Please log in again to get a new refresh token."
  //     ),
  //   });
  // }

  const accessTokenData = JSON.parse(atob(token.token.split(".")?.at(1)));
  console.log(accessTokenData);
  // session.user = accessTokenData;
  // token.accessTokenExpires = accessTokenData.exp;

  session.accessToken = token.accessToken;
  // session.token = token?.token;

  return session;
};

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
        const res = await fetch(process.env.NEXT_API_URL + "/api/token/", {
          method: "POST",
          body: JSON.stringify({
            email: credentials?.username || "",
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
    async jwt({ token, user }) {
      // Persist the OAuth access_token to the token right after signin

      if (user) {
        token.accessToken = user.access;
        console.log(user);
      }
      return { ...token, ...user };
    },
    async session(data) {
      // Send properties to the client, like an access_token from a provider.
      // session.accessToken = token.accessToken;
      // console.log("seeeeeeeee");
      // session.user = user;
      console.log("see");
      console.log(data);
      return session;
    },
    // jwt,
    // session,
    // cookies,
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
