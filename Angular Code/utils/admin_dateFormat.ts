// Method for Checking the date format
export default function dateformat(date: string) {
  let format = "DD/MM/YYYY";

  if ((<any>new Date("21/5/2019")) == "Invalid Date") {
    format = "MM/DD/YYYY";
  }
  console.log("format", format);
  let formattedDate = '';
  const modifiedDateValue = date.split("/");

  if (format === "MM/DD/YYYY") {
    formattedDate = modifiedDateValue[0] + "/" + modifiedDateValue[1] + "/" + modifiedDateValue[2];
  } else {
    formattedDate = modifiedDateValue[1] + "/" + modifiedDateValue[0] + "/" + modifiedDateValue[2];
  }
  return formattedDate;
}