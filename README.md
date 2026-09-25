# UpgradeMyPC — MVP

Site statique prêt à être publié sur GitHub Pages ou Netlify.

## 1. Tester en local
Ouvrir `index.html` dans un navigateur.

## 2. Publier gratuitement avec GitHub Pages
1. Créer un compte GitHub si nécessaire.
2. Créer un dépôt public, par exemple `upgrademypc`.
3. Envoyer tous les fichiers de ce dossier à la racine du dépôt.
4. Dans GitHub : Settings > Pages.
5. Choisir le déploiement depuis la branche principale (`main`) et la racine (`/`).
6. Une URL publique GitHub Pages sera fournie.

## 3. Avant de demander l'affiliation
- Publier le site publiquement.
- Remplir `mentions-legales.html` et `confidentialite.html` avec les informations réelles nécessaires.
- Ajouter quelques contenus réellement utiles au site (guides, comparatifs, FAQ, pages composants).
- Vérifier que tous les liens et le configurateur fonctionnent.

## 4. Ajouter de vrais liens affiliés
Après acceptation par un programme partenaire, ouvrir `affiliate-config.js` et coller les URL fournies dans les champs correspondants.

Exemple :
```js
window.AFFILIATE_LINKS = {
  ram16: "https://lien-fourni-par-le-programme.example/...",
  ram32: "",
  nvme: "",
  gpuMid: "",
  gpuHigh: "",
  cpu: "",
  monitor: ""
};
```

Ne pas inventer de balise d'affiliation et ne pas utiliser les marques/logos d'un programme sans respecter ses règles.

## 5. Fichiers à modifier après publication
- `sitemap.xml` : configuré pour `https://langoku851.github.io/upgrade-my-pc/`.
- `robots.txt` : ajouter l'URL du sitemap.
- `mentions-legales.html` : compléter les informations de l'éditeur et de l'hébergeur.
- `confidentialite.html` : ajouter le contact et mettre à jour si analytics/cookies sont ajoutés.

## Idée de croissance
Créer ensuite des pages SEO utiles :
- Quel upgrade pour une RTX 3060 ?
- 16 Go ou 32 Go de RAM pour jouer ?
- Quand faut-il changer de CPU ?
- SSD SATA vs NVMe pour le gaming.
- Quel écran pour 1080p / 1440p / 4K ?

Ces pages peuvent renvoyer vers le configurateur et, après acceptation, vers les liens partenaires.
