import { useSession } from "next-auth/react";

function Profile() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    return <p>Scan the QR code to Sign In</p>;
  }

  console.log("Session Data:", session); // This will now only log when session data is available

  return (
    <div>
      <p >Signed in as {session.user?.name}</p>
    </div>
  );
}

export default Profile;
