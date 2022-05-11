import { initializeApp } from "firebase/app";
import { firebaseConfig } from "@/config/firebase-config";
import { getDatabase, set, ref, get, onValue } from "firebase/database";

import { getParams, addImageToCanvas, clearCanvas } from "../utils";

initializeApp(firebaseConfig);
const db = getDatabase();

export const getData = (payload) => {
  return get(ref(db, "room_" + payload))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        return null;
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export const sendData = (payload, data = {}) => {
  try {
    set(ref(db, "room_" + payload), data);
  } catch (error) {
    throw new Error(error);
  }
};

const urlParams = getParams();
export const getValue = () => {
  onValue(ref(db, "room_" + urlParams), (snapshot) => {
    const data = snapshot.val();
    if (data) {
      const { image, width, height } = data;
      addImageToCanvas(image, width, height);
    } else {
      clearCanvas();
    }
  });
};
