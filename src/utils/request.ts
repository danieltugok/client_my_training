export const objectToQueryString = (queryParameters: any) => {
  return queryParameters
    ? Object.entries(queryParameters).reduce((queryString, [key, val]) => {
        const symbol = queryString.length === 0 ? '?' : '&'
        queryString += val ? `${symbol}${key}=${val}` : ''
        return queryString
      }, '')
    : ''
}
