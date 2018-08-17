export default {
  /**
   * Generate a random lane (A or B) for incoming planes to land to by default.
   *
   * @returns {string} 'A' or 'B'
   */
  generateLane() {
    const random = Math.floor(Math.random() * 2);

    console.assert(
      random === 0 || random === 1,
      {
        message: 'Error while generating a random lane (A or B); random number should be 0 or 1',
        random,
      }
    );

    return (random === 0) ? 'A' : 'B';
  },

  /**
   * Generate a random timeout between 2 and 10 seconds.
   *
   * @returns {int} Timeout in ms, between 2,000 and 10,000.
   */
  generateNewPlaneTimeout() {
    // Source for generating a random number:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    const min = 2000;  // inclusive
    const max = 10001; // exclusive
    const random = Math.floor(Math.random() * (max - min)) + min;

    const timeout = random;

    console.assert(
      timeout >= min && timeout <= max - 1,
      {
        message: `Randomly generated timeout should be between ${min} and ${max - 1} ms`,
        timeout,
      }
    );

    return timeout;
  },

  /**
   * Generate a random time to landing, between 5 and 15 seconds.
   *
   * @returns {int} Timeout in seconds, i.e. 5, 6 etc.
   */
  generateTimeToLanding() {
    const min = 5;  // inclusive
    const max = 16; // exclusive
    const random = Math.floor(Math.random() * (max - min)) + min;

    console.assert(
      random >= 5 && random <= 15,
      {
        message: 'Randomly generated time to landing should be between 5 and 15 s',
        random,
      }
    );

    return random;
  },
};
