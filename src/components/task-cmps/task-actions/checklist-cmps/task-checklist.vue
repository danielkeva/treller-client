<template>
  <div>
    <h3>{{checklist.title}}</h3>
    <div v-for="item in checklist.listItems" :key="item.id">
      <checklist-item @updateItem="updateChecklist" :item="item" />
    </div>
    <text-editor
      v-if="newItem && isEditing"
      v-model="newItem.title"
      @inputBlur="updateChecklist"
      :isFocused="isEditing"
    />
    <button class="add-btn add-date-btn" @click="getEmptyItem">Add an item</button>
  </div>
</template>

<script>
import textEditor from '../../../text-editor'
import checklistItem from './checklist-item'
import { boardService } from '../../../../services/board.service.js'
export default {
  props: {
    checklist: {
      type: Object,
      required: true
    },
    task: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isEditing: false,
      newItem: null
    }
  },
  methods: {
    getEmptyItem() {
      this.newItem = boardService.getEmptyListItem();
      this.isEditing = true;
    },
    updateChecklist(newItem) {
      console.log('new item', this.newItem);
      const checklistCopy = JSON.parse(JSON.stringify(this.checklist));
      if (newItem) {
        const idx = checklistCopy.listItems.findIndex(item => item.id === newItem.id)
        checklistCopy.listItems.splice(idx, 1, newItem)
      } else {
        checklistCopy.listItems.push(this.newItem)
      }
      this.isEditing = false;
      this.newItem = null;
      this.updateTask(checklistCopy)
    },
    updateTask(checklist) {
      const taskCopy = JSON.parse(JSON.stringify(this.task));
      const newItemCopy = { ...this.newItem };
      const idx = taskCopy.checklists.findIndex(currChecklist => currChecklist.id === checklist.id)
      taskCopy.checklists.splice(idx, 1, checklist)
      this.isEditing = false;
      this.newItem = null;
      this.$emit('updateTask', taskCopy)
    }
  },
  components: {
    checklistItem,
    textEditor
  }
}
</script>

<style>
</style>