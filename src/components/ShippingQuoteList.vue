<template>
  <div class="container-cotacao">
    <div
      class="shipping-table"
      v-if="filteredShippingServices && filteredShippingServices.length"
    >
      <CardQuoteItem
        v-for="(service, index) in filteredShippingServices"
        :key="index"
        :service="service"
      />
    </div>
  </div>
</template>

<script>
import CardQuoteItem from "./CardQuoteItem.vue";

export default {
  components: {
    CardQuoteItem,
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

.container-tab-header {
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
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
}
</style>
