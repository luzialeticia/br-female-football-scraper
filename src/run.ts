import { getTeams } from "./getTeams"
import { getPlayers } from "./getPlayers"

async function main() {
  const teams = await getTeams()

  console.log("Times:", teams)

  for (const team of teams) {
    console.log(`\nJogadoras do ${team.name}`)

    const players = await getPlayers(team.url)

    console.log(players)
  }
}

main()
