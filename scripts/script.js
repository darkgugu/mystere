const nbPersos = 4

const divTitle = document.createElement('div')
divTitle.setAttribute('id', 'title')
const buttonMove = document.createElement('button')
buttonMove.setAttribute('id', 'deplacement')
buttonMove.innerText = 'Déplacement'
const titleP = document.createElement('p')
titleP.innerText = "Nom de la pièce"
const emptyDiv = document.createElement('div')

divTitle.appendChild(buttonMove)
divTitle.appendChild(titleP)
divTitle.appendChild(emptyDiv)

const divPersos = document.createElement('div')
divPersos.setAttribute('id', 'persos')
for (let i = 0; i < nbPersos; i++) {
    const persoContainer = document.createElement('div')
    persoContainer.setAttribute('id', 'persos-' + i)
    persoContainer.classList.add('persos-apercu')
    persoContainer.innerText = persoContainer.id
    divPersos.appendChild(persoContainer)
}

const divControls = document.createElement('div')
divControls.setAttribute('id', 'controls')

setControlButtons('Items', divControls)
setControlButtons('Enigme', divControls)
setControlButtons('Dialogue', divControls)

const mainContainer = document.getElementById('background')
mainContainer.appendChild(divTitle)
mainContainer.appendChild(divPersos)
mainContainer.appendChild(divControls)


function setControlButtons(buttonName, destination) {
    const button = document.createElement('button')
    button.setAttribute('id', buttonName.toLowerCase())
    button.innerText = buttonName.toUpperCase()
    destination.appendChild(button)
}

const modale = document.getElementById('modale')
const buttonOpen = document.getElementById('items')
buttonOpen.addEventListener('click', () => {
    modale.showModal()
})

const buttonClose = document.getElementById('close')
buttonClose.addEventListener('click', () => {
    console.log("test")
    modale.close()
})
