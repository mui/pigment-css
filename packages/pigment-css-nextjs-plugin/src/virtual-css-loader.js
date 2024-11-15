export const loader = function virtualFileLoader() {
  const callback = this.async();
  const resourceQuery = this.resourceQuery.slice(1);
  const { source } = JSON.parse(decodeURIComponent(decodeURI(atob(resourceQuery))));
  return callback(null, source);
};
