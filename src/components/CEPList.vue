<template>
  <ul>
    <li v-for="(info, index) in cepInfo" :key="index">
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
        class="primary-btn primary-btn-text"
        @click.prevent="onUseCep(info.cep)"
      >
        Usar CEP
      </BaseButton>
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
    },
    cepData: {
      type: String,
      required: true,
    },
  },
  methods: {
    onUseCep(info) {
      const cep = String(info);
      this.$emit("use-cep", cep);
      console.log(cep);
    },
  },
};
</script>
<style scoped>
ul {
  padding: 0;
  margin: 0;
}
li {
  list-style: none;
  display: flex;
  justify-content: space-between;
  text-align: left;
  border-bottom: 1px solid #02aeef;
  padding: 16px 0;
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
</style>