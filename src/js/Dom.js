import Plane from './Plane.js';
import State from './State.js';

const roots = {
  instructions: document.getElementById('instructions'),
  game: document.getElementById('game'),
};

/**
 * Build an HTML list of incoming planes.
 *
 * @param {string} lane Lane 'A' or 'B'
 *
 * @returns {string} HTML of `<li>` elements, or an empty string if there's
 *                   no departing planes at the given lane.
 */
function buildListOfDepartingPlanes(lane) {
  console.assert(
    lane === 'A' || lane === 'B',
    {
      message: 'Can build list of departing planes for only lanes A and B',
      lane,
    }
  );

  const departingPlanes = (lane === 'A') ? State.planes.laneA : State.planes.laneB;

  if (!departingPlanes.length) {
    return '';
  }

  return departingPlanes.map(plane => buildPlaneListItem(
    plane,
    `<li>Embarking done in ${plane.timeLeft.toFixed(1)}s</li>`,
    `<li>Frustration timer: ${buildTimeLeft(plane.timeLeft)}</li>`
  )).join('');
}

/**
 * Build an HTML list of incoming planes.
 *
 * @returns {string} HTML of `<li>` elements, or an empty string if there's
 *                   no incoming planes.
 */
function buildListOfIncomingPlanes() {
  const incomingPlanes = State.planes.incoming;

  if (!incomingPlanes.length) {
    return '';
  }

  return incomingPlanes.map(plane => buildPlaneListItem(
    plane,
    `
      <li>
        Landing to lane ${plane.lane}
        done in ${plane.timeLeft.toFixed(1)}s
      </li>
    `,
    `
      <li>
        Landing to lane
        <span class="color-${plane.lane.toLowerCase()}">${plane.lane}</span>
        in ${buildTimeLeft(plane.landingTimeLeft)}
      </li>
      <li>Leaving in ${buildTimeLeft(plane.timeLeft)}</li>
    `
  )).join('');
}

/**
 * Build an HTML list item for the current plane and with the given contents.
 *
 * @param {Plane} plane A Plane object
 * @param {string} activeContent HTML to show when the plane is active
 *                               (currently landing or embarking)
 * @param {string} passiveContent HTML to show otherwise
 *
 * @returns {string} HTML of a `<li>` element
 */
function buildPlaneListItem(plane, activeContent, passiveContent) {
  console.assert(
    plane instanceof Plane,
    {
      message: "Can't build a list item for other than Plane objects",
      plane,
    }
  );

  console.assert(
    typeof activeContent === 'string' && typeof passiveContent === 'string',
    {
      message: 'Plane list item contents must be strings',
      activeContent,
      passiveContent,
    }
  );

  return `
    <li ${plane.active ? `class="color-${plane.lane.toLowerCase()}"` : ''}>
      Plane ${plane.id}
      <ul>${plane.active ? activeContent : passiveContent}</ul>
    </li>
  `;
}

/**
 * Build time left text of the given time. Show one decimal if time is almost
 * up.
 *
 * @param {number} time Time left
 *
 * @returns {string} HTML with the time left, wrapped in a `<span>` if time
 *                   is almost up.
 */
function buildTimeLeft(time) {
  console.assert(
    typeof time === 'number',
    {
      message: "Can't build a timer for non-numbers",
      time,
    }
  );

  let html = time.toFixed(time <= 3 ? 1 : 0) + 's';

  if (time <= 3) {
    html = `<span class="color-red">${html}</span>`;
  }

  return html;
}

export default {
  instructions: {
    root: roots.instructions,
    startGame: roots.instructions.getElementsByClassName('start-game')[0],
  },

  game: {
    root: roots.game,

    incoming: roots.game.getElementsByClassName('incoming')[0],
    laneA: roots.game.getElementsByClassName('lane-a')[0],
    laneB: roots.game.getElementsByClassName('lane-b')[0],

    input: roots.game.getElementsByClassName('input')[0],
    inputError: roots.game.getElementsByClassName('input-error')[0],

    score: roots.game.getElementsByClassName('score')[0],
  },

  /**
   * Clear the input field.
   */
  clearInput() {
    this.game.input.value = '';
  },

  /**
   * Show the given input error message.
   *
   * @param {string} msg Message to show.
   */
  setInputError(msg) {
    console.assert(
      typeof msg === 'string',
      {
        message: 'Input error message should be a string',
        msg,
      }
    );

    this.game.inputError.textContent = msg;
  },

  /**
   * Update the DOM, i.e. print planes and the score.
   */
  update() {
    this.game.incoming.innerHTML = buildListOfIncomingPlanes();
    this.game.laneA.innerHTML = buildListOfDepartingPlanes('A');
    this.game.laneB.innerHTML = buildListOfDepartingPlanes('B');

    this.game.score.textContent = State.score;
  },
};
