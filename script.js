
function sharePreviousLetexto(button) {
  console.log('✅ Clic détecté sur le bouton de partage.');

  const bigmaContainer = button.closest('.bigma');
  if (!bigmaContainer) {
    console.error('❌ Conteneur "bigma" non trouvé.');
    alert('Erreur : conteneur "bigma" manquant.');
    return;
  }

  const letextoElement = bigmaContainer.querySelector('.letexto');
  if (!letextoElement) {
    console.error('❌ Aucun ".letexto" trouvé dans le conteneur.');
    alert('Aucune duaa trouvée avec la classe "letexto".');
    return;
  }

  const text = letextoElement.innerText || letextoElement.textContent;
  const url = window.location.href;
  const fullText = `${text}\n\nPartagé depuis: ${url}`;

  console.log('📄 Duaa trouvée :', text);

  if (navigator.share) {
    navigator.share({ title: 'Duaa partagée', text, url });
  } else {
    showShareMenu(text, url, fullText);
  }
}

// Affichage du menu
function showShareMenu(text, url, fullText) {
  const shareMenu = `
    <div class="share-menu">
      <h4>Partager cette duaa :</h4>
      <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}" target="_blank" rel="noopener" class="share-link fb">Facebook</a>
      <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(fullText)}" target="_blank" rel="noopener" class="share-link tw">Twitter (X)</a>
      <a href="https://wa.me/?text=${encodeURIComponent(fullText)}" target="_blank" rel="noopener" class="share-link wa">WhatsApp</a>
      <a href="https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(fullText)}" target="_blank" rel="noopener" class="share-link tg">Telegram</a>
      <button class="close-share-menu">Fermer</button>
    </div>
  `;

  const menu = document.createElement('div');
  menu.innerHTML = shareMenu;
  menu.style.cssText = `
    position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
    background: white; padding: 20px; border: 1px solid #ccc; border-radius: 8px;
    z-index: 10000; box-shadow: 0 4px 12px rgba(0,0,0,0.15); max-width: 300px;
    font-family: system-ui, sans-serif; text-align: center;
  `;
  document.body.appendChild(menu);

  menu.querySelector('.close-share-menu').onclick = () => document.body.removeChild(menu);
  setTimeout(() => {
    document.addEventListener('click', (e) => {
      if (!menu.contains(e.target)) document.body.removeChild(menu);
    });
  }, 100);
}

// 🔥 Attacher l’événement à TOUS les boutons ".share-btn" après chargement
document.addEventListener('DOMContentLoaded', () => {
  console.log('🔌 Script de partage chargé.');

  const shareButtons = document.querySelectorAll('.share-btn');
  console.log('ButtonTitles trouvés :', shareButtons.length);

  shareButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      sharePreviousLetexto(e.target.closest('button') || e.target);
    });
  });
});

// Pour Gutenberg (éditeur)
if (typeof wp !== 'undefined' && wp.domReady && wp.blocks && wp.element) {
  wp.domReady(() => {
    wp.blocks.registerBlockType('duaa/partager-duaa', {
      title: 'Partager cette duaa',
      icon: 'share',
      category: 'widgets',
      edit: () => wp.element.createElement('button', { className: 'share-btn' }, 'Partager cette duaa'),
      save: () => wp.element.createElement('button', { className: 'share-btn' }, 'Partager cette duaa')
    });
  });
}