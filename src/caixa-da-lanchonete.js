const metodoPagamento = ["dinheiro", "debito", "credito"];

const produtos = [
  "cafe",
  "chantily",
  "suco",
  "sanduiche",
  "queijo",
  "salgado",
  "combo1",
  "combo2",
];

const valores = {
  cafe: 3,
  chantily: 1.5,
  suco: 6.2,
  sanduiche: 6.5,
  queijo: 2,
  combo1: 9.5,
  combo2: 7.5,
};

const mapItens = (itens) => {
  return itens.map((item) => {
    const [nome, quantidade] = item.split(",");
    return {
      nome,
      quantidade,
    };
  });
};

function validarProdutosAuxiliares(pedidos) {
  let cafeIncluso = false;
  let sanduicheIncluso = false;
  let chantillyOuQueijoIncluso = false;

  pedidos.forEach((pedido) => {
      if (produtos.includes(pedido.nome)) {
          if (pedido.nome === "cafe") {
            cafeIncluso = true;
          }else if(pedido.nome === "sanduiche") {
            sanduicheIncluso = true;
          } else if (pedido.nome === "chantily" || pedido.nome === "queijo") {
              chantillyOuQueijoIncluso = true;
          }
      }
  });

  if (chantillyOuQueijoIncluso && !cafeIncluso && !sanduicheIncluso) {
      return false; // Retorna false se chantilly ou queijo forem pedidos sem café ou sanduíche
  }

  return true;
}

class CaixaDaLanchonete {
  calcularValorDaCompra(metodoDePagamento, itens) {

    if (itens.length === 0) {
      return "Não há itens no carrinho de compra!";
    }

    if (!metodoPagamento.includes(metodoDePagamento)) {
      return "Forma de pagamento inválida!";
    }

    const pedidos = mapItens(itens);

    for (const pedido of pedidos) {
      if (!produtos.includes(pedido.nome)) {
          return "Item inválido!";
      }

      if (isNaN(pedido.quantidade) || Number(pedido.quantidade) <= 0) {
        return "Quantidade inválida!";
      }

    }

    if (!validarProdutosAuxiliares(pedidos)) {
       return "Item extra não pode ser pedido sem o principal";
    }

    let valorTotal = 0;

    pedidos.forEach((pedido) => {
      if (produtos.includes(pedido.nome)) {
        const valorDoPedido =
            valores[pedido.nome] * Number(pedido.quantidade);
        valorTotal += valorDoPedido;
      }
    });

    // return " ";
    const descontoDinheiro = 0.05; // 5%
    const acrescimoCredito = 0.03; // 3%

    if (metodoDePagamento === "dinheiro") {
        valorTotal *= 1 - descontoDinheiro;
    } else if (metodoDePagamento === "credito") {
        valorTotal *= 1 + acrescimoCredito;
    }

    return "R$ " + valorTotal.toFixed(2).replace('.',',');

  }
}

const Caixa = new CaixaDaLanchonete();
const result = Caixa.calcularValorDaCompra("credito", ["cafe,1", "sanduiche,1", "queijo,1"]);
console.log(result);

export { CaixaDaLanchonete };
