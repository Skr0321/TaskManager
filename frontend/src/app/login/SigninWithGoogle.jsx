import { Button } from "@/components/ui/button";
import { auth, db } from "@/services/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { FaGoogle } from "react-icons/fa";

function SignInWithGoogle() {
  async function googleLogin() {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result);

      if (result.user) {
        const user = result.user;
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          accountType: "Regular User",
          photo: user.photoURL,
        });
      }
    } catch (error) {
      //   toast.error(error.message, {
      //     position: "top-center",
      //   });
      console.error("Google Sign-In Error:", error);
    }
  }

  return (
    <div
      onClick={googleLogin}
      className="flex justify-center mt-4 border-t-1 border-gray-200 p-3 "
    >
      <Button className="flex items-center gap-2">
        <FaGoogle />
        Sign in with Google
      </Button>
    </div>
  );
}

export default SignInWithGoogle;
