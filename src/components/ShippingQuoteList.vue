<template>
  <div v-if="shippingServices.length" class="container-cotacao">
    <h2>Últimas Cotações de Frete</h2>
    <div>
      <ul
        class="shipping-list"
        :style="{
          maxHeight: shippingServices.length >= 3 ? '100px' : 'auto',
          overflowY: shippingServices.length >= 3 ? 'auto' : 'visible',
        }"
      >
        <li
          v-for="(service, index) in shippingServices"
          :key="service.id"
          :class="{ 'bg-white': index % 2 === 0, 'bg-gray': index % 2 !== 0 }"
        >
          {{ index + 1 }}. {{ service.index }} ORIGEM:
          <span>
            {{ localShippingData[index]?.SellerCEP || "Não disponível" }}
          </span>
          DESTINO:
          <span>
            {{ localShippingData[index]?.RecipientCEP || "Não disponível" }}
          </span>
          ENVIO:
          <span>
            {{ service.ServiceDescription }}
          </span>
          VALOR:
          <span> R$ {{ service.ShippingPrice }} </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    shippingServices: {
      type: Array,
      required: true,
    },
    shippingData: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      localShippingData: [],
    };
  },
  created() {
    this.handleData();
  },

  watch: {
    shippingServices: {
      handler() {
        this.handleData();
      },
      deep: true,
    },
    shippingData: {
      handler() {
        this.handleData();
      },
      deep: true,
    },
  },

  methods: {
    handleData() {
      const storedData = JSON.parse(localStorage.getItem("shippingData")) || [];
      if (storedData.length > 0) {
        this.localShippingData = storedData;
      } else {
        this.localShippingData = [];
      }
      console.log("data: ", this.localShippingData);
    },
  },
};
</script>

<style scoped>
h2 {
  text-align: left;
  margin: 0;
  font-size: 16px;
}

.container-cotacao {
  display: block;
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
  font-size: 14px;
  margin-bottom: 8px;
  padding: 8px;
}

span {
  font-weight: 600;
}

.bg-white {
  background-color: white;
}

.bg-gray {
  background-color: #f0f0f0;
}
</style>
