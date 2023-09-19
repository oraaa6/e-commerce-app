

export const createSearchParam = (
  param: string) => {

return param.replaceAll(' ', '-').toLowerCase()
};
