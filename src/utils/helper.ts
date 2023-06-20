export const pageAccessedByReload = () => {
  if (window.performance) {
    if (performance.navigation.type == 1) return true;
    return false;
  }
  return false;
};
