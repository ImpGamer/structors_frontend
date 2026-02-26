<template>
    <div class="main-container">
        <div class="b-padding vertical-container">
            <section :class="!isMobile ? 'horizontal-container' : 'vertical-container'">
                <div class="text-container">
                    <h3 class="title-font">¿What is Nullity Studio?</h3>
                    <p class="text">
                        We are an independent game development studio founded in Mexico in 2026 by David Romero.
                        Our work is driven by a passion for horror, adventure, and psychological terror,
                        focusing on creating immersive experiences, memorable stories, and impactful moments
                        that stay with players long after they finish playing. While our core focus lies in dark
                        and atmospheric genres, we are not limited by them. We enjoy experimenting with
                        different styles and mechanics, including puzzle games, FPS, multiplayer experiences,
                        and party games, always seeking new ways to surprise and engage players—whether playing
                        solo or with others.
                    </p>
                </div>
                <img class="gen-img" src="https://res.cloudinary.com/dtohisibj/image/upload/ths_1_sticker_nyph4w.png"
                    alt="about-us" />
            </section>
        </div>
    </div>
</template>

<script setup>
defineProps({
    isMobile: {
        Type: Boolean,
        required: true,
    },
})
</script>

<style scoped>
.main-container {
    background-color: var(--primary-color);

    min-height: 100vh;
    width: 100%;
}

.text-container {
    flex: 1;
    margin: auto;
}

.text-container>* {
    margin-bottom: 1rem;
}

.inverse-container {
    display: flex;
    flex-direction: row-reverse;
    flex-wrap: wrap;
    text-align: end;
    align-items: end;
    justify-content: end;

    gap: 5vw;
}

@media (width < 970px) {
    .inverse-container {
        flex-direction: row;
        flex-wrap: wrap;
    }
}
</style>
