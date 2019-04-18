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
const shippingCostChina = 100;
const shippingCostSouthAmerika = 250;
const shippingCostAustralia = 170;
const shippingCostIndia = 80;
const shippingCostJamaika = 120;

if (yourCountry === null) {
  console.log("Canceled by user");
} else {
  switch (yourCountry.toLowerCase()) {
    case 'china':
      console.log (`Shipping to ${yourCountry} will cost ${shippingCostChina} credits`);
      break;
    
    case 'south amerika':
      console.log (`Shipping to ${yourCountry} will cost ${shippingCostSouthAmerika} credits`);
      break;
  
    case 'australia':
      console.log (`Shipping to ${yourCountry} will cost ${shippingCostAustralia} credits`);
      break;
  
    case 'india':
      console.log (`Shipping to ${yourCountry} will cost ${shippingCostIndia} credits`);
      break;
  
    case 'jamaika':
      console.log (`Shipping to ${yourCountry} will cost ${shippingCostJamaika} credits`);
      break;

    default:
      console.log("Shipping to your location is unavailable");
  }
  }

  