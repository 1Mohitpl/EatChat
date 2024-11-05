export function filterData(searchText,restraurants) {

    const result =  restraurants.filter((rastaurant) => rastaurant?.info?.name?.toLowerCase()?.includes(searchText.toLowerCase()));
     return result;
  }
  // generally use name export in helper function