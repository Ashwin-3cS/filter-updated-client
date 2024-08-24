import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { createAppClient, viemConnector } from "@farcaster/auth-client";
import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, {
    providers: [
      CredentialsProvider({
        name: "Sign in with Farcaster",
        credentials: {
          message: {
            label: "Message",
            type: "text",
            placeholder: "0x0",
          },
          signature: {
            label: "Signature",
            type: "text",
            placeholder: "0x0",
          },
          name: {
            label: "Name",
            type: "text",
            placeholder: "0x0",
          },
          pfp: {
            label: "Pfp",
            type: "text",
            placeholder: "0x0",
          },
        },
        async authorize(credentials) {
          const {
            body: { csrfToken },
          } = req;

          const appClient = createAppClient({
            ethereum: viemConnector(),
          });

          const verifyResponse = await appClient.verifySignInMessage({
            message: credentials?.message as string,
            signature: credentials?.signature as `0x${string}`,
            domain: "filterapp.fun",
            nonce: csrfToken,
          });
          const { success, fid } = verifyResponse;

          if (!success) {
            return null;
          }

          return {
            id: fid.toString(),
            name: credentials?.name,
            image: credentials?.pfp,
            fid: fid.toString(), // fid property added here
          };
        },
      }),
    ],
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.fid = user.fid; // Ensure fid is carried over
        }
        return token;
      },
      async session({ session, token }) {
        // Ensure session.user exists and add fid to it
        if (session.user && token.fid) {
          session.user.fid = token.fid;
        }
        return session;
      },
    },
  });
