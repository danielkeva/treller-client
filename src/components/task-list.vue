<template>
  <div>
    <div v-for="task in list.tasks" :key="task.id">
      <router-link :to="'/board/task/' + task.id">
        <task-preview :task="task" />
      </router-link>
    </div>
  </div>
</template>

<script>
import taskPreview from '../components/task-preview'
export default {
  props: {
    list: {
      type: Object,
      required: true
    }
  },
  components: {
    taskPreview
  }
}
</script>
