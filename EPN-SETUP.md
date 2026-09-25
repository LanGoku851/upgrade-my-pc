# Activation eBay Partner Network — UpgradeMyPC

Ce fichier sert uniquement de procédure interne pour activer les boutons eBay affiliés du site.

## Principe

UpgradeMyPC ne fabrique pas les URL EPN lui-même. Chaque lien doit être généré depuis l’outil officiel eBay Partner Network puis collé tel quel dans `epn-links.js`.

Ne pas ajouter, supprimer ou modifier manuellement les paramètres d’un lien généré par EPN.

## Campagne conseillée

Créer une campagne dédiée au site, par exemple :

`UpgradeMyPC`

Le Campaign ID est géré par EPN dans le lien généré. Il n’a pas besoin d’être stocké séparément dans le code du site.

## Procédure pour un produit

1. Ouvrir `epn-links.js`.
2. Repérer l’identifiant du produit à activer.
3. Copier l’URL `destination` correspondante.
4. Dans eBay Partner Network, ouvrir le générateur de lien.
5. Sélectionner la campagne UpgradeMyPC.
6. Copier le `customId` conseillé dans `epn-links.js` et l’utiliser dans le champ Custom ID lorsque l’outil le permet.
7. Coller l’URL eBay `destination` dans le générateur.
8. Générer le lien affilié.
9. Copier le lien produit par EPN sans le modifier.
10. Coller ce lien entre les guillemets de `url: ''` dans `epn-links.js`.
11. Publier la modification.

Exemple avant activation :

```js
'powercolor-reaper-rx9070': {
  customId: 'umpgpureaper9070',
  destination: 'https://www.ebay.fr/sch/i.html?_nkw=PowerColor+Reaper+Radeon+RX+9070+16GB',
  url: ''
}
```

Exemple après activation :

```js
'powercolor-reaper-rx9070': {
  customId: 'umpgpureaper9070',
  destination: 'https://www.ebay.fr/sch/i.html?_nkw=PowerColor+Reaper+Radeon+RX+9070+16GB',
  url: 'COLLER_ICI_LE_LIEN_EPN_GENERE'
}
```

## Pourquoi utiliser une page de résultats eBay comme destination ?

Une annonce eBay précise peut disparaître lorsqu’elle est vendue ou retirée. Une recherche portant sur le modèle exact reste généralement plus durable pour un comparateur comme UpgradeMyPC. Si une annonce particulièrement intéressante et stable doit être mise en avant, le générateur EPN peut aussi créer un lien vers cette annonce précise.

## Suivi des conversions

Les Custom IDs proposés dans `epn-links.js` sont différents selon les produits. Ils permettent ensuite de distinguer dans les rapports EPN quel matériel génère des clics et des transactions.

Exemples :

- `umpgpupulse9060xt16`
- `umpgpureaper9070`
- `umpgpuhellhound9070xt`
- `umpcpu9800x3d`
- `umpsn850x1tb`

## Vérification après publication

1. Faire un diagnostic qui affiche le produit activé.
2. Vérifier que le bouton `Voir chez eBay` apparaît.
3. Cliquer sur le bouton et vérifier qu’il ouvre la destination attendue.
4. Ne pas conclure qu’un lien est mal configuré uniquement parce qu’aucune transaction n’apparaît immédiatement dans EPN : les rapports peuvent avoir un délai.

## Smart Links

EPN propose également Smart Links pour transformer automatiquement les liens eBay d’un site en liens trackés. Ne pas ajouter le code Smart Links tant que le compte EPN n’est pas accepté et que le snippet officiel propre au compte n’a pas été récupéré depuis eBay.
