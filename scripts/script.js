import data from '../datas/charachter.json' assert { type: 'json' };
import dialoguesJSON from '../datas/test.json' assert { type: 'json' };
console.log(data)
console.log(dialoguesJSON)


const currPiece = 0
let piece = data.pieces[currPiece]
const nbPersos = piece.personnages.length

const itemOwned = []
const reachedDialogue = []

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
buttonClose.addEventListener('click', () => {closeModale()})

function closeModale() {
    modale.close()
}

const modale = document.getElementById('modale')
const modaleTitle = document.getElementById('modale-title')
const modaleBody = document.getElementById('modale-body')


function openModale(type, data) {

    modaleTitle.innerText = type
    modaleBody.innerText = ''

    switch (type) {
        case 'Items':
            modaleItem()
        break;

        case 'Enigme':
            modaleEnigme()
        break;

        case 'Dialogues':
            modaleDialogues()
        break;

        case 'Personnages':
            const currChar = data
            modalePerso(currChar, currChar.pieces[currPiece].baseDialogue)
        break;

        default:
            break;
    }
    modale.showModal()
}

function modaleItem() {
    const nbItems = 8
    for (let i = 0; i < nbItems; i++) {
        const card = document.createElement('div')
        card.classList.add('item-cards')
        modaleBody.appendChild(card)
    }
}

function modaleEnigme() {
    
}

function modaleDialogues() {
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

function modalePerso(perso, dialogue) {

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
    const dialogueDiv = document.createElement('div')
    dialogueDiv.setAttribute('id', 'dialogueLine')
    dialogueDiv.innerText = `"${dialoguesJSON.dialogues[dialogue].line}"`
    reachedDialogue.includes(dialogue) ? null : reachedDialogue.push(dialogue)
    
    const reponseContainer = document.createElement('div')
    const reponsesArray = dialoguesJSON.dialogues[dialogue].reponses
    for (let i = 0; i < reponsesArray.length; i++) {

        if (isConditionOk(reponsesArray[i].conditions)) {
            const reponse = document.createElement('div')
            reponse.classList.add('reponse')
            reponse.innerText = reponsesArray[i].reponseText
            reponse.addEventListener('click', () => {changeDialog(perso, reponsesArray[i].dialogueNext)})
            reponseContainer.appendChild(reponse)            
        }




    }
    dialogueContainer.appendChild(dialogueDiv)
    dialogueContainer.appendChild(reponseContainer)
    
    modalePersoContainer.appendChild(persoRecap)
    modalePersoContainer.appendChild(dialogueContainer)

    modaleBody.appendChild(modalePersoContainer)
}

function changeDialog(currChar, nextDialogue) {
    if (nextDialogue === null) {
        closeModale()
    }
    else{
        modaleBody.innerText = ''
        modalePerso(currChar, nextDialogue)
    }
}

function isConditionOk(conditions) {
    
    if (conditions === null) {
        return true
    } else if (conditions.reachedDialogue != null){
        console.log(conditions)
    }
}