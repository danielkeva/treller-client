<template>
  <div>
    <form @submit.prevent="updateBoard">
      <input
        type="text"
        placeholder="Enter list title..."
        v-model="listCopy.title"
        ref="listInput"
        @blur="onListBlur"
      />
      <button>Add list</button>
    </form>
  </div>
</template>

<script>

export default {
  props: {
    newList: {
      type: Object,
      required: true
    },
    board: {
      type: Object,
      required: true
    },

  },
  data() {
    return {
      listCopy: null,
      boardCopy: null,
    }
  },
  created() {
    this.listCopy = JSON.parse(JSON.stringify(this.newList));
    this.boardCopy = JSON.parse(JSON.stringify(this.board));
  },
  mounted() {
    this.$refs.listInput.focus();
  },
  methods: {
    updateBoard() {
      if (!this.listCopy.title) {
        // this.listCopy = null;
        return
      }
      this.boardCopy.taskLists.push(this.listCopy)
      // this.$store.dispatch({ type: 'saveBoard', board: this.boardCopy })
      this.$emit('boardUpdated',this.boardCopy)
      // this.listCopy = null
    },
    onListBlur() {
      setTimeout(() => {
        this.$emit('boardUpdated')
      }, 150)
    }
  },
}
</script>

<style>
</style>