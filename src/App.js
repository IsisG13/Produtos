import React, { useEffect, useState } from "react";
import "./App.css";
import api from "./services/api";
import Create from "./components/create";

function App() {
  const [produtos, setProdutos] = useState([]);
  const [produtosVendidos, setProdutosVendidos] = useState([]);
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState([]);
  const [produtoParaComprar, setProdutoParaComprar] = useState([]);

  const buscarProdutos = async () => {
    try {
      const response = await api.get("/produtos/");
      setProdutos(response.data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  useEffect(() => {
    buscarProdutos();
  }, []);

  const atualizarProdutos = () => {
    buscarProdutos();
  };

  const apagarProduto = async (produtoId) => {
    try {
      await api.delete(`/produtos/${produtoId}`);
      buscarProdutos();
    } catch (error) {
      console.error("Erro ao apagar produto:", error);
    }
  };

  const comprarProduto = (produto) => {
    setProdutoParaComprar(produto);
    setMostrarConfirmacao(true);
  };

  const confirmarCompraProduto = () => {
    setMostrarConfirmacao(false);
    setProdutosVendidos([...produtosVendidos, produtoParaComprar]);
    apagarProduto(produtoParaComprar.id);
  };

  return (
    <div className="App">
      <div className="titulo">
        <h1>Lista de Produtos</h1>
      </div>

      {produtos.map((produto) => (
        <div className="conteudo" key={produto.id}>
          <p>NOME: {produto?.name}</p>
          {produtosVendidos.includes(produto.id) && (
            <p className="vendido">Vendido - Indisponível para venda</p>
          )}
          <img className="imagem" src={produto?.image} alt={produto?.name} />{" "}
          <p>DESCRIÇÃO: {produto?.description}</p>
          <p>PREÇO: R${produto?.price}</p>
          {mostrarConfirmacao && (
            <div className="confirm-dialog">
              <p>Deseja confirmar a compra de {produtoParaComprar.name}?</p>
              <button onClick={confirmarCompraProduto}>Confirmar</button>
              <button onClick={() => setMostrarConfirmacao(false)}>
                Cancelar
              </button>
            </div>
          )}
          {!produtosVendidos.includes(produto.id) && (
            <div>
              <button onClick={() => comprarProduto(produto.id)}>
                Comprar
              </button>
            </div>
          )}
          <button onClick={() => apagarProduto(produto.id)}>Apagar</button>
          <br /> <br /> <br /> <br />
        </div>
      ))}
      <div className="create">
        <Create atualizarProdutos={atualizarProdutos} />
      </div>
    </div>
  );
}

export default App;
