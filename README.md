# Movimenta

Plataforma web para estruturar planos de movimentação de cargas.

## Escopo do MVP

O usuário escolhe uma das duas modalidades:

- **Guindastes móveis:** guindaste telescópico sobre pneus, Munck/guindauto e, como opção de cadastro, guindaste sobre esteiras.
- **Guindastes fixos:** ponte rolante, pórtico rolante, guindaste de coluna e guindaste de parede.

O fluxo inicial contempla identificação do projeto, cadastro da carga, condições da operação, revisão dos dados e impressão do resumo em PDF pelo navegador.

## Tecnologias

- React + TypeScript
- Vite
- Lucide React

## Executar localmente

Requer Node.js 20 ou superior.

```bash
npm install
npm run dev
```

Para validar a compilação:

```bash
npm run build
```

## Estado atual e segurança de engenharia

Esta versão é um **protótipo de fluxo e coleta de dados**. Ainda não implementa dimensionamento, cálculo de capacidade, estabilidade, seleção automática de acessórios ou validação estrutural. O relatório é um resumo preliminar dos dados fornecidos pelo usuário, não um plano liberado para execução.

A evolução do motor de engenharia deverá ser feita por módulos separados para equipamentos móveis e fixos, com premissas explícitas, rastreabilidade, dados de fabricantes, referências normativas aplicáveis e testes técnicos. Qualquer plano utilizado em campo deverá ser analisado e validado por profissional legalmente habilitado, considerando a documentação do equipamento e as condições reais da operação.

## Próximas entregas sugeridas

1. Modelagem persistente de projetos e equipamentos.
2. Catálogo de equipamentos e documentação técnica.
3. Módulo de cálculo e verificações para guindastes móveis.
4. Módulo de cálculo e verificações para guindastes fixos.
5. Desenhos esquemáticos e relatório técnico versionado.
6. Autenticação, histórico e gestão de clientes.
