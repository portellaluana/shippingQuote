<template>
  <div v-if="shippingServices.length" class="container-cotacao">
    <h2>Últimas Cotações de Frete</h2>
    <ul
      class="shipping-list"
      :style="{
        maxHeight: shippingServices.length > 5 ? '100px' : 'auto',
        overflowY: shippingServices.length > 5 ? 'auto' : 'visible',
      }"
    >
      <li v-for="(service, index) in shippingServices" :key="index">
        {{ index + 1 }}. {{ service.index }}{{ service.ServiceDescription }}: R$
        {{ service.ShippingPrice }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    shippingServices: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.container-cotacao {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
}

.shipping-list {
  padding: 0;
  max-height: 100px;
  overflow-y: auto;
  cursor: pointer;
}

.shipping-list::-webkit-scrollbar {
  width: 8px;
}

.shipping-list::-webkit-scrollbar-thumb {
  background-color: #028ecc;
  border-radius: 10px;
}

.shipping-list::-webkit-scrollbar-thumb:hover {
  background-color: #028ecc;
}

.shipping-list::-webkit-scrollbar-track {
  background-color: #f1f1f1;
  border-radius: 10px;
}

li {
  list-style: none;
  text-align: left;
}
</style>
