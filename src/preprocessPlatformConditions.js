export function preprocessPlatformConditions(data, fieldName) {
  const arr = data?.[fieldName];
  console.log("Firebase raw value:", arr);   
  if (!Array.isArray(arr) || arr.length !== 3) return null;

  // Normalize to strict 0/1
  const bits = arr.map((v) => (Number(v) === 1 ? 1 : 0));

  // If multiple 1s exist, keep only the first 1 from the left
  const firstOneIndex = bits.indexOf(1);
  if (firstOneIndex !== -1) {
    for (let i = 0; i < bits.length; i++) {
      bits[i] = i === firstOneIndex ? 1 : 0;
    }
  }

  return bits.join(""); // "000", "100", "010", "001"
}