<template>
  <BaseToast ref="toast" />
  <div class="cep-search">
    <button class="close-icon" @click="closeModal" />
    <div class="container-uf-cidade">
      <div class="container-estado">
        <label for="estado">Estado (UF)*</label>
        <select
          v-model="estado"
          @change="fetchCidades(estado)"
          id="estado"
          required
        >
          <option value="">Selecione o Estado</option>
          <option v-for="uf in estados" :key="uf" :value="uf">{{ uf }}</option>
        </select>
      </div>

      <div class="container-cidade">
        <label for="cidade">Cidade*</label>
        <select
          v-model="cidade"
          :disabled="!estado"
          @change="fetchCepInfo"
          id="cidade"
          required
        >
          <option value="">Selecione a Cidade</option>
          <option
            v-for="cidade in cidades"
            :key="cidade.id"
            :value="cidade.nome"
          >
            {{ cidade.nome }}
          </option>
        </select>
      </div>
    </div>

    <div class="container">
      <label for="rua">Rua*</label>
      <BaseInput
        required
        v-model="rua"
        id="rua"
        @input="fetchCepInfo"
        placeholder="Digite o nome da rua"
      />
    </div>

    <CEPList
      v-if="cepInfo.length > 0"
      :cepInfo="cepInfo"
      @close-modal="closeModal"
    />

    <BaseButton type="submit" class="primary-btn" @click.prevent="fetchCep">
      Buscar CEP
    </BaseButton>

    <div v-if="errorMessage" class="error">
      <p>{{ errorMessage }}</p>
    </div>
  </div>
</template>


<script>
import { getCidades, getCep } from "@/services/cep";
import BaseButton from "./BaseButton.vue";
import CEPList from "./CEPList.vue";
import { estados } from "@/utils/estados";
import BaseInput from "./BaseInput.vue";
import BaseToast from "./BaseToast.vue";
import emitter from "@/utils/eventBus";

export default {
  components: {
    BaseButton,
    CEPList,
    BaseInput,
    BaseToast,
  },

  data() {
    return {
      estado: "",
      cidade: "",
      rua: "",
      cidades: [],
      cepInfo: [],
      errorMessage: "",
      estados,
      addToast: null,
    };
  },

  created() {
    emitter.on("register-toast", (addToastMethod) => {
      this.addToast = addToastMethod;
    });

    emitter.on("show-toast", (toastData) => {
      if (this.addToast) {
        this.addToast(toastData.type, toastData.title, toastData.message);
      }
    });
  },

  methods: {
    closeModal() {
      this.$emit("close-modal");
    },

    async fetchCidades(uf) {
      try {
        const cidadesResponse = await getCidades(uf);
        this.cidades = Array.isArray(cidadesResponse) ? cidadesResponse : [];
      } catch (error) {
        this.errorMessage = "Erro ao buscar as cidades. Tente novamente.";
        this.cidades = [];
      }
    },

    async fetchCep() {
      if (this.estado && this.cidade && this.rua) {
        try {
          const cepData = await getCep(this.estado, this.cidade, this.rua);
          if (Array.isArray(cepData) && cepData.length > 0) {
            this.cepInfo = cepData.map((item) => ({
              cep: item.cep,
              logradouro: item.logradouro,
              bairro: item.bairro,
              localidade: item.localidade,
              uf: item.uf,
            }));
          } else {
            this.errorMessage = "Nenhum CEP encontrado para essa busca.";
            this.cepInfo = [];
          }
        } catch (error) {
          if (error.response && error.response.status === 500) {
            if (this.addToast) {
              this.addToast("error", "Erro 500", "Tente novamente mais tarde.");
            }
          } else {
            if (this.addToast) {
              this.addToast(
                "error",
                "Erro na requisição de CEP",
                "Tente novamente mais tarde."
              );
            }
          }
        }
      }
    },

    handleEscKey(event) {
      if (event.key === "Escape") {
        this.closeModal();
      }
    },
  },

  mounted() {
    document.addEventListener("keydown", this.handleEscKey);
  },

  beforeUnmount() {
    document.removeEventListener("keydown", this.handleEscKey);
  },
};
</script>

<style scoped>
.container {
  width: 100%;
}

label {
  font-size: 11px;
  margin: 0;
  margin-bottom: 4px;
  text-align: left;
}
.filter {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
}
.cep-search {
  background-color: white;
  padding: 22px;
  border-radius: 8px;
  width: 100%;
  max-width: 900px;
  max-height: 80vh;
  overflow-y: auto;
  z-index: 99;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.primary-btn {
  margin-top: 8px;
}

label {
  display: block;
  margin-bottom: 8px;
}

input,
select {
  background: #f1f5f9;
  border-radius: 4px;
  border: none;
  padding: 8px;
  font-size: 14px;
  outline: none;
  color: #3c4151;
  width: 100%;
  margin-bottom: 16px;
}

input {
  box-sizing: border-box;
}

input:focus,
select:focus {
  outline: 1px solid #02aeef;
}

.error {
  color: #3c4151;
  font-weight: 400;
  font-size: 14px;
}

.close-icon {
  width: 12px;
  height: 12px;
  background-image: url("@/assets/close-icon.png");
  background-size: cover;
  background-repeat: no-repeat;
  border: none;
  top: 8px;
  padding: 5px 0;
  cursor: pointer;
  border-radius: 5px;
  background-color: transparent;
  opacity: 0.5;
  display: flex;
  justify-self: end;
  margin-bottom: 8px;
}
.container-estado,
.container-cidade {
  width: 50%;
}
.container-uf-cidade {
  display: flex;
  justify-content: space-between;
  gap: 8px;
}
@media (max-width: 940px) {
  .cep-search {
    background-color: white;
    padding: 22px;
    border-radius: 8px;
    width: 80%;
    max-width: 600px;
    max-height: 80vh;
    overflow-y: auto;
    z-index: 2;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .container-uf-cidade {
    display: inline-flex;
    flex-direction: column;
    width: 100%;
  }
  .container-estado,
  .container-cidade {
    width: 100%;
  }
}
</style>
