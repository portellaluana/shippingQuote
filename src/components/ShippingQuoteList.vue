<template>
  <div class="container-cotacao">
    <div>
      <table
        class="shipping-table"
        v-if="filteredShippingServices && filteredShippingServices.length"
      >
        <thead>
          <tr>
            <th>Transportadora</th>
            <th>Serviço</th>
            <th>Prazo</th>
            <th>Preço</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(service, index) in filteredShippingServices" :key="index">
            <td>{{ service.Carrier }}</td>
            <td>{{ service.ServiceDescription }}</td>
            <td>{{ service.DeliveryTime }} dias</td>
            <td>R$ {{ service.ShippingPrice }}</td>
            <td><BaseButton class="secondary-btn">Escolher</BaseButton></td>
          </tr>
        </tbody>
      </table>
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
