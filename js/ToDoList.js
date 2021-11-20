const userInput = document.getElementById("userInput");
const addBtn = document.getElementById("enter");
const container = document.getElementById("container");
const edit1_btn = document.getElementById("edit");
function addList() {
  if (userInput.value == "") {
    userInput.parentElement.parentElement.classList.add("shake");
  } else {
    userInput.classList.remove("shake");
    let todoItem = localStorage.getItem("todo");
    if (todoItem === null) {
      todoArray = [];
    } else {
      todoArray = JSON.parse(todoItem);
    }
    let list = {};
    list.text = userInput.value;
    list.isChecked = false;
    list.allActivityLength = 1;
    todoArray.unshift(list);
    userInput.value = "";
    localStorage.setItem("todo", JSON.stringify(todoArray));
    // const liEl = document.createElement("li");
    // const editBtn = document.createElement("button");
    // editBtn.onclick = "edit(this)";
    // const divEL = document.createElement("div");
    // const closeliEL = document.createElement("button");
    // closeliEL.setAttribute("onclick", "removeLi(this)");
    // const text = document.createElement("p");
    // text.innerHTML = userInput.value;
    // editBtn.innerHTML = "<span><i class='far fa-edit'></i></span>";
    // editBtn.setAttribute("onclick", "editText(this)");
    // closeliEL.innerHTML = `<span><i class="fas fa-times"></i></span>`;
    // closeliEL.style.marginLeft = ".5rem";
    // divEL.append(closeliEL);
    // divEL.append(editBtn);
    // liEl.append(text);
    // liEl.append(divEL);
    // text.addEventListener("click", function () {
    //   liEl.classList.toggle("done");
    // });
    // container.appendChild(liEl);
    // userInput.value = "";
    ShowToDo();
  }
}

addBtn.addEventListener("click", addList);

function ShowToDo() {
  let todo = localStorage.getItem("todo");
  console.log(todo);
  if (todo === null) {
    todoArray = [];
  } else {
    todoArray = JSON.parse(todo);
  }
  let htmlCode = "";
  todoArray.forEach((list, ind) => {
    if (list.isChecked == true) {
      htmlCode += `<li >
    <input type="checkbox" checked>
    <p onclick="checked1(${ind})" class="done">${list.text}</p>
    <div>
    <button onclick="removeLi(this,${ind})" style="margin-left: 0.5rem;">
    <span><i class="bi bi-trash-fill"></i></i></span>
    </button>
    <button onclick="editText(this,${ind})">
    <span><i class="bi bi-pencil-square"></i></span>
    </button>
    </div>
    </li>`;
    } else {
      htmlCode += `<li >
    <input type="checkbox" >
    <p onclick="checked1(${ind})">${list.text}</p>
    <div>
    <button onclick="removeLi(this,${ind})" style="margin-left: 0.5rem;">
    <span><i class="bi bi-trash-fill"></i></i></span>
    </button>
    <button onclick="editText(this,${ind})">
    <span><i class="bi bi-pencil-square"></i></span>
    </button>
    </div>
    </li>`;
    }
  });
  container.innerHTML = htmlCode;
}
function checked1(ind) {
  let todo = localStorage.getItem("todo");
  let todoArr = JSON.parse(todo);
  if (todoArr[ind].isChecked == true) {
    todoArr[ind].isChecked = false;
  } else {
    todoArr[ind].isChecked = true;
  }
  ++todoArr[ind].allActivityLength;
  localStorage.setItem("todo", JSON.stringify(todoArr));
  ShowToDo();
}
function editText(evt, inx) {
  let todo = localStorage.getItem("todo");
  todoArray = JSON.parse(todo);
  userInput.value = todoArray[inx].text;
  evt.parentElement.previousElementSibling.textContent = "editing...";
  // evt.parentElement.previousElementSibling.disabled=true;
  const liEls = document.querySelectorAll("li");
  for (let liEl of liEls) {
    liEl.style.opacity = "0";
    console.log(liEl.firstChild.nextSibling.textContent);
    if (liEl.children[1].textContent == "editing...") liEl.style.opacity = "1";
  }
  addBtn.classList.add("delete");
  edit1_btn.classList.remove("delete");
  evt.parentElement.previousElementSibling.setAttribute("id", "editing");
  evt.parentElement.previousElementSibling.disabled=true;
  userInput.focus();
  edit1_btn.addEventListener("click", function () {
    userInput.classList.remove("shake");
    userInput.style.border = "none";
    let y = document.getElementById("editing");
    let todo = localStorage.getItem("todo");
    todoArray = JSON.parse(todo);
    let id = inx;
    todoArray[id].text = userInput.value;
    y.innerHTML = todoArray[id].text;
    y.id = "";
    edit1_btn.classList.add("delete");
    addBtn.classList.remove("delete");
    userInput.value = "";
    ++todoArray[inx].allActivityLength;
    localStorage.setItem("todo", JSON.stringify(todoArray));
    evt.parentElement.previousElementSibling.disabled=false;
    ShowToDo();
    const liEls = document.querySelectorAll("li");
    for (let liEl1 of liEls) {
      liEl1.style.opacity = "1";
    }
  });
}
function removeLi(evt, idx) {
  let todo = localStorage.getItem("todo");
  todoArray = JSON.parse(todo);
  const asking = confirm("are you sure to remove it??");
  if (asking) {
    ++todoArray[idx].allActivityLength;
    todoArray.splice(idx, 1);
    localStorage.setItem("todo", JSON.stringify(todoArray));
  }
  ShowToDo();
}

document.addEventListener("DOMContentLoaded", function () {
  ShowToDo();
});
