<template>
  <div class="input-wrapper">
    <label>{{ label }}</label>
    <input
      :type="type"
      :placeholder="placeholder"
      :value="value"
      :class="classe"
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
  font-size: 14px;
  margin: 16px 0 4px 0;
}

input {
  background: #f1f5f9;
  border-radius: 4px;
  border: none;
  padding: 8px;
  font-size: 14px;
  outline: none;
}

.small {
  width: 90%;
}

input:focus {
  outline: 1px solid #028ecc;
}

@media (max-width: 768px) {
  input {
    font-size: 12px;
  }
  .small {
    width: 95%;
  }
}

@media (min-width: 768px) {
  .small {
    width: 86%;
  }
}
@media (min-width: 1080px) {
  .small {
    width: 90%;
  }
}
</style>
