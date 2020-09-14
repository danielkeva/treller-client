<template>
  <div class="text-editor-wrapper">
    <component class="module-text" :is="type" @click="focusInput" v-show="!isEditing">{{value}}</component>
    <input
      v-if="isEditing && !isWide"
      type="text"
      class="focusClass"
      :value="value"
      @blur="updateText"
      ref="input"
      @input="test"
    />
    <textarea
      v-if="isEditing && isWide"
      class="focusClass"
      :value="value"
      @input="$emit('input', $event.target.value)"
      @blur="updateText"
      ref="input"
      rows="5"
    />
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    },
    isFocused: {
      type: Boolean,
      required: false
    },
    isWide: {
      type: Boolean,
      required: false
    },
    type: {
      type: String,
      required: true
    }

  },
  data() {
    return {
      isEditing: false,
    }
  },
  created() {
    if (this.isFocused) {
      this.focusInput()
    }
  },

  methods: {
    updateText() {
      this.isEditing = false;
      this.$emit('inputBlur');
    },
    test(ev) {
      const reg = /^\s+$/; // regex whitespace 
      const txt = ev.target.value;
      if (reg.test(txt) || txt === '') {
        this.$emit('input', this.value);
      } else {
        this.$emit('input', txt);
      }
    },
    handleKey(ev) {
      if (this.isWide) return;
      if (ev.keyCode === 13) {
        console.log('yes youre dumb');
        this.isEditing = false;
        this.$emit('textSubmitted');
      }
    },
    focusInput() {
      if (!this.isEditing) {
        this.isEditing = true;
        this.$nextTick(() => {
          this.$refs.input.focus();
        })
      }
    }
  },
  mounted() {
    document.addEventListener('keydown', this.handleKey);
  },
  destroyed() {
    document.removeEventListener('keydown', this.handleKey);
  },
  watch: {
    'isFocused'() {
      if (this.isFocused) {
        this.focusInput()
      }
    }
  }
}
</script>
<style lang="scss">
.text-editor-wrapper {
  width: 100%;
}
.module-text {
  padding: 10px;
  overflow: hidden;
  overflow-wrap: anywhere;
  white-space: break-spaces;
  &:hover {
    cursor: text;
  }
}
.focusClass {
  resize: none;
  width: 90%;
  padding: 10px;
  font-family: inherit;
  font-size: inherit;
  border: none;
  &:focus {
    background: #fff;
    border: 0;
    box-shadow: inset 0 0 0 2px #0079bf;
  }
}
</style>

