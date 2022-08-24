import * as fs from 'fs';
import * as cheerio from 'cheerio';

fs.readFile('/Users/ronyderra/Desktop/RD-GIT/explorerScripts/src/OppenSea/monsters.html', async function (err, html) {
    getData(html);

    if (err) {
        throw err;
    }
});

const getData = async (html) => {
    const $ = cheerio.load(html, null, false);

    const listItems = $("a");

    // console.log(listItems);

      const arr = [];

    listItems.each(function (idx, el) {

        let addr = $(el).attr("href").toString().split("/")[4];



        // const amountOfHolders = parseFloat(holders.replace(/,/g, ""));
        // const sliced = addr ? addr.slice(9) : "no address";

        arr.push(addr);
    });


    console.dir(arr, {'maxArrayLength': null});
console.log(arr.length)
    //   arr.map((item) => {
    //      if(item.amountOfHolders > 100){
    //        console.log(item)
    //      }
    //   });
    // await browser.close();
};

