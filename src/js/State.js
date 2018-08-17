import Dom from './Dom.js';

export default {
  occupiedLanes: {
    A: null,
    B: null,
  },
  planeIndex: 1,
  planes: {
    incoming: [],
    laneA: [],
    laneB: [],
  },
  running: false,
  score: 0,

  /**
   * Get an array of all planes, i.e. incoming and departing planes.
   *
   * @returns {array} All planes.
   */
  getPlanes() {
    return [...this.planes.incoming, ...this.planes.laneA, ...this.planes.laneB];
  },

  /**
   * Get a plane with the given ID.
   *
   * @param {int} id The ID of the plane.
   *
   * @returns {Plane} The plane, or null if not found.
   */
  getPlane(id) {
    if (id > this.planeIndex) {
      return null;
    }

    return this.getPlanes().find(plane => plane.id === id) || null;
  },

  /**
   * Set the given lane occupied by a plane with the given id. Stop the game
   * if lane is already occupied.
   *
   * @param {string} lane Lane 'A' or 'B'
   * @param {int} planeId ID of the plane
   */
  occupyLane(lane, planeId) {
    console.assert(
      lane === 'A' || lane === 'B',
      {
        message: 'Only lanes A and B can be occupied',
        lane,
        state: this,
      }
    );

    console.assert(
      typeof planeId === 'number' && planeId > 0,
      {
        message: 'Plane ID must be a positive number',
        planeId,
      }
    );

    console.assert(
      this.getPlane(planeId) !== null,
      {
        message: "Can't find the plane",
        planeId,
        planes: this.planes,
      }
    );

    if (this.occupiedLanes[lane] === null) {
      this.occupiedLanes[lane] = planeId;
      return;
    }

    if (this.occupiedLanes[lane] === planeId) {
      return;
    }

    this.running = false;
    this.updateScore(0);
    Dom.update();

    const otherPlaneId = this.occupiedLanes[lane];

    // Wait for the DOM to be updated before showing the alert, so that the
    // conflict will be visible
    setTimeout(() => {
      alert(
        `Game over! Planes ${otherPlaneId} and ${planeId} crashed at lane ${lane}.\n\n`
        + `You got ${this.score} points.\n\n`
        + 'Reload the page to play again.'
      );
    }, 10);
  },

  /**
   * Release the given lane from being occupied.
   *
   * @param {string} lane Lane 'A' or 'B'
   */
  releaseLane(lane) {
    console.assert(
      lane === 'A' || lane === 'B',
      {
        message: 'Only lanes A and B can be released',
        lane,
      }
    );

    console.assert(
      this.occupiedLanes[lane] !== null,
      {
        message: "Lane wasn't occupied",
        lane,
        state: this,
      }
    );

    this.occupiedLanes[lane] = null;
  },

  /**
   * Remove a plane with the given ID from a planes array.
   *
   * @param {int} id The plane's ID
   */
  removePlane(id) {
    let index = this.planes.incoming.findIndex(plane => plane.id === id);

    if (index >= 0) {
      this.planes.incoming.splice(index, 1);
      return;
    }

    index = this.planes.laneA.findIndex(plane => plane.id === id);

    if (index >= 0) {
      this.planes.laneA.splice(index, 1);
      return;
    }

    index = this.planes.laneB.findIndex(plane => plane.id === id);

    if (index >= 0) {
      this.planes.laneB.splice(index, 1);
      return;
    }

    console.assert(
      false,
      {
        message: "Couldn't find the plane to remove!",
        id,
        planes: this.planes,
      }
    );
  },

  /**
   * Update score with the given amount.
   *
   * @param {int} amount How much to update the score.
   */
  updateScore(amount) {
    console.assert(
      Number.isInteger(amount),
      {
        message: 'Score should be updated with an integer',
        amount,
      }
    );

    this.score += amount;
  },
};
