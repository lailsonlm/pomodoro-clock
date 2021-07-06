const btnConfig = document.querySelector('.config')
const modal = document.querySelector('.modal-wrapper')
const btnSave = document.querySelector('.btn-save')
    
btnConfig.addEventListener('click', activeModal)
modal.addEventListener('click', closeModal)

function activeModal() {
    modal.classList.add('active')
}

function closeModal(event) {
    if(event.target.className === "modal-wrapper active" || event.target.className === "close") {
        modal.classList.remove('active')
   }
}

btnSave.addEventListener('click', SaveSettings)

function SaveSettings() {   
    modal.classList.remove('active')
}

