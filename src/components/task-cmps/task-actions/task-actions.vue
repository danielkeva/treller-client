<template>
  <div class="modal-sidebar">
    <div class="sidebar-cover" :class="{active: isActive}" @click="closeModal"></div>
    <button class="modal-btn" @click="toggle('isLabelActive')">Labels</button>
    <label-picker
      v-if="isLabelActive"
      :task="task"
      :labels="labels"
      @updateTask="updateTask"
      @labelsUpdated="updateBoard"
      @closeLabels="closeModal"
    />
    <button class="modal-btn" @click="toggle('isMemberActive')">Members</button>
    <button class="modal-btn" @click="toggle('isChecklistActive')">Checklist</button>
    <checklist-picker
      v-if="isChecklistActive"
      :task="task"
      @updateTask="updateTask"
      @checklistAdded="updateTask"
      @closeModal="closeModal"
    />
    <button class="modal-btn" @click="toggle('isDueDateActive')">Due date</button>
    <date-picker
      v-if="isDueDateActive"
      :task="task"
      @dueDateAdded="updateTask"
      @closeModal="closeModal"
    />
    <button class="modal-btn" @click="toggle('isAttachmentActive')">Attachment</button>
    <!-- <button class="modal-btn" @click="$emit('removeTask')">Delete</button> -->
  </div>
</template>

<script>
import labelPicker from './label-picker'
import checklistPicker from './checklist-cmps/checklist-picker'
import datePicker from './date-picker'
import textEditor from '../../text-editor'
import { boardService } from '../../../services/board.service'
export default {
  props: {
    task: {
      type: Object,
      required: true
    },
    labels: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      currAction: '',
      checkListTitle: '',
      isActive: false,
      isLabelActive: false,
      isMemberActive: false,
      isChecklistActive: false,
      isDueDateActive: false,
      isAttachmentActive: false,
    }
  },
  methods: {
    toggle(isActive) {
      this[isActive] = !this[isActive]
      this.currAction = isActive
      this.isActive = !this.isActive
    },
    closeModal() {
      const actionType = this.currAction
      this.isActive = false
      this[actionType] = !this[actionType]
      this.currAction = ''
    },
    updateTask(task) {
      this.$emit('updateTask', task)
    },
    updateBoard(labels) {
      this.$emit('labelsUpdated', labels)
    },
    // addChecklist() {
    //   console.log('yes');
    //   const newChecklist = boardService.getEmptyCheckList(this.checkListTitle)
    //   const taskCopy = JSON.parse(JSON.stringify(this.task));
    //   taskCopy.checklists.push(newChecklist)
    //   this.$emit('updateTask', taskCopy)
    //   this.closeModal()
    // }
  },
  components: {
    labelPicker,
    datePicker,
    checklistPicker,
    textEditor
  }
}
</script>

<style lang="scss">
.sidebar-cover {
  display: none;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 15;
  &.active {
    display: block;
  }
}
.modal-sidebar {
  z-index: 25;
}
</style>