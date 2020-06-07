// Javascript for Fourier Transform Art
// The DFT algorithm consists in another .js file
// The transformed set of Complex Euler equations are implemented to draw the consequitive Epicycles for this drawing
// By Pritam Pagla


let x = [];
let y = [];
let fourierX;
let fourierY;
let time = 0;
let path = [];

const scale = 1.3;   // Scaling the size of the drawing on Canvas

const XOffset = 105;    // for Custom horizontal adjustment of the drawing_position's 
const YOffset = 210;    // for Custom vertical adjustment of the drawing_position's 

function setup() {
  createCanvas(1000, 570);    //defining the canvas 
  const skip = 1;         // for fastening the drawing, if yoou have more than enough coordinate points of your custom path
  for (let i = 0; i < drawing.length; i += skip) {
    x.push(-drawing[i].x*scale+XOffset);
    y.push(-drawing[i].y*scale+YOffset);
  }
  fourierX = dft(x);   //dtf() is defined in DiscreteFourierTransformAlgorithm.js
  fourierY = dft(y);

  fourierX.sort((a, b) => b.amp - a.amp);  // for sorting out the epicycles according to their amplitude
  fourierY.sort((a, b) => b.amp - a.amp);
}

function epiCycles(x, y, rotation, fourier) {  // for drawing the consequetive epicycles
  for (let i = 0; i < fourier.length; i++) {
    let prevx = x;
    let prevy = y;
    let freq = fourier[i].freq;
    let radius = fourier[i].amp;
    let phase = fourier[i].phase;
    x += radius * cos(freq * time + phase + rotation);  // Euler Equation corresponding to Fourier Transform of a function
    y += radius * sin(freq * time + phase + rotation);

    stroke(255, 100);
    noFill();
    ellipse(prevx, prevy, radius * 2);  // using previous x and y positions for keeping track of connecting lines
    stroke(255);
    line(prevx, prevy, x, y); // drawing the connecting line
  }
  return createVector(x, y);  
}

function draw() {
  background(0);  

  let vx = epiCycles(width / 2 + 100, 80, 0, fourierX);  
  let vy = epiCycles(150, height / 2 + 100, HALF_PI, fourierY);
  let v = createVector(vx.x, vy.y); // keeping track of the endpoint of each set of epicycles
  path.unshift(v);
  line(vx.x, vx.y, v.x, v.y);  // line joining two set of epicycles
  line(vy.x, vy.y, v.x, v.y);  // line joining two set of epicycles

  beginShape();
  noFill();
  for (let i = 0; i < path.length; i++) {  // drawing the curve with the line joining endpoints of two consequetive set of epicycles 
    vertex(path[i].x, path[i].y);
  }
  endShape();

  const dt = TWO_PI / fourierY.length;   // for terminating the drawing after a complete turn
  time += dt;

  if (time > TWO_PI) {  // starting the path one again after it reaches one complete turn
    time = 0;
    path = [];
  }
}
