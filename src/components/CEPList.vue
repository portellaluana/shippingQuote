<template>
  <ul
    :style="
      cepInfo.length >= 3 ? { 'max-height': '215px', 'overflow-y': 'auto' } : {}
    "
  >
    <li
      v-for="(info, index) in cepInfo"
      :key="index"
      :style="cepInfo.length >= 3 ? { 'margin-right': '16px' } : {}"
    >
      <div>
        <div>
          <h4>{{ info.cep }}</h4>
        </div>
        <p>{{ info.logradouro }}</p>
        <p>
          <span>{{ info.bairro }}, {{ info.localidade }}/{{ info.uf }}</span>
        </p>
      </div>
      <BaseButton
        type="submit"
        class="copy-button"
        @click.prevent="copyCep(info.cep)"
      />
    </li>
  </ul>
</template>

<script>
import BaseButton from "./BaseButton.vue";
export default {
  components: {
    BaseButton,
  },
  props: {
    cepInfo: {
      type: Array,
      required: true,
      default: () => [],
    },
    cepData: {
      type: String,
      required: true,
    },
  },
  methods: {
    copyCep(info) {
      const cep = String(info).replace("-", "");
      navigator.clipboard.writeText(cep);

      this.$emit("close-modal");
    },
  },
};
</script>

<style scoped>
ul {
  padding: 0;
  margin: 0 0 16px 0;
  list-style: none;
}

ul::-webkit-scrollbar {
  width: 8px;
}

ul::-webkit-scrollbar-thumb {
  background-color: #028ecc;
  border-radius: 10px;
}

ul::-webkit-scrollbar-thumb:hover {
  background-color: #028ecc;
}

ul::-webkit-scrollbar-track {
  background-color: #f1f1f1;
  border-radius: 10px;
}

li {
  display: flex;
  justify-content: space-between;
  text-align: left;
  border-bottom: 1px solid #02aeef;
  padding: 16px 8px 16px 0;
  align-items: center;
}

li:last-child {
  border-bottom: none;
}

h4 {
  margin: 0;
}

p {
  font-size: 12px;
  margin: 0;
}

p span {
  color: grey;
}

.copy-button {
  width: 16px;
  height: 16px;
  background-image: url("@/assets/copy.png");
  background-size: cover;
  background-repeat: no-repeat;
  border: none;
  padding: 5px 0;
  cursor: pointer;
  background-color: transparent;
}
</style>
