# Airport Game

> My solution to a school assignment about defensive programming techniques.

## [Play the game](https://mtsk.github.io/airport-game/index.html)

Tested in Chrome and Firefox. Browser width should be 1200+ px.

The assignment was to create an airport simulation game, similar to Airport
Madness, using defensive programming techniques:

* Writing assertations to find errors in code
* Throwing exceptions where needed
* Gracefully catching and handling expections

## About my solution

I used JavaScript (+ HTML and CSS) so that I could develop and iterate quickly
and effortlessly.

The solution is intentionally simplistic, because I wanted to focus on the main
topic of the course, i.e. defensive programming. So there's no build steps
(e.g. concatenation and minification of JS files), no responsive styles, and
definitely no fancy virtual DOM diffings and such. :smiley:

## My takeaways

The biggest takeaway for me was to realize the existence of `console.assert()`
in JavaScript! I used it extensively in this assignment, and it helped me spot
a couple of errors early on. Thanks to the assertations, the code also feels
more reliable.

I might use assertations in JavaScript in the future as well. They won't even
produce any bloat, because in real-world projects I always minify the code
before deploying to production, and the assertations will be removed.

On the other hand, I also noticed that using TypeScript instead of JavaScript
would have saved me from writing some of the assertations. For instance, now
I'm using assertations to check the types of function arguments; in TypeScript,
I would have just specified types for the parameters, and using wrong types
would have caused errors (without writing assertations).

## Assignment requirements

Minimum requirements:

* Graphical or text-based UI
* Ability to command departing planes to take off, and to accept incoming
  planes to land on two lanes
* Each landing and take-off must last a predefined amount of time, during which
  the lane will be occupied (= other operations are not allowed). Landings and
  take-offs don't need to last the same amount of time, but all landings
  together and all take-offs together must last the same amount of time.
* Departing and incoming planes appear on one of the two lanes at random
  intervals. Departing planes will wait for their turn in the lane queue, but
  incoming planes will default to one of the two lanes.
* An incoming plane will wait a certain amount of time before it reaches the
  lane and occupies it for landing. During the waiting time, the plane can be
  commanded to the other lane, commanded to go for a "waiting run" (a 360
  degree run with a fixed amount of time, after which the landing will proceed
  normally), or canceled (which will produce minus points).
* A departing plane has a specific amount of time after which it will get tired
  of waiting and will produces minus points. The plane can be commanded to take
  off, and the lane will be occupied (= landing are not allowed), but other
  planes in the queue of the same lane can be commanded to take off after a
  very short amount of time &ndash; which will naturally make the lane occupied
  again.
* All landings and take-offs produce the same amount of points.
* Two planes (incoming or departing) occupying the same lane at the same time
  will cause a crash and end the game.

## License

MIT
