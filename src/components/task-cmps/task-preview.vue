<template>
  <div class="task-preview">
    <router-link :to="'/board/task/' + task.id" class="task-link" draggable="false">
      <labels-list v-if="task.labels.length" :task="task" />
      <div>{{task.title}}</div>
      <div v-if="task.dueDate">{{task.dueDate | dueDate}}</div>
    </router-link>
  </div>
</template>

<script>
import labelsList from './labels-list'
export default {
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  components: {
    labelsList
  }
}
</script>
<style >
.tasd {
  width: 100%;
}
</style>