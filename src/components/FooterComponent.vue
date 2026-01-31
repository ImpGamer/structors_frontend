<template>
    <footer class="bg">
        <div class="content horizontal-container">
            <div class="vertical-container">
                <div v-for="opt in options" :key="opt">
                    <router-link :to="opt.to" class="text" active-class="selected" exact-active-class="selected">
                        {{ opt.label }}
                    </router-link>
                </div>

                <p class="sm-text">®2026 ImpStructors Studio. All rights reserved</p>
            </div>
            <div class="medias-container">
                <div v-for="media in socialMedias" :key="media" class="s-padding animation-hover">
                    <a :href="media.to" target="_blank" rel="noopener noreferrer">
                        <img :src="media.img" :alt="media.label" class="icon invert" />
                    </a>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup>
import { socialMedias } from '@config/lists.config'
defineProps({
    options: {
        type: Array,
        required: false,
        default: () => [],
    },
})
</script>

<style scoped>
footer {
    width: 100%;
    min-height: 20vh;

    margin: 0;
    border-top: 5px solid var(--secondary-color);
    flex-shrink: 0;
}

.vertical-container {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;

    gap: 0.5vh;
}

.content {
    margin: 40px;
    margin-left: 4vw;
}

.medias-container {
    margin-left: auto;

    display: flex;
    justify-content: end;
    align-items: end;
}
</style>
