<template>
  <div class="pop-up">
    <div class="pop-up-header">
      <span class="pop-up-title">Add checklist</span>
      <button @click="closeModal" class="pop-up-close-btn clear-btn">
        <i class="fas fa-times"></i>
      </button>
    </div>
    <text-editor
      v-model="checklist.title"
      :isFocused="true"
      @textSubmitted="addChecklist"
      type="p"
    />
    <button class="submit-btn add-date-btn" @click="addChecklist">Save</button>
  </div>
</template>

<script>
import { boardService } from '../../../../services/board.service.js'
import { eventBus, EV_addActivity } from '../../../../services/eventBus.service.js'
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
      const activity = boardService.newActivity(
        `added ${checklistCopy.title} to this card`,
        `added ${checklistCopy.title} to <a href="#/board/task/${taskCopy.id}">${taskCopy.title}</a>`,
        this.task.id
      )
      eventBus.$emit(EV_addActivity, activity)
    }
  },
  components: {
    textEditor
  }
}
</script>

<style>
</style>