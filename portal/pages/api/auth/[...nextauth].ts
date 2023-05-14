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
  // Persist the OAuth access_token to the token right after signin
  if (user) {
    token.accessToken = user.access;
  }

  // on subsequent calls, token is provided and we need to check if it's expired
  if (token?.accessTokenExpires) {
    if (Date.now() / 1000 < token?.accessTokenExpires)
      return { ...token, ...user };
  } else if (token?.refreshToken) return refreshAccessToken(token);

  return { ...token, ...user };
};

export const session = ({
  session,
  token,
}: {
  session: Session;
  token: JWT;
}): Promise<Session> => {
  if (
    Date.now() / 1000 > token?.accessTokenExpires &&
    token?.refreshTokenExpires &&
    Date.now() / 1000 > token?.refreshTokenExpires
  ) {
    return Promise.reject({
      error: new Error(
        "Refresh token has expired. Please log in again to get a new refresh token."
      ),
    });
  }

  const accessTokenData = JSON.parse(atob(token.token.split(".")?.at(1)));
  session.user = accessTokenData;
  token.accessTokenExpires = accessTokenData.exp;

  session.token = token?.token;

  return Promise.resolve(session);
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
    jwt,
    session,
    cookies,
  },
};

export default NextAuth(authOptions);
