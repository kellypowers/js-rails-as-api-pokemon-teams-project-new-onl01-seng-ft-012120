const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", function(){
    fetchPokemons();
    
})
// fetchPokemons();

function fetchPokemons() {
    return fetch(TRAINERS_URL)
    .then(resp => resp.json())
    // .then(json => console.log(json)); }
    .then((data) =>
    data.forEach(pokes => {
        addCard(pokes);
        
    }));
}

function addCard(obj) {
    let pokemonContainer = document.querySelector('#main');

    let div = document.createElement('div');
    div.class = "card";
    div.setAttribute('data-id', `${obj.id}`);

    let p = document.createElement('p');
    p.innerHTML = `${obj.name}`;
    div.append(p);

    let addButton = document.createElement('button');
    addButton.setAttribute('id', `${obj.id}`);
    addButton.innerText = 'Add Pokemon';
    div.appendChild(addButton);


    let ul = document.createElement('ul');

    // need a function to add lis?
    obj.pokemons.forEach(pokemon => {
        let li = addLis(pokemon);
         ul.appendChild(li);

    });
    // let lis = addLis(obj);
    // for (i=0; i<lis.length; i ++) {ul.appendChild(lis[i])};
    // ul.appendChild
    div.appendChild(ul);
     addButton.addEventListener("click", addPokemon)
    pokemonContainer.appendChild(div);


}

function addLis(obj) {
    // arr = []
        //  const parentUl = document.querySelectorAll(`[data-id='${obj.trainer_id}']`)[0].querySelector('ul');
        // arr = []
        let li = document.createElement('li');
        li.innerHTML = `${obj.nickname} (${obj.species})`;

        let releaseButton = document.createElement('button');
        releaseButton.setAttribute('class', "release");
        releaseButton.setAttribute('data-pokemon-id', `${obj.id}`);
        releaseButton.innerHTML = "Release";
        releaseButton.addEventListener("click", deletePokemon);
        // add event listener for button

        li.append(releaseButton);
        // parentUl.appendChild(li)
         return li;
    //     arr.push(li);
    // });
    // return arr;
}

function addPokemon(e) {
    fetch(`${POKEMONS_URL}`, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            trainer_id: e.target.id
        })
    })
    .then(response => {return response.json()})
    .then(data => {
        console.log(data);
        // thank you dannysoto for the following line
        const parentUl = document.querySelectorAll(`[data-id='${data.trainer_id}']`)[0].querySelector('ul');
         let lis = addLis(data);
         parentUl.appendChild(lis);
    })
}

function deletePokemon(e) {
    fetch(`${POKEMONS_URL}/${e.target.getAttribute("data-pokemon-id")}`, {
        method: "DELETE", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            trainer_id: e.target.id
        })
    })
    .then(response => {return response.json()})
    .then(data => {
        console.log(data);
        e.target.parentNode.remove()
})
}


