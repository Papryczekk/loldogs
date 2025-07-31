import { defineStore } from 'pinia'
import { ref } from 'vue'

const BASE_URL = 'https://europe.api.riotgames.com'
const serverUrls = {
  'eun1': 'https://eun1.api.riotgames.com',
  'euw1': 'https://euw1.api.riotgames.com',
  'na1': 'https://na1.api.riotgames.com',
  'kr': 'https://kr.api.riotgames.com'
}

async function proxyFetch(url, options = {}) {
  try {
    const response = await fetch('/api/proxy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        method: options.method || 'GET',
        url,
        body: options.body || undefined
      })
    })
    const data = await response.json()
    if (!response.ok) {
      throw new Error(data.error?.message || `HTTP error! status: ${response.status}`)
    }
    return data
  } catch (error) {
    console.error('proxyFetch error:', error)
    throw error
  }
}

export const useAppStore = defineStore('app', {
  state: () => ({
    searchResults: [],
    leaderboardData: [],
    selectedRegion: 'EUNE',
    activeTab: 'Profile',
  }),
  actions: {
    async fetchSearchResults(query, region) {
      try {
        const regionCode = {
          EUNE: 'eun1',
          EUW: 'euw1',
          NA: 'na1',
          KR: 'kr',
        }[region]
        const url = `${serverUrls[regionCode]}/lol/summoner/v4/summoners/by-name/${encodeURIComponent(query)}`
        const data = await proxyFetch(url)
        this.searchResults = Array.isArray(data) ? data : [data]
      } catch (error) {
        console.error('Fetch search error:', error)
        this.searchResults = []
      }
    },
    async fetchLeaderboard() {
      try {
        // Przykład: Pobieranie leaderboardu z JSONBin lub Firebase
        // Zastąp poniższy URL rzeczywistym endpointem
        const url = 'https://api.jsonbin.io/v3/b/your-bin-id' // Zastąp swoim ID JSONBin
        const data = await proxyFetch(url)
        this.leaderboardData = data.record || []
      } catch (error) {
        console.error('Fetch leaderboard error:', error)
        this.leaderboardData = []
      }
    },
  },
})