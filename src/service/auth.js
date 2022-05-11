import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

import { firebaseConfig } from "@/config/firebase-config";

initializeApp(firebaseConfig);
const auth = getAuth();

export const checkUserDetails = ({ email, password } = {}) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("user :>> ", user);
      return user;
    })
    .catch((error) => {
      throw new Error(error);
    });
};

export const logOff = () => {
  signOut(auth)
    .then(() => {})
    .catch(() => {});
};

//admin@gmail.com
//admin123456
