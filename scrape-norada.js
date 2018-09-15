var Crawler = require("crawler");
 

let fs = require('fs'),
  path = require('path'),
  inputFileString = '',
  outputFileString = '',
  excelLine = '',
  inputFile = path.join(__dirname, '/input.txt'),
  outputFile = path.join(__dirname, '/output.txt');

var c = new Crawler({
    maxConnections : 1,
    rateLimit: 1000,
    // This will be called for each crawled page
    callback : function (error, res, done) {
        if(error){
            console.log(error);
        }else{
            var $ = res.$;
            // $ is Cheerio by default
            //a lean implementation of core jQuery designed specifically for the server

            // START GET DATA FROM PAGE AND PARSE IT OUT TO INDIVIDUAL LINES ------------------------------
            console.log($("#aspnetForm").attr("action"))
            
            $( "#view1 table" ).each(function( index ) {
              var house = $( this ).text();
              
              // print the first house as an example to use to pull data needed
              // if (index == 0) console.log(house)

              

              var address = betweenStrings(house, "Home for sale:", "Purchase Price")

              if (address) {
                var location = address.substring(address.indexOf(',') + 1, address.lastIndexOf(','))
                var arv = betweenStrings(house, "Purchase Price:", "Rental Income")
                var price = arv
                var rent = betweenStrings(house, "Rental Income:", 'Bedrooms')
                var bed = betweenStrings(house, "Bedrooms:", 'Property Tax:')
                var tax = betweenStrings(house, 'Property Tax:', "Bathrooms")
                tax = tax * 12;
                var bath = betweenStrings(house, "Bathrooms:", 'Insurance/HOA:')
                var ins = betweenStrings(house, "Insurance/HOA:", 'Size:')
                var prop = betweenStrings(house, "Property Mgmt:", 'Price/Sq')
                
                excelLine += address + '\t' + bed+'/'+bath + '\t' + location + '\t' +arv + '\t' +price + '\t' +rent + '\t'
                + tax + '\t' + ins + '\t' + prop + '\t' + 'Notes: ' + '\n';
                // console.log(excelLine);
              }
              
            });
            // END GET DATA FROM PAGE AND PARSE IT OUT TO INDIVIDUAL LINES ------------------------------


            // START write to file-------------------------
              // read the output file
              fs.readFile(outputFile, 'utf8', (err, data) => {
                if (err) {
                  return console.log(err);
                }

                // the entire file as a string
                outputFileString = data.toString();
                outputFileString +=  excelLine;
                excelLine = ''

                // add the line to the output file
                fs.writeFile(outputFile, outputFileString, err => {
                  if (err) {
                    return console.log(err);
                  }

                  // console.log('Output.txt updated.\n');
                });
              });
              // END write to file-------------------------
        }
        done();
    }
});

/**
 * Grab the string between two strings and remove new lines and $
 * 
 */
function betweenStrings(mainString, firstString, secondString) {
  firstLength = firstString.length;
  var betweenString = mainString.substring(
    mainString.lastIndexOf(firstString) + firstLength, 
    mainString.lastIndexOf(secondString)
  );

  return betweenString.trim().replace(/\n/, '').replace(/\$/, '');
  // return betweenString.replace(/\$/, '');
}
 
// Queue just one URL, with default callback
let urlList = ['http://www.noradarealestate.com/Real-Estate-Investments/Georgia/Atlanta/',
'http://www.noradarealestate.com/Real-Estate-Investments/Alabama/Birmingham/',
'http://www.noradarealestate.com/Real-Estate-Investments/Idaho/Boise/',
'http://www.noradarealestate.com/Real-Estate-Investments/Florida/Cape-Coral/',
'http://www.noradarealestate.com/Real-Estate-Investments/Illinois/Chicago/',
'http://www.noradarealestate.com/Real-Estate-Investments/Ohio/Cincinnati/',
'http://www.noradarealestate.com/Real-Estate-Investments/Ohio/Cleveland/',
'http://www.noradarealestate.com/Real-Estate-Investments/Texas/Dallas/',
'http://www.noradarealestate.com/Real-Estate-Investments/Ohio/Dayton/',
'http://www.noradarealestate.com/Real-Estate-Investments/Mississippi/Horn-Lake/',
'http://www.noradarealestate.com/Real-Estate-Investments/Texas/Houston/',
'http://www.noradarealestate.com/Real-Estate-Investments/Alabama/Huntsville/',
'http://www.noradarealestate.com/Real-Estate-Investments/Indiana/Indianapolis/',
'http://www.noradarealestate.com/Real-Estate-Investments/Florida/Jacksonville/',
'http://www.noradarealestate.com/Real-Estate-Investments/Missouri/Kansas-City/',
'http://www.noradarealestate.com/Real-Estate-Investments/Arkansas/Little-Rock/',
'http://www.noradarealestate.com/Real-Estate-Investments/Tennessee/Memphis/',
'http://www.noradarealestate.com/Real-Estate-Investments/Wisconsin/Milwaukee/',
'http://www.noradarealestate.com/Real-Estate-Investments/Alabama/Montgomery/',
'http://www.noradarealestate.com/Real-Estate-Investments/Oklahoma/Oklahoma-City/',
'http://www.noradarealestate.com/Real-Estate-Investments/Florida/Palm-Bay/',
'http://www.noradarealestate.com/Real-Estate-Investments/Iowa/Quad-Cities/',
'http://www.noradarealestate.com/Real-Estate-Investments/Utah/Salt-Lake-City/',
'http://www.noradarealestate.com/Real-Estate-Investments/Texas/San-Antonio/',
'http://www.noradarealestate.com/Real-Estate-Investments/Florida/Tampa/']

// c.queue('http://www.noradarealestate.com/Real-Estate-Investments/Alabama/Birmingham/');
 
// Queue a list of URLs
c.queue(urlList);


