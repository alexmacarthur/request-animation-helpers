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
export const afterFuturePaint = (callback, numberOfPaints = 1) => {
  const id = generateRequestId();
  let runs = 0;

  const requestFrame = () => {
    if (runs < numberOfPaints) {
      runs++;
      allRequestIds[id] = requestAnimationFrame(requestFrame);
      return;
    }

    delete allRequestIds[id];
    callback();
  };

  allRequestIds[id] = requestAnimationFrame(requestFrame);

  return id;
};

/**
 * Cancel the requestAnimationFrame instance currently associated with an ID.
 *
 * @param {number} id
 * @returns {void}
 */
export const cancelAfterFuturePaint = (id) => {
  cancelAnimationFrame(allRequestIds[id]);
  delete allRequestIds[id];
};
