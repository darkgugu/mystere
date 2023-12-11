import data from '../datas/charachter.json' assert { type: 'json' };
console.log(data)


const currPiece = 0
let piece = data.pieces[currPiece]
const nbPersos = piece.personnages.length

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
    const persoImage = document.createElement('img')
    persoImage.setAttribute('src', `../assets/images/${data.personnages[piece.personnages[i]].image}`)
    const persoName = document.createElement('div')
    persoName.innerText = `${data.personnages[piece.personnages[i]].prenom} ${data.personnages[piece.personnages[i]].nom}`
    persoContainer.appendChild(persoImage)
    persoContainer.appendChild(persoName)
    divPersos.appendChild(persoContainer)
}

const divControls = document.createElement('div')
divControls.setAttribute('id', 'controls')

setControlButtons('Items', divControls)
setControlButtons('Enigme', divControls)
setControlButtons('Dialogues', divControls)

const mainContainer = document.getElementById('background')
mainContainer.appendChild(divTitle)
mainContainer.appendChild(divPersos)
mainContainer.appendChild(divControls)


function setControlButtons(buttonName, destination) {
    const button = document.createElement('button')
    button.setAttribute('id', buttonName.toLowerCase())
    button.innerText = buttonName.toUpperCase()
    button.addEventListener('click', () => { openModale(buttonName)})
    destination.appendChild(button)
}

const buttonClose = document.getElementById('close')
buttonClose.addEventListener('click', () => {
    console.log("test")
    modale.close()
})


function openModale(type) {
    console.log(type)
    const modale = document.getElementById('modale')
    const modaleTitle = document.getElementById('modale-title')
    modaleTitle.innerText = type
    const modaleBody = document.getElementById('modale-body')
    modaleBody.innerText = ''

    switch (type) {
        case 'Items':
            modaleItem(modaleBody)
        break;

        case 'Enigme':
            modaleEnigme(modaleBody)
        break;

        case 'Dialogues':
            modaleDialogues(modaleBody)
        break;

        default:
            break;
    }
    modale.showModal()
}

function modaleItem(modaleBody) {
    const nbItems = 8
    for (let i = 0; i < nbItems; i++) {
        const card = document.createElement('div')
        card.classList.add('item-cards')
        modaleBody.appendChild(card)
    }
}

function modaleEnigme(modaleBody) {
    
}

function modaleDialogues(modaleBody) {
    const charName = 'M. Machin'
    const text = 'Lorem ipsum sit dolor amet'
    const nbDialogues = 15

    for (let i = 0; i < nbDialogues; i++) {
        const dialogue = document.createElement('div')
        dialogue.classList.add('dialogueContainer')
        const span = document.createElement('span')
        span.innerText = `${charName} : `
        dialogue.appendChild(span)
        dialogue.innerHTML += text
        modaleBody.appendChild(dialogue)
    }
}

function modalePerso(modaleBody) {

    
}