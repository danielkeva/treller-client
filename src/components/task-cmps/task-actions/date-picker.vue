<template>
  <div class="pop-up">
    <div class="pop-up-header">
      <span class="pop-up-title">Date</span>
      <button @click="$emit('closeModal')" class="pop-up-close-btn clear-btn">
        <i class="fas fa-times"></i>
      </button>
    </div>
    <v-date-picker v-model="selectedDate" mode="single" is-inline is-expanded />
    <button @click="addDueDate" class="submit-btn add-date-btn">Save</button>
  </div>
</template>

<script>
import { boardService } from '../../../services/board.service.js'
import { eventBus, EV_addActivity } from '../../../services/eventBus.service.js'
import moment from 'moment'

export default {
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      selectedDate: ''
    }
  },

  methods: {
    addDueDate() {
      const date = new Date(this.selectedDate).getTime();
      const taskCopy = JSON.parse(JSON.stringify(this.task));
      taskCopy.dueDate = date
      this.$emit('closeModal');
      this.$emit('dueDateAdded', taskCopy);
      const dueDate = moment(new Date(taskCopy.dueDate)).format("MMM Do YY");
      const activity = boardService.newActivity(
        `set this card to be due at ${dueDate}`,
        `set <a href="#/board/task/${taskCopy.id}">${taskCopy.title}</a> to be due at ${dueDate}`,
        this.task.id
      )
      eventBus.$emit(EV_addActivity, activity)
    }

  },
}
</script>

<style>
</style>