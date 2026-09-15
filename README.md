jogo-dados

Jogo de dados para 2 jogadores, disputado em 5 rodadas. Em cada rodada os dois jogadores jogam dois dados; vence a rodada quem tirar a maior soma (empate se as somas forem iguais). Ao final das 5 rodadas, o jogo mostra quem venceu a partida (ou se houve empate geral) e permite reiniciar com "Jogar novamente".

Estrutura
app/components/Dado.tsx — componente que recebe a prop valor (1 a 6) e exibe a imagem do dado correspondente (public/dados/dado-N.svg).
app/components/JogoDados.tsx — componente principal com a lógica do jogo (rodadas, turnos, placar, resultado da rodada e resultado final).
public/dados/ — imagens SVG dos 6 dados, salvas dentro do próprio projeto.
