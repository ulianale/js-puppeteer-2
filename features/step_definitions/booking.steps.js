const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After } = require("cucumber");
const { clickElement, getText, selectionFreePlace, selectionBusyPlace } = require("../../lib/comands.js");

const { setDefaultTimeout } = require("cucumber");
setDefaultTimeout(60 * 1000);

Before(async function () {
    const browser = await puppeteer.launch({ 
        headless: false, 
        slowMo: 200 
      });
    const page = await browser.newPage();
    this.browser = browser;
    this.page = page;
  });
  
  After(async function () {
    if (this.browser) {
      await this.browser.close();
    }
  });

  Given("user is on page {string}", async function (string) {
    return await this.page.goto(`${string}`, {
      setTimeout: 20000,
    });
  });

  When("user choose date", async function () {
    return await clickElement(this.page, "body nav a:nth-child(2)");
  });
  When("user choose date has been choosen earlier", async function () {
      return await clickElement(this.page, "body nav a:nth-child(2)");
    });
  When("user choose time of movie", async function () {
    return await clickElement(this.page, "body main section:nth-child(1) div.movie-seances__hall ul li:nth-child(3) a");
  });
  When("user choose time of movie has been choosen earlier", async function () {
      return await clickElement(this.page, "body main section:nth-child(1) div.movie-seances__hall ul li:nth-child(3) a");
    });
  When("user choose the first avalible place", async function () {
    return await selectionFreePlace(this.page, 7);
  });
  When("user choose the second avalible place", async function () {
    return await selectionFreePlace(this.page, 7);
  });
  When("user choose avalible place", async function () {
    return await selectionFreePlace(this.page, 7);
  });
  When("user choose a busy place", async function () {
    return await selectionBusyPlace(this.page, 7);
  });
  When("user click button", async function () {
    return await clickElement(this.page, "button.acceptin-button");
  });
  When("user click button to get booking code", async function () {
    return await clickElement(this.page, "button.acceptin-button");
  });
  
  Then("user get the code and text {string}", async function (string) {
    const actual = await getText(this.page, "h2.ticket__check-title");
    const expected = await string;
    expect(actual).contains(expected);
  });
  
  Then("button is inactive {string}", async function (string) {
    const actual = String(
      await this.page.$eval("button", (button) => {
        return button.disabled;
      })
    );
    const expected = await string;
    expect(actual).contains(expected);
  });