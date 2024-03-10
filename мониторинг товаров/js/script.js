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
      status: 'new',
      email: 'pateder@yandex.ru',
      productId: 23423423,
      variantId: 45235646,
      title: 'Джинсы Бойфренд S',
      createAt: new Date('24.10.2023')
    },
    {
      status: 'new',
      email: 'pateder@yandex.ru',
      productId: 23423423,
      variantId: 45235646,
      title: 'Джинсы Бойфренд S',
      createAt: new Date('25.11.2023')
    },
    {
      status: 'new',
      email: 'pateder@yandex.ru',
      productId: 23423423,
      variantId: 45235646,
      title: 'Джинсы Бойфренд S',
      createAt: new Date('13.12.2023')
    },
    {
      status: 'new',
      email: 'pateder@yandex.ru',
      productId: 23423423,
      variantId: 45235646,
      title: 'Джинсы Бойфренд S',
      createAt: new Date('12.11.2023')
    },
    {
      status: 'new',
      email: 'pateder@yandex.ru',
      productId: 23423423,
      variantId: 45235646,
      title: 'Джинсы Бойфренд S',
      createAt: new Date('12.12.2022')
    }
]
subscriptionArray.forEach(function(item) {
  let row = document.createElement('tr')
  row.innerHTML = `
    subscription__item
  `
})


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