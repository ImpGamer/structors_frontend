import { apiFetch } from './api'

const suffix_point = '/games'

/**
 * Estructura de respuesta estándar
 * @returns {Object} {isLoading, data, error}
 */

export async function getGames(pagination, filters) {
    //Filter type -> {state: GameState, tags: string[], platform: GamePlatform | string}
    if (!pagination) {
        throw new Error('You cannot make a request without pagination')
    }

    const params = {
        limit: pagination.limit,
        offset: pagination.offset,
        state: filters.state,
        tags: filters.tags,
        platform: filters.platform,
    }

    return fetchWithState(async () => {
        const res = await apiFetch(suffix_point, { method: 'GET' }, params)
        return res.data
    })
}

export async function getLatestGame() {
    return fetchWithState(async () => {
        return await apiFetch(`${suffix_point}/latest`, { method: 'GET' });
    })
}

export async function getCountBy(state) {
    const params = {
        state: state,
    }

    return await apiFetch(`${suffix_point}/count`, { method: 'GET' }, params)
}

export async function getFeaturedGame() {
    return fetchWithState(async () => {
        return await apiFetch(`/featuredGame`, { method: 'GET' })
    })
}

export async function getGamesOnDiscount() {
    return await fetchWithState(async () => {
        const res = await apiFetch(`${suffix_point}/discounts`, { method: 'GET' })
        return res.data
    })
}

/**
 * Función auxiliar para manejar estado de carga
 * @param {Function} fetchFn - Función que retorna la promesa
 * @returns {Object} {isLoading, data, error}
 */
async function fetchWithState(fetchFn) {
    try {
        const data = await fetchFn()
        return {
            isLoading: false,
            data,
            error: null,
        }
    } catch (error) {
        return {
            isLoading: false,
            data: null,
            error: error.message || 'An error occurred while fetching data',
        }
    }
}
