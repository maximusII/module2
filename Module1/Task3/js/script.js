'use strict'

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

let yourCountry = prompt ("What is your country?");
let shippingCost; 
let message;

if (yourCountry === null) {
  console.log("Canceled by user");
} else {
  let yourCountryLowerCase = yourCountry.toLowerCase();
  switch (yourCountryLowerCase) {
    case 'china':
      shippingCost = 100;
      break;
    
    case 'south amerika':
      shippingCost = 250;
      break;
  
    case 'australia':
      shippingCost = 170;
      break;
  
    case 'india':
      shippingCost = 80;
      break;
  
    case 'jamaika':
      shippingCost = 120;
      break;

    default:
      console.log("Shipping to your location is unavailable");
  }
  if (shippingCost) {
  message = `Shipping to ${yourCountry} will cost ${shippingCost} credits`;
  console.log(message);
  }
} 

  