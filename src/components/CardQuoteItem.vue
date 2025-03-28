<template>
  <div class="card-quote-item">
    <img
      v-if="service.ServiceDescription"
      :src="getImageUrl(service.ServiceDescription)"
      :alt="service.ServiceDescription"
      class="service-image"
    />

    <p class="prazo">
      <span>Prazo de </span>
      {{ service.DeliveryTime }}
      {{ service.DeliveryTime > 1 ? "dias" : "dia" }}
    </p>
    <p class="preco">R$ {{ service.ShippingPrice }}</p>
    <BaseButton class="primary-btn">Escolher</BaseButton>
  </div>
</template>

<script>
import BaseButton from "./BaseButton.vue";

export default {
  components: {
    BaseButton,
  },
  props: {
    service: {
      type: Object,
      required: true,
    },
  },
  methods: {
    getImageUrl(serviceDescription) {
      const imageName = serviceDescription.replace(/\s+/g, "-") + ".png";
      return `/images/${imageName}`;
    },
  },
};
</script>

<style scoped>
.card-quote-item {
  display: flex;
  flex-direction: column;
  padding: 16px;
  margin-bottom: 10px;
  border: 1px solid #c8c8c8;
  border-radius: 8px;
  align-items: center;
  padding: 24px;
  gap: 4px;
}

.card-quote-item p {
  margin: 4px 0;
  font-weight: 600;
}

.service-image {
  width: 100px;
  height: auto;
  margin-bottom: 8px;
}

.primary-btn {
  margin: 0;
}

.prazo span {
  font-weight: 400;
}

.preco {
  color: #3c4151;
  font-weight: 800;
  font-size: 16px;
}
</style>
