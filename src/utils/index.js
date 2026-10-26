export const renderImage = (file) => {
  return new Promise((res) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      res(e.target.result);
    };
    reader.readAsDataURL(file);
  });
};

// ?room=1 (default) or ?room=demo for the public demo room
export const getParams = () => {
  const room = new URLSearchParams(location.search).get("room");
  return room && /^[A-Za-z0-9_-]{1,40}$/.test(room) ? room : "1";
};

export const isDemoRoom = () => getParams() === "demo";

let canvas = null;
let ctx = null;

export const addImageToCanvas = (url, w = 300, h = 300) => {
  if (!canvas) canvas = document.querySelector(".canvas");
  if (canvas && !ctx) ctx = canvas.getContext("2d");
  let img = new Image();
  img.src = url;
  img.onload = function () {
    ctx.drawImage(img, 0, 0, w, h);
  };
};

export const clearCanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};
