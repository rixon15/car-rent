interface iSearchOptionns {
  carTypes: object;
  capacity: object;
}

interface iOptionsToReturn {
  carTypes: string[];
  capacity: string[];
}

const extractSearchOptions = (searchOptions: any) => {
  const optionsToReturn: iOptionsToReturn = { carTypes: [], capacity: [] };

  Object.keys(searchOptions.carTypes).forEach((option) => {
    if (searchOptions.carTypes[option] !== "false") {
      optionsToReturn.carTypes.push(option);
    }
  });

  Object.keys(searchOptions.capacity).forEach((option) => {
    if (searchOptions.capacity[option] !== "false") {
      optionsToReturn.capacity.push(option);
    }
  });

  return optionsToReturn;
};

export default extractSearchOptions;
