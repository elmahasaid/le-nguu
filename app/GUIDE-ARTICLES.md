# Ajouter un article au site Le Nguu

Un article = **un fichier** dans `content/articles/`. Le site crée tout seul sa page,
l'ajoute à sa rubrique et à l'accueil. Il n'y a plus de code à écrire.

## 1. Installation (une seule fois)

```
npm install gray-matter marked
npm install -D mammoth turndown pdf-parse
```

Dans `package.json`, ajoutez dans `"scripts"` :

```
"article": "node scripts/import-article.mjs"
```

Puis **supprimez les anciens fichiers d'articles** (leur contenu est déjà dans `content/articles/`) :

- `app/politique/page.tsx` et le dossier `app/politique/etat-armee-peuple/`
- `app/monde-afrique/page.tsx` et le dossier `app/monde-afrique/iran-israel-usa/`

## 2. Méthode A — depuis un fichier Word (recommandée)

Mettez ces lignes **tout en haut** du document Word, puis le texte juste dessous :

```
Titre : Le titre de l'article
Sous-titre : (facultatif)
Chapeau : Une ou deux phrases de résumé
Rubrique : Politique
Catégorie : Géopolitique        (facultatif)
Auteur : Prénom Nom
Fonction : Journaliste          (facultatif)
Date : 15/11/2026 08:00         (facultatif)
Légende : Légende de la photo   (facultatif)
Crédit : Nom du photographe     (facultatif)
```

Dans le texte, utilisez les styles Word « Titre 1 » ou « Titre 2 » pour les intertitres.
La **première image** du document devient la photo principale ; les autres restent dans le texte.

Puis dans un terminal, depuis le dossier du projet :

```
npm run article -- chemin/vers/mon-article.docx
```

Options utiles : `--une` (mettre à la Une), `--brouillon` (ne pas publier), `--force` (remplacer),
`--rubrique`, `--auteur`, `--image photo.jpg`. Liste complète : `npm run article -- --aide`.

## 3. Méthode B — copier-coller

1. Copiez `content/articles/_modele.md` et renommez-le (ex. `mon-titre.md`).
2. Remplissez l'en-tête entre les deux `---`, collez le texte dessous.
3. Déposez les photos dans `public/articles/mon-titre/`.

Vous pouvez aussi coller le texte dans un fichier `.txt` (avec le bloc de lignes de la méthode A)
et l'importer avec `npm run article -- mon-texte.txt`.

## 4. Méthode C — depuis un PDF (à éviter si possible)

`npm run article -- mon-article.pdf --rubrique politique --titre "..." --chapeau "..." --auteur "..."`

Le texte est extrait **sans mise en forme** (pas d'intertitres, de gras, ni d'images) et les paragraphes
peuvent être mal coupés. L'article est donc créé en **brouillon** : relisez-le, ajoutez la photo,
puis supprimez la ligne `publie: false`. Un PDF scanné (photo) ne peut pas être lu.

## 5. Gérer les articles

| Je veux…                    | Je fais…                                                      |
|-----------------------------|---------------------------------------------------------------|
| Corriger un article         | Modifier son fichier `.md`                                    |
| Mettre à la Une             | Ajouter `une: true` (retirez-le de l'ancien article de la Une) |
| Cacher un article           | Ajouter `publie: false`                                       |
| Supprimer un article        | Supprimer son fichier `.md`                                   |
| Changer de rubrique         | Modifier la ligne `rubrique:`                                 |

Rubriques possibles : Politique, Économie, Société, Santé, Diaspora, Monde / Afrique, Culture & Sport, Décryptage
(liste dans `app/lib/rubriques.json`).

## 6. Mettre en ligne

Après chaque ajout ou modification, relancez `npm run dev` pour vérifier en local, puis republiez le site.
Les articles sont lus au moment de la construction du site : un nouvel article n'apparaît en ligne qu'après republication.
