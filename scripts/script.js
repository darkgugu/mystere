const container = document.getElementById('mastermind')

const colors = ['red', 'orange', 'yellow', 'green', 'blue','purple']

let solution = ['blue', 'blue', 'blue', 'yellow']

let proposition = []

proposition.push('blue')
proposition.push('yellow')
proposition.push('orange')
proposition.push('yellow')


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


let bienPlace = getBienPlace(proposition)
let bonneCouleur = getBonneCouleur(countColors(solution), countColors(proposition)) - bienPlace

console.log('solution :', solution);
console.log('proposition :', proposition);
console.log('bonneCouleur :', bonneCouleur);
console.log('bienPlace :', bienPlace);

