<template>
    <div class="main-container">
        <div class="featured-container hero s-padding">
            <h3 class="title-font highlighted">Featured Game Of The Month</h3>
            <video v-if="gameStore.getFeatured" class="bg-video" autoplay loop muted playsinline>
                <source :src="gameStore.getFeatured.bk_video" />
            </video>

            <LoadingSection :isLoading="gameStore.ftGame.isLoading" :error="gameStore.ftGame.error">
                <div class="featured-content">
                    <CardComponent :title="{ content: 'Play It Here!', length: 30 }"
                        :description="{ content: gameStore.getFeatured.description, length: 150 }"
                        :url="gameStore.getFeatured.trailer">
                        <div class="card-slot-container mid-aligner">
                            <p class="text">Available Platforms:</p>

                            <ButtonComponent v-for="platform in gameStore.getFeatured.platforms" :key="platform"
                                :color="platforms[platform.name].color" :content="platform.label" :href="platform.url"
                                :icon="platforms[platform.name].icon" />
                        </div>
                    </CardComponent>
                    <div>
                        <h3 class="title-font">{{ gameStore.getFeatured.name }}</h3>
                        <div class="text-container">
                            <p class="title-font">Description:</p>
                            <p class="text">
                                {{ gameStore.getFeatured.description }}
                            </p>

                            <br />
                            <p class="text">Tags:</p>
                            <div class="horizontal-container s-separator">
                                <div v-for="tag in gameStore.getFeatured.tags" :key="tag" class="tag-container">
                                    <p class="text">{{ tag }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <img v-if="gameStore.getFeatured.sticker" class="featured-img gen-img"
                        :src="gameStore.getFeatured.sticker" />
                </div>
            </LoadingSection>
        </div>

        <section class="s-padding discount-container hero">
            <h3 class="title-font">Discount Games!!</h3>
            <p class="text">Games that are discounted on one of the available platforms</p>

            <LoadingSection :isLoading="gameStore.onDiscount.isLoading" :error="gameStore.onDiscount.error">
                <div v-if="gameStore.getDiscounts.length > 0"
                    :class="!isMobile ? 'horizontal-container' : 'vertical-container'"
                    class="s-padding mid-aligner m-separator">
                    <CardComponent v-for="game in gameStore.getDiscounts" :key="game"
                        :title="{ content: game.name, length: 30 }"
                        :description="{ content: game.description, length: 150 }" :url="game.cover" />
                </div>
                <SignComponent v-else :content="'Theres no discount games in this moment.'" />
            </LoadingSection>
        </section>

        <div class="all-games s-padding">
            <h3 class="title-font invert">All Games</h3>
            <p class="text invert">all games published or announced by our studio.</p>

            <LoadingSection :isLoading="gameStore.games.isLoading" :error="gameStore.games.error">
                <div :class="!isMobile ? 'horizontal-container' : 'vertical-container'"
                    class="s-padding mid-aligner m-separator">
                    <CardComponent v-for="game in gameStore.getGames" :key="game"
                        :title="{ content: game.name, length: 30 }"
                        :description="{ content: game.description, length: 150 }" :url="game.cover">
                        <p class="text">
                            state:
                            <span :style="{ color: gameStates[game.state].color }">{{
                                gameStates[game.state].label
                            }}</span>
                        </p>

                        <div class="horizontal-container s-separator mid-aligner">
                            <div v-for="tag in game.tags" :key="tag" class="tag-container">
                                <p class="text">{{ tag }}</p>
                            </div>
                        </div>
                        <!-- Platforms if game is published -->
                        <div class="card-slot-container mid-aligner" v-if="game.state === 'published'">
                            <p class="text">Available Platforms:</p>

                            <ButtonComponent v-for="platform in game.platforms" :key="platform"
                                :color="platforms[platform.name].color" :content="platform.label" :href="platform.url"
                                :icon="platforms[platform.name].icon" />
                        </div>
                    </CardComponent>
                </div>
            </LoadingSection>
        </div>
    </div>
</template>

<script setup>
import CardComponent from '@components/CardComponent.vue'
import LoadingSection from '@components/LoadingSection.vue'
import { platforms, gameStates } from '@config/lists.config'
import ButtonComponent from '@components/ButtonComponent.vue'
import SignComponent from '@components/SignComponent.vue'
import { onMounted } from 'vue';
import { usegamesStore } from '@stores/games'

defineProps({
    isMobile: {
        Type: Boolean,
        required: true,
    },
})

const gameStore = usegamesStore();

onMounted(async () => {
    const toLoad = [
        "games",
        "ftGame",
        "onDiscount"
    ]

    for (const l of toLoad) {
        await gameStore.Load(l);
    }
})


</script>
<style scoped>
.all-games {
    text-align: center;

    color: black;
}

.main-container {
    min-height: 100vh;
    width: 100%;

    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.featured-container {
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;

    text-align: center;
    position: relative;
    overflow: hidden;
}

.featured-container>*:not(.bg-video) {
    position: relative;
    z-index: 1;
}

.featured-img {
    position: absolute;
    left: 85%;
    top: 50%;
}

.text-container {
    margin-top: 4.5rem;
    text-align: start;
}

.text-container>* {
    margin-bottom: 20px;
}

.discount-container {
    background-color: var(--primary-color);
    text-align: center;
}

.featured-content {
    margin: 3rem;
    text-align: start;

    display: flex;
    flex-direction: row;
    gap: 5vw;
}

.tag-container {
    background-color: var(--semi-transparent);
    padding: 0.5rem 1rem;

    border-radius: 10px;
}

.hero {
    min-height: 50vh;
}

@media (width < 970px) {
    .featured-content {
        align-items: center;
        justify-content: center;
        text-align: center;

        flex-direction: column-reverse;
    }

    .featured-img {
        position: absolute;
        left: 65%;
        top: 80%;
        z-index: -1;

        max-width: 500px;
        max-height: 520px;
    }
}
</style>
