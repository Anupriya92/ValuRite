const customIsNullOrUndefined = x => x === null || x === undefined;
const isNullOrUndefinedorEmptyString = x => customIsNullOrUndefined(x) || x === '';
export { isNullOrUndefinedorEmptyString, customIsNullOrUndefined };
