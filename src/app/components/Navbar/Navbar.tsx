'use client'

import React from 'react';
import Link from 'next/link';
import './Navbar.css';
import "@farcaster/auth-kit/styles.css";

import { useSession, signIn, signOut, getCsrfToken } from "next-auth/react";
import {
  SignInButton,
  AuthKitProvider,
  StatusAPIResponse,
} from "@farcaster/auth-kit";
import { useCallback, useState } from "react";

const Navbar: React.FC = () => {
  const signedIn = false; 

  const { data: session } = useSession();

  const [error, setError] = useState(false);

  const getNonce = useCallback(async () => {
    const nonce = await getCsrfToken();
    if (!nonce) throw new Error("Unable to generate nonce");
    return nonce;
  }, []);

  const handleSuccess = useCallback(
    (res: StatusAPIResponse) => {
      signIn("credentials", {
        message: res.message,
        signature: res.signature,
        name: res.username,
        pfp: res.pfpUrl,
        redirect: false,
      });
    },
    []
  );

  return (
    <div>
      {session ? (
        <div className='w-full fixed h-[140px] flex justify-center items-center'>
          <div className='flex items-center h-[60px] border-2 px-4 bg-white/70 rounded-[30px] drop-shadow-2xl'>
            <Link href="/feed" className='mx-[4px] px-[32px] py-[8px] h-[40px] cursor-pointer'>
              Feed
            </Link>
            <Link href="/frames" className='mx-[4px] px-[32px] py-[8px] h-[40px] cursor-pointer'>
              Frames
            </Link>
            <Link href="/channels" className='mx-[4px] px-[32px] py-[8px] h-[40px] cursor-pointer'>
              Channels
            </Link>
            <Link href="/profile" className='mx-[4px] px-[32px] py-[8px] h-[40px] cursor-pointer'>
              Profile
            </Link>
            <p className='bg-[#7c65c1] rounded-[30px] text-white mx-[4px] px-[32px] py-[8px] h-[40px] cursor-pointer'>
              UserName
            </p>
            <button
              type="button"
              style={{ padding: "6px 12px", cursor: "pointer" }}
              onClick={() => signOut()}
            >
              Click here to sign out
            </button>
          </div>
        </div>
      ) : (
        <div className='flex flex-col items-center h-[60px] border-2 px-4 pt-1 mt-2 bg-white/70 rounded-[30px] drop-shadow-2xl'>
          <SignInButton
          nonce={getNonce}
          onSuccess={handleSuccess}
          onError={() => setError(true)}
          onSignOut={() => signOut()}
          />
        </div>
      )}
    </div>
  );
};

export default Navbar;
