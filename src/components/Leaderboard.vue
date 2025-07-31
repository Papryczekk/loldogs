<template>
  <section id="leaderboard-section">
    <h2>Leaderboard</h2>
    <div id="leaderboard-content">
      <div v-if="store.leaderboardData.length === 0">Loading...</div>
      <div v-else>
        <div v-for="player in store.leaderboardData" :key="player.id" class="rank-container">
          <span class="nickname" @click="showPlayerPopup(player)">{{ player.name || 'Unknown' }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useAppStore } from '../stores/app'
import { onMounted } from 'vue'

const store = useAppStore()

onMounted(() => {
  store.fetchLeaderboard()
})

function showPlayerPopup(data) {
  const modalBody = document.getElementById('modal-body')
  modalBody.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>` // Zastąp rzeczywistą logiką renderowania
  const app = document.getElementById('playerPopup')
  app.classList.add('show')
}
</script>

<style scoped>
#leaderboard-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 1em;
}
.rank-container {
  padding: 0.5em;
  border-bottom: 1px solid #ccc;
}
</style>