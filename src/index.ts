import { getTeams } from "./flashcore/getTeams"

async function main() {
  const teams = await getTeams()
  console.log(teams)
}

main()
