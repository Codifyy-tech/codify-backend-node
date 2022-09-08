exports.splitName = (name) => {
    let firstLetterName = name.split(' ')[0].charAt(0).toUpperCase();
    let firstLetterLastName = name.split(' ').at(-1).charAt(0).toUpperCase();

    return firstLetterName + firstLetterLastName
}