import { chromium } from "playwright"
import { Team } from "./types/Team"

const BASE =
  "https://fbref.com/en/comps/206/Serie-A1-Stats#all_stats_squads_standard"

export async function getTeams(): Promise<Team[]> {
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()

  await page.goto(BASE, { waitUntil: "domcontentloaded" })

  await page.waitForSelector("#stats_squads_standard")

  const teams = await page.$$eval(
    '#stats_squads_standard tbody tr',
    rows => {
      return rows.map(row => {
        const link = row.querySelector(
          'th[data-stat="team"] a'
        ) as HTMLAnchorElement

        return {
          name: link?.textContent?.trim() || "",
          url: link?.href || ""
        }
      }).filter(t => t.name)
    }
  )

  await browser.close()
  return teams
}
