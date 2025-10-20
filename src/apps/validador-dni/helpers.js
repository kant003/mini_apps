export const dniLetter = (numStr) => {
  if (!numStr || numStr.length !== 8) return ''
  const n = parseInt(numStr, 10)
  if (Number.isNaN(n)) return ''
  const letters = 'TRWAGMYFPDXBNJZSQVHLCKE'
  return letters[n % 23]
}
