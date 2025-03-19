<template>
  <div class="container-cotacao">
    <div
      class="shipping-table"
      v-if="filteredShippingServices && filteredShippingServices.length"
    >
      <div class="container-tab-header">
        <h6>Transportadora</h6>
        <h6>Serviço</h6>
        <h6>Prazo</h6>
        <h6>Preço</h6>
        <h6></h6>
      </div>

      <div
        v-for="(service, index) in filteredShippingServices"
        :key="index"
        class="tab-lines"
      >
        <p>{{ service.Carrier }}</p>
        <p>{{ service.ServiceDescription }}</p>
        <p>{{ service.DeliveryTime }} dias</p>
        <p>R$ {{ service.ShippingPrice }}</p>
        <BaseButton class="secondary-btn">Escolher</BaseButton>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from "./BaseButton.vue";

export default {
  components: {
    BaseButton,
  },
  props: {
    shippingServices: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  computed: {
    filteredShippingServices() {
      return this.shippingServices.filter(
        (service) => "DeliveryTime" in service && "ShippingPrice" in service
      );
    },
  },
};
</script>

<style scoped>
.container-cotacao {
  display: block;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
}

.container-tab-header,
.tab-lines {
  display: flex;
  background-color: #f1f5f9;
  justify-content: space-between;
  padding: 0 16px;
}

h6 {
  font-size: 12px;
}

.shipping-table {
  width: 100%;
  border-collapse: collapse;
}

.shipping-table th,
.shipping-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #c8c8c8;
}

.shipping-table th {
  background-color: #f1f5f9;
  color: #3c4151;
}

.shipping-table td {
  font-weight: 600;
}

.shipping-table th {
  border-bottom: none;
}

.shipping-table tr:last-child td {
  border-bottom: none;
}

.shipping-table tr:nth-child(even) {
  background-color: transparent;
}

.shipping-table tbody tr:hover {
  background-color: transparent;
}

.secondary-btn {
  cursor: pointer;
}
</style>
