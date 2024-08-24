import { SignInButton, StatusAPIResponse } from "@farcaster/auth-kit";
import { getCsrfToken, signIn, signOut, useSession } from "next-auth/react";
import { useCallback, useState } from "react";
import Profile from "../Profile/Profile";

function Content() {
    const [error, setError] = useState(false);
    const {data:session}  = useSession()
  
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
        setError(true);  // Handle error appropriately
      } else {
        // Session should be set; consider updating local state if needed
        console.log('sess');
        
      }
      // handle your session and state updates  after successful sign-in.
     
    }, []);
  
    const logOut = async () => {
      await signOut();
    };
  
    return (
      <div>
        {session ? (
          <button onClick={logOut}>SignOut</button>
        ):
        (
        <div style={{ position: "fixed", top: "12px", right: "12px" }}>
          <SignInButton nonce={getNonce} onSuccess={handleSuccess} onError={() => setError(true)} onSignOut={logOut} />
          {error && <div>Unable to sign in at this time.</div>}
        </div>
        )}
        <div style={{ paddingTop: "33vh", textAlign: "center" }}>
          <Profile/>
        </div>
  
      </div>
    );
  }
  

  export default Content;