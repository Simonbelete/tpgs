import NextAuth, { CookiesOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import "@/types/next-auth.d";

async function refreshAccessToken(tokenObject) {
  try {
    // Get a new set of tokens with a refreshToken
    const tokenResponse = await axios.post(YOUR_API_URL + "auth/refreshToken", {
      token: tokenObject.refreshToken,
    });

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
    token.accessToken = user.access_token;
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
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        const res = await fetch("/your/endpoint", {
          method: "POST",
          body: JSON.stringify(credentials),
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
