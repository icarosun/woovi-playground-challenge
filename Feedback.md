# Feedback

Este arquivo é para descrever sobre as minhas decisões, opiniões e sugestões durante o decorrer do desenvolvimento do desafio. Está separado em seções, todavia, o título não reporta uma série temporal, eu apenas não sei qual título colocar kk

## First day

Apesar do desafio ser FullStack escolhi priorizar a área de backend, por mais afinidade. Além disso, preferi usar o boilerplate da Woovi[https://github.com/woovibr/woovi-playground] para começar os trabalhos, embora pareça a decisão mais "fácil", com o tempo ela torna-se a mais complexa, visto que você precisa entender o código, é uma habilidade pouca falada, os programadores passam muito tempo **lendo** código, tentando entender o funcionamento do programa, e quanto menos familiaridade com as ferramentas usadas, mais longo é o tempo de adaptação. Outro motivo, é que no meu entendimento, a Woovi já possue um código, já é uma startup de mais de 3 anos, então, eles já tem um código, uma base, um bom costume, dessa forma, ao entrar na empresa, eu vou estar mais acostumado com os padrões de commit, ferramentas utilizadas e arquitetura empregada no código. E, principalmente, vou estar aprimorando a minha habilidade de ler código!

Durante o primeiro dia, você descobre ferramentas e padrões utilizados que você não entende, não vê sentido, vale apena perguntar por que essas decisões, no entanto, me parece uma pergunta prematura, visto que a decisão dessas ferramentas e de arquitetura elas _dependem_ de um contexto, e numa startup assim como outros negócios no Brasil, o contexto maior é fazer dinheiro, a maior preocupação do primeiro dia é ter um cliente, e do segundo dia, é manter o primeiro cliente e fazer ele compartilhar a sua solução com outros clientes, no terceiro dia você precisa conseguir ter dois clientes e assim vai. Se eu fosse resumir, seria, a sua maior preocupação do primeiro dia é sobreviver até o segundo dia, e no segundo sobreviver até o terceiro dia.  

Sobre as perguntas, pergunte, apesar de ser prematura e ingênua, vale apena perguntar. Para você parece prematura e ingênua, mas você tem que tirar a dúvida.

## Second day

Agora começa o código, eu acho a aba *Issue* umas das melhores abas do github, é de fato um bom serviço, no entanto, a ideia de usar a issue para colocar tasks de feature me parece estranho. Enfim, o objetivo maior é fazer: 
- Send a transaction;
- Receive a transaction;
- Calculate the available balance of an account;

Poderia ter usado o GitFlow para o desenvolvimento das tarefas, então, seguindo o flow ou fluxo, eu deveria criar uma branch chamada *transaction*, rodar o programa, fazer os teste, fazer as alterações, subir a branch, criar pull request, após aprovado, merge para main. Parece correto, mas uma vez ouvi de um professor, que quanto mais tempo o seu código tá da branch main, mais fácil de acontecer um bug ou problema, além disso, uma branch *transaction* envolve pequenas etapas, como criar conta, fazer autenticação, e por ai vai, ou seja, nesse tempo, por ineficiência(falta de experiência) essa branch vai ficar muito tempo aberta e terá muito passos pequenos que você ainda não sabe. Claro, estou falando para o meu contexto, e não tô criticando o GitFlow, é uma boa abordagem. Contudo, tentei implementar uma ideia semelhante, vou seguir a ideia do professor e como é só eu no repositório, eu vou avaliar o pull request, eu vou fazer o merge, então é melhor fazer direto na main :) 

Fica a call: não faça alterações na main, faça em outra branch, suba as modificações, e pessa o pull request. 

## Third day

Durante o desenvolvimetno das tasks quis implementar outra ideia. Existe problemas que já são bem definidos, se você cria uma tabela conta, óbvio que precisa criar uma tabela de login ou um serviço de autenticação, mas esse não é o centro da aplicação, isso não entrega valor, o valor do produto, no caso deste desafio da Woovi é fazer uma transation, então, segui esse objetivo, o foco é na transaction, e sim, quando eu faço um commit ```feature(transaction): add sendTransaction```, ela não está finalizada de fato, ainda falta muitos passos para finalizar, existe feautures que durante o desenvolvimento eu sei que tá incompleta, mas faz parte. Por exemplo, para fazer a transação eu precisei criar uma conta, e ao fazer uma conta é necssário fazer o login, eu pulei essa parte do login, visto que não é a função principal do negócio, o maior valor, seria fazer a transação, aceito que haverá mais modificações no futuro, para entregar mais valor no presente. Gosto de pensar que para tarefas simples, que já são bem óbvias e conforme você tem muita experiência e tempo suficiente você conseguiria desenvolver a autenticação, conta do usuário, transação, testes para todos os casos, porém, esse é um problema conhecido, para problemas novos, a melhor abordagem é entregar um pouco de valor postergando mais alterações no futuro, para fazer mais testes e validações de soluções. 

No fundo, implementei a metodologia ágil, iterativo e incremental ou pelo menos o que eu entendo de metodologia kk

## Fourth day

Error handlig do graphql não me parece uma boa solução, aqui vale uma análise, essa ideia de retornar tudo 200 é estranho.

Na transaction eu coloquei o value em inteiro com duas casas, ou seja, 1000 é igual a R$ 10,00 reais. Andei pesquisando e vi que agora se usam quatro casas após a vírgula, neste ponto, envolve um conhecimento mais de nicho doque de progamação, a pessoa tem que ler a regulamentação do Banco Central ou algo assim. Então, 100000, seria R$ 10,00, porém ainda não implementei. 

Sobre a transaction, eu segui um padrão comum, apesar de achar que tá errado (Aqui falta experiência e conhecimento da área, no caso de finanças), seria: 

1. Verifica a conta A; 
2. Conta A tem saldo para fazer  transação? 
3. Verifica a conta B;
4. Subtrai da Conta A;
5. Soma o saldo na Conta B;

Toda via, falar que acho é ruim, primeiro você precisa de botar em produção, testar as métricas, ver o gargalo e melhorar, não existe uma solução bala de prata, tudo depende de contexto. Agora, claro, há soluções que já são bem definidas, assim como fazer login do usuário, dificilmente não terá essa ferramenta de login. 

## Fifth day

Atualmente, isso já pode ser considerado um erro, codar sem fazer teste, começar pelo código e depois ir para o teste. Você chega num ponto que precisa criar o ambiente de teste para evitar os bugs futuros ou melhor reduzir os erros, por isso é necessário processos, para reduzir erros e, melhor, evoluir as soluções, para evoluir você precisa partir de um ponto. Voltando para o problema de mitigar erros, é interessante automatizar a execução de teste, isso é conhecido como CI e CD, no caso, só foi implementado o CI, continuous integration, cada alteração na main, aciona a actions do github que executa os testes no backend, foi uns três dias para preparar o ambiente, porém, ganho tempo no futuro e assim, fica mais fácil paralelizar! (Famoso trade-off). 

Inclusive, que parada complicada essa de codar em typescript e passar para javascript, sim, codar com typescript é melhor, e você tem que entender a história e os motivos disso acontecer, mas quando vai para o teste... fica muito complicado. Só acho que esse seria a próxima melhoria, ou joga tudo para javascript e no caso, melhorar o javascript já que a web veio, criou raízes e vai permanecer no futuro por um bom tempo ou troca para typescript ou coisa melhor, é apenas minha opinião, todavia, acho que vale apena isso virar uma pesquisa de TCC. Assim como o Steve Jobs matou o flash, que tal fazer um _"Thoughts on Scripts on Web"_ kkk? 

Rodei o redis mockado, eu não curto essa ideia, mas podemos testar o Redis no teste de e2e, que vai do front até o backend, novamente, perde agora para ganhar lá na frente, famoso depende, famoso trade-off, não existe solução de prata.

## Sixth day 

Chegamos no ponto que o projeto tem que acabar, apesar do título da seção terem título de dias, o desenvolvimento do projeto não seguiu essa ideia. Acontece que o projeto, muita das vezes, é como um gás, ele se expande até os limites físicos do sistema, se você fala que tem duas semanas para fazer o projeto, ele vai durar duas semanas, se você fala que tem uma semana, o projeto vai durar uma semana. Então, se eu falar que consigo fazer algo semelhante ao instagram, mas não é o instagram em uma semana eu consigo fazer? **NÃO**, não consegue fazer, você tem que reduzir o escopo e focar no principal, naquilo que mais vai entregar valor, seria loucura, insanidade, e é por isso que você vai ter problemas e estresse, beba água e durma bem, se alimente bem, o básico. Entretanto, você precisa definir um prazo, análise, tome decisões, priorize, trabalhe, entregue, avalie, cheque, valide, e saiba até quando e quanto vale apena, assuma riscos e saiba que não dá para ganhar todas. Essas coisas só vem com a experiência. 

Ia esquecendo, também existe ferrmentas que fazem uma limpeza estética no seu código, por isso é sempre bom ter o máximo de controle da sua ide e das ferramentas que você usa. 

