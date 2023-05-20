const canvas = document.getElementById("canvas_1");

const ctx = canvas.getContext("2d");

// ctx  = context

console.log(ctx);

const CANVAS_WIDTH = (canvas.width = 600);

const CANVAS_HEIGHT = (canvas.height = 600);

const image = new Image();
let playerState = "jump_sprint";

document.onkeydown = async (event) => {
  event.preventDefault();
  console.log(event.key);
  if (event.key === "ArrowRight") {
    playerState = "sprint";
  }
  if (event.key === "Shift") {
    playerState = "roll";
    setTimeout(() => {
      playerState = "sprint";
    }, 200);
  }
  if (event.key === "ArrowUp") {
    playerState = "jump";
    setTimeout(() => {
      playerState = "land";
      setTimeout(() => {
        playerState = "sprint";
      }, 100);
    }, 100);
  }
  if (event.key === "s") {
    playerState = "jump_sprint";
    setTimeout(() => {
      playerState = "sprint";
    }, 400);
  }
  if (event.key === "ArrowDown") {
    playerState = "chill";
  }
};

image.src = "./shadow_dog.png";

const spriteWidth = 575;
const spriteHeight = 523;
// moving

const staggerFrame = 5;
let gameFrame = 0;
spriteAnimation = [];
let animationStates = [
  {
    name: "idle",
    frames: 7,
  },
  {
    name: "jump",
    frames: 7,
  },
  {
    name: "land",
    frames: 7,
  },
  {
    name: "sprint",
    frames: 9,
  },
  {
    name: "dizzy",
    frames: 11,
  },
  {
    name: "set",
    frames: 5,
  },
  {
    name: "roll",
    frames: 7,
  },
  {
    name: "slow_down",
    frames: 7,
  },
  {
    name: "jump_sprint",
    frames: 12,
  },
  {
    name: "chill",
    frames: 4,
  },
];
//

animationStates.forEach((s, i) => {
  let frames = {
    loc: [],
  };
  for (let index = 0; index < s.frames; index++) {
    let x = index * spriteWidth;
    let y = i * spriteHeight;
    frames.loc.push({ x, y });
  }
  spriteAnimation[s.name] = frames;
});

console.log(spriteAnimation, "sprite");
function AnimateLoop() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  //   ctx.fillRect(0, 50, 100, 100);
  let position =
    Math.floor(gameFrame / staggerFrame) %
    spriteAnimation[playerState].loc.length;
  let frameX = position * spriteWidth;
  let frameY = spriteAnimation[playerState].loc[position].y;
  ctx.drawImage(
    image,
    frameX,
    frameY,
    spriteWidth,
    spriteHeight,
    0,
    0,
    spriteWidth,
    spriteHeight
  );
  // this is my soultion
  //   if (gameFrame % staggerFrame == 0) {
  //     if (frameY === 4) {
  //       if (frameX < 10) frameX++;
  //       else frameX = 0;
  //     } else if (frameY === 5) {
  //       if (frameX < 4) frameX++;
  //       else frameX = 0;
  //     } else {
  //       if (frameX < 6) frameX++;
  //       else frameX = 0;
  //     }
  //   }
  gameFrame++;
  requestAnimationFrame(AnimateLoop);
}
AnimateLoop();
