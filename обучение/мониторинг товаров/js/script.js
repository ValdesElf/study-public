// // Открыть модальное окно
// document.getElementById("open-modal-btn").addEventListener("click", function() {
//     document.getElementById("my-modal").classList.add("open")
// })

// // Закрыть модальное окно
// document.getElementById("close-my-modal-btn").addEventListener("click", function() {
//     document.getElementById("my-modal").classList.remove("open")
// })

// const asideRemove = function() {
//     document.querySelector('.aside').classList.remove('.aside_active');
// }
// asideRemove();

const button = document.querySelector("#asideActiveBtn")
const aside = document.querySelector('.aside')
const subscriptionArray = [
    {
      status: 'Уведомлен о наличии',
      email: 'pateder@yandex.ru',
      productId: 23423423,
      variantId: 45235646,
      title: 'Джинсы Бойфренд S',
      createAt: new Date('24.10.2023')
    },
    {
      status: 'Ожидает товара',
      email: 'pateder@yandex.ru',
      productId: 23423423,
      variantId: 45235646,
      title: 'Джинсы Бойфренд S',
      createAt: new Date('25.11.2023')
    },
    {
      status: 'Уведомлен о наличии',
      email: 'pateder@yandex.ru',
      productId: 23423423,
      variantId: 45235646,
      title: 'Джинсы Бойфренд S',
      createAt: new Date('13.12.2023')
    },
    {
      status: 'Уведомлен о наличии',
      email: 'pateder@yandex.ru',
      productId: 23423423,
      variantId: 45235646,
      title: 'Джинсы Бойфренд S',
      createAt: new Date('12.11.2023')
    },
    {
      status: 'Уведомлен о наличии',
      email: 'pateder@yandex.ru',
      productId: 23423423,
      variantId: 45235646,
      title: 'Джинсы Бойфренд S',
      createAt: new Date('12.12.2022')
    }
];

const subscriptioinWrapper = document.querySelector('#subscription-wrapper')
let statusMode = '';
subscriptionArray.forEach(function(item) {
  if (item.status == 'Уведомлен о наличии') {
    statusMode = 'subscription__item-status_green'
   } else if (item.status == 'Ожидает товара') {
     statusMode = 'subscription__item-status_yellow'
   };
  const subscriptionItem = `
  <li class="subscription__item">
    <div class="subscription__item-status ${statusMode}">${item.status}</div>
    <div class="subscription__item-email">${item.email}</div>
    <div class="subscription__item-product-id">${item.productId}</div>
    <div class="subscription__item-variant-id">${item.variantId}</div>
    <div class="subscription__item-title">${item.title}</div>
    <div class="subscription__item-time">${item.createAt}</div>
  </li>`;
  subscriptioinWrapper.innerHTML += subscriptionItem;
});






const container = document.querySelector('.subscription__item');
  // const html = subscriptionArray.map(i => { return '<div>$(i)</div>'}).join('')
  // container.innerHTML += html



button.addEventListener('click', function()  {
    // aside.classList.toggle('aside_active')
    if (aside.classList.contains('aside_active')) {
        localStorage.setItem('isOpen', 'false')
        aside.classList.remove('aside_active')
    } else {
        localStorage.setItem('isOpen', 'true')
        aside.classList.add("aside_active")
    }
});

const localStorageEvent = function() {
    if (localStorage.getItem('isOpen') === 'false') {
        aside.classList.remove('aside_active')
    } else {
        aside.classList.add("aside_active")
    }
}

localStorageEvent()

// document.querySelector(".info").addEventListener('click', function()  {
//     if (document.querySelector('.aside').contains('.aside_active')) {
//     document.getElementById("aside").classList.remove("aside_active")}
// });



// function openNav() {
//     document.getElementById("aside").classList.add("aside_active");
//   }
  

//   function closeNav() {
//     document.getElementById("aside").classList.remove("aside_active");
//   }


// // Закрыть модальное окно при нажатии на Esc
// window.addEventListener('keydown', (e) => {
//     if (e.key === "Escape") {
//         document.getElementById("my-modal").classList.remove("open")
//     }
// });

// // Закрыть модальное окно при клике вне его
// document.querySelector("#my-modal .modal__box").addEventListener('click', event => {
//     event._isClickWithInModal = true;
// });
// document.getElementById("my-modal").addEventListener('click', event => {
//     if (event._isClickWithInModal) return;
//     event.currentTarget.classList.remove('open');
// });