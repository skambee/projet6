// Gestion du compteur de likes (total des likes sur la page)


// =========================
// Calcul du total des likes
// =========================

// Fonction qui calcule le total des likes de toutes les photos
export function calculateTotalLikes() {

  // Sélectionne tous les éléments contenant les likes
  const likeElements = document.querySelectorAll('.photo-likes');

  // Variable qui stocke le total des likes
  let totalLikes = 0;

  // Parcourt chaque élément de like
  likeElements.forEach(likeElement => {

    // Transforme le texte en nombre
    const likes = parseInt(likeElement.textContent);

    // Vérifie que c’est bien un nombre
    if (!isNaN(likes)) {

      // Ajoute les likes au total
      totalLikes += likes;
    }
  });

  // Retourne le total des likes
  return totalLikes;
}


// =========================
// Mise à jour de l'affichage
// =========================

// Fonction qui met à jour l'affichage du total des likes
export function updateTotalLikes() {

  // Récupère le total calculé
  const totalLikes = calculateTotalLikes();

  // Sélectionne le conteneur où afficher le total
  const priceAndLikesContainer = document.querySelector('.total_likes');

  // Met à jour le contenu HTML avec le total
  priceAndLikesContainer.innerHTML = `
    <span class="total-likes" aria-label="Total des likes">
      ${totalLikes}
    </span>
  `;
}