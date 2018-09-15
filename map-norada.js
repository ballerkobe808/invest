// ----------------------------------------------------------------
// NORADA SCREEN SCRAPE MAPPER 
//
// ----------------------------------------------------------------

let fs = require('fs'),
  path = require('path'),
  inputFileString = '',
  outputFileString = '',
  inputFile = path.join(__dirname, '/input.txt'),
  outputFile = path.join(__dirname, '/output.txt');

// open the input file and read it
fs.readFile(inputFile, 'utf8', (err, data) => {
  if (err) {
    return console.log(err);
  }

  // entire file as a string
  inputFileString = data.toString();

  // if the field has already been blanked out then just exit and do nothing...
  if (inputFileString.length < 10) {
    return;
  }
  
  // grab the individual data from the text
  let price = inputFileString.match(/Purchase Price:(.*?)Rental Income:/)[1];
  let rent = inputFileString.match(/lease rate.(.*?)\n/)[1];
  let arv = price;
  let bedrooms = inputFileString.match(/Bedrooms:(.*?)Property/)[1];
  let bathrooms = inputFileString.match(/Bathrooms:(.*?)Insurance/)[1];
  let year = inputFileString.match(/Year Built:(.*?)Cap/)[1];
  let taxes = inputFileString.match(/Property Tax:(.*?)\n/)[1];

  let address = inputFileString.split('[')[0];
  let location = address.split(',')[1];
  // location = location.split(' ')[1];
  
  // map the monthly tax to a year total
  taxes = taxes
    .trim()
    .replace('$', '')
    .replace(',', '');
  taxes = parseFloat(taxes) * 12;

  let repair = '';
  let fees = '';

  let notes = '';
  if (year) notes += 'Year: ' + year.trim();
  // if (rentStatus) notes += ' Rent Status: ' + rentStatus.trim();
  // if (propertyManagement) notes += ' Property Mgmt: ' + propertyManagement.trim();

  // console.log(address);
  // console.log(bedrooms);
  // console.log(bathrooms);
  // console.log(location);
  // console.log(arv);
  // console.log(price);
  // console.log(rent);
  // console.log(taxes);
  // console.log(repair);
  // console.log(fees);

  // create the tab delimited line for excel
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
    taxes +
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


  // fs.writeFile(inputFile, excelLine, err => {
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
