<template>
  <div>
    <p @click="focusInput" v-show="!isEditing">{{taskTxt}}</p>
    <input
      v-if="inputType"
      v-model="task[txtType]"
      v-show="isEditing"
      @blur="updateTxt"
      ref="input"
      :type="inputType"
    />
    <textarea
      v-if="!inputType"
      v-model="task[txtType]"
      v-show="isEditing"
      @blur="updateTxt"
      ref="input"
      :type="inputType"
    />
  </div>
</template>

<script>
export default {
  props: {
    currTask: {
      type: Object,
      required: true
    },
    txtType: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isEditing: false,
      task: null
    }
  },
  computed: {
    taskTxt() {
      if (this.txtType === 'title') {
        return this.task.title
      } else {
        return this.task.description
      }
    },
    inputType() {
      return this.txtType === 'title'
    }
  },
  created() {
    this.task = JSON.parse(JSON.stringify(this.currTask));
  },
  methods: {
    updateTxt() {
      this.isEditing = false
      const taskCopy = JSON.parse(JSON.stringify(this.task));
      this.$emit('updateTxt', taskCopy)
    },

    focusInput() {
      if (!this.isEditing) {
        this.isEditing = true
        this.$nextTick(() => {
          this.$refs.input.focus();
        })
      }
    }
  },
}
</script>

<style>
</style>