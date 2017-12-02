export function cube(x: number) {
  return x * x * x;
}

// Present only so we can see it being dropped by tree shaking
export function square(x: number) {
  return x * x;
}
