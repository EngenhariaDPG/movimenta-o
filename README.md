# Movimenta

Workspace web para estruturar planos de movimentação de cargas.

## Escopo inicial

O usuário escolhe uma das duas modalidades:

- **Guindastes móveis:** guindaste telescópico sobre pneus, Munck/guindauto e guindaste sobre esteiras.
- **Guindastes fixos:** ponte rolante, pórtico rolante, guindaste de coluna e guindaste de parede.

## O que já está implementado

- Dashboard com indicadores e lista de planos recentes.
- Navegação entre visão geral, planos e biblioteca de categorias de equipamentos.
- Assistente de criação de plano em cinco etapas.
- Cadastro de projeto, equipamento, carga, dimensões e condições da operação.
- Revisão das informações e criação de registros.
- Persistência local dos projetos no navegador (`localStorage`).
- Interface responsiva para desktop e dispositivos móveis.
- Visualização de detalhes e impressão do resumo.

Os três registros iniciais do dashboard são exemplos demonstrativos. Novos planos criados pelo usuário ficam salvos no navegador utilizado.

## Tecnologias

- React 18 + TypeScript
- Vite
- Lucide React

## Executar localmente

Requer Node.js 20 ou superior.

```bash
git clone https://github.com/muitozika12/movimenta-o.git
cd movimenta-o
npm install
npm run dev
```

Para validar a compilação de produção:

```bash
npm run build
```

## Limites técnicos desta versão

Esta entrega é a camada de interface e fluxo de cadastro. Ainda **não** implementa dimensionamento, cálculo de capacidade, estabilidade, seleção automática de acessórios, análise de cargas transmitidas à estrutura ou validação de tabelas de carga.

A próxima fase deve incluir banco de dados persistente, cadastro de modelos e documentação de fabricantes, motor de engenharia separado para equipamentos móveis e fixos, testes técnicos e geração de relatório técnico versionado.

Qualquer plano utilizado em campo deverá ser analisado e validado por profissional legalmente habilitado, considerando documentação do equipamento, referências normativas aplicáveis e condições reais da operação.
