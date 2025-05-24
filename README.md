## Introdução

Este projeto é uma aplicação front-end para cotação de fretes utilizando a API da Frenet, com funcionalidades adicionais para melhorar a experiência do usuário e otimizar o processo de cotação. A aplicação foi desenvolvida com **Vue.js**, **JavaScript**, **HTML** e **CSS**. A principal proposta é facilitar a cotação de fretes, com foco em performance, usabilidade e boas práticas de desenvolvimento.

## Estrutura do Projeto

O projeto está organizado da seguinte forma:

```
shipping-quote/
├── public/
│   ├── assets/             # Ícones e outros recursos estáticos
├── src/
│   ├── api/                # Consumos das APIs (Frenet, IBGE, Via Cep)
│   ├── assets/             # Ícones e imagens
│   ├── components/         # Componentes reutilizáveis (Input, Button, Form, etc.)
│   ├── service/            # Lógicas de manipulação e integração das APIs
│   ├── utils/              # Funções auxiliares (EventBus, Formatação, Validações)
│   ├── App.vue             # Componente raiz
│   ├── main.js             # Ponto de entrada da aplicação
├── README.md               # Documentação do projeto
├── package.json            # Dependências e scripts
└── ...
```

---

## Tecnologias Utilizadas

- **Vue.js**: Framework JavaScript para construção da interface.
- **JavaScript (ES6+)**: Linguagem principal utilizada.
- **HTML5 e CSS3**: Base para a estrutura e estilização.
- **Axios**: Biblioteca para realizar requisições HTTP.

---

## Funcionalidades

### 1. **Cotação de Frete**

Formulário interativo para preencher os dados necessários para a cotação, incluindo:

- CEP de origem e destino
- Peso do produto
- Dimensões do produto
- Valor declarado
- Consumo da API da Frenet para calcular o frete com base nos dados informados.
- Exibição dos resultados de cotação com informações detalhadas sobre os valores e prazos.

### 2. **Busca de CEP e Cidades**

- Consumo da API do ViaCEP para buscar informações de CEPs.
- Utilização da API do IBGE para buscar informações sobre estados e cidades.
- Validação de CEPs e apresentação de mensagens de erro caso o CEP seja inválido.

### 3. **Validações de Formulário**

Validação de campos obrigatórios e formatos, incluindo:

- Validação de campos numéricos (peso, valores).
- Validação do formato de CEP e dados de dimensões.
- Validação do valor declarado.
- Feedback visual com cores indicando sucesso ou erro.

### 4. **Componentes Reutilizáveis**

- Componentes como Button e Input foram criados para garantir a reutilização e modularização da aplicação.
- O Button e Input são genéricos e podem ser reutilizados em diversas partes da aplicação.

### 4. **Cache de Resultados de CEP**

- Implementação de cache para armazenar os CEPs pesquisados, com um mecanismo de limpeza a cada 24 horas.
- Isso evita consultas repetidas à API e melhora a performance, além de reduzir a carga nas APIs externas.

### 4. **Feedback para o Usuário**

- Criação de toasts (mensagens temporárias) de sucesso, erro, informação e alerta, proporcionando uma melhor experiência ao usuário.
- Feedback visual em tempo real com cores dependendo da validação dos campos.

## Decisões de Arquitetura

### 1. **Organização Modular**

- Estrutura do projeto separada por responsabilidades: APIs, componentes, serviços e utilitários, promovendo a escalabilidade e a manutenção.

### 2. **Componentização**

- Componentes reutilizáveis, como Input e Button, foram desenvolvidos para facilitar a manutenção e reutilização do código, promovendo a consistência na interface.

### 3. **Validações e Feedbacks**

- Validações em tempo real nos campos do formulário, com feedback imediato para o usuário, tornando o processo mais fluido e intuitivo.

### 4. **Armazenamento de Cache**

- Utilização de um sistema de cache para evitar chamadas repetidas à API de CEP, otimizando a performance e a experiência do usuário.

---

## Demonstração do Projeto

**Tela de cotação e buscar CEP**
![Cotação](/public/preview-mobile.png)
![Buscar CEP](/public/buscar-cep-mobile.png)

---

## Configuração e Execução do Projeto

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/seu-usuario/shipping-quote.git
   ```

2. **Instale as dependências**:

   ```bash
   npm install
   ```

3. **Inicie o projeto Vue**:

   ```bash
   npm run serve
   ```
