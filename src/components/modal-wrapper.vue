<template>
    <div class="cover" :class="{active: isActive}" @click="closeModal">
       <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        isActive: {
            type: Boolean,
            default: false
        }
    },
    mounted() {
        document.addEventListener('keydown', this.handleKey);
    },
    destroyed() {
        document.removeEventListener('keydown', this.handleKey);
    },
    methods: {
        closeModal() {
            this.$emit('close-modal');
        },
        handleKey(ev) {
            if (!this.isActive) return;
            if (ev.keyCode === 27) this.closeModal();
        }
    }
};
</script>

<style lang="scss">
    .cover {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 98;
        height: 100%;
        width: 100%;
        background-color: rgba(#000000, .6);
        opacity: 0;
        visibility: hidden;
        transition: opacity .4s linear;

        &.active {
            opacity: 1;
            visibility: visible;
        }
    }
</style>