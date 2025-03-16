<template>
  <div v-if="trackingEvents.length" class="tracking-events-container">
    <h2>Busca do rastreamento</h2>
    <ul class="tracking-events-list">
      <li
        v-for="(event, index) in trackingEvents"
        :key="index"
        :class="{ 'bg-white': index % 2 === 0, 'bg-gray': index % 2 !== 0 }"
      >
        <span>
          {{ event.EventDateTime }}
        </span>
        {{ event.EventDescription }}
      </li>
    </ul>
  </div>
</template>
  
  <script>
export default {
  props: {
    trackingEvents: {
      type: Array,
      required: true,
    },
  },
};
</script>
  
  <style scoped>
.tracking-events-container {
  padding: 20px;
  border-radius: 8px;
}

h2 {
  text-align: left;
  font-size: 16px;
  margin-bottom: 10px;
}

.tracking-events-list {
  padding: 0;
  max-height: 200px;
  overflow-y: auto;
}

.tracking-events-list::-webkit-scrollbar {
  width: 8px;
}

.tracking-events-list::-webkit-scrollbar-thumb {
  background-color: #028ecc;
  border-radius: 10px;
}

.tracking-events-list::-webkit-scrollbar-track {
  background-color: #f1f1f1;
}

li {
  list-style: none;
  text-align: left;
  font-size: 14px;
  margin-bottom: 8px;
  padding: 8px;
}
li:not(:last-child) {
  border-bottom: 1px solid #f0f0f0;
}

span {
  font-weight: 500;
}
</style>
  