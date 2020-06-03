<template>
  <section>
    <h1>Board Details</h1>
    <task-list  v-for="list in board.lists" :key="list.id" :list="list" />
    <router-view/>
  </section>
</template>

<script>
import taskList from '../components/task-list'
export default {
  components: {
    taskList
  },
  created() {
    this.$store.dispatch({ type: "loadBoard" });
  },
  computed: {
    board() {
     return this.$store.getters.board
    }
  }
}
</script>

