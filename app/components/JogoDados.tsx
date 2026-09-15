"use client";

import { useState } from "react";
import Dado from "./Dado";

const TOTAL_RODADAS = 5;

type Jogador = "jogador1" | "jogador2";
type ResultadoRodada = Jogador | "empate" | null;

type Placar = {
  jogador1: number;
  jogador2: number;
  empates: number;
};

function rolarDado(): number {
  return Math.floor(Math.random() * 6) + 1;
}

function somaDados(dados: [number, number] | null): number {
  if (!dados) return 0;
  return dados[0] + dados[1];
}

export default function JogoDados() {
  const [rodada, setRodada] = useState(1);
  const [vez, setVez] = useState<Jogador>("jogador1");
  const [dadosJ1, setDadosJ1] = useState<[number, number] | null>(null);
  const [dadosJ2, setDadosJ2] = useState<[number, number] | null>(null);
  const [resultadoRodada, setResultadoRodada] = useState<ResultadoRodada>(null);
  const [placar, setPlacar] = useState<Placar>({ jogador1: 0, jogador2: 0, empates: 0 });
  const [jogoFinalizado, setJogoFinalizado] = useState(false);
  const [animando, setAnimando] = useState<Jogador | null>(null);

  const rodadaEmAndamento = !jogoFinalizado;
  const ultimaRodada = rodada === TOTAL_RODADAS;

  function jogar(jogador: Jogador) {
    setAnimando(jogador);

    // Pequena animação antes de revelar o valor sorteado
    window.setTimeout(() => {
      const novosDados: [number, number] = [rolarDado(), rolarDado()];

      if (jogador === "jogador1") {
        setDadosJ1(novosDados);
        setVez("jogador2");
      } else {
        setDadosJ2(novosDados);
        const somaJ1 = somaDados(dadosJ1);
        const somaJ2 = somaDados(novosDados);

        let vencedor: ResultadoRodada;
        if (somaJ1 > somaJ2) vencedor = "jogador1";
        else if (somaJ2 > somaJ1) vencedor = "jogador2";
        else vencedor = "empate";

        setResultadoRodada(vencedor);
        setPlacar((atual) => {
          if (vencedor === "empate") {
            return { ...atual, empates: atual.empates + 1 };
          }
          return { ...atual, [vencedor]: atual[vencedor] + 1 };
        });
      }

      setAnimando(null);
    }, 500);
  }

  function proximaRodada() {
    if (ultimaRodada) {
      setJogoFinalizado(true);
      return;
    }
    setRodada((r) => r + 1);
    setVez("jogador1");
    setDadosJ1(null);
    setDadosJ2(null);
    setResultadoRodada(null);
  }

  function reiniciar() {
    setRodada(1);
    setVez("jogador1");
    setDadosJ1(null);
    setDadosJ2(null);
    setResultadoRodada(null);
    setPlacar({ jogador1: 0, jogador2: 0, empates: 0 });
    setJogoFinalizado(false);
    setAnimando(null);
  }

  const podeJogarJ1 = rodadaEmAndamento && vez === "jogador1" && dadosJ1 === null && animando === null;
  const podeJogarJ2 = rodadaEmAndamento && vez === "jogador2" && dadosJ2 === null && animando === null;
  const rodadaConcluida = dadosJ1 !== null && dadosJ2 !== null && resultadoRodada !== null;

  let resultadoFinal: ResultadoRodada = null;
  if (jogoFinalizado) {
    if (placar.jogador1 > placar.jogador2) resultadoFinal = "jogador1";
    else if (placar.jogador2 > placar.jogador1) resultadoFinal = "jogador2";
    else resultadoFinal = "empate";
  }

  return (
    <div className="tabuleiro">
      <header className="cabecalho">
        <p className="ementa">Jogo de Dados · 2 jogadores</p>
        <h1>Quem tira mais soma leva a rodada</h1>
      </header>

      <div className="trilha-rodadas" aria-label={`Rodada ${rodada} de ${TOTAL_RODADAS}`}>
        {Array.from({ length: TOTAL_RODADAS }, (_, i) => i + 1).map((n) => (
          <span
            key={n}
            className={`marca-rodada ${
              n < rodada || jogoFinalizado
                ? "marca-rodada--concluida"
                : n === rodada
                ? "marca-rodada--atual"
                : ""
            }`}
          >
            {n}
          </span>
        ))}
      </div>

      {!jogoFinalizado && (
        <p className="texto-rodada">
          Rodada {rodada} de {TOTAL_RODADAS}
        </p>
      )}

      <div className="mesa">
        <section className={`painel-jogador ${vez === "jogador1" && !rodadaConcluida ? "painel-jogador--ativo" : ""}`}>
          <h2>Jogador 1</h2>
          <div className="par-dados">
            <Dado valor={dadosJ1 ? dadosJ1[0] : 1} rolando={animando === "jogador1"} />
            <Dado valor={dadosJ1 ? dadosJ1[1] : 1} rolando={animando === "jogador1"} />
          </div>
          <p className="soma">Soma: {dadosJ1 ? somaDados(dadosJ1) : "—"}</p>
          <button
            className="botao botao--jogar"
            onClick={() => jogar("jogador1")}
            disabled={!podeJogarJ1}
          >
            Jogar dados
          </button>
          <p className="placar-mini">Rodadas vencidas: {placar.jogador1}</p>
        </section>

        <div className="versus">×</div>

        <section className={`painel-jogador ${vez === "jogador2" && !rodadaConcluida ? "painel-jogador--ativo" : ""}`}>
          <h2>Jogador 2</h2>
          <div className="par-dados">
            <Dado valor={dadosJ2 ? dadosJ2[0] : 1} rolando={animando === "jogador2"} />
            <Dado valor={dadosJ2 ? dadosJ2[1] : 1} rolando={animando === "jogador2"} />
          </div>
          <p className="soma">Soma: {dadosJ2 ? somaDados(dadosJ2) : "—"}</p>
          <button
            className="botao botao--jogar"
            onClick={() => jogar("jogador2")}
            disabled={!podeJogarJ2}
          >
            Jogar dados
          </button>
          <p className="placar-mini">Rodadas vencidas: {placar.jogador2}</p>
        </section>
      </div>

      {!jogoFinalizado && (
        <div className="resultado-rodada" role="status">
          {rodadaConcluida ? (
            <>
              <p className="resultado-texto">
                {resultadoRodada === "empate"
                  ? "Empate na rodada!"
                  : resultadoRodada === "jogador1"
                  ? "Jogador 1 venceu a rodada!"
                  : "Jogador 2 venceu a rodada!"}
              </p>
              <button className="botao botao--avancar" onClick={proximaRodada}>
                {ultimaRodada ? "Ver resultado final" : "Próxima rodada"}
              </button>
            </>
          ) : (
            <p className="resultado-texto resultado-texto--espera">
              {vez === "jogador1" ? "Aguardando o Jogador 1 jogar…" : "Aguardando o Jogador 2 jogar…"}
            </p>
          )}
        </div>
      )}

      {jogoFinalizado && (
        <div className="resultado-final">
          <p className="resultado-final__titulo">
            {resultadoFinal === "empate"
              ? "A partida terminou empatada!"
              : resultadoFinal === "jogador1"
              ? "Jogador 1 venceu a partida!"
              : "Jogador 2 venceu a partida!"}
          </p>
          <p className="resultado-final__placar">
            {placar.jogador1} × {placar.jogador2}
            {placar.empates > 0 ? ` (${placar.empates} rodada(s) empatada(s))` : ""}
          </p>
          <button className="botao botao--reiniciar" onClick={reiniciar}>
            Jogar novamente
          </button>
        </div>
      )}
    </div>
  );
}
