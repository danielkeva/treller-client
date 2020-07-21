
<template>
  <div v-if="taskCopy" class="cover" :class="{active: isActive}" @click="closeModal">
    <div class="task-modal" :class="{active: isActive}" @click.stop>
      <div class="left-side">
        <div class="modal-module">
          <div class="task-header">
            <text-editor v-model="taskCopy.title" @inputBlur="updateTask" />
          </div>
        </div>
        <div class="modal-module">
          <div class="task-labels-date">
            <div class="task-labels-list">
              <h3>Labels</h3>
              <labels-list v-if="taskCopy.labels" :task="taskCopy" />
            </div>
            <div v-if="taskCopy.dueDate" class="task-due-date">
              <h3>Due date</h3>
              <div>{{taskCopy.dueDate | dueDate}}</div>
            </div>
          </div>
        </div>
        <div class="modal-module">
          <div class="task-description">
            <i class="far fa-file-alt"></i>
            <h3>Description</h3>
          </div>
          <!-- <p v-if="!taskCopy.description">add</p> -->
          <text-editor
            v-model="taskCopy.description"
            inputClass="description-edit"
            @inputBlur="updateTask"
            :isWide="true"
          />
        </div>
        <div class="modal-module">
          <task-checklist
            v-for="checklist in taskCopy.checklists"
            :key="checklist.id"
            :checklist="checklist"
            :task="taskCopy"
            @updateTask="updateTask"
          />
        </div>
      </div>
      <div class="right-side">
        <h3>Add to card</h3>
        <task-actions
          :task="taskCopy"
          :labels="labels"
          @updateTask="updateTask"
          @removeTask="removeTask"
          @labelsUpdated="updateBoardLabels"
        />
      </div>
    </div>
  </div>
</template>

<script>
import textEditor from '../components/text-editor'
import taskActions from '../components/task-cmps/task-actions/task-actions'
import labelsList from '../components/task-cmps/labels-list'
import labelPicker from '../components/task-cmps/task-actions/label-picker'
import taskChecklist from '../components/task-cmps/task-actions/checklist-cmps/task-checklist'
export default {

  data() {
    return {
      isActive: true,
      taskCopy: null,
    }
  },
  computed: {
    labels() {
      return this.$store.getters.labels
    },
  },
  async created() {
    const taskId = this.$route.params.id;
    const task = await this.$store.dispatch({ type: 'loadTask', taskId })
    this.taskCopy = JSON.parse(JSON.stringify(task));
    if (!this.taskCopy) {
      this.$router.push('/board')
    }
  },
  methods: {
    updateTask(task) {
      if (task) {
        this.taskCopy = JSON.parse(JSON.stringify(task));
        this.$store.dispatch({ type: 'updateTask', task })
      } else {
        const taskCopy = JSON.parse(JSON.stringify(this.taskCopy));
        this.$store.dispatch({ type: 'updateTask', task: taskCopy })
      }
    },
    updateBoardLabels(labels) {
      const boardCopy = JSON.parse(JSON.stringify(this.$store.getters.board));
      boardCopy.labels = labels
      this.$store.dispatch({ type: 'saveBoard', board: boardCopy })
    },
    removeTask() {
      const taskId = this.$route.params.id;
      this.$router.push('/board')
      this.$store.dispatch({ type: 'removeTask', taskId })
    },
    closeModal() {
      // this.isActive = false
      this.$router.push('/board')
    }
  },
  components: {
    textEditor,
    taskActions,
    labelPicker,
    labelsList,
    taskChecklist
  }
}
</script>



