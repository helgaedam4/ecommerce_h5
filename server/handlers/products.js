const { readFile } = require('fs').promises

export default {
  get: async (req, res) => {
    const result = await readFile(`${__dirname}/data.json`, { encoding: 'utf8' })
      .then((data) => {
        const newData = JSON.parse(data).map((it) => {
          return it
            ? {
                ...it,
                image: `https://source.unsplash.com/800x600/?${/\w+(?=\s)/gi.exec(it.title)}`
              }
            : null
        })
        return newData
      })
      .catch((err) => err)
    return res.json(result)
  }
}
