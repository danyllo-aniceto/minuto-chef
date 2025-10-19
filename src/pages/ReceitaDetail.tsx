import { useParams } from "react-router-dom";
import { useReceita } from "../hooks/useReceita";

export default function ReceitaDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useReceita(id);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;
  if (!data) return <div>Receita não encontrada.</div>;

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-extrabold text-primary mb-4">{data.nome}</h1>
      {data.imagem && (
        <img
          src={data.imagem}
          alt={data.nome}
          className="w-full rounded-lg mb-4 object-cover h-64"
        />
      )}
      <h3 className="font-semibold mb-2">Ingredientes</h3>
      <ul className="list-disc pl-5 mb-4">
        {data.ingredientes.map((ing, idx) => (
          <li key={idx}>
            {ing.ingrediente} {ing.medida ? ` — ${ing.medida}` : ""}
          </li>
        ))}
      </ul>
      <h3 className="font-semibold mb-2">Modo de preparo</h3>
      <p className="whitespace-pre-line">{data.modo_preparo}</p>
    </div>
  );
}
