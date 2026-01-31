<template>
    <component :is="tag" v-bind="componentProps" :style="{ backgroundColor: color }" class="btn" @click="emit('click')">
        <div class="btn-content">
            <img v-if="icon" :src="icon" class="icon" :class="color !== 'white' ? 'invert' : ''" />
            <p class="text" :style="textColor">{{ content }}</p>
        </div>
    </component>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    color: { type: String, default: 'black' },
    content: { type: String, default: 'Button' },
    icon: String,

    to: String,
    href: String,
    type: {
        type: String,
        default: 'button'
    }
})

const emit = defineEmits(['click'])

const tag = computed(() => {
    if (props.to) return 'router-link'
    if (props.href) return 'a'

    return 'button'
})

const componentProps = computed(() => {
    if (props.to) return { to: props.to }
    if (props.href) return { href: props.href, target: '_blank' }
    return { type: props.type }
})

const textColor = computed(() => {
    const txtColor = props.color === 'white' ? 'black' : 'white'

    return {
        color: txtColor
    }
})
</script>

<style scoped>
.btn {
    display: inline-block;
    border: 2px solid white;
    border-radius: 10px;

    max-width: 300px;
    overflow: hidden;
    text-overflow: ellipsis;

    text-decoration: none;
    color: inherit;

    cursor: pointer;
    transition: transform 0.1s ease-in-out;
}

button.btn {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
}

.btn-content {
    display: flex;
    flex-direction: row;
    gap: 7px;

    padding: 5px 15px;

    align-items: center;
    justify-content: center;
    text-align: center;
}

.btn:hover {
    cursor: pointer;

    transform: scale(0.98);
}
</style>