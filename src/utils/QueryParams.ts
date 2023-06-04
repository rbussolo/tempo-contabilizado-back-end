function queryParamToInt(queryParam: any): number {
  const result = parseInt(queryParam as string);

  if (isNaN(result)) {
    return 0;
  }

  return result;
}

// Format convert (yyyy-mm-dd)
function queryParamToDate(queryParam: any): Date | null {
  const result = new Date(queryParam);

  return result;
}

function queryParamToBoolean(queryParam: any): boolean {
  return queryParam == 'true';
}

function dateToWhereCondition(date: Date): string {
  const day = date.getDate().toString().padStart(2, "0");
  const month = date.getMonth().toString().padStart(2, "0");
  const year = date.getFullYear().toString();

  return `to_date("${day + month + year}","ddmmyyyy")`;
}

export { queryParamToInt, queryParamToDate, queryParamToBoolean, dateToWhereCondition };