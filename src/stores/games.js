import { defineStore } from "pinia";
import { getGames, getLatestGame, getFeaturedGame, getGamesOnDiscount } from "@service/game.service";

const resources = {
    games: {
        key: "games",
        timeOnCache: 150, //In Seconds
        fetcher: async () => await getGames({ limit: 10, offset: 0 }),
    },
    ftGame: {
        key: "ftGame",
        timeOnCache: 500,
        fetcher: async () => await getFeaturedGame(),
    },
    ltGame: {
        key: "ltGame",
        timeOnCache: 500,
        fetcher: async () => await getLatestGame(),
    },
    onDiscount: {
        key: "onDiscount",
        timeOnCache: 150,
        fetcher: async () => await getGamesOnDiscount(),
    }
}

export const usegamesStore = defineStore("games", {
    state: () => {
        const state = {};

        for (const [sourceName, source] of Object.entries(resources)) {
            const sourceKey = source.key;

            state[sourceName] = new ResourceState(
                sourceKey,
                source.timeOnCache,
            )
        }

        return state;
    },
    actions: {
        async Load(source) {
            const fetchSource = resources[source];
            if (IsEmpty(fetchSource)) {
                throw new Error(`Invalid source ${source}, doesn't exist verify name.`);
            }

            const storeSource = this[source];
            if (!IsEmpty(storeSource.data)) {
                console.log(`⚡ Data already in store for ${source}`);

                storeSource.isLoading = false;
                storeSource.timerCache();
                return;
            }

            storeSource.setLoadState();
            const rawCache = sessionStorage.getItem(storeSource.key);

            if (!IsEmpty(rawCache)) {
                try {
                    const cache = JSON.parse(rawCache);
                    storeSource.finishLoading(cache, null);
                    storeSource.timerCache();

                    console.log(`Cache used for ${source}`);
                    return;
                } catch {
                    sessionStorage.removeItem(storeSource.key);

                    console.log(`Cache Empty or bad struct ${storeSource.key}, Using API.`);
                }
            }

            const result = await fetchSource.fetcher();

            const resultData = result.data;
            storeSource.finishLoading(resultData, result.error);

            if (!IsEmpty(resultData)) {
                storeSource.saveCache(resultData);

                console.log("Cached for: " + source);
            }
        },
    },
    getters: {
        getLatest: (state) => state.ltGame.data,
        getGames: (state) => state.games.data,
        getFeatured: (state) => state.ftGame.data,
        getDiscounts: (state) => state.onDiscount.data,
    }
})

function IsEmpty(data) { return !data || data === null || data === "null"; }

class ResourceState {
    constructor(
        key,
        timeOnCache,
    ) {
        this.key = key;
        this.timeOnCache = timeOnCache;
        this.isLoading = true;
        this.error = null;
        this.data = null;
        this._timerID = null;
    }

    saveCache(value) {
        const saveValue = JSON.stringify(value);

        sessionStorage.setItem(this.key, saveValue);
        this.timerCache();
    }

    timerCache() {
        if (IsEmpty(this.data) || this._timerID) return;

        console.log("Temporizador de cache iniciado");
        this._timerID = setTimeout(() => {
            sessionStorage.removeItem(this.key);
            console.log(`Cache deleted for ${this.key}`);

        }, this.timeOnCache * 1000);
    }

    finishLoading(data, error) {
        this.isLoading = false;

        this.data = data;
        this.error = error;
    }
    setLoadState() {
        this.isLoading = true;
        this.data = null;
        this.error = null;
    }
}