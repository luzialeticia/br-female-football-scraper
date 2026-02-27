import { getTeams } from "./flashcore/teams/getTeams"

async function main() {
  const teams = await getTeams()
  console.log(teams)
}

main()
