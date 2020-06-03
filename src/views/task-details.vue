
<template>
  <div class="cover" :class="{active: isActive}" @click="closeModal">
    <div class="window" :class="{active: isActive}" @click.stop>
      <div>
        <text-editor :currTask="task" :txtType="'title'" @updateTxt="updateTask" />
      </div>
      <div>
        <h3>Description</h3>
        <text-editor :currTask="task" :txtType="'description'" @updateTxt="updateTask" />
      </div>
    </div>
  </div>
</template>

<script>
import textEditor from '../components/text-editor'
export default {

  data() {
    return {
      isActive: true,
      test: null
    }
  },
  computed: {
    task() {
      return this.$store.getters.currTask
    }
  },
  created() {
    this.setTask()
  },
  methods: {
    updateTask(task) {
      this.$store.dispatch({ type: 'updateTask', task })
    },
    setTask() {
      const taskId = this.$route.params.id;
      this.$store.commit({ type: 'setTask', taskId })
    },
    closeModal() {

      this.isActive = false
      this.$router.push('/board')
    }
  },
  components: {
    textEditor
  }
}
</script>



<style lang="scss">
.cover {
  align-items: flex-start;
  background-color: rgba(0, 0, 0, 0.64);
  display: none;
  height: 100%;
  justify-content: center;
  left: 0;
  overflow-y: auto;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 20;

  &.active {
    display: flex;
  }
  .window {
    background-color: #f4f5f7;
    border-radius: 2px;
    display: none;
    margin: 48px 0 80px;
    overflow: hidden;
    position: relative;
    width: 768px;
    z-index: 2;
    &.active {
      display: block;
      position: absolute;
    }
  }
}
</style>