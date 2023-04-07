const { clickElement, getText, selectionFreePlace, selectionBusyPlace } = require("./lib/comands.js");

let page;

describe("Tests", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.goto("http://qamid.tmweb.ru/client/index.php");
    await clickElement(page,"body nav a:nth-child(2)");
    await clickElement(page, "body main section:nth-child(1) div.movie-seances__hall ul li:nth-child(3) a");   
  });

  afterEach(() => {
    page.close();
  });

  test("Booking one free place", async () => {
    await selectionFreePlace(page, 7);
    await clickElement(page, "button.acceptin-button");  
    await page.waitForSelector("h2.ticket__check-title");
    await clickElement(page, "button.acceptin-button"); 
    const actual = await getText(page, "h2.ticket__check-title");
    await expect(actual).toContain("Электронный билет");
  });

  test("Booking two free places", async () => {
    await selectionFreePlace(page, 7);
    await selectionFreePlace(page, 7);
    await clickElement(page, "button.acceptin-button");  
    await page.waitForSelector("h2.ticket__check-title");
    await clickElement(page, "button.acceptin-button"); 
    const actual = await getText(page, "h2.ticket__check-title");
    await expect(actual).toContain("Электронный билет");
  });

  test("Booking busy place", async () => {
    await selectionBusyPlace(page, 7);
    await clickElement(page, "button.acceptin-button");
    expect(
      String(
        await page.$eval("button", (button) => {
          return button.disabled;
        })
      )
    ).toContain("true");
  });

});
