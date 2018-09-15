# Instructions to get data from data Cut and Paste websites into your excel

- Run npm install to grab the node modules

- Replace the map.js file with the file that matches the website. (map-norada.js, map-reitrader.js, etc)

type:

```bash
$ grunt
```

This will watch the input.txt file.

- Update the input.txt by pasting data copied from the website, and it will auto map it to a tab-delimited format
  that your excel file likes (it is being watched by the grunt job). It will then be added to the output.txt file.

## Instructions to scrape a site and put it into your excel
