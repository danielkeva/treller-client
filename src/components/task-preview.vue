<template>
  <div>
    <p>{{task.title}}</p>
    <p>{{task.description}}</p>
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

}
</script>
