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

function getIcon(name) {
  const icons = {
    facebook: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.128 22 16.991 22 12z"/></svg>`,
    twitter: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M23.954 4.569a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.691 8.094 4.066 6.13 1.64 3.161a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.061a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.21 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z"/></svg>`,
    whatsapp: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`,
    telegram: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.814-1.084.503L12 16.313l-1.356 1.618c-.164.196-.338.28-.537.173-.199-.106-.221-.348-.054-.606l2.239-3.456-4.13-1.263c-.375-.114-.397-.338-.13-.589l7.271-6.846c.242-.229.525-.229.768 0l2.341 2.231c.243.229.105.489-.194.589z"/></svg>`
  };
  return icons[name] || '';
}

function showShareMenu(text, url, fullText) {
  const fbIcon = getIcon('facebook');
  const twIcon = getIcon('twitter');
  const waIcon = getIcon('whatsapp');
  const tgIcon = getIcon('telegram');

  const shareMenu = `
    <div class="duaa-share-modal">
      <div class="duaa-share-content">
        <div class="duaa-share-header">
          <h4>Partager cette duaa</h4>
          <button class="duaa-close">&times;</button>
        </div>
        <div class="duaa-share-buttons">
          <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}" target="_blank" rel="noopener" class="duaa-share-btn fb" title="Partager sur Facebook">
            ${fbIcon}
          </a>
          <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(fullText)}" target="_blank" rel="noopener" class="duaa-share-btn tw" title="Partager sur Twitter">
            ${twIcon}
          </a>
          <a href="https://wa.me/?text=${encodeURIComponent(fullText)}" target="_blank" rel="noopener" class="duaa-share-btn wa" title="Partager sur WhatsApp">
            ${waIcon}
          </a>
          <a href="https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(fullText)}" target="_blank" rel="noopener" class="duaa-share-btn tg" title="Partager sur Telegram">
            ${tgIcon}
          </a>
        </div>
      </div>
    </div>
  `;

  const modal = document.createElement('div');
  modal.innerHTML = shareMenu;
  document.body.appendChild(modal);

  modal.querySelector('.duaa-close').onclick = () => document.body.removeChild(modal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) document.body.removeChild(modal);
  });
}

// Attacher l’événement à TOUS les boutons ".share-btn"
document.addEventListener('DOMContentLoaded', () => {
  console.log('🔌 Script de partage chargé.');
  document.querySelectorAll('.share-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      sharePreviousLetexto(e.target.closest('.share-btn'));
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