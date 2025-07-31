export default async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  const { method, url, body } = req.body

  if (!url) {
    return res.status(400).json({ error: 'URL is required' })
  }

  const GITHUB_TOKEN = process.env.GITHUB_TOKEN
  const RIOT_API_KEY = process.env.RIOT_API_KEY
  const JSONBIN_MASTER_KEY = process.env.JSONBIN_MASTER_KEY

  try {
    const headers = {}

    if (url.includes('api.github.com')) {
      headers['Authorization'] = `token ${GITHUB_TOKEN}`
      headers['Content-Type'] = 'application/json'
    } else if (url.includes('api.riotgames.com')) {
      headers['X-Riot-Token'] = RIOT_API_KEY
    } else if (url.includes('api.jsonbin.io')) {
      headers['X-Master-Key'] = JSONBIN_MASTER_KEY
      headers['Content-Type'] = 'application/json'
    }

    const options = {
      method: method || 'GET',
      headers,
    }

    if (body) {
      options.body = JSON.stringify(body)
    }

    const response = await fetch(url, options)

    if (!response.ok) {
      const errorData = await response.json()
      return res.status(response.status).json({ error: errorData })
    }

    const data = await response.json()
    res.status(200).json(data)
  } catch (error) {
    console.error('Proxy error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
