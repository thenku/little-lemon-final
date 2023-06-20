import { useRef, useEffect } from 'react';

/**
 * 3. Implement this function to transform the raw data
 * retrieved by the getMenuItems() function inside the database.js file
 * into the data structure a SectionList component expects as its "sections" prop.
 * @see https://reactnative.dev/docs/sectionlist as a reference
 */
export function getListData(data = []) {
  
  const indexes = {};
  const LIST_DATA = [];

  for (let i = 0; i < data.length; i++) { 
    const {id, title, price, category} = data[i];
    let index = indexes[category];
    if(index === undefined){
      index = LIST_DATA.length; 
      indexes[category] = index;
      LIST_DATA[index] = {title:category, data:[]}
    }
    LIST_DATA[index].data.push({id, title, price})
  }
  return LIST_DATA; 
  
}

export function useUpdateEffect(effect, dependencies = []) {
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      return effect();
    }
  }, dependencies);
}
