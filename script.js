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
   let arrValue = [];
   let arr1 = [];
   let arr2 = [];

   let coursesBlock = document.querySelector('.courses');
   let item

   let priceFrom = document.querySelector('.price__input-from input');
   let priceTo = document.querySelector('.price__input-to input');

   let serchBtn = document.querySelector('.price__search');

   let clearFilter = document.querySelector('.filter__clear');


   // ввод значений 
   function inputPrice(inputName) {
      inputName.addEventListener('input', () => {
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
         inputNumber(inputName)

         if (inputName.value.length > 0) {
            inputName.parentNode.classList.add('not-empty');
         } else {
            inputName.parentNode.classList.remove('not-empty');
         }
      })
   }
   priceFrom.onfocus = inputPrice(priceFrom)
   priceTo.onfocus = inputPrice(priceTo)

   // очистить инпуты
   function clearInput(inputName) {
      inputName.value = '';
      inputName.parentNode.classList.remove('not-empty');
   }

   // создание списка 
   function createList(arr) {
      coursesBlock.textContent = '';
      arr.forEach(elem => {
         item =
            `<li>
               <span class="name">${elem['name']}.</span>
               <span>Prices from: ${elem['prices'][0] != null ? elem['prices'][0] : 'price from not specified'}.</span>
               <span>Prices to: ${elem['prices'][1] != null ? elem['prices'][1] : 'price to not specified'}.</span>
            </li>`
         coursesBlock.insertAdjacentHTML("beforeend", item)
      })
   }
   createList(courses)

   document.addEventListener('click', (event) => {
      let target = event.target;

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
         let valueFrom = priceFrom.value
         let valueTo = priceTo.value

         courses.forEach((elem, index) => {
            if (valueFrom != 0 && valueTo != 0) {
               if ((valueFrom <= elem['prices'][1] || elem['prices'][1] == null) && (valueTo >= elem['prices'][0] || elem['prices'][0] == null)) {
                  arrValue.push(elem)
               }
            } else if (valueFrom != 0) {
               if (elem['prices'][0] != null) {
                  if (valueFrom <= elem['prices'][0] || valueFrom <= elem['prices'][1]) {
                     arrValue.push(elem)
                  }
               } else {
                  if (elem['prices'][1] != null) {
                     if (valueFrom <= elem['prices'][1]) {
                        arrValue.push(elem)
                     }
                  } else {
                     arrValue.push(elem)
                  }
               }
            } else if (valueTo != 0) {
               if (elem['prices'][1] != null) {
                  if (valueTo >= elem['prices'][1] || valueTo >= elem['prices'][0]) {
                     arrValue.push(elem)
                  }
               } else {
                  if (elem['prices'][0] != null) {
                     if (valueTo >= elem['prices'][0]) {
                        arrValue.push(elem)
                     }
                  } else {
                     arrValue.push(elem)
                  }
               }
            }
         })
         createList(arrValue)
         arrValue = []
      }

      // нажатие кнопк сбросить фильтр
      if (target == clearFilter) {
         clearInput(priceFrom)
         clearInput(priceTo)
         createList(courses)
      }
   })
});