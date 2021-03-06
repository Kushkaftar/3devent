'use strict';

// get element ...
const navApp = document.getElementById("nav_app"),
    checkboxApp = document.getElementById("checkbox_app"),
    inputApp = document.getElementById("input_app"),
    collApp = document.getElementById("coll_app"),
    cardApp = document.getElementById("card_app");

// array ...
let inputArr = [],
    cardsArr =[];

// checkBlock ...

const checkBlock = () => {
    const checkArr = ["heroes", "actors", "movies", "status"];

    const form = document.createElement("form"),
        div = document.createElement("div");
    checkboxApp.classList.add("row");

    checkArr.forEach(elem => {
        div.insertAdjacentHTML("beforeend",`
                    <p class="col s3">
                        <label>
                            <input type="checkbox" name="${elem}" />
                            <span>${elem}</span>
                        </label>
                    </p>`);
    })

    form.insertAdjacentElement("beforeend", div);
    checkboxApp.insertAdjacentElement("beforeend", form);

    form.addEventListener("change", evt => {
        const target = evt.target;

        if (target.getAttribute("type") === "checkbox") {
            const index = inputArr.findIndex(item => item === target.getAttribute("name"));
            if (index !== -1){
                inputArr.splice(index, 1);
                inputBlock();
            } else {
                inputArr.push(target.getAttribute("name"));
                inputBlock();
                //console.log(target.value);
            }
        }
    });
};

checkBlock();

// inputBlock ...

const inputBlock = () => {

    const div = document.createElement("div");

    div.classList.add("row");
    const form = document.createElement("form");

    if (inputApp.firstChild) inputApp.firstChild.remove();

    inputArr.forEach(elem => {
        div.insertAdjacentHTML("beforeend",`
                    <div class=" col s3">
                      <input id="${elem}" type="text" class="validate dropdown-trigger" data-target='dropdown1'>
                      <label for="${elem}">${elem}</label>
                    </div>
        `);
    });

    form.insertAdjacentElement("beforeend", div);
    inputApp.insertAdjacentElement("beforeend", form);

    form.addEventListener("input", (evt) => filterArr(evt));
};

// filter ...

const filterArr = (evt) => {
    const target = evt.target;

    const  filter = (attr, value) => {
        let arr = cardsArr.filter(elm => {
            //console.log(elm[attr]);
            if (elm[attr].toLocaleLowerCase().indexOf(value)  !== -1) {
                //console.log(elm[attr]);
                return elm;
            }
        })
        console.log(arr);
        coll(arr);

    };

    switch (target.getAttribute("id")) {
        case "heroes":
            filter("name",target.value)
            //console.log(target.getAttribute("id"), target.value);
            break;
        case "actors":
            console.log(target.getAttribute("id"), target.value);
            break;
        case "movies":
            console.log(target.getAttribute("id"), target.value);
            break;
        case "status":
            console.log(target.getAttribute("id"), target.value);
            break;
    }
};

// cards ...

const cards = (arr) => {

    const div = document.createElement("div");
    div.classList.add("row");

    arr.forEach(elem => {
        div.insertAdjacentHTML("beforeend",`
                    <div class="col s4 m4">
                        <div class="card">
                            <div class="card-image waves-effect waves-block waves-light">
                                <img class="activator" src="src/db/${elem.photo}" style="height: 38em" alt="">
                            </div>
                            <div class="card-content">
                                <span class="card-title activator grey-text text-darken-4">
                                    ${elem.name}
                                    <i class="material-icons right">more_vert</i>
                                </span>
                                <p>${elem.actors}</p>
                                <p>${elem.status}</p>
                            </div>
                            <div class="card-reveal">
                                <span class="card-title grey-text text-darken-4">
                                    ${elem.name}
                                    <i class="material-icons right">close</i>
                                </span>
                                <p>
                                    Here is some more information about 
                                    this product that is only revealed once clicked on.
                                </p>
                            </div>
                        </div>
                    </div>
        `);
    });

    cardApp.insertAdjacentElement("beforeend", div);
};

//cards(cardsArr);

// menu.insertAdjacentHTML("afterbegin",`
//                             <div class="nav-wrapper">
//                                 <form>
//                                     <div class="input-field">
//                                         <input id="search" type="search" required>
//                                             <label class="label-icon" for="search">
//                                                 <i class="material-icons">search</i>
//                                             </label>
//                                         <i class="material-icons">close</i>
//                                     </div>
//                                 </form>
//                             </div>`);
//
// app.insertAdjacentElement("afterbegin", menu);

// const search = document.getElementById("search");
// //console.log(search);
// search.addEventListener("input", () => console.log(search.value));


// collections ...

const coll = (arr) => {
    if (collApp.firstChild) collApp.firstChild.remove();
    const ul = document.createElement("ul");

    collApp.classList.add("row");
    ul.classList.add("collection");

    arr.forEach(elem => {
        ul.insertAdjacentHTML("beforeend", `
            <li class="collection-item avatar">
              <img src="src/db/${elem.photo}" alt="" class="circle">
              <span class="title">Title</span>
              <p>First Line <br>
                 Second Line
              </p>
              <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
            </li>
            `)
    });
    collApp.insertAdjacentElement("beforeend", ul);

};




const  url = "src/db/dbHeroes.json"

const getData = (url, callBack) => {
    const request = new XMLHttpRequest();

    request.open('GET', url);

    request.addEventListener('readystatechange', () => {
        if (request.readyState !== 4) return;

        if (request.status === 200) {
            callBack(request.response);
        } else {
            console.error(request.status);
        }
    });

    request.send();
};

getData(url, (response) => {
    cardsArr.splice(0, cardsArr.length);
    JSON.parse(response).forEach(elem => cardsArr.push(elem));

    cards(cardsArr);
    coll(cardsArr);
});
console.log(cardsArr);