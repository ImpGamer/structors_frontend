<template>
    <nav class="navbar bg">
        <router-link to="/home">
            <img :src="img" alt="Logo" class="navbar-logo" loading="eager" />
        </router-link>
        <div class="burger-btn animation-hover" @click="showMenu(true)">
            <img src="/images/icons/options_icon.png" class="icon invert" />
        </div>
    </nav>
    <transition name="scale-fade">
        <div v-if="isActive" class="options-container">
            <div class="close-btn animation-hover" @click="showMenu(false)">
                <img src="/images/icons/delete_icon.svg" class="sm-icon" />
            </div>

            <div v-for="opt in options" :key="opt" class="s-padding animation-hover" @click="showMenu(false)">
                <router-link :to="opt.to" class="title-font nav-link" exact-active-class="selected">
                    {{ opt.label }}
                </router-link>
            </div>
            <div class="media-container">
                <div v-for="media in socialMedias" :key="media" class="s-padding animation-hover">
                    <a :href="media.to" target="_blank" rel="noopener noreferrer">
                        <img :src="media.img" :alt="media.label" class="icon" />
                    </a>
                </div>
            </div>
        </div>
    </transition>
</template>

<script setup>
import { socialMedias } from '@config/lists.config';
import { ref } from 'vue';

const isActive = ref(false)

function showMenu(show) {
    isActive.value = show;
}

defineProps({
    options: {
        type: Array,
        required: true,
        validator(value) {
            return value.every(
                item =>
                    typeof item.label === 'string' &&
                    typeof item.to === 'string'
            )
        }
    },
    img: {
        type: String,
        default: '',
        required: false
    }
})
</script>

<style scoped>
.navbar {
    width: 100%;
    min-height: 20vh;
    background-color: var(--primary-color);
    display: flex;
    flex-direction: row;

    align-items: center;
    justify-content: center;
}

.close-btn {
    position: absolute;
    top: 3.5rem;
    right: 2rem;

    width: 35px;
    height: 30px;

    background-color: var(--secondary-color);
    border: 3.5px solid black;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.options-container {
    position: fixed;
    top: 0;
    left: 0;

    width: 100vw;
    height: 100vh;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    background-color: rgba(255, 255, 255, 0.6);
    z-index: 9999;
    transition: transform 0.3s ease-in;
}

.burger-btn {
    margin-left: auto;
    margin-right: 1rem;

    width: 12vw;
    height: 50px;

    background-color: transparent;
    border: 2px solid white;
    border-radius: 8px;

    display: flex;
    align-items: center;
    justify-content: center;
}

.media-container {
    margin-top: 1rem;
    display: flex;
    flex-direction: row;

    gap: 15px;
}

.navbar-logo {
    margin-right: auto;
    margin-left: 1rem;
    width: 20vw;
    height: auto;

    min-width: 120px;
    max-width: 200px;
    min-height: 100px;
    max-height: 150px;

    object-fit: contain;
    padding: 0.3rem;
}

.scale-fade-enter-active,
.scale-fade-leave-active {
    transition: transform 0.3s ease, opacity 0.3s ease;
}

.scale-fade-enter-from,
.scale-fade-leave-to {
    transform: scale(0);
    opacity: 0;
}

.scale-fade-enter-to,
.scale-fade-leave-from {
    transform: scale(1);
    opacity: 1;
}

.nav-link {
    color: black;
}

.nav-link.selected {
    color: var(--selected-color);
}
</style>