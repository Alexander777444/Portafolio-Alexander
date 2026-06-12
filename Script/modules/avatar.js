export function initAvatar() {
  const imgAvatar = document.getElementById('avatarImg');
  const placeholder = document.getElementById('avatarPlaceholder');

  if (!imgAvatar) return;

  imgAvatar.addEventListener('load', () => {
    if (imgAvatar.naturalWidth > 0 && placeholder) {
      placeholder.style.display = 'none';
    }
  });

  imgAvatar.addEventListener('error', () => {
    imgAvatar.style.display = 'none';
    if (placeholder) placeholder.style.display = 'flex';
  });

  if (!imgAvatar.getAttribute('src') || imgAvatar.src === window.location.href) {
    imgAvatar.style.display = 'none';
  }
}
