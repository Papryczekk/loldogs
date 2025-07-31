<template>
  <header>
    <h1>LOLRATINGS</h1>
    <nav>
      <router-link to="/search">SEARCH</router-link>
      <router-link to="/leaderboard">LEADERBOARD</router-link>
    </nav>
  </header>
  <main>
    <div class="container">
      <router-view></router-view>
    </div>
  </main>
  <div id="playerPopup" class="modal" :class="{ show: showPopup }" ref="modal">
    <div class="modal-content">
      <span class="close" @click="closePopup">&times;</span>
      <div id="modal-body"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showPopup = ref(false)

function closePopup() {
  showPopup.value = false
}
</script>

<style scoped>
header {
  background: #333;
  color: white;
  text-align: center;
  padding: 1em;
}
header h1 {
  margin: 0;
}
nav a {
  color: white;
  margin: 0 1em;
  text-decoration: none;
}
nav a:hover {
  text-decoration: underline;
}
.modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
.modal.show {
  display: flex;
}
.modal-content {
  background-color: white;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 500px;
}
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}
.close:hover {
  color: black;
}
</style>
