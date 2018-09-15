// ----------------------------------------------------------------
// REITRADER SCREEN SCRAP MAPPER
//
// ----------------------------------------------------------------

let fs = require('fs'),
  path = require('path'),
  inputFileString = '',
  outputFileString = '',
  inputFile = path.join(__dirname, '/input.txt'),
  outputFile = path.join(__dirname, '/output.txt');
  
// read the input file
fs.readFile(inputFile, 'utf8', (err, data) => {
  if (err) {
    return console.log(err);
  }

  // the entire file as a string
  inputFileString = data.toString();
  // console.log(inputFileString);

  // if the field has already been blanked out then just exit and do nothing...
  if (inputFileString.length < 10) {
    return;
  }

  // breaking down the string into parts
  // NOTE: REDO THIS LIKE THE NORADA FILE...
  inputFileString = inputFileString.split('Metro location:')[1];
  let location = inputFileString.split('Price:')[0];

  inputFileString = inputFileString.split('Price:')[1];
  let price = inputFileString.split('Type:')[0];

  inputFileString = inputFileString.split('ARV:')[1];
  let arv = inputFileString.split('Category:')[0];

  inputFileString = inputFileString.split('Address:')[1];
  let address = inputFileString.split('City:')[0];

  inputFileString = inputFileString.split('City:')[1];
  let city = inputFileString.split('State:')[0];

  inputFileString = inputFileString.split('Bedrooms:')[1];
  let bedrooms = inputFileString.split('Bathrooms: ')[0];

  inputFileString = inputFileString.split('Bathrooms:')[1];
  let bathrooms = inputFileString.split('Repair:')[0];

  inputFileString = inputFileString.split('Repair:')[1];
  let repair = inputFileString.split('Contractor?:')[0];

  inputFileString = inputFileString.split('Yearly Taxes :')[1];
  let taxes = inputFileString.split('Year Built')[0];

  inputFileString = inputFileString.split('Year Built :')[1];
  let year = inputFileString.split('Area (Sq. Ft)')[0];

  inputFileString = inputFileString.split('Misc. Fees :')[1];
  let fees = inputFileString.split('Rent :')[0];

  inputFileString = inputFileString.split('Rent :')[1];
  let rent = inputFileString.split('Rental Status :')[0];

  inputFileString = inputFileString.split('Rental Status :')[1];
  let rentStatus = inputFileString.split('Section 8')[0];

  let propertyManagement = inputFileString.split('Property Mgmt :')[1];

  let notes = '';
  if (year) notes += 'Year: ' + year.trim();
  if (rentStatus) notes += ' Rent Status: ' + rentStatus.trim();
  if (propertyManagement) notes += ' Property Mgmt: ' + propertyManagement.trim();
  // console.log(location);
  // console.log(price);
  // console.log(arv);
  // console.log(address);
  // console.log(city);
  // console.log(bedrooms);
  // console.log(bathrooms);
  // console.log(repair);
  // console.log(taxes);
  // console.log(fees);
  // console.log(rent);

  // the tab delimited line to add to excel
  let excelLine =
    address.trim() +
    '\t' +
    bedrooms.trim() +
    '/' +
    bathrooms.trim() +
    '\t' +
    location.trim() +
    '\t' +
    arv
      .trim()
      .replace('$', '')
      .replace(',', '') +
    '\t' +
    price
      .trim()
      .replace('$', '')
      .replace(',', '') +
    '\t' +
    rent
      .trim()
      .replace('$', '')
      .replace(',', '') +
    '\t' +
    taxes
      .trim()
      .replace('$', '')
      .replace(',', '') +
    '\t' +
    repair
      .trim()
      .replace('$', '')
      .replace(',', '') +
    '\t' +
    fees
      .trim()
      .replace('$', '')
      .replace(',', '') +
    '\t' +
    notes;
  // console.log(excelLine);

  // replace the input file with the line
  fs.writeFile(inputFile, '\n\n\n', err => {
    if (err) {
      return console.log(err);
    }

    console.log('Input.txt updated.\n');
  });


  // read the output file
  fs.readFile(outputFile, 'utf8', (err, data) => {
    if (err) {
      return console.log(err);
    }

    // the entire file as a string
    outputFileString = data.toString();
    outputFileString += '\n' + excelLine;


    // add the line to the output file
    fs.writeFile(outputFile, outputFileString, err => {
      if (err) {
        return console.log(err);
      }

      console.log('Output.txt updated.\n');
    });
  });

});
