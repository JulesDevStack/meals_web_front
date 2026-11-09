# Meals Festival — logo Lottie

`meals-festival-logo.json` contient les 79 tracés vectoriels du SVG fourni, sans image ni police externe. Composition transparente de 1000 × 760 px, durée de 5 secondes, 60 images/s. Entrée avec rebond, flottement, puis sortie en fondu pour une lecture en boucle.

Ouvrir `animations/preview.html` depuis le serveur HTTP local du projet. Le lecteur de cet aperçu utilise lottie-web 5.12.2 depuis un CDN et nécessite Internet. Le JSON reste autonome et peut être utilisé avec un lecteur installé localement.

Exemple d’intégration avec lottie-web chargé :

```js
const animation = lottie.loadAnimation({
    container: document.getElementById('logo-animation'),
    renderer: 'svg',
    loop: true,
    autoplay: !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    path: 'animations/meals-festival-logo.json'
});
```

Pour afficher le logo immobile, utiliser `animation.goToAndStop(66, true)` après l’événement `DOMLoaded`.

Pour régénérer le JSON à partir du SVG : `python3 animations/build-logo.py`.

## Version lettre par lettre

`meals-festival-letters.json` : boucle de 9 secondes à 60 images/s. Les 13 lettres arrivent en cascade avec rotation et rebond élastique, puis effectuent une vague et se dispersent. Six éclats rouges et verts ponctuent la chorégraphie.

Ouvrir `preview-letters.html` depuis le serveur local. Le lecteur et les commandes sont partagés entre les deux aperçus. Le JSON réutilise une seule composition vectorielle du logo ; des masques découpent ses lettres et leur extrusion. Le SVG fourni est aplati et ne contient pas de calques de lettres : ces découpes sont réalisées pour cette animation.

Image fixe de la version lettre par lettre : frame 200. Régénération : `python3 animations/build-logo-letters.py`, après génération de la première version.
