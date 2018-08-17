import Plane from './Plane.js';
import Random from './Random.js';
import State from './State.js';

export default class IncomingPlane extends Plane {
  constructor(id) {
    super(id, 20);

    this.setLane(Random.generateLane());

    this.departing = false;
    this.incoming = true;

    this.landingTimeout = Random.generateTimeToLanding();
    this.landingTimeLeft = this.landingTimeout;
  }

  /**
   * Delay landing by extending the timeout.
   */
  delayLanding() {
    this.landingTimeout += 3;
  }

  updateTimer() {
    super.updateTimer();

    if (!this.active) {
      const landingDelta = Math.floor(Date.now() - this.timeStart) / 1000;
      this.landingTimeLeft = this.landingTimeout - landingDelta;
    }

    if (this.active && this.timeLeft > 0) {
      return;
    }

    if (!this.active && this.timeLeft > 0 && this.landingTimeLeft > 0) {
      return;
    }

    if (this.active) {
      State.updateScore(1);
      State.releaseLane(this.lane);
      State.removePlane(this.id);
      return;
    }

    // Incoming planes leave in frustration after the timeout
    if (this.timeLeft <= 0) {
      State.updateScore(-3);
      State.removePlane(this.id);
      return;
    }

    // Time to land
    this.setActive();
    State.occupyLane(this.lane, this.id);
  }
}
