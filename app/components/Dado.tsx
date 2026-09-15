import Image from "next/image";

type DadoProps = {
  valor: number;
  rolando?: boolean;
};

/**
 * Componente Dado
 * Recebe um número entre 1 e 6 e exibe a imagem correspondente.
 * As imagens ficam em /public/dados/dado-1.svg ... dado-6.svg
 */
export default function Dado({ valor, rolando = false }: DadoProps) {
  const valorValido = valor >= 1 && valor <= 6 ? valor : 1;

  return (
    <div className={`dado ${rolando ? "dado--rolando" : ""}`}>
      <Image
        src={`/dados/dado-${valorValido}.svg`}
        alt={`Dado com valor ${valorValido}`}
        width={90}
        height={90}
        priority
      />
    </div>
  );
}
