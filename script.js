document.addEventListener("DOMContentLoaded", function () {

   // Список курсов
   let courses = [
      { name: "Courses in England", prices: [0, 100] },
      { name: "Courses in Germany", prices: [500, null] },
      { name: "Courses in Italy", prices: [100, 200] },
      { name: "Courses in Russia", prices: [null, 400] },
      { name: "Courses in China", prices: [50, 250] },
      { name: "Courses in USA", prices: [200, null] },
      { name: "Courses in Kazakhstan", prices: [56, 324] },
      { name: "Courses in France", prices: [null, null] },
   ];

   let coursesBlock = document.querySelector('.courses');
   let coursesItem

   let priceFrom = document.querySelector('.price__input-from input');
   let priceTo = document.querySelector('.price__input-to input');

   let serchBtn = document.querySelector('.price__search');

   let clearFilter = document.querySelector('.filter__clear');

   // функция для ввода только чисел 
   function inputNumber(input) {
      // проверка на пробелы 
      if (input.value == false) {
         input.value = "";
      }

      if (input.value.length > 0) {
         let inputDataArr = input.value.split(/[- — /]/);
         let inputDataClear = inputDataArr.join('');
         let inputDataArrNew = inputDataClear.match(/.{1,1}/g);

         // отсекает первый ноль если больше 1 символа
         if (inputDataArrNew[0] == 0 && inputDataArrNew.length == 2) {
            inputDataArrNew.shift();
         }

         let inputDataArrClear = inputDataArrNew.filter(function (arr) {
            return arr.match(/^[1-9]|[0-9]|[0-9]$/g);
         });

         // фильтр на посторонние символы
         if (!inputDataArrNew[inputDataArrNew.length - 1].match(/[0-9]/)) {
            inputDataArrNew.length = inputDataArrNew.length - 1
            input.value = inputDataArrNew.join('');
         }
         input.value = inputDataArrClear.join('');
      }
   }

   // ввод значений 
   function inputPrice(inputName) {
      inputName.addEventListener('input', () => {
         inputNumber(inputName)

         if (inputName.value.length > 0) {
            inputName.parentNode.classList.add('not-empty');
         } else {
            inputName.parentNode.classList.remove('not-empty');
         }
      })
   }

   // очистить инпуты
   function clearInput(inputName) {
      inputName.value = '';
      inputName.parentNode.classList.remove('not-empty');
   }

   // создание списка 
   function createList() {
      coursesBlock.textContent = '';
      courses.forEach(elem => {
         coursesItem = `<li>${elem['name']} [${elem['prices']}]</li>`
         coursesBlock.insertAdjacentHTML("beforeend", coursesItem)
      })
   }
   createList()

   document.addEventListener('click', (event) => {
      let target = event.target;

      // ввод значения цена от
      if (target == priceFrom) {
         inputPrice(priceFrom)
      }

      // ввод значения цена до
      if (target == priceTo) {
         inputPrice(priceTo)
      }

      // нажатие на крестик в поле от
      if (target.closest('.clear') && target.closest('.price__input-from')) {
         clearInput(priceFrom)
      }

      // нажатие на крестик в поле до
      if (target.closest('.clear') && target.closest('.price__input-to')) {
         clearInput(priceTo)
      }

      // нажатие кнопк поиск
      if (target == serchBtn) {
         let valueFrom = Number(priceFrom.value)
         let valueTo = Number(priceTo.value)

         courses.forEach(elem => {
            if (valueFrom != 0 && valueTo != 0) {
               if (valueFrom >= elem['prices'][0] && valueFrom <= elem['prices'][1]) {
                  console.log(elem);
               }
            } else if (valueFrom != 0 && valueTo == 0) {
            } else if (valueFrom == 0 && valueTo != 0) {
               // if (valueTo <= elem['prices'][1] || elem['prices'][1] !== null) {
               //    console.log(elem);
               // }
            }
         })
      }

      // нажатие кнопк сбросить фильтр
      if (target == clearFilter) {
         clearInput(priceFrom)
         clearInput(priceTo)
      }
   })
});
