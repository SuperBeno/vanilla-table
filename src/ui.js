import { fetchCompanies } from "./api";
import {
  ACCOUNT_EXECUTIVE_FIELD_NAME,
  COMPANIES_TABLE_HEADERS,
  COMPANY_NAME_FIELD_NAME,
  CREATED_AT_FIELD_NAME,
  REVENUE_YTD_FIELD_NAME,
  STATUS_FIELD_NAME
} from "./constants";

export const makeTable = async () => {
  const companies = await fetchCompanies();
  // Print result of api call to the developer console
  // Uncomment if you need it for debugging.
  // While this method of logging variables of interest to the console is primitive, but often highly valuable debugging technique
  // console.log(companies);

  // Initialize new array and push a header row
  const companiesToDisplay = [];
  companiesToDisplay.push(COMPANIES_TABLE_HEADERS);

  // Here we simply rearrange company fields in the order in which we want to display them in UI
  companies.map(company => {
    const row = [];
    var date = new Date(company[CREATED_AT_FIELD_NAME])
    var curr_hour = date.getHours();
    var curr_min = date.getMinutes();

    curr_min = curr_min + "";
    if (curr_min.length == 1) {
      curr_min = "0" + curr_min;
    }
    curr_hour = curr_hour + "";

    if (curr_hour.length == 1) {
      curr_hour = "0" + curr_hour;
    }

    row.push(
      company[COMPANY_NAME_FIELD_NAME],
      company[STATUS_FIELD_NAME],
      curr_hour + " : " + curr_min,
      new Intl.NumberFormat().format(company[REVENUE_YTD_FIELD_NAME]),
      company[ACCOUNT_EXECUTIVE_FIELD_NAME]
    );
    companiesToDisplay.push(row);
    console.log(company[COMPANY_NAME_FIELD_NAME])
  });

  // Programmatically create html table
  const table = document.createElement("table");
  document.body.appendChild(table); // Drew the main table node on the document

  companiesToDisplay.forEach(row => {
    const tr = table.insertRow(); //Create a new row

    row.forEach(column => {
      const td = tr.insertCell();
      td.innerText = column; // Take string from placeholder variable and append it to <tr> node
    });
  });
};