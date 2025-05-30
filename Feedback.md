# Feedback

Este arquivo é para descrever sobre as minhas decisões, opiniões e sugestões durante o decorrer do desenvolvimento do desafio.

## First day

Apesar do desafio ser FullStack escolhi priorizar a área de backend, por mais afinidade. Além disso, preferi usar o boilerplate da Woovi[https://github.com/woovibr/woovi-playground] para começar os trabalhos embora pareça a decisão mais "fácil", com o tempo ela torna-se a mais complexa, visto que você precisa entender o código, é uma habilidade pouca falada, os programadores passam muito tempo **lendo** código, tentando entender o funcionamento do programa, e quanto menos familiaridade com as ferramentas usadas, mais longo é o tempo de adaptação. Outro motivo, é que no meu entendimento, a Woovi já possue um código, já é uma startup de mais de 3 anos, então, eles já tem um código, uma base, um bom costume, dessa forma, ao entrar na empresa, eu vou estar mais acostumado com os padrões de commit, ferramentas utilizadas e arquitetura empregada no código. E, principalmente, vou estar aprimorando a minha habilidade de ler código!

Durante o primeiro dia, você descobre ferramentas e padrões utilizados que você não entende, não vê sentido, vale apena perguntar por que essas decisões, no entanto, me parece uma pergunta prematura, visto que a decisão dessas ferramentas e de arquitetura elas _dependem_ de um contexto, e numa startup assim como outros negócios no Brasil, o contexto maior é fazer dinheiro, a maior preocupação do primeiro dia é ter um cliente, e do segundo dia, é manter o primeiro cliente e fazer ele compartilhar a sua solução com outros clientes, no terceiro dia você precisa conseguir ter dois clientes e assim vai. Se eu fosse resumir, seria, a sua maior preocupação do primeiro dia é sobreviver até o segundo dia, e no segundo sobreviver até o terceiro dia.  

Sobre as perguntas, pergunte, apesar de ser prematura e ingênua, vale apena perguntar. 

## Second day

Agora começa o código, eu acho a aba *Issue* umas das melhores abas do github, é de fato um bom serviço, no entanto, a ideia de usar a issue para colocar tasks de feature me parece estranho. Enfim, o objetivo maior é fazer: 
- Send a transaction;
- Receive a transaction;
- Calculate the available balance of an account;

Poderia ter usado o GitFlow para o desenvolvimento das tarefas, então, seguindo o flow ou fluxo, eu deveria criar uma branch chamada *transaction*, rodar o programa, fazer os teste, fazer as alterações, subir a branch, criar pull request, após aprovado, merge para main. Parece correto, mas uma vez ouvi de um professor, que quanto mais tempo o seu código tá da branch main, mais fácil de acontecer um bug ou problema, além disso, uma branch *transaction* envolve pequenas etapas, como criar conta, fazer autenticação, e por ai vai, ou seja, nesse tempo, por ineficiência(falta de experiência) essa branch vai ficar muito tempo aberta e terá muito passos pequenos que você ainda não sabe. Claro, estou falando para o meu contexto, e não tô criticando o GitFlow, é uma boa abordagem. Contudo, tentei implementar uma ideia semelhante, vou seguir a ideia do professor e como é só eu no repositório, eu vou avaliar o pull request, eu vou fazer o merge, então é melhor fazer direto na main :) 

Fica a call: não faça alterações na main, faça em outra branch, suba as modificações, e pessa o pull request. 

## Third day

Durante o desenvolvimetno das tasks quis implementar outra ideia. Existe problemas que já são bem definidos, se você cria uma tabela conta, óbvio que precisa criar uma tabela de login ou um serviço de autenticação, mas esse não é o centro da aplicação, isso não entrega valor, o valor do produto, no caso deste desafio da Woovi é fazer uma transation, então, segui esse objetivo, o foco é na transaction, e sim, quando eu faço um commit ```feature(transaction): add sendTransaction```, ela não está finalizada de fato, ainda falta muitos passos para finzalar, existe feautures que durante o desenvolvimento eu sei que tá incompleta, mas faz parte. Por exemplo, para fazer a transação eu precisei criar uma conta, e ao fazer uma conta é necssário fazer o login, eu pulei essa parte do login, visto que não é a função principal do negócio, o maior valor, seria fazer a transação, aceito que haverá mais modificações no futuro, para entregar mais valor no presente. Gosto de pensar que para tarefas simples, que já são bem óbvias e conforme você tem muita experiência e tempo suficiente você conseguiria desenvolver a autenticação, conta do usuário, transação, testes para todos os casos, porém, esse é um problema conhecido, para problemas novos, a melhor abordagem é entregar um pouco de valor postergando mais alterações no futuro, para fazer mais testes e validações de soluções. 

No fundo, implementei a metodologia ágil, iterativo e incremental ou pelo menos o que eu entendo de metodologia kk

## Fourth day

Error handlig do graphql não me parece uma boa solução, aqui vale uma análise, essa ideia de retornar tudo 200 é estranho.

Na transaction eu coloquei o value em inteiro com duas casas, ou seja, 1000 é igual a R$ 10,00 reais. Andei pesquisando e vi que agora se usam quatro casas após a vírgula, neste ponto, envolve um conhecimento mais de nicho doque de progamação, a pessoa tem que ler a regulamentação do Banco Central ou algo assim. Então, 100000, seria R$ 10,00, porém ainda não implementei. 

Sobre a transaction, eu segui um padrão comum, apesar de achar que tá errado (Aqui falta experiência e conhecimento da área, no caso de finanças), seria: 

1. Verifica a conta A; 
2. Conta A tem saldo para fazer  trasação? 
3. Verifica a conta B;
4. Subtrai da Conta A;
5. Soma o saldo na Conta B;

