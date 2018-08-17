export default class Plane {
  constructor(id, timeout) {
    // Source for how to make a class "abstract":
    // https://stackoverflow.com/a/30560792/1079869
    if (new.target === Plane) {
      throw new TypeError('Cannot construct Plane instances directly, use a subclass instead');
    }

    if (!Number.isInteger(id)) {
      throw new TypeError("Plane's ID must be an integer");
    }

    if (typeof timeout !== 'number' || timeout <= 0) {
      throw new TypeError("Plane's timeout must be a positive number");
    }

    this.id = id;
    this.active = false;

    this.timeStart = Date.now();
    this.setTimeout(timeout);
  }

  /**
   * Set the plane to active state (= currently landing or embarking) and
   * restart the timer with 3 seconds.
   */
  setActive() {
    this.active = true;
    this.timeStart = Date.now();
    this.setTimeout(3);
  }

  /**
   * Set the lane where the plane will land to or depart from.
   *
   * @param {string} lane Lane 'A' or 'B'
   */
  setLane(lane) {
    if (lane !== 'A' && lane !== 'B') {
      throw new TypeError('Plane should be set to land to lane A or B');
    }

    this.lane = lane;
  }

  /**
   * Set the timeout value.
   *
   * @param {number} timeout Timeout in seconds, e.g. 3.
   */
  setTimeout(timeout) {
    if (typeof timeout !== 'number' || timeout <= 0) {
      throw new TypeError("Plane's timeout must be a positive number");
    }

    this.timeout = timeout;
    this.timeLeft = timeout;
  }

  /**
   * Update the timer.
   */
  updateTimer() {
    const delta = Math.floor(Date.now() - this.timeStart) / 1000;
    this.timeLeft = this.timeout - delta;
  }
}
