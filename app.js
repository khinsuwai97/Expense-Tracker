"use strict";
const balanceEl = document.querySelector("#balance");
const incomeEl = document.querySelector("#money-plus");
const expenseEl = document.querySelector("#money-minus");
const form = document.querySelector("#form");
const transactionBtn = document.querySelector(".btn");
const text = document.querySelector("#text");
const amount = document.querySelector("#amount");
const list = document.querySelector(".list");
//get local Storage
let transactions = JSON.parse(localStorage.getItem("transaction")) || [];

//set local Storage
const saveTransaction = function () {
  localStorage.setItem("transaction", JSON.stringify(transactions));
};

//add transaction to the DOM
const addTransaction = function (e) {
  e.preventDefault();
  if (text.value === "" || amount.value === "" || isNaN(amount.value)) {
    alert("please fill your text and amount correctly:)");
  } else {
    const tracker = {
      text: text.value,
      amount: +amount.value,
      id: Math.floor(Math.random() * 100000000),
    };

    transactions.push(tracker);
    displayAmount(tracker);
    updateBalance();
    saveTransaction();
    text.value = amount.value = "";
  }
};

form.addEventListener("submit", addTransaction);

//Dispaly transaction History
const displayAmount = function (transaction) {
  const sign = transaction.amount > 0 ? "+" : "-";
  const markup = `<li class="${transaction.amount > 0 ? "plus" : "minus"}">${
    transaction.text
  }<span>${sign}${Math.abs(
    transaction.amount
  )}</span><button class="delete-btn" data-id="${transaction.id}">x</button>
    `;

  list.insertAdjacentHTML("beforeend", markup);
};

//update Balance
const updateBalance = function () {
  const amount = transactions.map((t) => t.amount);
  const total = amount.reduce((acc, cur) => acc + cur, 0).toFixed(2);
  const income = amount
    .filter((i) => i > 0)
    .reduce((acc, cur) => acc + cur, 0)
    .toFixed(2);
  const expense = amount
    .filter((e) => e < 0)
    .reduce((acc, cur) => acc + cur, 0)
    .toFixed(2);

  balanceEl.textContent = `$${total}`;
  incomeEl.textContent = `$${income}`;
  expenseEl.textContent = `$${expense}`;
};

//Delet the trasanction
list.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete-btn")) {
    const id = +e.target.dataset.id;

    transactions = transactions.filter((t) => t.id !== id);

    init();
    saveTransaction();
  }
});

const init = function () {
  list.innerHTML = "";
  transactions.forEach((amount) => displayAmount(amount));
  updateBalance();
};
init();
