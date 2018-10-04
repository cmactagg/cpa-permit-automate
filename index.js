const puppeteer = require("puppeteer");
require("dotenv").load();

var myArgs = process.argv.slice(2);

console.log(process.env);

(async () => {
  let loginUsingGoogle = process.env.USE_GOOGLE_AUTH;
  let username = process.env.AUTH_USERNAME;
  let password = process.env.AUTH_PASSWORD;
  let plateNumber = process.env.PLATE_NUM;
  let notificationEmail = process.env.NOTIFICATION_EMAIL;

  console.log(username);
  console.log(password);
  console.log(plateNumber);
  console.log(notificationEmail);

  /*
    const browser = await puppeteer.launch({ headless: false, sloMo: 500 });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.goto('https://cpa.permit.calgaryparking.com/login');

    //click the Welcome button
    await page.waitForSelector('a.btn-primary')
    await page.click('a.btn-primary');

    if (loginUsingGoogle) {
        const navigationPromise = page.waitForNavigation()
        await page.waitForSelector('#google-login')
        await page.click('#google-login');

        await navigationPromise;
        await page.waitForSelector('input[type="email"]');
        await page.type('input[type="email"]', username);
        await page.click('#identifierNext');

        await page.waitForSelector('input[type="password"]', {visible: true});
        await page.type('input[type="password"]', password);

        await page.waitForSelector('#passwordNext', {visible: true});
        await page.click('#passwordNext');

        await navigationPromise;

        

    }
    else {
        //login using the username and password
        await page.waitForSelector('#login')
        await page.type('#login', username);
        await page.type('#password', password);
        await page.click('#login-submit');
    }

//click the first address
    await page.waitForSelector('#addressList > li > a.clickable');
    await page.click('#addressList > li > a.clickable');

    //enter the plate number and start the session
    await page.waitForSelector('#plateEntry');
    await page.type('#plateEntry', plateNumber);
    await page.click('#start');

    //await browser.close();

    */

  //look for existing guest session
  const browser = await puppeteer.launch({ headless: false, sloMo: 100 });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto("http://localhost:1337/ElectronicPermitSystem.html");

  await page.waitForSelector("#sessionTable");
  //let sessionsRows = await page.$$eval('#sessionTable table tr');
  //await page.$$eval('#sessionTable table tr', sr => console.log(sr.innerText));

  /*
    const data = await page.$$eval('#sessionTable table tr', tds => tds.map((td) => {
        return td.innerHTML;
      }));
console.log(data);

const tddata = await page.$$('#sessionTable table tr', trs => trs.map((tr) => {
    return tdVales = tr.$$eval('td', tds => tds.map((td) => {
        return td.innerHTML;
    }));
    console.log(tdVales)
  }));
console.log(tddata);
*/

  page.$$("#sessionTable table tr").then(trs => {
    trs.forEach(tr => {
      tr.$$('td').then(tds => {
        //tds.forEach(tdEH => {
            console.log(tds);
            if(tds.length == 7){
                page.evaluate(tdE => tdE.innerHTML, tds[1]).then(r => {
                    console.log(r);
                    if(r === plateNumber){
                        
                        //check the date
                        page.evaluate(tdE => tdE.innerHTML, tds[4]).then(dateResult => {
                            let date = new Date(dateResult);
                            date.setDate(date.getDate() - 14);
                            if(date < Date.now()){
                                console.log("need to renew");

                                tds[5].$('button').then(b => b.click());
                            }
                            console.log(date.toString());
                        });
                        
                        //click the cancel button
                        
                    }
                });
                
                
            }
        
        });
    });
  });

  //check date on existing session

  //cancel existing session

  //start new session

  //take screenshot of current session

  //email screenshot to me
})();
