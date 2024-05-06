// Vector2d utility class for handling coordinates
class Vector2d {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(coords) {
    return new Vector2d(this.x + coords.x, this.y + coords.y);
  }

  multiplyScalar(scalar) {
    return new Vector2d(this.x * scalar, this.y * scalar);
  }
}

// Scroll physics to handle movements and animations
class ScrollPhysics {
  constructor(viewPort) {
    this.viewPort = viewPort;
  }

  calculateForce(from, to, acceleration) {
    const x = to.x - from.x;
    const y = to.y - from.y;
    const theta = Math.atan2(y, x);
    const aX = Math.round(Math.cos(theta) * acceleration * 1000) / 1000;
    const aY = Math.round(Math.sin(theta) * acceleration * 1000) / 1000;
    return { x: aX, y: aY };
  }

  calculateVelocity(velocity, force, mass) {
    return {
      x: velocity.x + force.x / mass,
      y: velocity.y + force.y / mass,
    };
  }
}

// Main viewport class to manage the scrollable area
class ViewPort {
  constructor(elm) {
    this.elm = elm;
    this.child = elm.children[0];
    this.position = new Vector2d(0, 0);
    this.newPosition = new Vector2d(0, 0);
    this.velocity = new Vector2d(0, 0);
    this.physics = new ScrollPhysics(this);
    this.eventHandler = new ViewPortEventHandler(this);
  }

  scrollTo(x, y) {
    this.newPosition.x = x;
    this.newPosition.y = y;
  }

  setPosition(x, y) {
    this.position.x = x;
    this.position.y = y;
    this.child.style.marginLeft = -x + "px";
    this.child.style.marginTop = -y + "px";
  }

  tick() {
    const x = this.newPosition.x - this.position.x;
    const y = this.newPosition.y - this.position.y;
    const d = Math.sqrt(x * x + y * y);
    const force = this.physics.calculateForce(
      this.position,
      this.newPosition,
      d / 10
    );
    this.velocity = this.physics.calculateVelocity(
      new Vector2d(0, 0),
      force,
      1
    );
    this.setPosition(
      this.position.x + this.velocity.x,
      this.position.y + this.velocity.y
    );
  }
}

// Event handler for mouse interactions
class ViewPortEventHandler {
  constructor(viewPort) {
    this.viewPort = viewPort;
    this.isDragging = false;
    this.startCoords = new Vector2d(0, 0);

    // Mouse events
    this.viewPort.elm.addEventListener("mousedown", this.startDrag.bind(this));
    this.viewPort.elm.addEventListener("mouseup", this.endDrag.bind(this));
    this.viewPort.elm.addEventListener("mousemove", this.onDrag.bind(this));

    // Touch events
    this.viewPort.elm.addEventListener(
      "touchstart",
      this.startTouchDrag.bind(this)
    );
    this.viewPort.elm.addEventListener("touchend", this.endDrag.bind(this));
    this.viewPort.elm.addEventListener(
      "touchmove",
      this.onTouchDrag.bind(this)
    );
  }

  startDrag(e) {
    this.startCoords = new Vector2d(e.layerX, e.layerY).add(
      this.viewPort.position
    );
    this.isDragging = true;
  }

  startTouchDrag(e) {
    const touch = e.touches[0];
    this.startCoords = new Vector2d(touch.clientX, touch.clientY).add(
      this.viewPort.position
    );
    this.isDragging = true;
    e.preventDefault(); // Often necessary to prevent the page from scrolling
  }

  onDrag(e) {
    if (this.isDragging) {
      this.viewPort.scrollTo(
        this.startCoords.x - e.layerX,
        this.startCoords.y - e.layerY
      );
    }
  }

  onTouchDrag(e) {
    if (this.isDragging && e.touches.length > 0) {
      const touch = e.touches[0];
      this.viewPort.scrollTo(
        this.startCoords.x - touch.clientX,
        this.startCoords.y - touch.clientY
      );
    }
    e.preventDefault(); // This helps avoid simultaneous page scrolling
  }

  endDrag() {
    this.isDragging = false;
  }
}

// Instantiate the ViewPort and set up the animation loop
document.addEventListener("DOMContentLoaded", () => {
  const viewPort = new ViewPort(document.querySelector(".viewport"));
  function animate() {
    requestAnimationFrame(animate);
    viewPort.tick();
  }
  animate();

  document.getElementById("move").addEventListener("click", (e) => {
    e.preventDefault();
    const x = parseInt(document.getElementById("newX").value, 10);
    const y = parseInt(document.getElementById("newY").value, 10);
    viewPort.scrollTo(x, y);
  });
});
