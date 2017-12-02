export function cube(x) {
  return x * x * x;
}

// Present only so we can see it being dropped by tree shaking
export function square(x) {
  return x * x;
}
