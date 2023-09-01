import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";

function Create({ atualizarProdutos }) {
  const [novoProduto, setProduto] = useState("");
  const [novaImagem, setImagem] = useState("");
  const [novaDescricao, setDescricao] = useState("");
  const [novoPreco, setPreco] = useState("");

  const postProduto = async () => {
    await axios.post("http://127.0.0.1:8000/api/produtos/", {
      name: novoProduto,
      image: novaImagem,
      description: novaDescricao,
      price: novoPreco,
    });
    atualizarProdutos();
  };

  return (
    <Form className="create">
      <Form.Field>
        <label>Produto</label>
        <input
          placeholder="Novo Produto"
          onChange={(e) => setProduto(e.target.value)}
        />
      </Form.Field>
      <Form.Field>
        <label>Imagem</label>
        <input
          placeholder="Nova Imagem"
          onChange={(e) => setImagem(e.target.value)}
        />
      </Form.Field>
      <Form.Field>
        <label>Descrição</label>
        <input
          placeholder="Nova Descricao"
          onChange={(e) => setDescricao(e.target.value)}
        />
      </Form.Field>
      <Form.Field>
        <label>Preço</label>
        <input
          placeholder="Novo Preco"
          onChange={(e) => setPreco(e.target.value)}
        />
      </Form.Field>
      <Button onClick={postProduto} type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default Create;
