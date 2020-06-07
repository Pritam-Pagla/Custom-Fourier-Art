// Discrete Fourier Transform Algorithm for calculating the radius, amp, and frequency of the each epicycles

function dft(x) {
  const X = [];
  const N = x.length;  //total number of epicycles at each set
  for (let k = 0; k < N; k++) {  // Calculating the coefficients of each fourier series elements 
    let re = 0;
    let im = 0;
    for (let n = 0; n < N; n++) {
      const phi = (TWO_PI * k * n) / N;
      re += x[n] * cos(phi);     // Euler Equation: e^i(phi) = r*cos(phi) - r*sin(phi)
      im -= x[n] * sin(phi);     // and integrating over them
    }
    re = re / N;  
    im = im / N;

    let freq = k;
    let amp = sqrt(re * re + im * im);  // amplitude of that epicycle with frequency k
    let phase = atan2(im, re);          // Phase of that epicycle with frequency k
    X[k] = { re, im, freq, amp, phase }; 
  }
  return X;
}
