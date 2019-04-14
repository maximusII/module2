'use strict'

/*

Task 1

*/

// Напиши скрипт имитирующий авторизацию администратора в панели управления.

// Есть переменная message в которую будет записано сообщение о результате. При загрузке страницы у посетителя запрашивается пароль через prompt:

// Если нажали Cancel, записать в message строку 'Отменено пользователем!'
// В протовном случае, если введен пароль который совпадает со значением константы ADMIN_PASSWORD, записать в message строку 'Добро пожаловать!'
// В противном случае, то есть если ни одно из предыдущих условий не выполнилось, записать в message строку 'Доступ запрещен, неверный пароль!'
// После всех проверок вывести в alert значение переменной message.
// const ADMIN_PASSWORD = 'm4ng0h4ckz';
// let message;

/*

Script 1

*/

const ADMIN_PASSWORD = 'm4ng0h4ckz';
let message;
const passwordRequest = prompt ("Enter the password");
if (passwordRequest === null) {
  message = "Canceled by user";
} else if (passwordRequest === ADMIN_PASSWORD) { 
  message = "Welcome!";
} else {
  message = "Access denied, wrong password";
}
alert (message);


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

// let credits = 23580;
// const pricePerDroid = 3000;
// const droidQuantityToBuy = prompt ("How many droids you would like to buy?");
// let totalPrice;
// let userBalance;

// if (droidQuantityToBuy === null) {
//   console.log("Canceled by user");
// } else if (Number(droidQuantityToBuy) % 1 !== 0) {
//   console.log("Enter the integer number, please");
// } else if (Number(droidQuantityToBuy)>0) {
//   totalPrice = Number(droidQuantityToBuy*pricePerDroid);
//   // console.log(totalPrice);
//   // console.log(typeof totalPrice);
//   if (totalPrice>credits) {
//     console.log("Not enough assets on account");
//   } else {
//     userBalance = credits - totalPrice;
//     console.log(`You bought ${droidQuantityToBuy} droids, your balance is ${userBalance} credits`);
//   }
//   } else {
//     console.log("Enter the integer number bigger than 0, please!");
//   }


/*

Task 3

*/

// Пользователь может оформить доставку товара к себе в страну, указав ее при посещении страницы в prompt. Учти, что пользователь может ввести имя страны не только буквами нижнего регистра, а к примеру 'кИтАЙ'.

// Напиши скрипт который выводит сообщение о стоимости доставки в указанную страну. Формат сообщения: 'Доставка в [страна] будет стоить [цена] кредитов'.

// Но доставка есть не везде, если указанной страны нет в списке, то выводи в консоль сообщение 'В вашей стране доставка не доступна'.

// Ниже приведен список стран и стоимость доставки.

// китай - 100 кредитов
// южная америка - 250 кредитов
// австралия - 170 кредитов
// индия - 80 кредитов
// ямайка - 120 кредитов
// PS: используй switch

/*

Script 3

*/

// let yourCountry = prompt ("What is your country?");
// let shippingCost; 
// let message;

// if (yourCountry === null) {
//   console.log("Canceled by user");
// } else {
//   let yourCountryLowerCase = yourCountry.toLowerCase();
//   switch (yourCountryLowerCase) {
//     case 'china':
//       shippingCost = 100;
//       break;
    
//     case 'south amerika':
//       shippingCost = 250;
//       break;
  
//     case 'australia':
//       shippingCost = 170;
//       break;
  
//     case 'india':
//       shippingCost = 80;
//       break;
  
//     case 'jamaika':
//       shippingCost = 120;
//       break;

//     default:
//       console.log("Shipping to your location is unavailable");
//   }
//   if (shippingCost) {
//   message = `Shipping to ${yourCountry} will cost ${shippingCost} credits`;
//   console.log(message);
//   }
// } 

  