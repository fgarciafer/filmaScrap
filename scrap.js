import { chromium } from 'playwright';
import { writeFile } from 'fs';
import baseFilms from './films.base.js';


(async () => {
  const browser = await chromium.launch()
  // { headless: false, channel: 'msedge' }

  const data = []

  for (const film of baseFilms) {
    const page = await browser.newPage()
    await page.goto(film)

    const name = await page.textContent('[itemprop="name"]')
    const year = await page.textContent('[itemprop="datePublished"]')
    const duration = await page.textContent('[itemprop="duration"]')
    const director = await page.textContent('[itemprop="director"]')

    const description = await page.textContent('[itemprop="description"]')
    const rate = await page.$eval('#movie-rat-avg', element => element.getAttribute('content'))
    const flag = await page.$eval('#country-img img', img => img.getAttribute('src'))
    const image = await page.$eval('[itemprop="image"]', img => img.getAttribute('src'))

       
    const filmin = (await page.$$('[title="Filmin"]')).length > 0;
    const netflix = (await page.$$('[title="Netflix"]')).length > 0;
    const amazon = (await page.$$('[title="Amazon Prime Video"]')).length > 0;
    const disney = (await page.$$('[title="Disney Plus"]')).length > 0;
    const hbo = (await page.$$('[title="HBO Max"]')).length > 0;

    const stream = []

    if(filmin) {
      stream.push('filmin');
    }
  
    if(netflix) {
      stream.push('netflix');
    }

    if(amazon) {
      stream.push('amazon');
    }

    if(disney) {
      stream.push('disney');
    }

    if(hbo) {
      stream.push('hbo');
    }

    await page.locator('[mode="primary"]').click()
    const pathName = film.split('/').slice(-1) + '.png'
    await page.addStyleTag({
      content: '.see-trailer { display: none !important; }'
    })
    // await page.locator('[itemprop="image"]').screenshot({ path: pathName })

    await page.locator('[itemprop="image"]').screenshot({ path: `./public/images/${pathName}` })


    const anchors = await page.$$('[class="card-genres"] > a')
    const aGenders = await page.$$('[itemprop="genre"]');
    
    const topics = [];
    for (const anchor of anchors) {
      const text = await anchor.innerText();
      topics.push(text);
    }

    const genres = [];
    for (const genre of aGenders ) {
      const text = await genre.innerText();
      genres.push(text);
    }

    data.push({
      name,
      year,
      duration,
      director,
      description,
      rate,
      flag,
      image,
      url: film,
      stream,
      topics,
      genres
    })
    console.log('\x1b[33m%s\x1b[0m', `[FILM] ${name} done!`)
    page.close()
  }

  writeFile('generated.json', JSON.stringify(data), (err) => {
    if (err) {
      throw err
    }
    console.log('Data has been written to file successfully.')
  })

  await browser.close()
})()
