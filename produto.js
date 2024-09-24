class Produto {

    // Construtor da classe Produto, inicializa os atributos.
    constructor() {
        this.id = 1; // Atribui o primeiro ID para o produto.
        this.arrayProdutos = []; // Array para armazenar todos os produtos.
        this.editId = null; // Variável para armazenar o ID do produto a ser editado.
    }

    // Lê os dados do formulário e retorna um objeto "produto".
    readData() {
        let produto = {}; // Cria um objeto vazio para armazenar os dados.
        produto.id = this.id; // Define o ID atual do produto.
        produto.nome = document.getElementById('produto').value; // Obtém o nome do produto do campo de entrada.
        produto.preco = document.getElementById('preco').value; // Obtém o preço do produto do campo de entrada.

        return produto; // Retorna o objeto produto com os dados preenchidos.
    }

    // Valida se os campos do formulário estão preenchidos.
    validateField(produto) {
        let msg = ''; // Variável para armazenar mensagens de erro.

        // Verifica se o nome do produto foi preenchido.
        if (produto.nome == '') {
            msg += "Informe o nome do produto \n";
        }

        // Verifica se o preço do produto foi preenchido.
        if (produto.preco == '') {
            msg += "Informe o preço do produto \n";
        }

        // Se houver mensagens de erro, exibe o alerta.
        if (msg != '') {
            alert(msg);
            return false; // Retorna falso indicando que a validação falhou.
        }

        return true; // Retorna verdadeiro indicando que os campos estão válidos.
    }

    // Verifica se o produto já foi adicionado.
    validateDuplicatedProduct(produto) {
        let value = false; // Variável para armazenar o resultado da verificação.

        // Percorre a lista de produtos para verificar duplicatas.
        for (let i of this.arrayProdutos) {
            if (i.nome == produto.nome && i.preco == produto.preco) {
                value = true;
                alert('Produto já criado!'); // Exibe uma mensagem se o produto já existir.
            }
        }

        return value; // Retorna verdadeiro se o produto já existe.
    }

    // Lista todos os produtos na tabela.
    listTable() {
        let tbody = document.getElementById('tbody'); // Obtém a referência ao corpo da tabela.

        tbody.innerText = ''; // Limpa o conteúdo da tabela para evitar duplicações.

        // Itera sobre o array de produtos e adiciona-os na tabela.
        for (let i = 0; i < this.arrayProdutos.length; i++) {
            let tr = tbody.insertRow(); // Insere uma nova linha na tabela.

            // Insere células para o ID, nome, preço e ações.
            let td_id = tr.insertCell();
            let td_produto = tr.insertCell();
            let td_preco = tr.insertCell();
            let td_acoes = tr.insertCell();

            // Preenche as células com os dados do produto.
            td_id.innerText = this.arrayProdutos[i].id;
            td_produto.innerText = this.arrayProdutos[i].nome;
            td_preco.innerText = this.arrayProdutos[i].preco;

            // Cria os botões de editar e excluir para cada produto.
            let imgEdit = document.createElement('img');
            imgEdit.src = './images/edit.png';
            imgEdit.setAttribute("onclick", "produto.edition(" + JSON.stringify(this.arrayProdutos[i]) + ")");

            let imgDelete = document.createElement('img');
            imgDelete.src = './images/delete.png';
            imgDelete.setAttribute("onclick", "produto.deletar(" + this.arrayProdutos[i].id + ")");

            td_acoes.appendChild(imgEdit); // Adiciona o botão de edição.
            td_acoes.appendChild(imgDelete); // Adiciona o botão de exclusão.
        }
    }

    // Limpa os campos do formulário.
    cancelar() {
        document.getElementById('produto').value = ''; // Limpa o campo de nome do produto.
        document.getElementById('preco').value = ''; // Limpa o campo de preço do produto.

        document.getElementById('btn1').innerText = 'Salvar'; // Reseta o texto do botão.
        this.editId = null; // Reseta o ID de edição.
    }

    // Adiciona um novo produto ao array.
    adicionar(produto) {
        produto.preco = parseFloat(produto.preco); // Converte o preço para número.
        this.arrayProdutos.push(produto); // Adiciona o produto ao array.
        this.id++; // Incrementa o ID para o próximo produto.
    }

    // Preenche o formulário com os dados do produto para edição.
    edition(dados) {
        this.editId = dados.id; // Armazena o ID do produto a ser editado.

        document.getElementById('produto').value = dados.nome; // Preenche o campo de nome.
        document.getElementById('preco').value = dados.preco; // Preenche o campo de preço.

        document.getElementById('btn1').innerText = 'Atualizar'; // Muda o texto do botão para "Atualizar".
    }

    // Atualiza os dados de um produto existente.
    update(id, produto) {
        for (let i = 0; i < this.arrayProdutos.length; i++) {
            if (this.arrayProdutos[i].id == id) {
                this.arrayProdutos[i].nome = produto.nome; // Atualiza o nome do produto.
                this.arrayProdutos[i].preco = produto.preco; // Atualiza o preço do produto.
            }
        }
    }

    // Salva um novo produto ou atualiza um existente.
    salvar() {
        let produto = this.readData(); // Lê os dados do formulário.

        // Se os campos são válidos e o produto não é duplicado.
        if (this.validateField(produto)) {
            if (this.editId === null) {
                if (!this.validateDuplicatedProduct(produto)) {
                    this.adicionar(produto); // Adiciona o produto se não está em edição.
                }
            } else {
                this.update(this.editId, produto); // Atualiza o produto se está em edição.
            }
        }

        this.listTable(); // Atualiza a tabela de produtos.
        this.cancelar(); // Limpa o formulário.
        console.log(this.arrayProdutos); // Exibe o array no console.
    }

    // Exclui um produto da tabela.
    deletar(id) {
        let produto = this.arrayProdutos.find(produto => produto.id === id); // Encontra o produto pelo ID.

        if (produto && window.confirm(`Deseja deletar ${produto.nome}?`)) {
            let tbody = document.getElementById('tbody');

            for (let i = 0; i < this.arrayProdutos.length; i++) {
                if (this.arrayProdutos[i].id == id) {
                    this.arrayProdutos.splice(i, 1); // Remove o produto do array.
                    tbody.deleteRow(i); // Remove a linha da tabela.
                    break;
                }
            }

            console.log(this.arrayProdutos); // Exibe o array atualizado no console.
        }
    }

    // Ordena os produtos de forma crescente ou decrescente com base no ID.
    ordenar() {
        let ordem = document.getElementById('ordenacao').value; // Obtém a ordem de classificação.

        if (ordem === 'crescente') {
            this.arrayProdutos.sort((a, b) => a.id - b.id); // Ordena de forma crescente.
        } else if (ordem === 'decrescente') {
            this.arrayProdutos.sort((a, b) => b.id - a.id); // Ordena de forma decrescente.
        }

        this.listTable(); // Reexibe os produtos ordenados na tabela.
    }

    // Sair da Página

}
// Instancia a classe Produto para ser usada nas interações com o HTML.
var produto = new Produto();
