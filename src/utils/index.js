export const renderImage = (file) => {
  return new Promise((res) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      res(e.target.result);
    };
    reader.readAsDataURL(file);
  });
};

export const getParams = () => {
  //?room=1
  const url = new URL(location.href);
  let room = 1;
  if (url.search) {
    room = url.search.split("=")[1];
  }
  return room;
};

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
