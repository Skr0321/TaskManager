"use client";

import { auth, db } from "@/services/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [userDetails, setUserDetails] = useState(null);
  const router = useRouter();

  async function fetchUserData() {
    auth.onAuthStateChanged(async (user) => {
      console.log(user);
      // setUserDetails(user);

      try {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
          console.log(docSnap.data());
        } else {
          console.log("User no found");
        }
      } catch (err) {
        console.log("Error fetching user data:", err.message);
      }
    });
  }

  useEffect(function () {
    fetchUserData();
  }, []);

  async function handleLogout() {
    try {
      await auth.signOut();
      router.push("/login");
      console.log("User loged out sucessfully ");
    } catch (error) {
      console.error("user not loging out:", error.message);
    }
  }

  return (
    <div className="profile">
      {userDetails ? (
        <div>
          <div>
            <img
              src={userDetails.photo}
              alt="Profile"
              width="120"
              height="120"
              style={{
                borderRadius: "50%",
                objectFit: "cover",
                border: "3px solid #ddd",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            />
          </div>

          <h3>Welcome {userDetails.firstName}🥳🥳</h3>
          <div>
            <p>Email : {userDetails.email}</p>
            <p>First Name: {userDetails.firstName}</p>
            <p>Last Name:{userDetails.lastName}</p>
          </div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
