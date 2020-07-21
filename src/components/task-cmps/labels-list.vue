<template>
  <div class="labels-list">
    <span
      class="label"
      v-for="label in task.labels"
      :key="label.id"
      :style="{backgroundColor:label.color}"
    >{{label.title}}</span>
  </div>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      required: true
    }
  }
}
</script>

