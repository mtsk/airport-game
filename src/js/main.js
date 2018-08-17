import DepartingPlane from './DepartingPlane.js';
import Dom from './Dom.js';
import FatalError from './FatalError.js';
import IncomingPlane from './IncomingPlane.js';
import Random from './Random.js';
import State from './State.js';


// region event listeners

Dom.instructions.startGame.addEventListener('click', e => {
  e.preventDefault();

  Dom.instructions.root.classList.add('hidden');
  Dom.game.root.classList.remove('hidden');

  init();
});

Dom.game.input.addEventListener('keyup', function(e) {
  if (!State.running) {
    return;
  }

  Dom.setInputError('');

  // Clear input with Esc
  if (e.keyCode === 27) {
    Dom.clearInput();
    return;
  }

  // Enter
  if (e.keyCode !== 13) {
    return;
  }

  try {
    handleCommand(this.value);
    Dom.clearInput();
  } catch (e) {
    if (e instanceof FatalError) {
      State.running = false;

      console.error(e);

      alert(
        'Whoops! Something went very wrong and the game stopped.\n\n'
        + 'Sorry about that! Please reload the page to play again.'
      );
    } else {
      Dom.clearInput();
      Dom.setInputError(e.message);
    }
  }
});

// endregion event listeners


// region functions

/**
 * Handle the user-given command, i.e. parse the plane ID and the command,
 * and act accordingly.
 *
 * @param {string} value Contents of the input field
 *
 * @throws Throws an Error if the command is invalid.
 */
function handleCommand(value) {
  const matches = value.trim().match(/^(\d+) +([a-e])$/i);

  if (matches === null) {
    throw new Error('Invalid input');
  }

  const id = parseInt(matches[1], 10);

  if (id < 1) {
    throw new Error('Invalid plane ID');
  }

  if (id > State.planeIndex) {
    throw new Error('Plane not found');
  }

  const plane = State.getPlane(id);

  if (plane === null) {
    throw new Error('Plane not found');
  }

  if (plane.active) {
    throw new Error('Plane busy');
  }

  const command = matches[2].toLowerCase();

  if (
    (plane.incoming && command === 'e')
    || (plane.departing && command !== 'c' && command !== 'e')
  ) {
    throw new Error('Invalid command');
  }

  switch (command) {
    case 'a':
      plane.setLane('A');
      break;
    case 'b':
      plane.setLane('B');
      break;
    case 'c':
      if (plane.incoming) {
        State.updateScore(-2);
      } else {
        State.updateScore(-5);
      }

      State.removePlane(plane.id);
      break;
    case 'd':
      plane.delayLanding();
      break;
    case 'e':
      plane.setActive();
      State.occupyLane(plane.lane, plane.id);
      break;
    default:
      throw new FatalError('Unknown command, and it passed all previous checks!');
  }
}

/**
 * Start the game!
 */
function init() {
  State.running = true;

  startIncomingTimeout();
  startLaneATimeout();
  startLaneBTimeout();

  setInterval(loop, 100);
}

/**
 * The game loop, ran every 100ms. Update planes and the DOM.
 */
function loop() {
  if (!State.running) {
    return;
  }

  for (let plane of State.getPlanes()) {
    plane.updateTimer();
  }

  Dom.update();
}

/**
 * Start a timeout for creating a new incoming plane after a random timeout.
 * Recursive.
 */
function startIncomingTimeout() {
  if (!State.running) {
    return;
  }

  setTimeout(function() {
    startIncomingTimeout();

    State.planes.incoming.push(new IncomingPlane(State.planeIndex++));
  }, Random.generateNewPlaneTimeout());
}

/**
 * Start a timeout for creating a new plane at lane A after a random timeout.
 * Recursive.
 */
function startLaneATimeout() {
  if (!State.running) {
    return;
  }

  setTimeout(function() {
    startLaneATimeout();

    if (State.planes.laneA.length >= 5) {
      return;
    }

    State.planes.laneA.push(new DepartingPlane(State.planeIndex++, 'A'));
  }, Random.generateNewPlaneTimeout());
}

/**
 * Start a timeout for creating a new plane at lane B after a random timeout.
 * Recursive.
 */
function startLaneBTimeout() {
  if (!State.running) {
    return;
  }

  setTimeout(function() {
    startLaneBTimeout();

    if (State.planes.laneB.length >= 5) {
      return;
    }

    State.planes.laneB.push(new DepartingPlane(State.planeIndex++, 'B'));
  }, Random.generateNewPlaneTimeout());
}

// endregion functions
