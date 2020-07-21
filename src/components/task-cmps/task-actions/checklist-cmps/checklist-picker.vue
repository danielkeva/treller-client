<template>
  <div class="pop-up">
    <div class="pop-up-header">
      <span class="pop-up-title">Add checklist</span>
      <button @click="closeModal" class="pop-up-close-btn clear-btn">
        <i class="fas fa-times"></i>
      </button>
    </div>
    <text-editor v-model="checklist.title" :isFocused="true" @textSubmitted="addChecklist" />
    <button class="add-btn add-date-btn" @click="addChecklist">Save</button>
  </div>
</template>

<script>
import { boardService } from '../../../../services/board.service.js'
import textEditor from '../../../text-editor'
export default {
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      checklist: null,
    }
  },
  created() {
    this.checklist = boardService.getEmptyCheckList();
  },
  methods: {
    closeModal() {
      this.$emit('closeModal');
    },
    addChecklist() {
      const taskCopy = JSON.parse(JSON.stringify(this.task));
      const checklistCopy = { ...this.checklist };
      taskCopy.checklists.push(checklistCopy);
      this.$emit('closeModal');
      this.$emit('checklistAdded', taskCopy);
    }
  },
  components: {
    textEditor
  }
}
</script>

<style>
</style>