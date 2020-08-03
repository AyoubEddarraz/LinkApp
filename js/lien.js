// ALL Links

let alllist = [];
let alllinks = [];

// End ALL Links

// Declaratio of Variables 

let addlist = document.getElementById("addlist"),
    addlien = document.getElementById("addlien"),
    closeaddlist = document.getElementById("closeaddlist"),
    closeaddlien = document.getElementById("closeaddlien"),
    creerList = document.getElementById("creerList"),
    listName = document.getElementById("listName"),
    addlistbtn = document.getElementById("addlistbtn"),
    creerLien = document.getElementById("creerLien"),
    lienname = document.getElementById("lienname"),
    addTo = document.getElementById("addTo"),
    addlienbtn = document.getElementById("addlienbtn"),
    save = document.getElementById("save"),
    lienurl = document.getElementById("lienurl");

// End Declaration de Variable 

// Save btn

save.addEventListener("click" , () => {
    location.reload();
})

// End Save btn

// btn add list 

addlist.addEventListener('click' , () => {
    creerList.style.transform = ('scale(1)')
    listName.focus();

    closeaddlist.addEventListener('click' , () => {
        creerList.style.transform = ('scale(0)');
    })   
    
})

addlistbtn.addEventListener('click' , () => {
    if(listName.value != ""){
        if(alllist.indexOf(listName.value) == -1){
            createListFun(listName.value);
            creerList.style.transform = ('scale(0)');
        }else{
            alertFun("Cette liste existe déjà");

            setTimeout(() => {
                listName.value = "";
                creerList.style.transform = ('scale(0)');
            } , 1000);
        }
    }else{
        // Nothing
    }
})

// End btn add list 

// btn add lien 

addlien.addEventListener('click' , () => {

    if(alllist.length > 0){
        creerLien.style.transform = ('scale(1)');
        lienname.focus();
    }else{
        alertFun("Pas de liste trouvée");
    }

    closeaddlien.addEventListener('click' , () => {
        creerLien.style.transform = ('scale(0)');
    })
})

addlienbtn.addEventListener('click' , () => {
    if(lienurl.value != "" && lienname.value != "" && addTo.value != ""){
        let fondindex = (`${lienurl.value}@${addTo.value}@${lienname.value}`);
        if(alllinks.indexOf(fondindex) == -1){
            createlienFun(lienurl.value , addTo.value , lienname.value);
            lienurl.value = "";
            addTo.value = "";
            lienname.value = "";
            creerLien.style.transform = ('scale(0)');
        }else{
            alertFun("Cette lien existe déjà");
        }
    }else{
        // Nothing
    }
})

// create list

let createListFun = (namelisttoadd) => {

    let divList = document.createElement('div');
    divList.classList.add('listlinks');
    divList.setAttribute('id' , namelisttoadd);
    let h2List = document.createElement('h2');
    h2List.appendChild(document.createTextNode(namelisttoadd + " list"));
    divList.appendChild(h2List);
    let iconeremovelist = document.createElement("i");
    iconeremovelist.id = ("removelist");
    iconeremovelist.classList.add("fas" , "fa-trash");
    let option = document.createElement('option');
    option.value = namelisttoadd;
    option.textContent = namelisttoadd;
    addTo.appendChild(option);
    h2List.appendChild(iconeremovelist);
    document.body.appendChild(divList);
    listName.value = "";
    alllist.push(namelisttoadd);
    localStorage.setItem("listSave" , JSON.stringify(alllist));
}

// End create list

// Create lien fun

let createlienFun = (urlInput , optiondata , nameUrl) => {
    let divlien = document.createElement("div");
    divlien.classList.add("lien");

    let diviconelink = document.createElement("div"),
        iconefordiviconelink = document.createElement("i");
    diviconelink.id = "iconelink";
    iconefordiviconelink.classList.add("fas" , "fa-link");

    diviconelink.appendChild(iconefordiviconelink);

    let divLink = document.createElement("div"),
        alinkfordivlink = document.createElement("a");

    divLink.id = "link";
    alinkfordivlink.href = urlInput;
    alinkfordivlink.target = "_blank";
    alinkfordivlink.setAttribute("data-option" , optiondata);
    alinkfordivlink.textContent = nameUrl;

    divLink.appendChild(alinkfordivlink);


    let divremovelink = document.createElement("div");
        iconefordivremove = document.createElement("i");

    divremovelink.id = "removelink";
    iconefordivremove.classList.add("fas" , "fa-trash");

    divremovelink.appendChild(iconefordivremove);

    divlien.appendChild(diviconelink);
    divlien.appendChild(divLink);
    divlien.appendChild(divremovelink);

    document.getElementById(optiondata).appendChild(divlien);

    let listinfo = (`${urlInput}@${optiondata}@${nameUrl}`)

    alllinks.push(listinfo);
    localStorage.setItem("linkssave" , JSON.stringify(alllinks));

}

// End Create lien fun

// save list 

let savelistFun = () => {
    let x = JSON.parse(localStorage.getItem("listSave"));
    let y = JSON.parse(localStorage.getItem("linkssave"));

    // add list save
    for(let f = 0 ; f < x.length ; f++){
        alllist.push(x[f]);
        createListFunafterOpload(x[f]);
    }

    // add lien save
    for(let l = 0 ; l < y.length ; l++){
        alllinks.push(y[l]);
    }

    for(let q = 0 ; q < alllinks.length ; q++){
        let qarray = alllinks[q].split("@"); 
        createlienFunsavelien(qarray[0] , qarray[1] , qarray[2]);
    }

    // Remove Fun
    removeFun();

    // copy Fun
    copyFun();

    // remove list
    removelistFun();
}

window.addEventListener("load" , savelistFun );

// End save list 


// create list after opload page

let createListFunafterOpload = (namelistcreated) => {

    let divList = document.createElement('div');
    divList.classList.add('listlinks');
    divList.setAttribute('id' , namelistcreated);
    let iconeremovelist = document.createElement("i");
    iconeremovelist.id = ("removelist");
    iconeremovelist.classList.add("fas" , "fa-trash");
    let h2List = document.createElement('h2');
    h2List.appendChild(document.createTextNode(namelistcreated + " list"));
    divList.appendChild(h2List);
    let option = document.createElement('option');
    option.value = namelistcreated;
    option.textContent = namelistcreated;
    addTo.appendChild(option);
    h2List.appendChild(iconeremovelist);
    document.body.appendChild(divList);
    listName.value = "";

    
}

// End create list after opload page

// Create line fun

let createlienFunsavelien = (urlsave , optiondatasave , nameUrlsave) => {
    let divlien = document.createElement("div");
    divlien.classList.add("lien");

    let diviconelink = document.createElement("div"),
        iconefordiviconelink = document.createElement("i");
    diviconelink.id = "iconelink";
    iconefordiviconelink.classList.add("fas" , "fa-link");

    diviconelink.appendChild(iconefordiviconelink);

    let divLink = document.createElement("div"),
        alinkfordivlink = document.createElement("a");

    divLink.id = "link";
    alinkfordivlink.href = urlsave;
    alinkfordivlink.target = "_blank";
    alinkfordivlink.setAttribute("data-option" , optiondatasave);
    alinkfordivlink.textContent = nameUrlsave;

    divLink.appendChild(alinkfordivlink);


    let divremovelink = document.createElement("div");
        iconefordivremove = document.createElement("i");

    divremovelink.id = "removelink";
    iconefordivremove.classList.add("fas" , "fa-trash");

    divremovelink.appendChild(iconefordivremove);

    divlien.appendChild(diviconelink);
    divlien.appendChild(divLink);
    divlien.appendChild(divremovelink);

    document.getElementById(optiondatasave).appendChild(divlien);

}

// End Create line fun


// remove Fun


let removeFun = () => {
    let removebtn = document.querySelectorAll(".lien #removelink");
    let arrayremove = Array.from(removebtn);

    for(let r = 0 ; r < arrayremove.length ; r++){
        arrayremove[r].addEventListener('click' , () => {
            arrayremove[r].parentElement.remove();
            let nameget = arrayremove[r].parentElement.children[1].children[0].textContent;
            let urlget = arrayremove[r].parentElement.children[1].children[0].getAttribute("href");
            let optionget = arrayremove[r].parentElement.children[1].children[0].getAttribute("data-option");

            let x = JSON.parse(localStorage.getItem("listSave"));
            let y = JSON.parse(localStorage.getItem("linkssave"));

            let searchnameforremove = (`${urlget}@${optionget}@${nameget}`)

            let indexItem = alllinks.indexOf(searchnameforremove);

            alllinks.splice(indexItem , 1);

            localStorage.setItem("linkssave" , JSON.stringify(alllinks));

            alertFun("bien Supprimer");

        })
    }
}

// end remove Fun

// Remove list Fun

let removelistFun = () => {
    let removelistbtn = document.querySelectorAll(".listlinks h2 i");
    let Arraybtnremovemlist = Array.from(removelistbtn);

    for(let listremove = 0 ; listremove < Arraybtnremovemlist.length ;  listremove++){
        Arraybtnremovemlist[listremove].addEventListener('click' , () => {
            if(Arraybtnremovemlist[listremove].parentElement.parentElement.children.length < 2){
                Arraybtnremovemlist[listremove].parentElement.parentElement.remove();
                let idlistremove = Arraybtnremovemlist[listremove].parentElement.parentElement.id;
                alllist.indexOf(idlistremove);
                let indexlistremove = alllist.indexOf(idlistremove); 
                alllist.splice(indexlistremove , 1);  
                localStorage.setItem("listSave" , JSON.stringify(alllist));
            }else{
                alertFun("remove chaque element dans la list Avant de supprimer la list");
            }
        })
    }

    
}

// End Remove list Fun

// Copy Fun

let copyFun = () => {
    let copybtn = Array.from(document.querySelectorAll(".lien #iconelink"));
    
    for(let copy = 0 ; copy < copybtn.length ; copy++){
        copybtn[copy].addEventListener('click' , () => {
            let linkcopy = copybtn[copy].parentElement.children[1].children[0].getAttribute("href");
            let copytext = document.createElement("input");
            copytext.value  = linkcopy;
            document.body.appendChild(copytext);
            copytext.select();
            document.execCommand("copy");
            copytext.style.display = "none";
        })
    }
}

// end Copy Fun

// Alert Fucntion 

let alertFun = (messageAlert) => {
    let divAlert = document.createElement("div");
    divAlert.id = "alert";
    divAlert.textContent = (messageAlert);

    document.body.appendChild(divAlert);

    setTimeout(() => {
        divAlert.style.display = "none";
    } , 4500);
}

// End Alert Fucntion 