// Importation du panier //


let panier = JSON.parse(localStorage.getItem("panier"))

// Importation des teddies pour la création du container //

const container = document.getElementById("container");

fetch(api)
.then ((response) => response.json())
.then((teddies) => {
    console.log(teddies);
    for(const teddy of teddies) {
        container.innerHTML += createCard(teddy);
    }
})

.catch(function (error) {
    console.log('Il y a eu un problème avec l\'opération fetch: ' + error);
    alert('La connexion au serveur a échouée !');
});

// Création de la function qui affichera les cases //

function createCard (teddy){
    return `
    <div class="card">
        <img class="thumbnail" src="${teddy.imageUrl}" alt="">
        <div><h1>${teddy.name}</h1></div>
        <p class="description">${teddy.description}</p>
        <a class="bouton" href="produit.html?id=${teddy._id}" > Voir </a>
    </div>
    `
}

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