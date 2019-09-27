// Seletores
const form = document.querySelector('form');
const nomeInput = document.querySelector('#nome');
const descricaoInput = document.querySelector('#descricao');
const valorInput = document.querySelector('#valor');
const fotoInput = document.querySelector('#foto');
const produtosContainer = document.querySelector('#produtos-container')

// funções
const adicionarProduto = (nome,descricao, valor, foto) => {
    const formData = new FormData();
    formData.append('nome',nome);
    formData.append('descricao',descricao);
    formData.append('valor', valor);
    formData.append('url_imagem', foto);

    fetch('http://localhost:8000/api/produtos',{
        method: 'post',
        body: formData
    })
    .then((resposta) => { return resposta.json( )})
    .then((mensagem) =>{ console.log(mensagem) })
}

const mostrarProdutos = () => {
    fetch('http://localhost:8000/api/produtos')
    .then((resposta) => { return resposta.json() })
    .then((produtos) => {
        let html = '';
        produtos.forEach((produto) => {
            html += `
            <div class="col-4 my-1">
            <div class="card border w-100 h-100">
              <img class="card-img-top h-50" src="${produto.url_imagem}" alt="Card image cap" />
              <div class="card-body border-top">
                  <h5 class="card-title text-center">${produto.nome}</h5>
                  <p class="card-text text-center">${produto.descricao}</p>
                  <a href="#" class="btn btn-secondary col-12">Comprar por R$ ${produto.valor}</a>
              </div>
            </div>
          </div>
            `
        });
        produtosContainer.innerHTML = html;
    });
}

const manipularSubmit = (evento) => {
    evento.preventDefault();

    adicionarProduto(
        nomeInput.value,
        descricaoInput.value,
        valorInput.value,
        fotoInput.files[0]
    );

    setTimeout(() => {
        mostrarProdutos();
    }, 1000);
}

// eventos
form.onsubmit = manipularSubmit;
window.onload =  mostrarProdutos;