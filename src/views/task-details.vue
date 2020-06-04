
<template>
  <div class="cover" :class="{active: isActive}" @click="closeModal">
    <div class="task-modal" :class="{active: isActive}" @click.stop>
      <div class="left-side">
        <div class="modal-module">
          <text-editor :currTask="task" :txtType="'title'" @updateTxt="updateTask" />
        </div>
        <div class="modal-module">
          <div class="task-details-title">
            <span class="far fa-file-alt"></span>
            <h3>Description</h3>
          </div>
          <text-editor  :currTask="task" :txtType="'description'" @updateTxt="updateTask" />
        </div>
      </div>
      <div class="right-side">
        <h3>Add to card</h3>
        <div class="modal-sidebar">
          <a href="" class="modal-btn">Members</a>
          <a href="" class="modal-btn">Labels</a>
          <a href="" class="modal-btn">Checklist</a>
          <a href="" class="modal-btn">Due date</a>
          <a href="" class="modal-btn">Attachment</a>
        </div>
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



