import { chromium } from 'playwright';

export async function getTeams() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(
    "https://www.flashscore.com.br/futebol/brasil/brasileiro-feminino/"
  )

  await page.waitForSelector(".tableCellParticipant__name")

  const teams = await page.$$eval(
    ".tableCellParticipant__name",
    els => els.map(el => el.textContent?.trim())
  )

  await browser.close()

  return teams
}
