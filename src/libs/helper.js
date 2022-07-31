export const isEmptyOrSpaces = (str) => {
  return (
    str === null || str === undefined || (typeof str === 'string' && str.match(/^ *$/) !== null)
  );
};
