<template>
  <div class="pop-up list-menu">
    <div class="pop-up-header">
      <span class="pop-up-title">Labels</span>
      <button @click="$emit('closeMenu')" class="pop-up-close-btn clear-btn">
        <i class="fas fa-times"></i>
      </button>
    </div>
    <div @click="$emit('addCard')">Add card</div>
    <div>Change list color</div>
    <div>Sort list by</div>
    <div @click.stop="$emit('removeList')">Delete list</div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.list-menu {
  position: absolute;
}
</style>