<template>
  <div class="input-wrapper" :class="classe">
    <label>{{ label }}</label>
    <input
      :type="type"
      :placeholder="placeholder"
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  props: {
    value: String,
    label: String,
    classe: String,
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped>
.input-wrapper {
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 100%;
  align-self: end;
}

label {
  font-size: 12px;
  margin: 8px 0 4px 0;
}

input {
  background: #f1f5f9;
  border-radius: 4px;
  border: none;
  padding: 8px;
  font-size: 14px;
  outline: none;
}

input:focus {
  outline: 1px solid #028ecc;
}

.normal {
  margin-bottom: 8px;
}
@media (max-width: 768px) {
  input {
    font-size: 12px;
  }
  .small {
    width: 48%;
  }
  label {
    font-size: 10px;
  }
}

@media (min-width: 768px) {
  .small {
    width: 48%;
  }
}

@media (min-width: 1080px) {
  .small {
    width: 20%;
  }
}
</style>
