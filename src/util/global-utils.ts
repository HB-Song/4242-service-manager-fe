export const hashCode = (value: string) => {
  if (!value) {
    throw new Error('value must have length');
  }

  let hash = 0;
  for (var i = 0; i < value.length; i++) {
    var character = value.charCodeAt(i);
    hash = (hash << 5) - hash + character;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
};
