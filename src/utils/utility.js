exports.splitName = (name) => {
  const firstLetterName = name.split(' ')[0].charAt(0).toUpperCase()
  const firstLetterLastName = name.split(' ').at(-1).charAt(0).toUpperCase()

  return firstLetterName + firstLetterLastName
}
