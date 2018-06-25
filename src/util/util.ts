export function isNumeric(v): boolean {
  return !isNaN(parseFloat(v)) && isFinite(v);
}
