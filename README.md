# Teste Técnico - Desenvolvedor Frontend (ASP.NET MVC, Vue.js, React Native)

## Descrição do Teste

Bem-vindo ao teste técnico para a posição de Desenvolvedor Frontend! O objetivo deste desafio é avaliar suas habilidades na criação de interfaces Web e Mobile integradas à API REST da Frenet.

Para realizar esse teste você tem a opção de desenvolver **uma aplicação web** utilizando Vue.

As aplicação devem permitir a cotação de frete utilizando a API da Frenet disponível em: [Frenet API Docs](https://frenetapi.docs.apiary.io/#reference/shipping/shippingquote/post).

## Requisitos

### 1. Funcionalidades Obrigatórias

- Criar um formulário contendo os seguintes campos:
  - CEP de origem (`cep_origin`)
  - CEP de destino (`cep_destination`)
  - Peso do produto (kg) (`weight`)
  - Largura (cm) (`width`)
  - Altura (cm) (`height`)
  - Comprimento (cm) (`length`)
  - Valor declarado (`declared_value`)
- Enviar os dados para a API e exibir os resultados da cotação em tela.

### 2. Diferenciais

Fique à vontade para ir além do que foi listado como obrigatório e refinar a solução apresentada, seja na experiência final, seja na questão técnica. Alguns exemplos:

- Implementação de testes unitários.
- Melhorias na interface utilizando boas práticas de UX/UI.
- Persistência do histórico de cotações utilizando local storage (Web) e AsyncStorage (Mobile).
- Bibliotecas de gerenciamento de estado.
- Cache para evitar requisições repetidas dentro de um intervalo de tempo.
- ....

## Tecnologias Esperadas

- **Web**: Vue
- **Versionamento de código**: Git

## Como Submeter o Teste

1. Crie um repositório Git público para seu código.
2. Coloque esse README na raiz.
3. Desenvolva a aplicação documentando seu progresso através de commits.
4. Atualize este README com instruções claras de como rodar os projetos.
5. Envie o link do repositório para avaliação.

## Critérios de Avaliação

- **Qualidade do código**: organização, boas práticas e padrões.
- **Estrutura do projeto**: organização e modularização do código.
- **Uso correto da API**: implementação correta da integração.
- **Experiência do usuário**: layout intuitivo e responsivo.
- **Desempenho e otimizações**: caching, debounce em requisições, etc.

Se tiver dúvidas, fique à vontade para perguntar!

Boa sorte! 🚀

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
   npm run dev
   ```

4. **Acesse no navegador**:

   ```bash
   http://localhost:8080
   ```
