const { readFile, writeFile } = require('fs').promises

export default {
  get: async (req, res) => {
    const result = await readFile(`${__dirname}/logs.json`, { encoding: 'utf8' })
      .then((data) => JSON.parse(data))
      .catch((err) => err)
    return res.json(result)
  },
  update: async (req, res) => {
    const resultRead = await readFile(`${__dirname}/logs.json`, { encoding: 'utf8' })
      .then((data) => JSON.parse(data))
      .catch((err) => err)

    const result = await writeFile(
      `${__dirname}/logs.json`,
      JSON.stringify([...resultRead, req.body]),
      {
        encoding: 'utf8'
      }
    )
      .then((data) => JSON.parse(data))
      .catch((err) => err)
    return res.json(result)
  }
}
