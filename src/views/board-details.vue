<template>
  <section class="board-details">
    <h1>Board Details</h1>
    <!-- <div class="list-container"> -->
    <Container
      @drop="onDrop"
      orientation="horizontal"
      :tag="{value: 'div', props: {class: 'list-container'}}"
      drag-handle-selector=".list-header"
    >
      <Draggable v-for="taskList in board.taskLists" :key="taskList.id">
        <task-list
          :taskList="taskList"
          :board="board"
          @updateList="updateList"
          @boardUpdated="saveBoard"
        />
      </Draggable>
      <button v-if="!newList" @click="getEmptyList">Add another list</button>
      <add-list v-if="newList" :newList="newList" :board="board" @boardUpdated="addList" />
    </Container>
    <!-- </div> -->
    <activity-log></activity-log>
    <router-view />
  </section>
</template>

<script>
import { Container, Draggable } from 'vue-smooth-dnd';
import { utilService } from '../services/util.service.js';
import { boardService } from '../services/board.service.js';
import { eventBus, EV_addActivity } from '../services/eventBus.service.js';
import taskList from '../components/task-cmps/task-list';
import textEditor from '../components/text-editor';
import addList from '../components/board-cmps/add-list';
import activityLog from '../components/activity-log'
export default {
  data() {
    return {
      newList: null,
    }
  },
  computed: {
    board() {
      return this.$store.getters.board
    }
  },
  created() {
    this.$store.dispatch({ type: 'loadBoard' });
    eventBus.$on(EV_addActivity, this.updateActivities);
  },
  methods: {
    getEmptyList() {
      this.newList = boardService.getEmptyList()
    },
    onDrop(dropResult) {
      const boardCopy = JSON.parse(JSON.stringify(this.$store.getters.board));
      boardCopy.taskLists = utilService.applyDrag(boardCopy.taskLists, dropResult);
      this.saveBoard(boardCopy)
    },
    addList(board) {
      if (!board) {
        this.newList = null;
        return
      }
      this.saveBoard(board)
      this.newList = null
    },
    updateList(taskList) {
      this.$store.dispatch({ type: 'updateTaskList', taskList })
    },
    updateActivities(activity) {
      this.$store.dispatch({ type: 'updateActivities', activity: { ...activity } })
    },
    saveBoard(board) {
      this.$store.dispatch({ type: 'saveBoard', board })
    },
  },
  destroyed() {
    eventBus.$off(EV_addActivity);
  },
  components: {
    taskList,
    textEditor,
    addList,
    Container,
    Draggable,
    activityLog
  },

}
</script>

