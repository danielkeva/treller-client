<template>
  <div>
    <div v-for="activity in activities" :key="activity.id">
      <p v-if="taskId" v-html="activity.cardTxt"></p>
      <p v-else v-html="activity.boardTxt"></p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    taskId: {
      type: String,
      required: false
    }
  },
  computed: {
    activities() {
      if (this.taskId) {
        return this.$store.getters.activities.filter(activity => activity.taskId === this.taskId)
      } else {
        return this.$store.getters.activities
      }
    }
  },
}
</script>

<style lang="scss">
p {
  a {
    text-decoration: underline;
    &:hover {
      color: #172b4d;
    }
  }
}
</style>