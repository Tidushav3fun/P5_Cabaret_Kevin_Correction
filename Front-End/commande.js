let panier = JSON.parse(localStorage.getItem("panier"))

// Id pour le numéro de commande //
let id = location.search.split('=')[1];
let numeroCde = id;

//  Total de la commande //
function totalCommande(){
    sumTotal = 0; 
    for(let i =0; i<panier.length; i++){
        sumTotal += (panier[i].price/100);
    }

    return sumTotal
};

// fonction qui affiche l'identifiant et le total
function showOrder (){
    let idOrder = document.getElementById('orderId');
    idOrder.innerHTML = numeroCde;
    let article = document.getElementById('nbrarticle');
    article.innerHTML = "  (" + panier.length + ") ";
    let totalCde = document.getElementsByClassName('totalCde');
    totalCde[0].innerHTML = totalCommande() + " €";
    totalCde[1].innerHTML = totalCommande() + " €";
    return totalCde.innerHTML
};

showOrder();

localStorage.clear();

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
