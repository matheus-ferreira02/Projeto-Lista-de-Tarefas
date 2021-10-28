/* Pega o elemento ol */
const ol = document.querySelector('#lista-tarefas');

/* Funções da classe Selected */
function addBgSelected() {
  const selected = document.querySelector('.selected');
  selected.style.backgroundColor = 'rgb(128, 128, 128)';
}

function removeClassSelected() {
  const selected = document.querySelector('.selected');
  if (selected !== null) {
    selected.classList.remove('selected');
    selected.style.removeProperty('background-color');
  }
}

function addClassSelected(event) {
  removeClassSelected();
  const element = event.target;
  element.classList.add('selected');
  addBgSelected();
}

/* Funções da classe Completed */
function removeTextDecoration(element) {
  element.classList.remove('completed');
  element.style.removeProperty('text-decoration');
}

function addTextDecoration() {
  const completed = document.getElementsByClassName('completed');
  for (let i = 0; i < completed.length; i += 1) {
    completed[i].style.textDecoration = 'line-through solid rgb(0, 0, 0)';
  }
}

function addClassCompleted(element) {
  element.classList.add('completed');
  addTextDecoration();
}

function classCompleted(event) {
  const element = event.target;
  if (element.classList.contains('completed')) {
    removeTextDecoration(element);
  } else {
    addClassCompleted(element);
  }
}

/* função que adiciona um escutador sempre que um novo item é adicionado */
function addEvent() {
  const li = document.getElementsByTagName('li');
  for (let i = 0; i < li.length; i += 1) {
    li[i].addEventListener('click', addClassSelected);
    li[i].addEventListener('dblclick', classCompleted);
  }
}

/* Função que adiciona um novo elemento li em ol */
function addElementInput() {
  const textInput = document.querySelector('#texto-tarefa');
  const li = document.createElement('li');
  li.innerText = textInput.value;
  ol.appendChild(li);
  textInput.value = '';
  addEvent();
}
const buttonAdd = document.getElementById('criar-tarefa');
buttonAdd.addEventListener('click', addElementInput);

/* Função que limpa a lista */
function clearList() {
  ol.innerHTML = '';
}
const buttonClearList = document.getElementById('apaga-tudo');
buttonClearList.addEventListener('click', clearList);

/* Função que remove as tarefas finalizadas */
function clearCompleted() {
  const completed = document.querySelectorAll('.completed');
  for (let i = completed.length - 1; i >= 0; i -= 1) {
    completed[i].remove();
  }
}
const buttonClearCompleted = document.getElementById('remover-finalizados');
buttonClearCompleted.addEventListener('click', clearCompleted);

/* Funções que salvam os items em localStorage */
function saveLi(element) {
  const itemLi = {
    class: element.classList.value,
    text: element.innerText,
  };
  return itemLi;
}

function saveTasks() {
  localStorage.clear();
  removeClassSelected();
  const li = document.getElementsByTagName('li');
  for (let i = 0; i < li.length; i += 1) {
    const itemLi = saveLi(li[i]);
    localStorage.setItem(`li${i}`, JSON.stringify(itemLi));
  }
}
const buttonSave = document.getElementById('salvar-tarefas');
buttonSave.addEventListener('click', saveTasks);

/* Função que move o item pra cima */
function moveUp() {
  const selected = document.querySelector('.selected');
  if (selected !== null && selected.previousElementSibling !== null) {
    ol.insertBefore(selected, selected.previousElementSibling);
  }
}
const buttonMoveUp = document.getElementById('mover-cima');
buttonMoveUp.addEventListener('click', moveUp);

/* Função que move o item pra baixo */
function moveDown() {
  const selected = document.querySelector('.selected');
  if (selected !== null && selected.nextElementSibling !== null) {
    ol.insertBefore(selected, selected.nextElementSibling.nextElementSibling);
  }
}
const buttonMoveDown = document.getElementById('mover-baixo');
buttonMoveDown.addEventListener('click', moveDown);

/* Função que remove o selecionado */
function removeSelected() {
  const selected = document.querySelector('.selected');
  selected.remove();
}

const buttonRemoveSelected = document.getElementById('remover-selecionado');
buttonRemoveSelected.addEventListener('click', removeSelected);

/* Ao carregar a página */
function addElementLocalStorage() {
  for (let i = 0; i < localStorage.length; i += 1) {
    const getLocalStorage = JSON.parse(localStorage.getItem(`li${i}`));
    const li = document.createElement('li');
    li.classList = getLocalStorage.class;
    li.innerText = getLocalStorage.text;
    ol.appendChild(li);
  }
}

window.onload = () => {
  if (localStorage.length > 0) {
    addElementLocalStorage();
    addEvent();
    addTextDecoration();
  }
};
