<template>
  <div class="pop-up labels">
    <div class="pop-up-header">
      <span class="pop-up-title">Labels</span>
      <button @click="$emit('closeLabels')" class="pop-up-close-btn clear-btn">
        <i class="fas fa-times"></i>
      </button>
    </div>
    <ul>
      <li class="label-container" v-for="label in labels" :key="label.id">
        <span
          @click="toggleLabels(label)"
          class="card-label"
          :style="{backgroundColor:label.color}"
        >
          <span v-if="!labelToEdit(label)" class="label-title">{{label.title}}</span>
          <text-editor
            v-if="labelToEdit(label) && isEditing"
            v-model="selectedLabel.title"
            :isFocused="isEditing"
            @inputBlur="updateLabel"
            type="p"
          />
          <span v-if="isLabelSelected(label)" class="label-selected">
            <i class="fas fa-check"></i>
          </span>
        </span>
        <a href="#" @click="editLabel(label)">
          <i class="fas fa-pencil-alt"></i>
        </a>
      </li>
    </ul>
    <!-- <button class="label-btn modal-btn">Create new label</button> -->
  </div>
</template>

<script>
import textEditor from '../../text-editor'
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
      labelsCopy: null,
      isEditing: false,
      selectedLabel: null,
    }
  },
  created() {
    this.labelsCopy = [...this.labels]
  },
  methods: {
    isLabelSelected(label) {
      return this.task.labels.find(currLabel => currLabel.id === label.id)
    },
    labelToEdit(label) {
      if (this.selectedLabel) {
        return label.id === this.selectedLabel.id
      }
    },
    toggleLabels(selectedLabel) {
      let labelExist;
      const taskCopy = JSON.parse(JSON.stringify(this.task));
      labelExist = taskCopy.labels.find(label => label.id === selectedLabel.id)
      if (!labelExist) {
        taskCopy.labels.push(selectedLabel)
      } else {
        const idx = taskCopy.labels.findIndex(label => label.id === selectedLabel.id)
        taskCopy.labels.splice(idx, 1)
      }

      this.$emit('updateTask', taskCopy)
    },
    editLabel(label) {
      this.selectedLabel = { ...label }
      this.isEditing = true;
    },
    updateLabel() {
      const labelsCopy = [...this.labels];
      const labelIdx = labelsCopy.findIndex(label => label.id === this.selectedLabel.id)
      labelsCopy.splice(labelIdx, 1, this.selectedLabel)
      this.$emit('labelsUpdated', labelsCopy)

      const taskCopy = JSON.parse(JSON.stringify(this.task));
      const taskLabelIdx = taskCopy.labels.findIndex(label => label.id === this.selectedLabel.id)
      if (taskLabelIdx) {
        taskCopy.labels.splice(1, taskLabelIdx, this.selectedLabel)
        this.$emit('updateTask', taskCopy)
      }
    }

  },
  components: {
    textEditor
  }
}
</script>

