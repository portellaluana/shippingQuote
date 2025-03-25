import apiFrenet from "@/api/frenet";
import apiCep from "@/api/ibgeCep";
import apiViaCep from "@/api/viaCep";

function isCacheValid(timestamp) {
  const CACHE_EXPIRATION_TIME_24_HOURS = 1000 * 60 * 60 * 24;
  // const CACHE_EXPIRATION_TIME_10_SECONDS = 10000;
  const currentTime = new Date().getTime();
  const cacheAge = currentTime - timestamp;

  return cacheAge < CACHE_EXPIRATION_TIME_24_HOURS;
}

export const getCepInfo = (cep) => {
  const cepKey = `cep-${cep}`;
  const cachedData = localStorage.getItem(cepKey);

  if (cachedData) {
    const parsedData = JSON.parse(cachedData);

    if (isCacheValid(parsedData.timestamp)) {
      return Promise.resolve(parsedData.data);
    } else {
      localStorage.removeItem(cepKey);
    }
  }

  return apiFrenet
    .get(`/CEP/Address/${cep}`)
    .then((response) => {
      const cacheData = {
        timestamp: new Date().getTime(),
        data: response.data,
      };
      localStorage.setItem(cepKey, JSON.stringify(cacheData));
      return response.data;
    })
    .catch((error) => {
      console.error("Erro na requisição de CEP:", error);
      throw error;
    });
};

export const getCidades = (estado) => {
  return apiCep
    .get(`/api/v1/localidades/estados/${estado}/municipios`)
    .then((response) => response.data || [])
    .catch((error) => {
      console.error("Erro na requisição:", error);
      return [];
    });
};

export const getCep = (estado, cidade, rua) => {
  return apiViaCep
    .get(`/${estado}/${cidade}/${rua}/json/`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Erro na requisição de CEP:", error);
      throw error;
    });
};
