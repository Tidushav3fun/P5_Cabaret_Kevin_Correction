// Importation du panier //


let panier = JSON.parse(localStorage.getItem("panier"))

// Quantité de produits dans le panier //

const positionElement3 = document.querySelector(".nombreproduits")

if(panier === null){
    QuantiteTotalHTML= '0';
}else{
    QuantiteTotalHTML = panier.length;
}    

positionElement3.innerHTML = `
( ${QuantiteTotalHTML} )
`;

// Si le panier est vide //

const positionElement = document.querySelector('#productlist');

if(panier === null){
const panierVide = `
    <div class="panier-vide">
        <div>Le panier est vide</div>
    </div>
    ` ;
    positionElement.innerHTML = panierVide;
} else {
    //si le panier n'est pas vide, il faut afficher les produits//
    let tableauPanier = [];
    const positionElement = document.querySelector('#productlist');

    for(i = 0; i < panier.length; i++ ){

        tableauPanier = tableauPanier + `
        <tr>
            <th>${panier[i].name}</th>
            <th>${panier[i].color}</th>
            <th>${panier[i].price/100}</th>
            <th>${panier[i].quantity}</th>
            <th><button id ="${panier[i].id}"class="btn-supprimer">Supprimer</button></th>
        </tr>
        `;
    }
        if(i === panier.length)
        //injection html dans la page panier//
        positionElement.innerHTML = tableauPanier;
    }


    //     Prix total     //
let PrixtotalCalcul = [];

for (let m = 0; m < panier.length; m++){
    let prixproduitpanier = panier[m].price/100;
    
    PrixtotalCalcul.push(prixproduitpanier)
}

//    Additionner les prix du panier   //

const reducer = (accumulator, currentValue) => accumulator + currentValue;
const prixtotal = PrixtotalCalcul.reduce(reducer);

//  Affichage du prix total en HTML  //

const positionElement2 = document.querySelector('.subtotal');

const PrixTotalHTML = `
    ${prixtotal}
        `;

positionElement2.innerHTML = PrixTotalHTML;

// Suppression d'un produit //

function remove() {
    let removeCartItemButtons = document.getElementsByClassName('btn-supprimer')
    for (let i = 0; i < removeCartItemButtons.length; i++) {
        let button = removeCartItemButtons[i];
        button.addEventListener('click', removeCartItem)
    }
};
remove();

function removeCartItem(event) {
    let buttonClicked = event.target
    let id = buttonClicked.getAttribute('id');
    console.log(id);

    // récuperer l'index de l'objet via son ID
    let removeIndex = panier.map(function (item) { return item.id; }).indexOf(id);

    // supprimer l'objet
    panier.splice(removeIndex, 1);

    localStorage.setItem('panier', JSON.stringify(panier));
    buttonClicked.parentElement.parentElement.remove();
    location.reload();
    totalCount();
};


//                FORMULAIRE                    //

// Objet contact à envoyer au serveur //

let contact = {
    firstName:'',
    lastName:'',
    address:'',
    city:'',
    email:'',
};


// Création du formulaire  //
let formValid = document.getElementById("validbutton");
let nom = document.getElementById("nomform");
let prenom = document.getElementById("prenom");
let email = document.getElementById("Email");
let ville = document.getElementById("Ville");
let address = document.getElementById("adresse");
let missNom = document.getElementById("missNom");
let missPrenom = document.getElementById("missPrenom");
let missEmail = document.getElementById("missEmail");
let missVille = document.getElementById("missVille");
let missAddress = document.getElementById("missAddress");
let nomValid = /^[a-zA-ZéèîïÉÈÎÏ][A-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$/; // Création de Regex // 
let prenomValid = /^[a-zA-ZéèîïÉÈÎÏ][A-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$/;
let emailValid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
let villeValid = /^[a-zA-ZéèîïÉÈÎÏ][A-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$/;
let addressValid = /^\d+\s[A-z]+\s[A-z]+/;
            
formValid.addEventListener("click", validation); // Si les données du formulaires sont ok, Validation // 


function form(){
    //Si le champ nom est vide//
    if (nom.validity.valueMissing){
        missNom.textContent = 'Veuillez renseigner votre nom';
    //Si le format de données est incorrect//
    }else if(nomValid.test(nom.value) == false){
        missNom.textContent = 'Format incorrect';
    }else{
        missNom.innerHTML = `<i class="fas fa-check"></i>`;
    };

    //Si le champ prenom est vide//
    if (prenom.validity.valueMissing){
        missPrenom.textContent = 'Veuillez renseigner votre prénom';
    //Si le format de données est incorrect//
    }else if (prenomValid.test(prenom.value) == false){
        missPrenom.textContent = 'Format incorrect';
    }else{
        missPrenom.innerHTML = `<i class="fas fa-check"></i>`
    };
    
    //Si le champ email est vide//
    if (email.validity.valueMissing){  
        missEmail.textContent = 'Veuillez renseigner votre e-mail';
        //Si le format de données est incorrect//
    }else if (emailValid.test(email.value) == false){
        missEmail.textContent = 'Format incorrect';
    }else{
        missEmail.innerHTML = `<i class="fas fa-check"></i>`
    };
   
    //Si le champ ville est vide//
    if (ville.validity.valueMissing){
        missVille.textContent = 'Veuillez renseigner votre commune';
        //Si le format de données est incorrect//
    }else if (villeValid.test(ville.value) == false){  
        missVille.textContent = 'Format incorrect';
    }else{
        missVille.innerHTML = `<i class="fas fa-check"></i>`
    };
   
    //Si le champ address est vide//
    if (address.validity.valueMissing){
        missAddress.textContent = 'Veuillez renseigner votre adresse';
    //Si le format de données est incorrect//
    }else if (addressValid.test(address.value) == false){
        missAddress.textContent = 'Format incorrect';
    }else{
        missAddress.innerHTML = `<i class="fas fa-check"></i>`
    }; 
};
    
    // Si formulaire OK, Création de l'objet à envoyer au serveur pour créer la commande //
function validation(){

    form();

    if (nomValid.test(nom.value) === true && addressValid.test(address.value) === true && villeValid.test(ville.value) === true && emailValid.test(email.value) === true && prenomValid.test(prenom.value) === true) {
        contact.firstName = nom.value
        contact.lastName = prenom.value
        contact.email = email.value
        contact.city = ville.value
        contact.address = address.value
    }else{

        alert ("Veuillez renseigner tous les champs s'il vous plaît!");
        return false;
    }

    // Creation du tableau qui va contenir les ID des peluches
    let productsId = [];
    for(let i =0; i<panier.length; i++){
        productsId.push(panier[i].id)
    }

    // Creation de l objet a envoyer

    let objectToSend = {
        contact : contact,
        products : productsId,
    };

    // Envoi au serveur

    fetch("http://localhost:3000/api/teddies/order", {
        method: 'POST',            
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objectToSend) // conversion en JSON des données requis par le serveur 
    })
    .then(response => { response.json()
        .then(function(json) {
            let orderId = json.orderId;
            console.log(json)
           document.location.href = 'commande.html?id=' + orderId;  // envoi de l'ID de la commande dans l'url de la page de validation 
        });
    })
    .catch(error => { // enregistrement si erreur lors de l'envoi de données 
        alert('La connexion au serveur a échouée !');
    })  
};