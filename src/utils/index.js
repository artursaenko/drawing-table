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
