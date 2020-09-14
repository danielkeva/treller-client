<template>
  <div class="list-wrapper">
    <div class="list-header">
      <text-editor
        v-if="taskListCopy.title"
        v-model="taskListCopy.title"
        @inputBlur="updateList"
        type="h3"
      />
      <button class="list-menu-btn clear-btn" @click="isMenuOpen=!isMenuOpen">
        <i class="el-icon-more"></i>
      </button>
      <list-menu
        v-if="isMenuOpen && !isEditing"
        @addCard="addTask"
        @closeMenu="isMenuOpen=false"
        @removeList="removeList"
      />
    </div>
    <div class="list-content">
      <Container
        group-name="tasks"
        @drop="onDrop"
        :get-child-payload="getTaskPayload(taskListCopy.id)"
        drag-class="card-ghost"
        drop-class="card-ghost-drop"
        :drag-begin-delay="delayDrag"
      >
        <!-- drag-handle-selector=".task-preview" -->
        <Draggable v-for="task in taskListCopy.tasks" :key="task.id">
          <task-preview :task="task" />
        </Draggable>
      </Container>
    </div>
    <div class="list-footer">
      <button v-if="!isEditing" @click="addTask">add new task</button>
      <text-editor
        v-if="newTask && isEditing"
        v-model="newTask.title"
        @inputBlur="updateList"
        :isFocused="isEditing"
        type="p"
      />
    </div>
  </div>
</template>

<script>
import taskPreview from '../task-cmps/task-preview'
import listMenu from '../board-cmps/list-menu'
import textEditor from '../text-editor'
import { Container, Draggable } from 'vue-smooth-dnd';
import { boardService } from '../../services/board.service.js'
import { utilService } from '../../services/util.service'
export default {
  props: {
    taskList: {
      type: Object,
      required: true
    },
    board: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      newTask: null,
      isEditing: false,
      taskListCopy: null,
      isMenuOpen: false,
    }
  },
  created() {
    this.taskListCopy = JSON.parse(JSON.stringify(this.taskList));
  },
  computed: {
    delayDrag() {
      return screen.width > 900 ? 0 : 400
    }
  },
  methods: {
    updateList() {
      if (this.newTask && this.newTask.title) {
        this.taskListCopy.tasks.push(this.newTask);
      }
      this.isEditing = false;
      this.newTask = null;
      this.$emit('updateList', this.taskListCopy)
    },
    addTask() {
      this.isMenuOpen = false;
      this.newTask = boardService.getEmptyTask();
      this.isEditing = true;
    },
    removeList() {
      this.isMenuOpen = false;
      const boardCopy = JSON.parse(JSON.stringify(this.board));
      const listId = this.taskList.id
      const idx = boardCopy.taskLists.findIndex(taskList => taskList.id === listId)
      boardCopy.taskLists.splice(idx, 1)
      this.$emit('boardUpdated', boardCopy)
    },
    onDrop(dropResult) {
      console.log('dropresu;t',dropResult);
      this.taskListCopy.tasks = utilService.applyDrag(this.taskListCopy.tasks, dropResult);
      this.$emit('updateList', this.taskListCopy)
    },
    getTaskPayload(taskListId) {
      return index => {
        return this.board.taskLists.filter(taskList => taskList.id === taskListId)[0].tasks[index];
      };
    },

  },
  watch: {
    'taskList'() {
      this.taskListCopy = JSON.parse(JSON.stringify(this.taskList));
    }
  },
  components: {
    taskPreview,
    textEditor,
    listMenu,
    Container,
    Draggable
  }
}
</script>
<style>
.card-ghost {
  transition: transform 0.15s ease;
  transform: rotateZ(8deg);
}

.card-ghost-drop {
  transition: transform 0.18s ease-in-out;
  transform: rotateZ(0deg);
}
.task-preview-placeholder {
  background-color: red;
  border-radius: 3px;
  margin: 0 4px 8px 1px;
}
</style>