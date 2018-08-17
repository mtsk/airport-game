import Plane from './Plane.js';
import State from './State.js';

export default class DepartingPlane extends Plane {
  constructor(id, lane) {
    super(id, 10);

    this.setLane(lane);

    this.departing = true;
    this.incoming = false;
  }

  updateTimer() {
    super.updateTimer();

    if (this.timeLeft > 0) {
      return;
    }

    if (this.active) {
      State.updateScore(1);
      State.releaseLane(this.lane);
      State.removePlane(this.id);
      return;
    }

    // Departing planes net -1 point after each timeout
    State.updateScore(-1);
    this.timeStart = Date.now();
    this.timeLeft = this.timeout;
  }
}
