export const objectDependensies = (object): (typeof object)[keyof object] =>
  Object.keys(object).map((key) => object[key])
