const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const objectCounter = document.getElementById("objectcount");

const BOX_COLORS = [
  "red",
  "green",
  "blue",
  "black",
  "purple",
  "orange",
  "cyan",
  "lightgreen"
];

function randomColor() {
  let i = Math.floor(Math.random() * BOX_COLORS.length);
  return BOX_COLORS[i];
}

var oldelapsed, elapsed, delta, FPS;

function loop() {
  oldelapsed = elapsed;
  elapsed = window.performance.now();
  delta = elapsed - oldelapsed;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  GameObjects.forEach(element => {
    element.update();
  });

  GameObjects.forEach(element => {
    element.draw(ctx);
  });
}

var GameObjects = [];

class FPSCounter {
  constructor(font = "30px Arial", position = { x: 50, y: 500 }) {
    this.font = font;
    this.position = position;
    this.nextCheck = 0;
    this.text = "FPS" + 1000 / delta;
  }

  update() {
    if (this.nextCheck <= elapsed) {
      this.text = "FPS:" + Math.floor(1000 / delta);
      this.nextCheck = elapsed + 1000;
    }
  }

  draw(ctx) {
    ctx.font = this.font;
    ctx.fillStyle = "black";
    ctx.fillText(this.text, this.position.x, this.position.y);
  }
}

class Box {
  constructor(position = { x: 0, y: 0 }, dimensions = { width: 5, height: 5 }) {
    this.position = position;
    this.dimensions = dimensions;
    this.speed = {
      x: Math.random(),
      y: Math.random()
    };
    this.color = "black";
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(
      this.position.x,
      this.position.y,
      this.dimensions.width,
      this.dimensions.height
    );
  }

  update() {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;
    if (this.position.x >= 400) {
      this.speed.x = -1 + Math.random();
      this.color = randomColor();
    }

    if (this.position.x < 0) {
      this.speed.x = 1 + Math.random();
      this.color = randomColor();
    }

    if (this.position.y >= 400) {
      this.speed.y = -1 + Math.random();
      this.color = randomColor();
    }

    if (this.position.y < 0) {
      this.speed.y = 1 + Math.random();
      this.color = randomColor();
    }
    ctx.fillStyle = "black";
  }
}

for (i = 0; i < 20000; i++) {
  addObject();
}

fps = new FPSCounter();
GameObjects.push(fps);

window.setInterval(loop, 1000 / 60);

function clearAll() {
  GameObjects = GameObjects.filter(elem => {
    return elem.constructor.name == "FPSCounter";
  });
}

function addObject() {
  let position = {
    x: Math.floor(Math.random() * 400),
    y: Math.floor(Math.random() * 400)
  };

  let dimensions = {
    width: Math.floor(Math.random() * 20) + 5,
    height: Math.floor(Math.random() * 20 + 5)
  };

  let box = new Box(position, dimensions);
  this.GameObjects.push(box);
  objectCounter.innerHTML = GameObjects.length;
}
