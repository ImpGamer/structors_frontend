<template>
    <div class="card" :style="cardStyle">
        <component :is="mediaComponent" v-bind="mediaProps" :style="mediaStyle" />

        <div class="card-content">
            <h3 v-if="title" class="title-font">
                {{ truncateText(props.title.content, props.title.length) }}
            </h3>
            <div v-if="description" class="start-aligner">
                <p class="text">Description:</p>
                <br />
                <p class="text">{{ truncateText(props.description.content, props.description.length) }}</p>
            </div>
            <slot />
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import '@justinribeiro/lite-youtube'

const props = defineProps({
    url: {
        type: String,
        default: '/images/static/default_img.webp',
    },
    fileSize: {
        type: Object,
        required: false,
        default: () => ({
            width: 'clamp(330px,60vw,460px)',
            height: 'clamp(300px,60vh,460px)',
        }),
    },
    title: {
        type: Object,
        required: false,
    },
    description: {
        type: Object,
        required: false,
    },
})

function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text

    return text.slice(0, maxLength) + '...'
}

const mediaStyle = computed(() => ({
    width: props.fileSize.width,
    height: props.fileSize.height,
}))

const cardStyle = computed(() => ({
    width: props.fileSize.width,
    maxWidth: props.fileSize.width,
}))

const mediaComponent = computed(() => {
    const fileType = fileTypeData.value.type

    if (fileType === 'youtube') return 'lite-youtube'
    if (fileType === 'image') return 'img'
    return null
})

const mediaProps = computed(() => {
    const fileType = fileTypeData.value.type

    if (fileType === 'youtube') {
        return {
            videoid: fileTypeData.value.videoID,
            videoTitle: 'Game Trailer',
        }
    }

    if (fileType === 'image') {
        return {
            src: props.url,
            alt: props.title || 'Image',
        }
    }

    return {}
})

const fileTypeData = computed(() => {
    const hasImgExtension = (str) => {
        const imgExts = ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp', 'avif']
        const pattern = new RegExp(`\\.(${imgExts.join('|')})(\\?|#|$)`, 'i')

        return pattern.test(str)
    }

    const url = props.url

    if (!url) return { type: 'unknown' }

    if (hasImgExtension(url)) {
        return { type: 'image' }
    }

    try {
        const urlObj = new URL(url)
        const videoID = urlObj.searchParams.get('v')

        if (videoID) {
            return {
                type: 'youtube',
                videoID: videoID,
            }
        }
    } catch (e) {
        console.log(e)
    }

    return { type: 'unknown' }
})
</script>

<style scoped>
.card {
    display: flex;
    flex-direction: column;

    border: 3.5px solid black;
    border-radius: 10px;
    box-shadow: 10px 5px 5px var(--secondary-color);
}

.card-content {
    padding: 1rem;

    box-sizing: border-box;
    overflow-wrap: break-word;
    height: 100%;
    background-color: var(--primary-color);
}

.card-content>*+* {
    margin-top: 1rem;
}
</style>
