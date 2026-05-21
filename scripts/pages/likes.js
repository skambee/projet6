
export function calculateTotalLikes() {
    const likeElements = document.querySelectorAll('.photo-likes');
    let totalLikes = 0;

    likeElements.forEach(likeElement => {
      const likes = parseInt(likeElement.textContent);
      if (!isNaN(likes)) {
        totalLikes += likes;
      }
    });

    return totalLikes;
  }

 export function updateTotalLikes() {
    const totalLikes = calculateTotalLikes();
    const priceAndLikesContainer = document.querySelector('.total_likes');
    // Accessibilité : ajoute un libellé clair au compteur total de likes.
    priceAndLikesContainer.innerHTML = `<span class="total-likes" aria-label="Total des likes">${totalLikes}</span>`
  }
