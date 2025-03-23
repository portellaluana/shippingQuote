<template>
  <input
    v-bind="$attrs"
    :value="modelValue"
    :type="type"
    :class="inputClass"
    :id="id"
    :placeholder="placeholder"
    :maxlength="maxlength"
    :v-mask="mask"
    @blur="handleBlur"
    @focus="handleFocus"
    @input="handleInput"
  />
</template>
  
  <script>
export default {
  name: "BaseInput",
  props: {
    modelValue: {
      type: [String, Number],
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    inputClass: {
      type: String,
      default: "",
    },
    id: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: "",
    },
    maxlength: {
      type: Number,
      default: null,
    },
    mask: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    onFocus: {
      type: Function,
      default: null,
    },
    onBlur: {
      type: Function,
      default: null,
    },
    onInput: {
      type: Function,
      default: null,
    },
  },
  methods: {
    handleBlur(event) {
      if (this.onBlur) {
        this.onBlur(event);
      }
    },
    handleFocus(event) {
      if (this.onFocus) {
        this.onFocus(event);
      }
    },
    handleInput(event) {
      if (this.onInput) {
        this.onInput(event);
      }

      // Emitindo o evento para atualizar o v-model
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>
  
  <style scoped>
input {
  background: #f1f5f9;
  border-radius: 4px;
  border: none;
  padding: 8px;
  font-size: 14px;
  outline: none;
  color: #3c4151;
  width: 100%;
}
input {
  box-sizing: border-box;
}
input:focus,
select:focus {
  outline: 1px solid #028ecc;
}
input[type="number"].valor::placeholder {
  text-align: left;
}
@media (min-width: 768px) {
  .input-small {
    width: 82%;
  }
}
</style>
  