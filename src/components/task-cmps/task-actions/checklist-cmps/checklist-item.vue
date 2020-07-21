<template>
  <div>
    <input type="checkbox" v-model="itemCopy.isDone" />
    <text-editor v-model="itemCopy.title" @click.native="isEditing = true" @inputBlur="toggleBtn" />
    <button @click="updateItem" v-if="isEditing">Save</button>
  </div>
</template>

<script>
import textEditor from '../../../text-editor'
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      itemCopy: null,
      isEditing: false,
      test: false
    }
  },
  created() {
    this.itemCopy = JSON.parse(JSON.stringify(this.item));
  },
  methods: {
    updateItem() {
      this.isEditing = false;
      this.$emit('updateItem', this.itemCopy);
    },
    toggleBtn() {
      setTimeout(() => { 
        this.isEditing = false;
        if (this.item.title !== this.itemCopy.title) { // reset title if not saved 
          this.itemCopy.title = this.item.title
        }
      }, 150);

    }
  },

  components: {
    textEditor
  }
}
</script>

<style>
</style>