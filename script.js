const numbers = document.querySelectorAll('.number');
const signs = document.querySelectorAll('.sign');

const result = document.querySelector('.result span');
const equals = document.querySelector('.equals');
const comma = document.querySelector('.comma');

const clear = document.querySelector('.clear');
const negative = document.querySelector('.negative');
const percent = document.querySelector('.percent');

let firstValue = '';
let isFirstValue = false;
let secondValue = '';
let sign = '';
let resultValue = 0;

// 1. Проверка смены первого и второго значения
for (let i = 0; i < numbers.length; i++) {
  numbers[i].addEventListener('click', (e) => {
    let atr = e.target.getAttribute('value');

    if (isFirstValue === false) {
      getFirstValue(atr);
    } else {
      getSecondValue(atr);
    }
  });
}

function addSpaces(value) {
  value = value.toString().replaceAll(' ', '');
  let isNegative = false;
  if (value.indexOf('-') > -1) {
    isNegative = true;
    value = value.slice(1);
  }

  let secondPart = '';
  let commaId = value.indexOf('.');
  if (commaId > -1) {
    secondPart = value.slice(commaId);
    value = value.slice(0, commaId);
  }

  let n = Math.floor((value.length - 1) / 3);
  let a = value.length % 3 || 3;

  switch (n) {
    case 1:
      value = value.slice(0, a) + ' ' + value.slice(a);
      break;
    case 2:
      value =
        value.slice(0, a) +
        ' ' +
        value.slice(a, a + 3) +
        ' ' +
        value.slice(a + 3);
      break;
    default:
      break;
  }
  value = value + secondPart;

  if (isNegative) {
    value = '-' + value;
  }
  return value;
}

// 2. Вывод первого значения
// 2.1 Проверка на длину символов
// 2.2 Проверка нуля
// 2.3 Проверка на размер шрифта
function getFirstValue(el) {
  firstValue = firstValue.toString().replaceAll(' ', '');
  if (firstValue.replace('-', '').replace('.', '').length < 9) {
    if (firstValue == '0') {
      firstValue = el;
    } else {
      firstValue += el;
    }

    firstValue = addSpaces(firstValue);
    result.innerHTML = firstValue;

    scaleFontSize(firstValue);
  }
}

// 3. Вывод второго значения
// 3.1 Проверка на длину символов
// 3.2 Проверка нуля
// 3.4 Проверка на размер шрифта
// 3.3 Проверка ввода первого значения после получения результата
function getSecondValue(el) {
  secondValue = secondValue.toString().replaceAll(' ', '');
  if (secondValue.replace('-', '').replace('.', '').length < 9) {
    if (sign) {
      if (firstValue === '') {
        firstValue = 0;
      }
      if (secondValue == '0') {
        secondValue = el;
        isFirstValue = true;
      } else {
        secondValue += el;
        isFirstValue = true;
      }

      secondValue = addSpaces(secondValue);
      result.innerHTML = secondValue;

      scaleFontSize(secondValue);
    } else if (resultValue !== '') {
      firstValue = '';
      resultValue = '';
      isFirstValue = false;
      getFirstValue(el);
    }
  }
}

// 4. Вывод знака
// 4.1 Проверка первого значения на true
// 4.2 Вызов функции getResult при нажатии на sign
function getSign() {
  for (let i = 0; i < signs.length; i++) {
    signs[i].addEventListener('click', (e) => {
      if (isFirstValue && secondValue) {
        getResult();
      } else {
        isFirstValue = true;
      }
      sign = e.target.getAttribute('value');
    });
  }
}
getSign();

// 5. Вызов функции getResult при нажатии на equals
equals.addEventListener('click', () => {
  getResult();
  sign = '';
});

// 6 Вывод результата
// 6.1 Проверка на отсутствие второго значения и приравнивание его к первому значению
// 6.2 Приведение обоих значений в числовой тип
// 6.3 Условие sign
// 6.4 Проверка на отсутствие sign и приравнивание результата к первому значению
// 6.5 Проверка на длину цифр и длину цифр после запятой
// 6.6 Проверка на размер шрифта
function getResult() {
  if (sign && secondValue === '') {
    secondValue = firstValue;
  }

  firstValue = Number(firstValue.toString().replaceAll(' ', ''));
  secondValue = Number(secondValue.toString().replaceAll(' ', ''));

  if (sign === '/') {
    resultValue = firstValue / secondValue;
  } else if (sign === '*') {
    resultValue = firstValue * secondValue;
  } else if (sign === '-') {
    resultValue = firstValue - secondValue;
  } else if (sign === '+') {
    resultValue = firstValue + secondValue;
  } else if (sign === '') {
    resultValue = firstValue;
  }

  if (resultValue.toString().length > 9) {
    resultValue = Number(resultValue).toExponential(5);
  } else {
    resultValue = addSpaces(resultValue);
  }

  result.innerHTML = resultValue;
  firstValue = resultValue;
  secondValue = '';

  scaleFontSize(firstValue);
}

// 7. Вывод определённого размера шрифта
function scaleFontSize(num) {
  num = num.toString().replaceAll(' ', '').length;
  result.style.fontSize = '100px';

  if (num > 5) {
    result.style.fontSize = '90px';
  }
  if (num > 6) {
    result.style.fontSize = '80px';
  }
  if (num > 7) {
    result.style.fontSize = '70px';
  }
  if (num > 8) {
    result.style.fontSize = '60px';
  }
}

// 8. Вывод точки
// 8.1 Проверка на наличие одной точки в каждом значении
comma.addEventListener('click', () => {
  result.innerHTML = '';
  if (!isFirstValue) {
    if (firstValue.toString().indexOf('.') == -1) {
      if (firstValue === '') {
        firstValue = 0 + '.';
      } else {
        firstValue = firstValue + '.';
      }
    }
    result.innerHTML = firstValue;
  } else {
    if (secondValue.toString().indexOf('.') == -1) {
      if (secondValue === '') {
        secondValue = 0 + '.';
      } else {
        secondValue = secondValue + '.';
      }
    }
    result.innerHTML = secondValue;
  }
});

// 9. Сброс всех значений, знаков и шрифта
clear.addEventListener('click', () => {
  result.innerHTML = 0;

  firstValue = '';
  isFirstValue = false;
  secondValue = '';
  sign = '';
  resultValue = 0;

  scaleFontSize(resultValue);
});

// 10. Смена знака
// 10.1 Проверка размера шрифта
negative.addEventListener('click', () => {
  if (firstValue !== '' && secondValue === '') {
    if (firstValue.toString().indexOf('-') == -1) {
      resultValue = '-' + addSpaces(firstValue);
    } else {
      resultValue = firstValue.slice(1);
    }
    firstValue = resultValue;
  }

  if (secondValue !== '') {
    if (secondValue.toString().indexOf('-') == -1) {
      resultValue = '-' + addSpaces(secondValue);
    } else {
      resultValue = secondValue.slice(1);
    }
    secondValue = resultValue;
  }

  result.innerHTML = resultValue;

  scaleFontSize(resultValue);
});

// 11. Вывод процента
// 11.1 Проверка на длину цифр и длину цифр после запятой
// 11.2 Проверка размера шрифта
percent.addEventListener('click', () => {
  if (firstValue !== '') {
    resultValue = firstValue / 100;
    firstValue = resultValue;
  }

  if (secondValue !== '') {
    resultValue = secondValue / 100;
    secondValue = resultValue;
  }

  if (resultValue.toString().length > 9) {
    resultValue = Number(resultValue).toExponential(5);
  }

  result.innerHTML = resultValue;

  scaleFontSize(resultValue);
});
