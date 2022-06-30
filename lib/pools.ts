const axios = require('axios')

export async function getAllPools() {
    const res = await axios.post(
        "https://api.thegraph.com/subgraphs/name/theledgerofjoudi/dai-lbp-subgraph",
        {
            query: `
            {
            crps {
                id    
              }
            }
            `
        }
    )

    const crps = res.data.data.crps
    let paths: any[] = []
    for (let ind in crps) {
        paths.push("/pools/" + crps[ind].id)
    }
    return paths
}

