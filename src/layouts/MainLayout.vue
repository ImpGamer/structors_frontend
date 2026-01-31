<script setup>
import DesktopNavBar from '@components/DesktopNavBar.vue';
import MobileNavBar from '@components/MobileNavBar.vue';
import { navLinks } from '@config/lists.config.js';
import { logo } from '@config/sources.config';
import { ref, onMounted, onUnmounted } from 'vue';
import FooterComponent from '@components/FooterComponent.vue';

const isMobile = ref(false);

function checkScreen() {
    isMobile.value = window.innerWidth < 970;
}

onMounted(() => {
    checkScreen();
    window.addEventListener('resize', checkScreen);
})

onUnmounted(() => {
    window.removeEventListener('resize', checkScreen);
})
</script>

<template>
    <DesktopNavBar v-if="!isMobile" :options="navLinks" :img="logo" />
    <MobileNavBar v-else :options="navLinks" :img="logo" />
    <main>
        <router-view v-slot="{ Component }">
            <component :is="Component" :is-mobile="isMobile" />
        </router-view>
    </main>

    <FooterComponent :options="navLinks" />
</template>

<style scoped>
main {
    margin: 0;
    flex: 1;
    position: relative;

    min-height: 100vh;
    width: 100%;
    overflow: hidden;
}
</style>