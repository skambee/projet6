
// Calcule le total des likes de toutes les photos affichées
export function calculateTotalLikes() {
  // Récupère tous les éléments contenant les likes
  const likeElements = document.querySelectorAll('.photo-likes');

  // Compteur total des likes
  let totalLikes = 0;

  // Parcourt chaque élément de like
  likeElements.forEach(likeElement => {
    // Convertit le texte en nombre
    const likes = parseInt(likeElement.textContent);

    // Vérifie que la valeur est bien un nombre
    if (!isNaN(likes)) {
      totalLikes += likes; // Ajoute au total
    }
  });

  // Retourne le total des likes
  return totalLikes;
}

// Met à jour l'affichage du total des likes sur la page
export function updateTotalLikes() {
  // Récupère le total des likes calculé
  const totalLikes = calculateTotalLikes();

  // Récupère le conteneur HTML où afficher le total
  const priceAndLikesContainer = document.querySelector('.total_likes');

  // Met à jour le contenu HTML avec le nouveau total
  // Accessibilité : ajoute un label pour les lecteurs d’écran
  priceAndLikesContainer.innerHTML = `
    <span class="total-likes" aria-label="Total des likes">
      ${totalLikes}
    </span>
  `;
}