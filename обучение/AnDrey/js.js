let spanAll = document.querySelectorAll('span')
let dataContent = document.querySelector('[data-content="pa"]')
let urlAll = document.querySelectorAll('a')
let br = document.querySelector('br')
br.remove()
let byId = document.querySelectorAll('#other')
let tagName = document.querySelector()

// const displayNone = function() {
//     br.style.display = 'none'
// } 
// displayNone(br)


console.log(spanAll)
console.log(dataContent)
console.log(urlAll)
console.log(br)
console.log(byId)



// Открыть модальное окно
document.getElementById("open-modal-btn").addEventListener("click", function() {
    document.getElementById("my-modal").classList.add("open")
})

// Закрыть модальное окно
document.getElementById("close-my-modal-btn").addEventListener("click", function() {
    document.getElementById("my-modal").classList.remove("open")
})

// Закрыть модальное окно при нажатии на Esc
window.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
        document.getElementById("my-modal").classList.remove("open")
    }
});

// Закрыть модальное окно при клике вне его
document.querySelector("#my-modal .modal__box").addEventListener('click', event => {
    event._isClickWithInModal = true;
});
document.getElementById("my-modal").addEventListener('click', event => {
    if (event._isClickWithInModal) return;
    event.currentTarget.classList.remove('open');
});








// let titleList = document.querySelectorAll('#title') 
// let secondTitle = titleList[1]
// let firstTitle = titleList[0]

// const updateColorTitle = function() {
//     secondTitle.style.color = 'red'
// }
// firstTitle.addEventListener('click', updateColorTitle)


// secondTitle.style.fontSize = '20px'

// console.log(titleList)
// console.log(secondTitle)


