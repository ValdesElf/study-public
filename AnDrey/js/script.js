
// Открыть модальное окно
const myModal = document.querySelector('#my-modal')
const hideModal = function() {
    myModal.classList.remove('open')
}
const showModal = function() {
    myModal.classList.add('open')
}

document.querySelector("#open-modal-btn").addEventListener("click", showModal)

// Закрыть модальное окно
document.getElementById("close-my-modal-btn").addEventListener("click", hideModal)

// Закрыть модальное окно при нажатии на Esc
window.addEventListener('keydown', function(e) {
    if (e.key === "Escape") {
        hideModal()
    }
});



// Закрыть модальное окно при клике вне его
document.querySelector("#my-modal .modal__box").addEventListener('click', event => {
    event._isClickWithInModal = true;
});
myModal.addEventListener('click', event => {
    if (event._isClickWithInModal) return;
    event.currentTarget.classList.remove('open');
});







// let spanAll = document.querySelectorAll('span')
// let dataContent = document.querySelector('[data-content="pa"]')
// let urlAll = document.querySelectorAll('a')
// let br = document.querySelector('br')
// br.remove()
// let byId = document.querySelectorAll('#other')
// let tagName = document.querySelector()

// // const displayNone = function() {
// //     br.style.display = 'none'
// // } 
// // displayNone(br)


// console.log(spanAll)
// console.log(dataContent)
// console.log(urlAll)
// console.log(br)
// console.log(byId)



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




window.test = function(jopa, pisa) {

    console.log(jopa+pisa)
    return pisa+jopa
}



