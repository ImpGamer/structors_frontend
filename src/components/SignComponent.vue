<template>
    <div class="vertical-container mid-aligner use-all-width">
        <div class="sign-container mid-aligner">
            <p class="text">{{ content }}</p>
        </div>
    </div>
</template>

<script setup>
defineProps({
    content: {
        type: String,
        required: true,
    },
})
</script>

<style scoped>
.sign-container {
    --bk-color: #383838;
    --border-color: #871e14;

    margin: 4rem 2rem;
    width: 100%;
    max-width: 70vw;
    background-color: var(--bk-color);
    border: 2px solid var(--border-color);

    border-radius: 8px;
    padding: 3rem 0;
    animation: appear 0.15s ease-in;
}

@keyframes appear {
    from {
        transform: scale(0%) rotate(15deg);
    }

    to {
        transform: scale(100%) rotate(0deg);
    }
}

.text {
    font-weight: bold;
}
</style>
