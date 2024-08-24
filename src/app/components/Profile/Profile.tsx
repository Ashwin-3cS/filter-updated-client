import { useSession } from "next-auth/react";

function Profile() {
    const { data: session } = useSession();
    console.log("Session Data:", session); // Debugging line
    
    return session ? (
      <div style={{ fontFamily: "sans-serif" }}>
        <p>Signed in as {session.user?.name}</p>
      </div>
    ) : (
      <p>Scan the QR code to SignIN</p>
    );
  }
  

  export default Profile;