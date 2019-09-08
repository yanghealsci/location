export const getParamPlaceHolders = (n, startsFrom = 1) => {
  if (n <= 0) {
    throw new Error('length of params should > 0')
  }
  const idx = Array.from({ length: n }, (v, k) => `$${k + startsFrom}`)
  return idx.join(',')
}