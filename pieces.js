// Récupération des pièces depuis le fichier JSON
const reponse = await fetch("pieces-autos.json");
const pieces = await reponse.json();

const afficherFiches = function(liste){
document.querySelector(".fiches").innerHTML = ''; // Efface le contenu de la balise body et donc l’écran
for (let i = 0; i < liste.length; i++) {

	// Récupération de l'élément du DOM qui accueillera les fiches
	const sectionFiches = document.querySelector(".fiches");
	// Création d’une balise dédiée à une pièce automobile
	const pieceElement = document.createElement("article");
	// On crée l’élément img.
	const imageElement = document.createElement("img");
	// On accède à l’indice i de la liste pieces pour configurer la source de l’image.
	imageElement.src = liste[i].image;
	// Idem pour le nom, le prix et la catégorie...
    const nomElement = document.createElement("h2");
    nomElement.innerText = liste[i].nom;

    const prixElement = document.createElement("p");
    prixElement.innerText = `Prix: ${liste[i].prix} € (${liste[i].prix < 35 ? "€" : "€€€"})`;

    const categorieElement = document.createElement("p");
    categorieElement.innerText = categorieElement.innerText = liste[i].categorie ?? "(aucune catégorie)";

    const descriptionElement = document.createElement("p");
    descriptionElement.innerText = descriptionElement.innerText = liste[i].description ?? "Pas de description pour le moment.";

    const disponibiliteElement = document.createElement("p");
    disponibiliteElement.innerText = liste[i].disponibilité=="oui" ? "En stock" : "Rupture de stock"; 

	
	// On rattache la balise article à la section Fiches
	sectionFiches.appendChild(pieceElement);
	// On rattache l’image à pieceElement (la balise article)
	pieceElement.appendChild(imageElement);
	// Idem pour le nom, le prix et la catégorie...
    pieceElement.appendChild(nomElement);
    pieceElement.appendChild(prixElement);
    pieceElement.appendChild(categorieElement);
    pieceElement.appendChild(descriptionElement);
    pieceElement.appendChild(disponibiliteElement);
    
}
};
afficherFiches(pieces)


//Gestion des boutons
const boutonTrier = document.querySelector(".btn-trier");
boutonTrier.addEventListener("click", () => {
	const piecesOrdonnees = Array.from(pieces);
	piecesOrdonnees.sort((a, b) => a.prix - b.prix);
    afficherFiches(piecesOrdonnees);
	console.log(piecesOrdonnees);
});

const boutonFiltrer = document.querySelector(".btn-filtrer");
boutonFiltrer.addEventListener("click", () => {
	const piecesFiltrees = pieces.filter((piece) => piece.prix <= 35);
    afficherFiches(piecesFiltrees);
    console.log(piecesFiltrees);
});

const boutonDecroit = document.querySelector(".btn-trier-decroit");
boutonDecroit.addEventListener("click", () => {
    	const piecesOrdonnees = Array.from(pieces);
	piecesOrdonnees.sort((a, b) => b.prix - a.prix);
    afficherFiches(piecesOrdonnees);
	console.log(piecesOrdonnees);
});

const boutonFiltreDescription = document.querySelector(".btn-description");
boutonFiltreDescription.addEventListener("click", () => {
	const piecesFiltrees = pieces.filter((piece) => piece.description != null);
    afficherFiches(piecesFiltrees);
    console.log(piecesFiltrees);
});


