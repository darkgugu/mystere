const colors = ['red', 'orange', 'yellow', 'green', 'blue','purple']
const reponseSize = 4

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
}

let solution = colors.map((x) => x)
shuffle(solution)
solution.pop()
solution.pop()

//let solution = ['green', 'green', 'blue', 'orange']

console.log('solution :', solution);
console.log('colors :', colors);

let proposition = []
let colorCounter = []

for (let i = 0; i < reponseSize; i++) {
    colorCounter.push(0)
}

const masterContainer = document.getElementById('mastermind')
const container = document.createElement('div')
container.classList.add('container')
masterContainer.appendChild(container)

const indices = document.createElement('div')
indices.classList.add('indices')

for (let i = 0; i < reponseSize; i++) {
    const element = document.createElement('div')
    element.classList.add('indices-slot')
    indices.appendChild(element)
}

masterContainer.appendChild(indices)

for (let i = 0; i < reponseSize; i++) {
    let repDiv = document.createElement('div')
    repDiv.classList.add('reponseCircle')
    repDiv.id = 'rep' + i
    repDiv.addEventListener('click', () => {

        if (colorCounter[i] !== colors.length) {
            repDiv.style.backgroundColor = colors[colorCounter[i]]    
            colorCounter[i]++
        }
        else{
            repDiv.style.backgroundColor = 'transparent'
            colorCounter[i] = 0
        }

        //console.log(repDiv.style.backgroundColor)
    })
    container.appendChild(repDiv)
}

const validateButton = document.createElement('button')
validateButton.classList.add('validate')
validateButton.addEventListener('click', (event) => {
    event.preventDefault()

    for (let i = 0; i < reponseSize; i++) {
        const div = document.getElementById(`rep${i}`)
        proposition[i] = div.style.backgroundColor
    }

    let bienPlace = getBienPlace(proposition)
    let bonneCouleur = getBonneCouleur(countColors(solution), countColors(proposition)) - bienPlace

    let victoireCompteur = 0

    const slot = document.querySelectorAll('.indices-slot')
    

    console.log('solution :', solution);
    console.log('proposition :', proposition);
    console.log('bonneCouleur :', bonneCouleur);
    console.log('bienPlace :', bienPlace);

    for (let i = 0; i < slot.length; i++) {
        slot[i].style.backgroundColor = 'transparent'
    }


    for (let i = 0; i < slot.length; i++) {
        if (bienPlace !== 0) {
            slot[i].style.backgroundColor = 'red'
            bienPlace--
            victoireCompteur++
            if (victoireCompteur === 4) {
                masterContainer.innerText = 'Victoire !'
            }
        }
        else if (bonneCouleur !== 0) {
            slot[i].style.backgroundColor = 'white'
            bonneCouleur--
        }
    }
})
container.appendChild(validateButton)


function getBienPlace(proposition) {

    let bienPlace = 0

    for (let i = 0; i < proposition.length; i++) {
    
        if (proposition[i] === solution[i]) {
            bienPlace++
        }
    }

    return bienPlace
}

function countColors(arrayColor){

    let count = new Map()
    for (let i = 0; i < colors.length; i++) {
        
        count.set(colors[i], 0)
    }

    for (let i = 0; i < arrayColor.length; i++) {
        
        count.set(arrayColor[i], count.get(arrayColor[i]) + 1)
    }

    return count
}

function getBonneCouleur(solutionMap, propositionMap){

    let bonneCouleur = 0

    for (let i = 0; i < solutionMap.size; i++) {    

        if (solutionMap.get(colors[i]) !== 0) {
    
            let s = solutionMap.get(colors[i])
            let p = propositionMap.get(colors[i])
    
            if (s === p) {
                bonneCouleur += s
            }
            else if (s > p) {
                bonneCouleur += p
            }
            else if (s < p) {
                bonneCouleur += s
            }
        }
    }

    return bonneCouleur
}


