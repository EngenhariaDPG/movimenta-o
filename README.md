# Movimenta

Ferramenta web gratuita, sem login e sem cadastro, para auxiliar na elaboração de planos de movimentação e içamento de cargas. O fluxo foi pensado como uma calculadora/assistente: entrar, preencher os dados da operação, revisar e imprimir ou salvar o documento em PDF.

## Fluxo e informações solicitadas

1. **Identificação da operação:** contratante, local, data, responsável, modalidade e equipamento.
2. **Caracterização da carga:** peso e origem do dado, dimensões, centro de gravidade, pontos de içamento e capacidade dos olhais.
3. **Equipamento:** fabricante, modelo, série, capacidade aplicável à configuração, referência e página da tabela de carga, raio, lança, ângulo, contrapeso, patolamento/esteiras, reeving e moitão.
4. **Rigging:** pesos dos acessórios e dispositivos sob gancho, lingadas, número de pernas, WLL, ângulo, manilhas, balancins e inspeções.
5. **Local e ambiente:** altura, percurso, solo/estrutura, capacidade de suporte, placas de apoio, nivelamento, vento, clima, redes elétricas, obstáculos e isolamento.
6. **Segurança e execução:** equipe, sinaleiro, comunicação, EPIs/EPCs, perigos, controles, inspeções, documentos e emergência.
7. **Revisão:** resumo da operação, checklist de verificação e geração de documento via impressão do navegador (Salvar como PDF).

## Verificações automáticas atualmente disponíveis

- Soma informativa do peso da carga, moitão, acessórios e dispositivo sob gancho.
- Comparação percentual entre a carga total informada e a capacidade inserida manualmente pelo usuário para a configuração consultada.
- Estimativa teórica simplificada da tração por perna de lingada, quando informado o número de pernas e o ângulo com a horizontal.

Essas contas são **preliminares e não constituem dimensionamento ou validação de içamento**. A capacidade precisa ser obtida na tabela/manual do fabricante para a configuração, raio, setor e condições reais. A estimativa de lingada não contempla distribuição desigual, assimetria, fatores dinâmicos, redução por configuração ou critérios específicos de seleção.

## Privacidade e armazenamento

- Não há login, conta, cadastro, painel de usuário ou backend.
- Os dados são mantidos apenas no estado da página enquanto ela estiver aberta.
- O projeto não envia os dados preenchidos a um servidor. Ao sair ou atualizar a página, os dados são perdidos.
- Para guardar o documento, use **Gerar / salvar PDF** e salve localmente.

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
npm run build
```

## Limites técnicos e responsabilidade

Esta versão é uma ferramenta de coleta, organização e verificações aritméticas preliminares. **Não** consulta automaticamente tabelas de carga, não calcula curvas de capacidade, estabilidade, reações de patolas, pressão no solo, resistência estrutural, esforços nos olhais, dimensionamento de lingadas, efeitos dinâmicos ou interferências. Também não verifica automaticamente normas, manuais, certificados ou documentos enviados.

O documento gerado é um rascunho organizado para análise. Não é certificado de segurança nem autorização para içar. Toda operação deve ser avaliada nas condições reais, com documentação e dados do fabricante, análise de risco, procedimentos e validação/aprovação pelos profissionais legalmente habilitados e responsáveis pela operação. Campos em branco e checklists não substituem evidência técnica.
