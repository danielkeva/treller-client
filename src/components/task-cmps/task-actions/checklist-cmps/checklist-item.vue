<template>
  <div class="checklist-item">
    <div class="checklist-item-edit" :class="isDone">
      <input type="checkbox" v-model="itemCopy.isDone" @change="updateIsDone" />
      <text-editor
        v-model="itemCopy.title"
        @click.native="isEditing = true"
        @inputBlur="toggleBtn"
        :isFocused="isEditing"
        type="p"
      />
    </div>
    <p class="checklist-user-msg" v-if="displayMsg && !isEditing">
      You have unsaved edits on this field.
      <a @click="startEditing" href="#">View edits</a> -
      <a @click="displayMsg=false" href="#">Discard</a>
    </p>
    <button class="submit-btn" @click="updateItem" v-if="isEditing">Save</button>
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
      displayMsg: false,
      unsavedTitle: ''
    }
  },
  computed: {
    isDone() {
      return this.itemCopy.isDone ? 'done' : ''
    }
  },
  created() {
    this.itemCopy = JSON.parse(JSON.stringify(this.item));
  },
  methods: {
    updateItem() {
      this.isEditing = false;
      const item = JSON.parse(JSON.stringify(this.itemCopy));
      this.displayMsg = false;
      this.$emit('updateItem', item);
    },
    updateIsDone() {
      this.isEditing = false;
      const item = JSON.parse(JSON.stringify(this.itemCopy));
      if (this.item.title !== this.itemCopy.title) {
        item.title = this.item.title
        this.$emit('updateItem', item);
      } else {
        this.$emit('updateItem', item);
      }
    },
    toggleBtn() {
      setTimeout(() => {
        this.isEditing = false;
        if (this.item.title !== this.itemCopy.title) { // reset title if not saved 
          this.unsavedTitle = this.itemCopy.title
          this.itemCopy.title = this.item.title
          this.displayMsg = true;
        }
      }, 150);
    },
    startEditing() {
      this.itemCopy.title = this.unsavedTitle
      this.isEditing = true

    }
  },

  components: {
    textEditor
  }
}
</script>

<style>
</style>