<template>
    <section v-if="!isLoading" class="section-container">
        <SignComponent v-if="error != null" :content="error" />
        <slot v-else />
    </section>

    <section v-else class="loader-centerer">
        <div class="loader-container">
            <div class="loader text"></div>
        </div>
    </section>
</template>

<script setup>
import SignComponent from './SignComponent.vue'

defineProps({
    isLoading: {
        type: Boolean,
        required: true,
    },
    error: {
        type: String,
        required: false,
    },
})
</script>

<style scoped>
.section-container {
    width: 100%;
    height: 100%;

    min-height: 0;
    min-width: 0;
}

.loader-centerer {
    display: flex;

    justify-content: center;
    align-items: center;
    vertical-align: center;
    min-height: 100%;
    width: 100%;
}

.loader-container {
    padding: 5px;
    background-color: rgba(0, 0, 0, 0.3);
}

.loader {
    flex: 1;
    min-height: 20px;
    max-height: 40px;
    --c: no-repeat linear-gradient(#000 0 0);
    background: var(--c), var(--c), var(--c), var(--c), var(--c), var(--c);
    background-size: calc(1ch + 1px) 100%;
    border-bottom: 10px solid #0000;
    position: relative;
    animation: cube 3s infinite linear;
    clip-path: inset(-20px 0);
}

.loader::before {
    content: 'Loading...';
}

.loader::after {
    content: '';
    position: absolute;
    width: 10px;
    height: 14px;
    background: #25adda;
    left: -10px;
    bottom: 100%;
    animation: l8-1 3s infinite linear;
}

@keyframes cube {

    0%,
    12.5% {
        background-position:
            calc(0 * 100% / 6) 0,
            calc(1 * 100% / 6) 0,
            calc(2 * 100% / 6) 0,
            calc(3 * 100% / 6) 0,
            calc(4 * 100% / 6) 0,
            calc(5 * 100% / 6) 0,
            calc(6 * 100% / 6) 0;
    }

    25% {
        background-position:
            calc(0 * 100% / 6) 40px,
            calc(1 * 100% / 6) 0,
            calc(2 * 100% / 6) 0,
            calc(3 * 100% / 6) 0,
            calc(4 * 100% / 6) 0,
            calc(5 * 100% / 6) 0,
            calc(6 * 100% / 6) 0;
    }

    37.5% {
        background-position:
            calc(0 * 100% / 6) 40px,
            calc(1 * 100% / 6) 40px,
            calc(2 * 100% / 6) 0,
            calc(3 * 100% / 6) 0,
            calc(4 * 100% / 6) 0,
            calc(5 * 100% / 6) 0,
            calc(6 * 100% / 6) 0;
    }

    50% {
        background-position:
            calc(0 * 100% / 6) 40px,
            calc(1 * 100% / 6) 40px,
            calc(2 * 100% / 6) 40px,
            calc(3 * 100% / 6) 0,
            calc(4 * 100% / 6) 0,
            calc(5 * 100% / 6) 0,
            calc(6 * 100% / 6) 0;
    }

    62.5% {
        background-position:
            calc(0 * 100% / 6) 40px,
            calc(1 * 100% / 6) 40px,
            calc(2 * 100% / 6) 40px,
            calc(3 * 100% / 6) 40px,
            calc(4 * 100% / 6) 0,
            calc(5 * 100% / 6) 0,
            calc(6 * 100% / 6) 0;
    }

    75% {
        background-position:
            calc(0 * 100% / 6) 40px,
            calc(1 * 100% / 6) 40px,
            calc(2 * 100% / 6) 40px,
            calc(3 * 100% / 6) 40px,
            calc(4 * 100% / 6) 40px,
            calc(5 * 100% / 6) 0,
            calc(6 * 100% / 6) 0;
    }

    87.4% {
        background-position:
            calc(0 * 100% / 6) 40px,
            calc(1 * 100% / 6) 40px,
            calc(2 * 100% / 6) 40px,
            calc(3 * 100% / 6) 40px,
            calc(4 * 100% / 6) 40px,
            calc(5 * 100% / 6) 40px,
            calc(6 * 100% / 6) 0;
    }

    100% {
        background-position:
            calc(0 * 100% / 6) 40px,
            calc(1 * 100% / 6) 40px,
            calc(2 * 100% / 6) 40px,
            calc(3 * 100% / 6) 40px,
            calc(4 * 100% / 6) 40px,
            calc(5 * 100% / 6) 40px,
            calc(6 * 100% / 6) 40px;
    }
}

@keyframes l8-1 {
    100% {
        left: 115%;
    }
}
</style>
