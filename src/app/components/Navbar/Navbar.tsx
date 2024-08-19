// 'use client'

// import React from 'react';
// import Link from 'next/link';
// import './Navbar.css';
// import "@farcaster/auth-kit/styles.css";

// import { useSession, signIn, signOut, getCsrfToken } from "next-auth/react";
// import {
//   SignInButton,
//   AuthKitProvider,
//   StatusAPIResponse,
// } from "@farcaster/auth-kit";
// import { useCallback, useState } from "react";

// const Navbar: React.FC = () => {
//   const signedIn = false; 

//   const { data: session } = useSession();

//   const [error, setError] = useState(false);

//   const getNonce = useCallback(async () => {
//     const nonce = await getCsrfToken();
//     if (!nonce) throw new Error("Unable to generate nonce");
//     return nonce;
//   }, []);

//   const handleSuccess = useCallback(
//     (res: StatusAPIResponse) => {
//       signIn("credentials", {
//         message: res.message,
//         signature: res.signature,
//         name: res.username,
//         pfp: res.pfpUrl,
//         redirect: false,
//       });
//     },
//     []
//   );

//   return (
//     <div>
//       {session ? (
//         <div className='w-full fixed h-[140px] flex justify-center items-center'>
//           <div className='flex items-center h-[60px] border-2 px-4 bg-white/70 rounded-[30px] drop-shadow-2xl'>
//             <Link href="/feed" className='mx-[4px] px-[32px] py-[8px] h-[40px] cursor-pointer'>
//               Feed
//             </Link>
//             <Link href="/frames" className='mx-[4px] px-[32px] py-[8px] h-[40px] cursor-pointer'>
//               Frames
//             </Link>
//             <Link href="/channels" className='mx-[4px] px-[32px] py-[8px] h-[40px] cursor-pointer'>
//               Channels
//             </Link>
//             <Link href="/profile" className='mx-[4px] px-[32px] py-[8px] h-[40px] cursor-pointer'>
//               Profile
//             </Link>
//             <p className='bg-[#7c65c1] rounded-[30px] text-white mx-[4px] px-[32px] py-[8px] h-[40px] cursor-pointer'>
//               UserName
//             </p>
//             <button
//               type="button"
//               style={{ padding: "6px 12px", cursor: "pointer" }}
//               onClick={() => signOut()}
//             >
//               Click here to sign out
//             </button>
//           </div>
//         </div>
//       ) : (
//         <div className='flex flex-col items-center h-[60px] border-2 px-4 pt-1 mt-2 bg-white/70 rounded-[30px] drop-shadow-2xl'>
//           <SignInButton
//           nonce={getNonce}
//           onSuccess={handleSuccess}
//           onError={() => setError(true)}
//           onSignOut={() => signOut()}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Navbar;




'use client'

import React, { useCallback, useState } from 'react';
import Link from 'next/link';
import './Navbar.css';
import "@farcaster/auth-kit/styles.css";

import { AuthKitProvider, SignInButton, useProfile, StatusAPIResponse } from "@farcaster/auth-kit";

const config = {
  relay: "https://relay.farcaster.xyz",
  rpcUrl: "https://mainnet.optimism.io",
  domain: "filterapp.fun",
  siweUri: "https://filterapp.fun",
};

const Navbar: React.FC = () => {
  const [error, setError] = useState(false);

  const getNonce = useCallback(async () => {
    // Custom logic to generate a nonce if needed
    console.log("Generating nonce...");
    return "your-generated-nonce"; // Replace with actual nonce generation if required
  }, []);

  const handleSuccess = useCallback(
    (res: StatusAPIResponse) => {
      console.log('Login successful:', res);
      // Debug the response structure
      console.log('Response structure:', JSON.stringify(res, null, 2));

      // Handle success actions like redirecting or setting state
    },
    []
  );

  const handleError = useCallback(
    (error: any) => {
      console.error("Sign in failed:", error);
      setError(true);
    },
    []
  );

  const profile = useProfile();
  console.log("Profile state:", profile);

  const { isAuthenticated, profile: { displayName } } = profile;

  return (
    <AuthKitProvider config={config}>
      <div>
        {isAuthenticated ? (
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
                {displayName}
              </p>
              <button
                type="button"
                style={{ padding: "6px 12px", cursor: "pointer" }}
                onClick={() => { /* Sign out logic here */ }}
              >
                Click here to sign out
              </button>
            </div>
          </div>
        ) : (
          <div className='flex flex-col items-center mt-2'>
            <SignInButton
              nonce={getNonce}
              onSuccess={handleSuccess}
              onError={handleError}
              onSignOut={() => { /* Sign out logic here */ }}
            />
          </div>
        )}
      </div>
      <Profile />
    </AuthKitProvider>
  );
};

const Profile = () => {
  const profile = useProfile();
  const { isAuthenticated, profile: { fid, displayName, custody } } = profile;

  console.log("Profile details in Profile component:", profile);

  return (
    <>
      {isAuthenticated ? (
        <div>
          <p>
            Hello, {displayName}! Your FID is {fid}.
          </p>
          <p>
            Your custody address is: <pre>{custody}</pre>
          </p>
        </div>
      ) : (
        <p>
          You are not signed in.
        </p>
      )}
    </>
  );
};

export default Navbar;
