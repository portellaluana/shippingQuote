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

    <div class="error-message">
      <p v-if="isRequiredError">Campo obrigatório</p>

      <p v-if="validateLength && isLengthError">Digite ao menos 3 caracteres</p>
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

    validateLength: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isRequiredError: false,
      isLengthError: false,
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

      if (this.validateLength) {
        this.validateLengthError();
      }
    },
    handleFocus(event) {
      if (this.onFocus) {
        this.onFocus(event);
      }

      this.isRequiredError = false;
      this.isLengthError = false;
    },
    handleInput(event) {
      if (this.onInput) {
        this.onInput(event);
      }

      this.$emit("update:modelValue", event.target.value);

      if (this.validateLength) {
        this.validateLengthError();
      }
    },
    handleKeydown(event) {
      if (this.type === "number" && event.key === "Enter") {
        console.log("Enter pressionado!");
      }
    },
    validateLengthError() {
      this.isLengthError = this.modelValue.length < 3;
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
  text-align: left;
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
  outline: 1px solid #02aeef;
}

.error-message {
  color: #ff355a;
  font-size: 11px;
  margin: 0 !important;
}
</style>
