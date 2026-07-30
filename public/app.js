const shareButtons = document.querySelectorAll(".share-button");

shareButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const product = button.dataset.product || "producto";
    const text = `Mira este producto del catalogo Lilimoni: ${product}`;

    if (navigator.share) {
      await navigator.share({
        title: product,
        text,
        url: window.location.href
      });
      return;
    }

    await navigator.clipboard.writeText(`${text} ${window.location.href}`);
    button.textContent = "Enlace copiado";
    setTimeout(() => {
      button.textContent = "Compartir producto";
    }, 1800);
  });
});
