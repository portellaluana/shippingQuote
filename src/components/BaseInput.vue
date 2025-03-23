<template>
  <div class="container-input">
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
      @keydown="handleKeydown"
    />

    <div v-if="isRequiredError" class="error-message">
      <p>Campo obrigatório</p>
    </div>
  </div>
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
    required: {
      type: Boolean,
      default: false,
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
  data() {
    return {
      isRequiredError: false,
    };
  },
  methods: {
    handleBlur(event) {
      if (this.onBlur) {
        this.onBlur(event);
      }

      if (this.required && !this.modelValue) {
        this.isRequiredError = true;
      } else {
        this.isRequiredError = false;
      }
    },
    handleFocus(event) {
      if (this.onFocus) {
        this.onFocus(event);
      }

      this.isRequiredError = false;
    },
    handleInput(event) {
      if (this.onInput) {
        this.onInput(event);
      }

      this.$emit("update:modelValue", event.target.value);
    },
    handleKeydown(event) {
      if (this.type === "number" && event.key === "Enter") {
        console.log("Enter pressionado!");
      }
    },
  },
};
</script>
  
  <style scoped>
.container-input {
  width: 100%;
}
p {
  margin: 4px 0 0 0;
}
input {
  background: #f1f5f9;
  border-radius: 4px;
  border: none;
  padding: 8px;
  font-size: 14px;
  outline: none;
  color: #3c4151;
  font-size: 12px;
  width: -webkit-fill-available;
}

input:focus {
  outline: 2px solid #028ecc;
}

.error-message {
  color: red;
  font-size: 12px;
  opacity: 0.5;
  margin: 0 !important;
}

#rua {
  margin-bottom: 8px;
}
</style>
  