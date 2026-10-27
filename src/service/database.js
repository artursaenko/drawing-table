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

// Returns the promise so callers can show an error when the write is rejected
export const sendData = (payload, data = {}) => {
  return set(ref(db, "room_" + payload), data);
};

// Calls back with true/false whenever the realtime connection opens or drops
export const watchConnection = (callback) => {
  onValue(ref(db, ".info/connected"), (snapshot) => {
    callback(snapshot.val() === true);
  });
};

const urlParams = getParams();
export const getValue = (onError = () => {}) => {
  onValue(
    ref(db, "room_" + urlParams),
    (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const { image, width, height } = data;
        addImageToCanvas(image, width, height);
      } else {
        clearCanvas();
      }
    },
    onError
  );
};
