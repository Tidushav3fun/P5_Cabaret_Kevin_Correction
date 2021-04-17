// Importation du panier ou création tableau //

let panier = JSON.parse(localStorage.getItem("panier")) || []

// Création de l'apparence des container par rapport à l'id du produit //

var searchParams = new URLSearchParams(window.location.search)
const id = searchParams.get("id")
console.log(id)
const title = document.querySelector("#containerproduct h1")
const description = document.querySelector("#containerproduct .productdescription")
const image = document.querySelector("#containerproduct img")
const prix = document.querySelector("#containerproduct .prix")
const select = document.querySelector("#containerproduct select")
const button = document.querySelector("#containerproduct button")
let teddy

// Importation des données et envoi des données sur le HTML //

fetch(api+"/"+ id)
.then ((response) => response.json())
.then((data) => {
    teddy=data
    console.log(teddy);
    title.innerHTML= teddy.name
    image.setAttribute("src",teddy.imageUrl)
    description.innerHTML= teddy.description
    prix.innerHTML = (teddy.price/100 + " " +"€")
    for (const color of teddy.colors){
        const option = document.createElement("option")
        option.setAttribute("value", color)
        option.innerHTML = color
        select.appendChild(option)
    }
})

.catch (function (err) {
    alert('La connexion au serveur a échouée !');
});
  
// Ajouter un article au panier //

button.addEventListener("click", ()=> { 
    panier.push({
        name : teddy.name,
        price : teddy.price,
        id : teddy._id,
        color : select.value,
        quantity : 1,
    })
    localStorage.setItem("panier",JSON.stringify(panier))
    alert('Ajouté au panier !');
    window.location.reload();
})

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