const { readFile, writeFile, unlink } = require('fs').promises

export default {
  get: async (req, res) => {
    const result = await readFile(`${__dirname}/logs.json`, { encoding: 'utf8' })
      .then((data) => JSON.parse(data))
      .catch(async () =>  {
       const resultEmptyArr = await writeFile(
      `${__dirname}/logs.json`,
      JSON.stringify([]),
      {
        encoding: 'utf8'
      }
    )
      .then((data) => JSON.parse(data))
      .catch((err) => err)
    return res.json(resultEmptyArr)
    })
    return res.json(result)
  },
  update: async (req, res) => {
    const resultRead = await readFile(`${__dirname}/logs.json`, { encoding: 'utf8' })
      .then((data) => JSON.parse(data))
      .catch(async () => {
        const resultEmptyArr = await writeFile(`${__dirname}/logs.json`, JSON.stringify([]), {
          encoding: 'utf8'
        })
          .then((data) => JSON.parse(data))
          .catch((err) => err)
        return res.json(resultEmptyArr)
      })

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
  },
  del: (req, res) => {
    unlink(`${__dirname}/logs.json`)
    return res.end()
  }
}
