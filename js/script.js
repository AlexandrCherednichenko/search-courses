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

   let sorting = document.querySelector('.sorting');
   let sortingHeader = sorting.querySelector('.sorting__header');
   let sortingList = sorting.querySelector('.sorting__list');

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
            `<li data-name="${elem['name']}" data-from="${elem['prices'][0] != null ? elem['prices'][0] : null}" data-to="${elem['prices'][1] != null ? elem['prices'][1] : null}">
               <span class="name">${elem['name']}.</span>
               <span class="from">Цена от: <b>${elem['prices'][0] != null ? elem['prices'][0] : 'начальная цена не указанна'}</b>.</span>
               <span class="to">Цена до: <b>${elem['prices'][1] != null ? elem['prices'][1] : 'конечная цена не указанна'}</b>.</span>
            </li>`
         coursesBlock.insertAdjacentHTML("beforeend", item)
      })
   }
   createList(courses)

   document.addEventListener('click', (event) => {
      let target = event.target;

      // нажатие на поле сортировки
      if (target == sortingHeader) {
         sorting.classList.toggle('active')
      } else {
         if (sorting.classList.contains('active')) {
            sorting.classList.remove('active')
         }
      }

      // нажатие на элементы из списка сортировки
      if (target.closest('.item') && target.parentNode == sortingList) {
         sortingHeader.textContent = target.closest('.item').textContent

         let coursesBlockItem = document.querySelectorAll('li')
         let arr = []
         if (coursesBlockItem.length != 0) {
            coursesBlockItem.forEach(item => {
               arr.push(
                  {
                     name: item.getAttribute('data-name'),
                     prices: [item.getAttribute('data-from') != 'null' ? item.getAttribute('data-from') : null,
                     item.getAttribute('data-to') != 'null' ? item.getAttribute('data-to') : null]
                  }
               )
            })
         }

         // сортировка
         if (target.closest('.item').getAttribute("data-value") == 'ascending') {
            arr.sort(function (a, b) {
               return a.prices[0] - b.prices[0];
            });
            createList(arr)
         } else {
            arr.sort(function (a, b) {
               return b.prices[0] - a.prices[0];
            });
            createList(arr)
         }
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
         sortingHeader.textContent = 'Сортировка'
         let valueFrom = priceFrom.value
         let valueTo = priceTo.value

         courses.forEach((elem) => {
            if (valueFrom != 0 && valueTo != 0) {
               if (Number(valueFrom) > Number(valueTo)) {
                  priceFrom.classList.add('error');
                  priceTo.classList.add('error');
                  setTimeout(() => {
                     priceFrom.classList.remove('error');
                     priceTo.classList.remove('error');
                  }, 1000)
               } else {
                  if ((valueFrom <= elem['prices'][1] || elem['prices'][1] == null) && (valueTo >= elem['prices'][0] || elem['prices'][0] == null)) {
                     arrValue.push(elem)
                  }
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
            } else {
               arrValue = courses;

               priceFrom.classList.add('error');
               priceTo.classList.add('error');
               setTimeout(() => {
                  priceFrom.classList.remove('error');
                  priceTo.classList.remove('error');
               }, 1000)
            }
         })

         if (arrValue.length != 0) {
            createList(arrValue)
            arrValue = []
         } else {
            coursesBlock.textContent = 'К сожаления курсы не найденны'
         }
      }

      // нажатие кнопк сбросить фильтр
      if (target == clearFilter) {
         sortingHeader.textContent = 'Сортировка'
         clearInput(priceFrom)
         clearInput(priceTo)
         createList(courses)
      }

      // нажнатие на популярные значения
      if (target.tagName == 'BUTTON' && target.closest('.popular__queries')) {
         sortingHeader.textContent = 'Сортировка'

         if (target.getAttribute('data-from') != 'null') {
            priceFrom.value = target.getAttribute('data-from')
            priceFrom.parentNode.classList.add('not-empty')
         }

         if (target.getAttribute('data-to') != 'null') {
            priceTo.value = target.getAttribute('data-from')
            priceTo.parentNode.classList.add('not-empty')
         }

         serchBtn.click();
      }
   })
});