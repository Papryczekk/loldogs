<template>
  <section id="search-section">
    <div class="region-selector">
      <button
        v-for="region in regions"
        :key="region"
        class="region-btn btn"
        :data-region="region"
        @click="selectRegion(region)"
        :class="{ active: selectedRegion === region }"
      >
        {{ region }}
      </button>
    </div>
    <div class="search-container">
      <input
        type="text"
        id="search-input"
        placeholder="Search for a profile..."
        v-model="searchQuery"
        @input="search"
      />
      <div class="tab-container">
        <button
          v-for="tab in tabs"
          :key="tab"
          class="tab-btn tab"
          :class="{ active: activeTab === tab }"
          @click="setActiveTab(tab)"
        >
          {{ tab }}
        </button>
      </div>
    </div>
    <div id="results">
      <div v-if="store.searchResults.length === 0">No results found.</div>
      <div v-else>
        <div v-for="result in store.searchResults" :key="result.id" class="result-item">
          <span class="nickname" @click="showPlayerPopup(result)">{{
            result.name || 'Unknown'
          }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useAppStore } from '../stores/app'

const regions = ['EUNE', 'EUW', 'NA', 'KR']
const tabs = ['Profile', 'Live Game']
const selectedRegion = ref('EUNE')
const activeTab = ref('Profile')
const searchQuery = ref('')
const showPopup = ref(false)

const store = useAppStore()

function search() {
  if (searchQuery.value) {
    store.fetchSearchResults(searchQuery.value, selectedRegion.value)
  }
}

function selectRegion(region) {
  selectedRegion.value = region
  if (searchQuery.value) {
    store.fetchSearchResults(searchQuery.value, region)
  }
}

function setActiveTab(tab) {
  activeTab.value = tab
  // Dodaj logikę przełączania między Profile a Live Game, jeśli potrzebna
}

function showPlayerPopup(data) {
  showPopup.value = true
  const modalBody = document.getElementById('modal-body')
  modalBody.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`
}
</script>

<style scoped>
.region-selector {
  text-align: center;
  margin: 1em 0;
}
.region-btn {
  padding: 0.5em 1em;
  margin: 0 0.5em;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}
.region-btn:hover {
  background-color: #0056b3;
}
.region-btn.active {
  background-color: #4a90e2;
}
.search-container {
  text-align: center;
  margin: 1em 0;
}
#search-input {
  padding: 0.5em;
  width: 300px;
  font-size: 1em;
}
.tab-container {
  margin-top: 0.5em;
}
.tab-btn {
  padding: 0.5em 1em;
  border: none;
  background-color: #ccc;
  cursor: pointer;
}
.tab-btn.active {
  background-color: #007bff;
  color: white;
}
#results {
  max-width: 800px;
  margin: 0 auto;
  padding: 1em;
}
.result-item {
  padding: 0.5em;
  border-bottom: 1px solid #ccc;
}
</style>
