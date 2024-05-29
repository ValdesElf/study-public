const servicesAsidePanels = document.querySelectorAll('.services-side-panel__list ul')
console.log(servicesAsidePanels);
servicesAsidePanels.forEach(servicesAsidePanel => {
    console.log(servicesAsidePanel);
    const toggleButton = servicesAsidePanel.querySelector('.services-item_more');
    console.log(toggleButton);
    toggleButton ? toggleButton.addEventListener('click', function() {
        servicesAsidePanel.classList.toggle('open');
    }) : null;
})