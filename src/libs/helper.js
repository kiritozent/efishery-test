export const isEmptyOrSpaces = (str) => {
  return (
    str === null || str === undefined || (typeof str === 'string' && str.match(/^ *$/) !== null)
  );
};

export const filterData = (data = [], filters, callback) => {
  if (!filters) return data;
  const result = [...data].filter((item) => {
    const filterKey = Object.keys(filters);
    let filteredCount = 0;
    filterKey.forEach((element) => {
      const filter = filters?.[element];
      if (!filter?.value) return (filteredCount += 1);
      switch (filter?.type) {
        case 'search':
          if (item?.[element]?.toLowerCase()?.includes(filter?.value?.toLowerCase())) {
            filteredCount += 1;
          }
          break;
        case 'select':
          if (item?.[element] === filter?.value) {
            filteredCount += 1;
          }
          break;
        case 'area': {
          const [provinceKey, cityKey] = element?.split?.(',') ?? [null, null];
          const isProvince = filter?.value?.province
            ? item?.[provinceKey] === filter?.value?.province
            : true;
          const isCity = filter?.value?.city ? item?.[cityKey] === filter?.value?.city : true;
          if (isProvince && isCity) {
            filteredCount += 1;
          }
          break;
        }
        case 'number-range': {
          const minimum = filter?.value?.min ? item?.[element] >= filter?.value?.min : true;
          const maximum = filter?.value?.max ? item?.[element] <= filter?.value?.max : true;
          if (minimum && maximum) {
            filteredCount += 1;
          }
          break;
        }
        default:
          return false;
      }
    });
    return filteredCount === filterKey.length;
  });

  callback?.(result);
  return result;
};
