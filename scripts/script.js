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
    const currChar = data.personnages[piece.personnages[i]]

    const persoContainer = document.createElement('div')
    persoContainer.setAttribute('id', 'persos-' + i)
    persoContainer.classList.add('persos-apercu')
    persoContainer.addEventListener('click', () => openModale('Personnages', currChar))
    const persoImage = document.createElement('img')
    persoImage.setAttribute('src', `./assets/images/${currChar.image}`)
    const persoName = document.createElement('div')
    persoName.innerText = `${currChar.prenom} ${currChar.nom}`
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


function openModale(type, data) {
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

        case 'Personnages':
            modalePerso(modaleBody, data)
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
        dialogue.classList.add('dialogue-historique-container')
        const span = document.createElement('span')
        span.innerText = `${charName} : `
        dialogue.appendChild(span)
        dialogue.innerHTML += text
        modaleBody.appendChild(dialogue)
    }
}

function modalePerso(modaleBody, perso) {

    console.log(perso)
    const nbReponse = 5

    const modalePersoContainer = document.createElement('div')
    modalePersoContainer.setAttribute('id', 'modale-perso')

    const persoRecap = document.createElement('div')
    persoRecap.setAttribute('id', 'perso-recap')
    const imageRecap = document.createElement('img')
    imageRecap.setAttribute('src', `./assets/images/${perso.image}`)
    const textRecap = document.createElement('div')
    const pName = document.createElement('p')
    const pInfos = document.createElement('p')
    pName.innerText = `${perso.prenom} ${perso.nom}`
    pName.setAttribute('id', 'pName')
    pInfos.innerText = perso.infos
    textRecap.appendChild(pName)
    textRecap.appendChild(pInfos)
    persoRecap.appendChild(imageRecap)
    persoRecap.appendChild(textRecap)

    const dialogueContainer = document.createElement('div')
    dialogueContainer.setAttribute('id', 'dialogue-container')
    const dialogue = document.createElement('div')
    dialogue.setAttribute('id', 'dialogueLine')
    dialogue.innerText = `"${perso.dialogues[0].line}"`
    const reponseContainer = document.createElement('div')
    for (let i = 0; i < nbReponse; i++) {
        const reponse = document.createElement('div')
        reponse.classList.add('reponse')
        reponse.innerText = 'Ceci est une réponse du joueur'
        reponseContainer.appendChild(reponse)
    }
    dialogueContainer.appendChild(dialogue)
    dialogueContainer.appendChild(reponseContainer)
    
    modalePersoContainer.appendChild(persoRecap)
    modalePersoContainer.appendChild(dialogueContainer)

    modaleBody.appendChild(modalePersoContainer)
}