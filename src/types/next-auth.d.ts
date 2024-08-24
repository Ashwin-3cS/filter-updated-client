// src/types/next-auth.d.ts

import { DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User extends DefaultUser {
    fid?: string;
  }

  interface Session {
    user?: User & {
      fid?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    fid?: string;
  }
}
