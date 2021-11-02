import axios from 'axios'

export default {
  get: async (req, res) => {
    const url = `https://api.exchangerate.host/latest?base=USD&symbols=${req.params.nameCurrency}`

    const rate = await axios(url)
      .then(({ data }) => {
        console.log('PPPPPPPPPPPPPP', data.rates[`${req.params.nameCurrency}`])
        return data.rates[`${req.params.nameCurrency}`]
      })
      .catch((err) => err)
    return res.json(rate)
  }
}
