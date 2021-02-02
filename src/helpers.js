export default function normalisePrice(tracker, valueString) {
  const value = Number(valueString);
  if (/^SGLN|INRG/.test(tracker)) {
    return value / 100;
  }
  return value;
}
