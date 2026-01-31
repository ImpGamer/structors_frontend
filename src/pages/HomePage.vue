<template>
    <div class="main-container">
        <video class="bg-video" autoplay loop muted playsinline>
            <source src="/videos/SCP_Survive_1_bk.mp4" />
        </video>

        <div class="page-content vertical-container mid-alignerr">
            <div class="vertical-container m-separator mid-aligner">
                <h1 class="highlighted title-font main-color">
                    ImpStructors Studio
                    <br />
                    <p class="text">Indie Game Studio</p>
                </h1>
                <div :class="!isMobile ? 'horizontal-container' : 'vertical-container'" class="m-separator">
                    <CardComponent url="https://res.cloudinary.com/dtohisibj/image/upload/ths_1_sticker_nyph4w.png"
                        :title="{ content: 'Our Games', length: 20 }">

                        <div class="vertical-container s-separator mid-aligner">
                            <p class="text">Throughout our journey we have built different types of games of all genres
                                and
                                for all types of audiences, discover them and find your next favorite game!</p>

                            <ButtonComponent content="Games" to="/games" color="black" icon="/images/icons/games.png" />
                        </div>

                    </CardComponent>
                    <CardComponent v-if="gamesStore.getLatest" :url="gamesStore.getLatest.cover"
                        :title="{ content: 'Latest Release', length: 20 }">
                        <div class="vertical-container mid-aligner">
                            <div class="highlighted s-separator vertical-container mid-aligner">
                                <p class="title-font main-color">Play Now!</p>

                                <p class="text main-color">{{ gamesStore.getLatest.name }}</p>
                                <div class="horizontal-container s-separator">
                                    <ButtonComponent v-for="platform in gamesStore.getLatest.platforms" :key="platform"
                                        :icon="platforms[platform.name].icon" :content="platforms[platform.name].name"
                                        :color="platforms[platform.name].color" />
                                </div>
                            </div>
                        </div>
                    </CardComponent>
                    <CardComponent v-else url="/images/static/default_img.webp"
                        :title="{ content: 'Latest Release', lenght: 20 }">
                        <LoadingSection :isLoading="gamesStore.ltGame.isLoading" :error="gamesStore.ltGame.error" />
                    </CardComponent>
                </div>
            </div>

        </div>
    </div>
</template>
<script setup>
import { onMounted } from 'vue'
import CardComponent from '@components/CardComponent.vue'
import ButtonComponent from '@components/ButtonComponent.vue'
import LoadingSection from '@components/LoadingSection.vue'
import { platforms } from '@config/lists.config'
import { usegamesStore } from '@stores/games'

defineProps({
    isMobile: {
        type: Boolean,
        required: true,
    },
})

const gamesStore = usegamesStore()

onMounted(async () => {
    await gamesStore.Load(gamesStore.ltGame.key)
})
</script>

<style scoped>
.main-container {
    display: flex;
    width: 100%;
    min-height: 100vh;

    justify-content: center;
    align-items: center;
    position: relative;
}

.page-content {
    margin: 3rem;
    position: relative;
    z-index: 2;
}
</style>
