const modal = document.querySelector('.modal-container');
const tbody = document.querySelector('tbody');
const sNome = document.querySelector('#m-nome');
const sFuncao = document.querySelector('#m-funcao');
const sSalario = document.querySelector('#m-salario');
const btnSalvar = document.querySelector('#btnSalvar');
const sEndereco = document.querySelector('#m-endereco');
const sIdade = document.querySelector('#m-idade');
const sCPF = document.querySelector('#m-cpf');
const sJogoFavorito = document.querySelector('#m-jogofavorito');

let itens = []; 
let id;

function openModal(edit = false, index = 0) {
  modal.classList.add('active');

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active');
    }
  };

  if (edit) {
    sNome.value = itens[index].nome;
    sFuncao.value = itens[index].funcao;
    sSalario.value = itens[index].salario;
    sEndereco.value = itens[index].endereco;
    sIdade.value = itens[index].idade;
    sCPF.value = itens[index].cpf;
    sJogoFavorito.value = itens[index].jogofavorito;
    id = index;
  } else {
    sNome.value = '';
    sFuncao.value = '';
    sSalario.value = '';
    sEndereco.value = '';
    sIdade.value = '';
    sCPF.value = '';
    sJogoFavorito.value = '';
    id = undefined;
  }
}

function saveItem() {
  if (sNome.value === '' || sFuncao.value === '' || sSalario.value === '' || sEndereco.value === '' || sIdade.value === '' || sJogoFavorito.value === '') {
    return;
  }

  if (id !== undefined) {
    itens[id] = {
      nome: sNome.value,
      funcao: sFuncao.value,
      salario: sSalario.value,
      endereco: sEndereco.value,
      idade: sIdade.value,
      cpf: sCPF.value,
      jogofavorito : sJogoFavorito.value
    };
  } else {
    const novoFuncionario = {
      nome: sNome.value,
      funcao: sFuncao.value,
      salario: sSalario.value,
      endereco: sEndereco.value,
      idade: sIdade.value,
      cpf: sCPF.value,
      jogofavorito: sJogoFavorito.value,

    };
    itens.push(novoFuncionario);
  }

  setItensBD(); 
  modal.classList.remove('active');
  loadItens();
}


function editItem(index) {
  openModal(true, index);
}


function deleteItem(index) {
  itens.splice(index, 1);
  setItensBD(); 
  loadItens();
}


function insertItem(item, index) {
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.funcao}</td>
    <td>R$ ${item.salario}</td>
    <td>${item.endereco}</td>
    <td>${item.idade}</td>
    <td>${item.cpf}</td>
    <td>${item.jogofavorito}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit'></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `;
  tbody.appendChild(tr);
}


function loadItens() {
  itens = getItensBD();
  tbody.innerHTML = '';
  itens.forEach((item, index) => {
    insertItem(item, index);
  });
}


const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) || [];


const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens));

loadItens(); 
btnSalvar.addEventListener('click', saveItem); 