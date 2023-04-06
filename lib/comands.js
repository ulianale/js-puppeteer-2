
module.exports = {
  clickElement: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      await page.click(selector);
    } catch (error) {
      throw new Error(`Selector is not clickable: ${selector}`);
    }
  },

  getText: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      return await page.$eval(selector, (link) => link.textContent);
    } catch (error) {
      throw new Error(`Text is not available for selector: ${selector}`);
    }
  },

  selectionFreePlace: async function (page, row) { 
    let x = 0; // счетчик
    await page.waitForSelector(".buying-scheme__wrapper");
    for (let i = 1; i < 11; i++) {
      let place = `div.buying-scheme__wrapper > div:nth-child(${row}) > span:nth-child(${i})`;
      let classExist = await page.$eval(place,
        (el) => el.classList.contains("buying-scheme__chair_taken") || el.classList.contains("buying-scheme__chair_selected") || el.classList.contains("buying-scheme__chair_disabled")
        );
      if (classExist == false) {
        await page.click(place);
        x++;
        break;
      }
    }
    if (x==0) {
      throw new Error(`Закончились свободные места в ряду № ${row}, выберете другой ряд`);
    }
  },

  selectionBusyPlace: async function (page, row) { 
    await page.waitForSelector(".buying-scheme__wrapper");
    for (let i = 1; i < 11; i++) {
      let place = `div.buying-scheme__wrapper > div:nth-child(${row}) > span:nth-child(${i})`;
      let classExist = await page.$eval(place,
        (el) => el.classList.contains("buying-scheme__chair_taken")
      );
      if (classExist) {
        await page.click(place);
        break;
      }   
    }
  }

};