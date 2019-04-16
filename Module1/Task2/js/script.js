'use strict'

/*

Task 2

*/

// На счету пользователя есть 23580 кредитов, значение хранится в переменной credits (создай и присвой). Пользователь решает купить ремонтных дроидов, которые стоят по 3000 кредитов за штуку. Цена одного дроида хранится в переменной pricePerDroid (создай и присвой).

// При посещении страницы, используя prompt, необходимо спросить количество дроидов которые пользователь хочет купить и сохранить в переменную.

// Напиши скрипт который:

// Если в prompt была нажата Cancel, выводит в консоль сообщение 'Отменено пользователем!'.
// В противном случае, рассчитывает общую цену заказа и сохраняет в переменной totalPrice.
// Проверяет сможет ли пользователь оплатить заказ:
// если сумма к оплате превышает количество кредитов на счету, выводи в консоль сообщение 'Недостаточно средств на счету!'.
// в противном случае необходимо посчитать остаток кредитов на счету и вывести сообщение 'Вы купили [число] дроидов, на счету осталось [число] кредитов.'.

/*

Script 2

*/

let credits = 23580;
const pricePerDroid = 3000;
const droidQuantityToBuy = prompt ("How many droids you would like to buy?");
let totalPrice;
let userBalance;

if (droidQuantityToBuy === null) {
  console.log("Canceled by user");
} else if (Number(droidQuantityToBuy) % 1 !== 0) {
  console.log("Enter the integer number, please");
} else if (Number(droidQuantityToBuy)>0) {
  totalPrice = droidQuantityToBuy*pricePerDroid;
  if (totalPrice>credits) {
    console.log("Not enough assets on account");
  } else {
    userBalance = credits - totalPrice;
    console.log(`You bought ${droidQuantityToBuy} droids, your balance is ${userBalance} credits`);
  }
  } else {
    console.log("Enter the integer number bigger than 0, please!");
  }
