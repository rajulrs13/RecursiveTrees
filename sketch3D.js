let num_branches = 3;

let season_colors = [
  [92, 169, 10],
  [180, 120, 40],
  [10, 10, 10],
  [220, 120, 170],
];

let season_selected = 0;

let season_change_time = 20;

let r;
let g;
let b;

let final_r = 0;
let final_g = 0;
let final_b = 0;
let delta_r = 0;
let delta_g = 0;
let delta_b = 0;
let delta_r_step = 0;
let delta_g_step = 0;
let delta_b_step = 0;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);

  r = season_colors[season_selected][0] + random(-10, 10);
  g = season_colors[season_selected][1] + random(-10, 10);
  b = season_colors[season_selected][2] + random(-10, 10);

  // noLoop();
}

function draw() {
  // frameRate();
  background(0);
  translate(0, 200, 0);

  // Logic for color change of leaves as per seasons
  if (frameCount % season_change_time == 0) {
    r = season_colors[season_selected][0] + random(-10, 10);
    g = season_colors[season_selected][1] + random(-10, 10);
    b = season_colors[season_selected][2] + random(-10, 10);

    season_selected = (season_selected + 1) % 4;

    final_r = season_colors[season_selected][0] + random(-10, 10);
    delta_r = r - final_r;
    delta_r_step = delta_r / season_change_time;

    final_g = season_colors[season_selected][1] + random(-10, 10);
    delta_g = g - final_g;
    delta_g_step = delta_g / season_change_time;

    final_b = season_colors[season_selected][2] + random(-10, 10);
    delta_b = b - final_b;
    delta_b_step = delta_b / season_change_time;
  } else {
    r = r - delta_r_step;
    g = g - delta_g_step;
    b = b - delta_b_step;
  }

  randomSeed(1);

  rotateY(frameCount);

  branch(150);
}

function keyPressed() {
  if (key === "s") {
    saveGif("mySketch", 5);
  }
}

// Draw branches recursively
function branch(len) {
  // Make each branch thinner than previous one
  strokeWeight(map(len, 10, 100, 0.5, 5));

  // Brown Color for Branches
  stroke(255, 255, 255);

  line(0, 0, 0, 0, -len - 1, 0);
  translate(0, -len, 0);

  // Recursive Loop to draw branches
  if (len > 10) {
    // At the end of current branch, create new branches
    for (let i = 0; i < num_branches; i++) {
      rotateY(random(100, 140));

      push();

      rotateZ(random(20, 50));
      branch(len * 0.7);

      pop();
    }
  }
  // Base Condition to draw leaves
  else {
    if (!(season_selected == 2 && random() > 0.5)) {
      randomSeed(1);
      fill(r, g, b, 200);
      noStroke();
      translate(5, 0, 0);
      rotateZ(90);

      beginShape();
      for (let i = 45; i < 135; i++) {
        let rad = 7;
        let x = rad * cos(i);
        let y = rad * sin(i);
        vertex(x, y);
      }
      for (let i = 135; i > 45; i--) {
        let rad = 7;
        let x = rad * cos(i);
        let y = rad * sin(-i) + 10;
        vertex(x, y);
      }
      endShape(CLOSE);
    }
  }
}
