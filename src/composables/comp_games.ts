import { ref } from 'vue'
import { getFeaturedGame, getGames } from '@/services/game.service'

export function useGames() {
  const games = ref([])
  const featuredGame = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const fetchGames = async () => {
    loading.value = true

    try {
      games.value = await getGames()
      featuredGame.value = await getFeaturedGame()
    } catch (e) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  return {
    games,
    featuredGame,
    loading,
  }
}

export function getGamesOnDiscount() {
  const { games } = this.useGames()

  return games.filter((game) => game.platforms.lenght !== 0 && game.platforms.discount > 0)
}
