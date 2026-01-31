<template>
    <nav class="navbar bg">
        <div class="main-navbar">
            <router-link to="/home">
                <img v-if="img" :src="img" alt="Logo" class="navbar-logo" loading="eager" />
            </router-link>
            <div class="options-container">
                <router-link v-for="opt in options" :key="opt.to" :to="opt.to"
                    class="s-padding title-font animation-hover" active-class="selected" exact-active-class="selected">
                    {{ opt.label }}
                </router-link>
            </div>
        </div>
    </nav>
</template>

<script setup>
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
    display: flex;
    flex-direction: row;
}

.main-navbar {
    display: flex;
    flex-direction: column;
    align-items: center;

    flex: 1;
}

.navbar-logo {
    margin-top: 1.3rem;
    width: 22vw;
    height: auto;

    min-width: 250px;
    max-width: 380px;
    min-height: 80px;
    max-height: 100px;

    object-fit: contain;
}

.options-container {
    display: flex;
    flex-wrap: wrap;
    gap: 3.5rem;
    justify-content: center;

    width: 100%;
}
</style>