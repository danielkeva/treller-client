<template>
  <div>
    <h3>{{checklist.title}}</h3>
    <el-progress v-if="checklist.listItems.length" :percentage="progress" :color="customColor"></el-progress>
    <checklist-item
      v-for="item in checklist.listItems"
      :key="item.id"
      @updateItem="updateChecklist"
      :item="item"
    />
    <text-editor
      v-if="newItem && isEditing"
      v-model="newItem.title"
      @inputBlur="updateChecklist"
      :isFocused="isEditing"
      type="p"
    />
    <button class="modal-btn" @click="getEmptyItem">Add an item</button>
  </div>
</template>

<script>
import textEditor from '../../../text-editor'
import checklistItem from './checklist-item'
import { boardService } from '../../../../services/board.service.js'
import { eventBus, EV_addActivity } from '../../../../services/eventBus.service.js'
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
  computed: {
    progress() {
      const doneCount = this.checklist.listItems.reduce((acc, item) => {
        if (item.isDone) acc++
        return acc
      }, 0)
      return Math.round((doneCount * 100) / this.checklist.listItems.length)
    },
    customColor() {
      return this.progress === 100 ? '#67c23a' : '#409eff'
    }
  },
  methods: {
    getEmptyItem() {
      this.newItem = boardService.getEmptyListItem();
      this.isEditing = true;
    },
    updateChecklist(newItem) {
      const checklistCopy = JSON.parse(JSON.stringify(this.checklist));
      if (newItem) {
        const idx = checklistCopy.listItems.findIndex(item => item.id === newItem.id)
        checklistCopy.listItems.splice(idx, 1, newItem) // update an item 
      } else if (!newItem && this.newItem.title) {
        checklistCopy.listItems.push(this.newItem) // add an item

        
        const activity = boardService.newActivity(
          `added ${this.newItem.title} to ${checklistCopy.title} in this card`,
          `added ${this.newItem.title} to ${checklistCopy.title} in <a href="#/board/task/${this.task.id}">${this.task.title}</a>`,
          this.task.id
        )
        eventBus.$emit(EV_addActivity, activity)
      }
      this.isEditing = false;
      this.newItem = null;
      this.updateTask(checklistCopy)
      // this.$emit('addActivity', activity)
    },
    updateTask(checklist) {
      const taskCopy = JSON.parse(JSON.stringify(this.task));
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