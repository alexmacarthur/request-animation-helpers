export const allRequestIds = {};

/**
 * Generate a unique ID.
 *
 * @returns {number}
 */
const generateRequestId = () => {
  let id;

  do {
    id = Math.floor(Math.random() * 1e9);
  } while (id in allRequestIds);

  return id;
};

/**
 * Fire a given callback after the next repaint cycle.
 *
 * @param {function} callback
 * @returns {number} generated request ID for requestAnimationFrame instances
 */
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

/**
 * Cancel the requestAnimationFrame instance currently associated with an ID.
 *
 * @param {number} id
 * @returns {void}
 */
export const cancelNextAnimationFrame = (id) => {
  cancelAnimationFrame(allRequestIds[id]);
  delete allRequestIds[id];
};
