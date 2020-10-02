export const allRequestIds = {};

const generateRequestId = () => {
  let id;

  do {
    id = Math.floor(Math.random() * 1e9);
  } while (id in allRequestIds);

  return id;
};

export const requestNextAnimationFrame = (callback) => {
  const id = generateRequestId();

  allRequestIds[id] = requestAnimationFrame(() => {
    allRequestIds[id] = requestAnimationFrame(() => {
      delete allRequestIds[id];
      callback();
    });
  });

  return id;
};
