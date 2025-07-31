import { createRouter, createWebHistory } from 'vue-router'
import Search from '../components/Search.vue';
import Leaderboard from '../components/Leaderboard.vue';

const routes = [
  { path: '/', redirect: '/search' },
  { path: '/search', component: Search },
  { path: '/leaderboard', component: Leaderboard },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router
