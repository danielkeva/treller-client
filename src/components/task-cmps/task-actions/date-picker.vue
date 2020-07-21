<template>
  <div class="pop-up">
    <div class="pop-up-header">
      <span class="pop-up-title">Date</span>
      <button @click="$emit('closeModal')" class="pop-up-close-btn clear-btn">
        <i class="fas fa-times"></i>
      </button>
    </div>
    <v-date-picker v-model="selectedDate" mode="single" is-inline is-expanded />
    <button @click="addDueDate" class="add-btn add-date-btn">Save</button>
  </div>
</template>

<script>
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
    }

  },
}
</script>

<style>
</style>