import charachterJSON from '../datas/charachter.json' assert { type: 'json' };
import dialoguesJSON from '../datas/dialogues.json' assert { type: 'json' };
import piecesJSON from '../datas/pieces.json' assert { type: 'json' };
import itemsJSON from '../datas/items.json' assert { type : 'json'};
import {main as mastermindMain, isWon as mastermindWin} from './mastermind.js'
import {affichage as sticksMain, isWon as sticksWin} from './mastermind.js'
//console.log(charachterJSON)
//console.log(dialoguesJSON)

let currPieceId = 0
let pieceStart = piecesJSON.pieces[currPieceId]

const ownedItems = []
const reachedDialogue = []
let wonEnigmes = []
let histo = []
let currentEnigme = null

const modale = document.getElementById('modale')
const modaleTitle = document.getElementById('modale-title')
const modaleBody = document.getElementById('modale-body')

generatePiece(pieceStart)

function generatePiece(piece) {

    currPieceId = piece.id
	const mainContainer = document.getElementById('background')
	mainContainer.innerText = ''
	closeModale()

    const divTitle = document.createElement('div')
    divTitle.setAttribute('id', 'title')
    const buttonMove = document.createElement('button')
    buttonMove.setAttribute('id', 'deplacement')
    buttonMove.innerText = 'Déplacement'
	buttonMove.addEventListener('click', () => {openModale('Déplacement', null, piece)})
    const titleP = document.createElement('p')
    titleP.innerText = piece.nom
    const emptyDiv = document.createElement('div')

    divTitle.appendChild(buttonMove)
    divTitle.appendChild(titleP)
    divTitle.appendChild(emptyDiv)

    const divPersos = document.createElement('div')
    divPersos.setAttribute('id', 'persos')
    for (let i = 0; i < piece.personnages.length; i++) {
        const currChar = charachterJSON.personnages[piece.personnages[i]]

        const persoContainer = document.createElement('div')
        persoContainer.setAttribute('id', 'persos-' + i)
        persoContainer.classList.add('persos-apercu')
        persoContainer.addEventListener('click', () => openModale('Personnages', currChar))
        const persoImage = document.createElement('img')
        persoImage.setAttribute('src', `./assets/images/persos/${currChar.image}`)
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
    setControlButtons('Historique de dialogues', divControls)

    mainContainer.appendChild(divTitle)
    mainContainer.appendChild(divPersos)
    mainContainer.appendChild(divControls)
}

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
    mastermindWin ? wonEnigmes.push('mastermind') : null
    //console.log(wonEnigmes)
}

function openModale(type, charachter, piece) {

    modaleTitle.innerText = type
    modaleBody.innerText = ''

    switch (type) {
        case 'Items':
            modaleItem()
        break;

        case 'Enigme':
            modaleEnigme()
        break;

        case 'Historique de dialogues':
            modaleHistorique()
        break;

        case 'Personnages':
            const currChar = charachter
            modalePerso(currChar, currChar.pieces[currPieceId].baseDialogue)
        break;

		case 'Déplacement':
            modaleMove(piece)
        break;

        default:
            break;
    }
    modale.showModal()
}

function modaleMove(piece) {

	const piecesContainer = document.createElement('div')
	const piecesNextArray = piece.piecesNext

	for (let i = 0; i < piecesNextArray.length; i++) {
	
		const card = document.createElement('div')
		card.addEventListener('click', () => {generatePiece(piecesJSON.pieces[piecesNextArray[i]])})
		const image = document.createElement('img')
		const title = document.createElement('p')
		title.innerText = piecesJSON.pieces[piecesNextArray[i]].nom

		card.appendChild(image)
		card.appendChild(title)

        card.classList.add('cards')
        card.classList.add('move-cards')
        modaleBody.appendChild(card)
	}
}

function modaleItem() {
    const nbItems = ownedItems.length
    for (let i = 0; i < nbItems; i++) {

        const card = document.createElement('div')
        card.classList.add('cards')
        card.classList.add('item-cards')
		const image = document.createElement('img')
        image.setAttribute('src', `./assets/images/items/${itemsJSON.items[ownedItems[i]].image}`)

		const title = document.createElement('p')
        title.classList.add('item-title')
		title.innerText = itemsJSON.items[ownedItems[i]].nom

        const desc = document.createElement('p')
        desc.classList.add('item-desc')
		desc.innerText = itemsJSON.items[ownedItems[i]].description

		card.appendChild(image)
		card.appendChild(title)
        card.appendChild(desc)

        //card.classList.add('move-cards')
        modaleBody.appendChild(card)
    }
}

function modaleEnigme() {
    
    const enigmeContainer = document.createElement('div')

    if (currentEnigme === 'mastermind') {
        enigmeContainer.setAttribute('id', 'mastermind')
        modaleBody.appendChild(enigmeContainer)
        mastermindMain()        
    }
    else if (currentEnigme === 'stick') {
        enigmeContainer.setAttribute('id', 'stick')
        modaleBody.appendChild(enigmeContainer)
    }
    else{
        enigmeContainer.innerText = 'Pas d\'énigmes disponible, avancez dans l\'histoire'
        modaleBody.appendChild(enigmeContainer)
    }


}

function modaleHistorique() {

    const reverseHisto = histo.toReversed()

    for (let i = 0; i < reverseHisto.length; i++) {
        const dialogueContainer = document.createElement('div')

        const dialogue = document.createElement('p')
        const spanDial = document.createElement('span')
        spanDial.innerText = `${reverseHisto[i].perso} : `
        dialogue.appendChild(spanDial)
        dialogue.innerHTML += reverseHisto[i].dialogue

        const reponse = document.createElement('p')
        const spanRep = document.createElement('span')
        spanRep.setAttribute('id', 'spanRep')
        spanRep.innerHTML = `&#10551Vous : `
        reponse.appendChild(spanRep)
        reponse.innerHTML += reverseHisto[i].reponse

        dialogueContainer.classList.add('dialogue-historique-container')

        dialogueContainer.appendChild(dialogue)
        dialogueContainer.appendChild(reponse)
        modaleBody.appendChild(dialogueContainer)
    }
}

function modalePerso(perso, dialogue) {

    const modalePersoContainer = document.createElement('div')
    modalePersoContainer.setAttribute('id', 'modale-perso')

    const persoRecap = document.createElement('div')
    persoRecap.setAttribute('id', 'perso-recap')
    const imageRecap = document.createElement('img')
    imageRecap.setAttribute('src', `./assets/images/persos/${perso.image}`)
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
            reponse.addEventListener('click', () => {handleReponse(perso, reponsesArray[i].dialogueNext, reponsesArray[i].effets, reponsesArray[i].reponseText, dialoguesJSON.dialogues[dialogue].line)})
            reponseContainer.appendChild(reponse)            
        }
    }
    dialogueContainer.appendChild(dialogueDiv)
    dialogueContainer.appendChild(reponseContainer)
    
    modalePersoContainer.appendChild(persoRecap)
    modalePersoContainer.appendChild(dialogueContainer)

    modaleBody.appendChild(modalePersoContainer)
}

function handleReponse(currChar, nextDialogue, effets, text, currDialogue) {

    const histoObj = {
        "perso" : `${currChar.prenom} ${currChar.nom}`,
        "dialogue" : currDialogue,
        "reponse" : text
    }

    histo.push(histoObj)

    if (effets != null) {

        if (effets.givenItems != null) {
            for (let i = 0; i < effets.givenItems.length; i++) {
                getItem(effets.givenItems[i])
            }
        }

        if (effets.currentEnigme != null) {
            currentEnigme = effets.currentEnigme
        }
    }

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
    } 
    else if (conditions.reachedDialogue != null && conditions.ownedItems != null){

        return checkConditions(reachedDialogue, conditions.reachedDialogue) && checkConditions(ownedItems, conditions.ownedItems)
    }
    else if (conditions.reachedDialogue != null){

        return checkConditions(reachedDialogue, conditions.reachedDialogue)
    } 
    else if (conditions.ownedItems != null){

        return checkConditions(ownedItems, conditions.ownedItems)
    }
    else if (conditions.wonEnigmes != null)  {
        return checkConditions(wonEnigmes, conditions.wonEnigmes)
    }
}

function checkConditions(array, data) {
    for (let i = 0; i < data.length; i++) {
        if (!array.includes(data[i])) {
            return false
        }
    }
    return true
}

function getItem(itemId){

    ownedItems.push(itemId)
}

