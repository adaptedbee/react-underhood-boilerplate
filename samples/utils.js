export const randomInteger = (min, max) => {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

export const updateArray = array => {
  const newArray = [...array];

  for (let i = 0; i < randomInteger(0, array.length); i += 1) {
    const firstIndex = randomInteger(0, array.length - 1);
    const secondlIndex = randomInteger(0, array.length - 1);
    [newArray[firstIndex], newArray[secondlIndex]] = [
      newArray[secondlIndex],
      newArray[firstIndex]
    ];
  }

  return newArray;
};

export const sortAlphabetByString = (alphabetArray, sortString) => {
  const arrayToSort = alphabetArray.filter(letter =>
    sortString.includes(letter)
  );
  arrayToSort.sort((a, b) => {
    return sortString.indexOf(a) - sortString.indexOf(b);
  });

  let j = 0;
  const finalArray = alphabetArray.map(letter => {
    if (sortString.includes(letter)) {
      j += 1;
      return arrayToSort[j - 1];
    }

    return letter;
  });

  return finalArray;
};
