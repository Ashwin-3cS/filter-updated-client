// import { SignInButton, StatusAPIResponse } from "@farcaster/auth-kit";
// import { getCsrfToken, signIn, signOut, useSession } from "next-auth/react";
// import { useCallback, useState } from "react";
// import { useRouter } from "next/navigation"; // Import useRouter from Next.js

// function Content() {
//     const [error, setError] = useState(false);
//     const { data: session } = useSession();
//     const router = useRouter(); 

//     const getNonce = useCallback(async () => {
//         const nonce = await getCsrfToken();
//         if (!nonce) throw new Error("Unable to generate nonce");
//         return nonce;
//     }, []);

//     const handleSuccess = useCallback(async (res: StatusAPIResponse) => {
//         console.log("response", res);
//         const result = await signIn("credentials", {
//             message: res.message,
//             signature: res.signature,
//             name: res.displayName,
//             username: res.username,
//             pfp: res.pfpUrl,
//             redirect: false,
//         });

//         if (result?.error) {
//             setError(true); 
//         } else {
//             router.push('/feed');
//         }
//     }, [router]); 

//     console.log('Session Data :',session)

//     const logOut = async () => {
//         await signOut();
//     };

//     return (
//         <div>
//             {session ? (
//                 <button onClick={logOut}>SignOut</button>
//             ) : (
//                 <div style={{ position: "fixed", top: "12px", right: "12px" }}>
//                     <SignInButton nonce={getNonce} onSuccess={handleSuccess} onError={() => setError(true)} onSignOut={logOut} />
//                     {error && <div>Unable to sign in at this time.</div>}
//                     <p className="text-red-600">ash</p>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default Content;





// 'use client'

// import { SignInButton, StatusAPIResponse } from "@farcaster/auth-kit";
// import { getCsrfToken, signIn, signOut, useSession } from "next-auth/react";
// import { useCallback, useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from 'next/link';

// function Content() {
//     const [error, setError] = useState(false);
//     const { data: session } = useSession();
//     const router = useRouter(); 

//     const getNonce = useCallback(async () => {
//         const nonce = await getCsrfToken();
//         if (!nonce) throw new Error("Unable to generate nonce");
//         return nonce;
//     }, []);

//     const handleSuccess = useCallback(async (res: StatusAPIResponse) => {
//         console.log("response", res);
//         const result = await signIn("credentials", {
//             message: res.message,
//             signature: res.signature,
//             name: res.displayName,
//             username: res.username,
//             pfp: res.pfpUrl,
//             redirect: false,
//         });

//         if (result?.error) {
//             setError(true); 
//         } else {
//             router.push('/feed');
//         }
//     }, [router]); 

//     console.log('Session Data :', session);

//     const logOut = async () => {
//         await signOut();
//         router.push('/');
//     };

//     const isAuthenticated = !!session;
//     const displayName = session?.user?.name || "Guest";

//     return (
//         <div className='w-full fixed h-[140px] flex justify-center items-center'>
//             {isAuthenticated ? (
//                 // When user is signed in
//                 <div className='flex items-center h-[60px] border-2 px-4 bg-white/70 rounded-[30px] drop-shadow-2xl'>
//                     <Link href="/feed" className='mx-[4px] px-[32px] py-[8px] h-[40px] cursor-pointer'>
//                         Feed
//                     </Link>
//                     <Link href="/frames" className='mx-[4px] px-[32px] py-[8px] h-[40px] cursor-pointer'>
//                         Frames
//                     </Link>
//                     <Link href="/channels" className='mx-[4px] px-[32px] py-[8px] h-[40px] cursor-pointer'>
//                         Channels
//                     </Link>
//                     <Link href="/profile" className='mx-[4px] px-[32px] py-[8px] h-[40px] cursor-pointer'>
//                         Profile
//                     </Link>
//                     <p className='bg-[#7c65c1] rounded-[30px] text-white mx-[4px] px-[32px] py-[8px] h-[40px] cursor-pointer'>
//                         {displayName}
//                     </p>
//                     <button
//                         type="button"
//                         style={{ padding: "6px 12px", cursor: "pointer" }}
//                         onClick={logOut}
//                     >
//                         Sign Out
//                     </button>
//                 </div>
//             ) : (
//                 // When user is not signed in
//                 <div>
//                     <SignInButton
//                         nonce={getNonce}
//                         onSuccess={handleSuccess}
//                         onError={() => setError(true)}
//                     />
//                 </div>
//             )}

//             {/* Error Message */}
//             {error && <div>Unable to sign in at this time.</div>}
//         </div>
//     );
// }

// export default Content;




// 'use client'

// import { SignInButton, StatusAPIResponse } from "@farcaster/auth-kit";
// import { getCsrfToken, signIn, signOut, useSession } from "next-auth/react";
// import { useCallback, useState } from "react";
// import { useRouter, usePathname } from "next/navigation";
// import Link from 'next/link';

// function Navbar() {
//     const [error, setError] = useState(false);
//     const { data: session } = useSession();
//     const router = useRouter();
//     const pathname = usePathname(); // Get current pathname

//     const getNonce = useCallback(async () => {
//         const nonce = await getCsrfToken();
//         if (!nonce) throw new Error("Unable to generate nonce");
//         return nonce;
//     }, []);

//     const handleSuccess = useCallback(async (res: StatusAPIResponse) => {
//         console.log("response", res);
//         const result = await signIn("credentials", {
//             message: res.message,
//             signature: res.signature,
//             name: res.displayName,
//             username: res.username,
//             pfp: res.pfpUrl,
//             redirect: false,
//         });

//         if (result?.error) {
//             setError(true);
//         } else {
//             router.push('/Feed');
//         }
//     }, [router]);

//     console.log('Session Data :', session);

//     const logOut = async () => {
//         await signOut();
//         router.push('/'); // Redirect to homepage after sign out

//     };

//     const isAuthenticated = !!session;
//     const displayName = session?.user?.name || "Guest";

//     // Function to determine if the link is active
//     const isActive = (path: string) => pathname === path;

//     return (
//         <div className='w-full fixed h-[140px] flex justify-center items-center'>
//             {isAuthenticated ? (
//                 // When user is signed in
//                 <div className='flex items-center h-[60px] border-2 px-4 bg-white/70 rounded-[30px] drop-shadow-2xl'>
//                     <Link href="/Feed" className={`mx-[4px] px-[32px] py-[8px] h-[40px] cursor-pointer ${isActive('/Feed') ? 'bg-blue-500 text-white rounded-md' : ''}`}>
//                         Feed
//                     </Link>
//                     <Link href="/frames" className={`mx-[4px] px-[32px] py-[8px] h-[40px] cursor-pointer ${isActive('/frames') ? 'bg-blue-500 text-white' : ''}`}>
//                         Frames
//                     </Link>
//                     <Link href="/channels" className={`mx-[4px] px-[32px] py-[8px] h-[40px] cursor-pointer ${isActive('/channels') ? 'bg-blue-500 text-white' : ''}`}>
//                         Channels
//                     </Link>
//                     <Link href="/profile" className={`mx-[4px] px-[32px] py-[8px] h-[40px] cursor-pointer ${isActive('/profile') ? 'bg-blue-500 text-white' : ''}`}>
//                         Profile
//                     </Link>
//                     <p className='bg-[#7c65c1] rounded-[30px] text-white mx-[4px] px-[32px] py-[8px] h-[40px] cursor-pointer'>
//                         {displayName}
//                     </p>
//                     <button
//                         type="button"
//                         style={{ padding: "6px 12px", cursor: "pointer" }}
//                         onClick={logOut}
//                     >
//                         Sign Out
//                     </button>
//                 </div>
//             ) : (
//                 // When user is not signed in
//                 <div>
//                     <SignInButton
//                         nonce={getNonce}
//                         onSuccess={handleSuccess}
//                         onError={() => setError(true)}
//                     />
//                 </div>
//             )}

//             {/* Error Message */}
//             {error && <div>Unable to sign in at this time.</div>}
//         </div>
//     );
// }

// export default Navbar;




'use client'

import { SignInButton, StatusAPIResponse } from "@farcaster/auth-kit";
import { getCsrfToken, signIn, signOut, useSession } from "next-auth/react";
import { useCallback, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from 'next/link';

function Navbar() {
    const [error, setError] = useState(false);
    const { data: session, status } = useSession();  // Check status of the session
    const router = useRouter();
    const pathname = usePathname();

    const getNonce = useCallback(async () => {
        const nonce = await getCsrfToken();
        if (!nonce) throw new Error("Unable to generate nonce");
        return nonce;
    }, []);

    const handleSuccess = useCallback(async (res: StatusAPIResponse) => {
        console.log("response", res);
        const result = await signIn("credentials", {
            message: res.message,
            signature: res.signature,
            name: res.displayName,
            username: res.username,
            pfp: res.pfpUrl,
            redirect: false,
        });

        if (result?.error) {
            setError(true);
        } else {
            router.push('/Feed');
        }
    }, [router]);

    useEffect(() => {
        console.log('Session Status:', status);  // Log session status
        console.log('Session Data:', session);  // Log session data
    }, [session, status]);

    const logOut = async () => {
        await signOut();
        router.push('/');
    };

    const isAuthenticated = !!session;
    const displayName = session?.user?.name || "Guest";

    const isActive = (path: string) => pathname === path;

    return (
        <div className='w-full fixed h-[140px] flex justify-center items-center'>
            {status === 'loading' ? (
                // Display a loading state while session is being fetched
                <div>Loading...</div>
            ) : isAuthenticated ? (
                // When user is signed in
                <div className='flex items-center h-[60px] border-2 px-4 bg-white/70 rounded-[30px] drop-shadow-2xl'>
                    <Link href="/Feed" className={`mx-[4px] px-[32px] py-[8px] h-[40px] cursor-pointer ${isActive('/Feed') ? 'bg-blue-500 text-white rounded-md' : ''}`}>
                        Feed
                    </Link>
                    <Link href="/frames" className={`mx-[4px] px-[32px] py-[8px] h-[40px] cursor-pointer ${isActive('/frames') ? 'bg-blue-500 text-white' : ''}`}>
                        Frames
                    </Link>
                    <Link href="/channels" className={`mx-[4px] px-[32px] py-[8px] h-[40px] cursor-pointer ${isActive('/channels') ? 'bg-blue-500 text-white' : ''}`}>
                        Channels
                    </Link>
                    <Link href="/profile" className={`mx-[4px] px-[32px] py-[8px] h-[40px] cursor-pointer ${isActive('/profile') ? 'bg-blue-500 text-white' : ''}`}>
                        Profile
                    </Link>
                    <p className='bg-[#7c65c1] rounded-[30px] text-white mx-[4px] px-[32px] py-[8px] h-[40px] cursor-pointer'>
                        {displayName}
                    </p>
                    <button
                        type="button"
                        style={{ padding: "6px 12px", cursor: "pointer" }}
                        onClick={logOut}
                    >
                        Sign Out
                    </button>
                </div>
            ) : (
                // When user is not signed in
                <div>
                    <SignInButton
                        nonce={getNonce}
                        onSuccess={handleSuccess}
                        onError={() => setError(true)}
                    />
                </div>
            )}

            {/* Error Message */}
            {error && <div>Unable to sign in at this time.</div>}
        </div>
    );
}

export default Navbar;
