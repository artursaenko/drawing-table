import { createStore } from "vuex";

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firebaseConfig } from "@/config/firebase-config";
import { checkUserDetails } from "@/service/auth";

initializeApp(firebaseConfig);
const auth = getAuth();

export default createStore({
  state: {
    offsetX: 0,
    offsetY: 0,
    showForm: true,
    user: null,
    dragAndDropElement: false,
    editorSettings: {
      type: "",
    },
  },
  getters: {
    GET_USER: (state) => {
      return state.user;
    },
    GET_OFFSET_ELEMENT: (state) => {
      return {
        x: state.offsetX,
        y: state.offsetY,
      };
    },
    GET_DRAG_AND_DROP: (state) => {
      return state.dragAndDropElement;
    },
    GET_EDITOR_SETTINGS: (state) => {
      return state.editorSettings;
    },
  },
  mutations: {
    TOGGLE_SHOW_FORM: (state, payload) => {
      state.showForm = payload;
    },
    SET_USER: (state, payload) => {
      state.user = payload;
    },
    SET_DRAG_AND_DROP: (state, payload) => {
      state.dragAndDropElement = payload;
    },
    SET_OFFSET_ELEMENT: (state, payload) => {
      state.offsetX = payload.x;
      state.offsetY = payload.y;
    },
    SET_EDITOR_SETTINGS: (state, type) => {
      state.editorSettings = { ...state.editorSettings, type };
    },
  },
  actions: {
    SET_EDITOR_SETTINGS: ({ commit }, payload) => {
      commit("SET_EDITOR_SETTINGS", payload);
    },
    TOGGLE_SHOW_FORM: ({ commit }, payload) => {
      commit("TOGGLE_SHOW_FORM", payload);
    },
    VALIDATE_USER: (_, payload) => {
      return checkUserDetails(payload)
        .then((response) => response)
        .catch((error) => {
          throw new Error(error);
        });
    },
    GET_USER: ({ commit }) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          commit("SET_USER", user);
        } else {
          commit("SET_USER", null);
        }
      });
    },
    SET_DRAG_AND_DROP: ({ commit }, payload) => {
      commit("SET_DRAG_AND_DROP", payload);
    },
    SET_OFFSET_ELEMENT: ({ commit }, payload) => {
      commit("SET_OFFSET_ELEMENT", payload);
    },
  },
});
