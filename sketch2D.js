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

let random_seed = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);

  r = season_colors[season_selected][0] + random(-10, 10);
  g = season_colors[season_selected][1] + random(-10, 10);
  b = season_colors[season_selected][2] + random(-10, 10);

  random_seed = random(1, 100);

  // noLoop();
  // frameRate(100);
}

function draw() {
  background(0);

  translate(width / 2, height / 1.25);

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

  randomSeed(random_seed);

  branch(200 < width / 2 ? 100 : width / 7);
}

function keyPressed() {
  if (key === "s") {
    saveGif("mySketch", 4.6);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// Draw branches recursively
function branch(len) {
  push();

  // Recursive Loop to draw branches
  if (len > 10) {
    // Make each branch thinner than previous one
    strokeWeight(map(len, 10, 100, 1, 15));

    // Brown Color for Branches
    stroke(255, 255, 255);
    line(0, 0, 0, -len);
    translate(0, -len);

    // At the end of current branch, create new branches
    rotate(random(-15, -35));
    branch(len * random(0.7, 0.9));

    rotate(random(40, 60));
    branch(len * random(0.7, 0.9));
  }
  // Base Condition to draw leaves
  else {
    fill(r, g, b, 150);
    noStroke();

    translate(10, 0);
    beginShape();
    for (let i = 45; i < 135; i++) {
      let rad = 15;
      let x = rad * cos(i);
      let y = rad * sin(i);
      vertex(x, y);
    }
    for (let i = 135; i > 45; i--) {
      let rad = 15;
      let x = rad * cos(i);
      let y = rad * sin(-i) + 20;
      vertex(x, y);
    }
    endShape(CLOSE);
  }
  pop();
}
