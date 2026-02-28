import { chromium } from "playwright"
import { Player } from "./types/Player"

export async function getPlayers(teamUrl: string): Promise<Player[]> {
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()

  await page.goto(teamUrl, { waitUntil: "domcontentloaded" })

  await page.waitForSelector("#stats_standard")

  const players = await page.$$eval(
    '#stats_standard tbody tr',
    rows => {
      return rows.map(row => {
        const name =
          row.querySelector('th[data-stat="player"] a')
            ?.textContent || ""

        const nation =
          row.querySelector('[data-stat="nationality"]')
            ?.textContent || ""

        const position =
          row.querySelector('[data-stat="position"]')
            ?.textContent || ""

        const age =
          Number(
            row.querySelector('[data-stat="age"]')
              ?.textContent
          ) || 0

        const matches =
          Number(
            row.querySelector('[data-stat="games"]')
              ?.textContent
          ) || 0

        const minutes =
          Number(
            row.querySelector('[data-stat="minutes"]')
              ?.textContent
          ) || 0

        return {
          name: name.trim(),
          nation: nation.trim(),
          position: position.trim(),
          age,
          matches,
          minutes
        }
      }).filter(p => p.name)
    }
  )

  await browser.close()
  return players
}
