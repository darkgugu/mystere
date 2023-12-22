const nbStick = 21

export let isWon = false

export function affichage() {
    const stickDiv = document.createElement('div')
    stickDiv.classList.add('stickDiv')

    for (let i = 0; i < nbStick; i++) {
        const stick = document.createElement('div')
        stick.classList.add('stick')
        stick.setAttribute('id', `stick${i}`)
        stick.addEventListener('click', () => {
            console.log(stick.id)
            if ((stick.classList[1] != 'clickedStick') && (document.querySelectorAll('.clickedStick').length >= 3)) {
                alert('Vous ne pouvez choisir que 3 batonnets')
            }else{
                stick.classList.toggle('clickedStick')
            }
        })
        stickDiv.appendChild(stick)
    }

    const validateButton = document.createElement('button')
    validateButton.setAttribute('id', 'validateButton')
    validateButton.innerText = 'Valider la sélection'
    validateButton.addEventListener('click', () => {
        const clickedSticks = document.querySelectorAll('.clickedStick')
        console.log(clickedSticks);
    })


    const mainContainer = document.getElementById('main')
    mainContainer.appendChild(stickDiv)
    mainContainer.appendChild(validateButton)
}
