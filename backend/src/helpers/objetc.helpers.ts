export function filterProperties(objectWithTheProperties, objectToFilter) {
  const definedProperties = Object.keys(objectWithTheProperties.describe().keys);
  const filteredObject = {};
  definedProperties.forEach(property => (filteredObject[property] = objectToFilter[property]));
  return filteredObject;
}
