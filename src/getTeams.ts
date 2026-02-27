import { chromium } from "playwright"

export type Team = {
  name: string
  url: string
}

export async function getTeams(): Promise<Team[]> {
  const browser = await chromium.launch()
  const page = await browser.newPage()

  await page.goto(
    "https://www.flashscore.com.br/futebol/brasil/brasileiro-feminino/"
  )

  await page.waitForSelector(".tableCellParticipant")

  const teams = await page.$$eval(
    ".tableCellParticipant",
    elements =>
      elements.map(el => {
        const name = el.textContent?.trim()

        const link = el.querySelector("a")?.getAttribute("href")

        return {
          name,
          url: link
        }
      })
  )

  await browser.close()

  return teams.filter((t): t is Team => Boolean(t.name && t.url))
}
