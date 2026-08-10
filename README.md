# Espace de formation — face stagiaire

Page unique, sans dépendance à installer, prévue pour GitHub Pages.
Le client Supabase est embarqué dans `vendor/` : rien n'est appelé depuis un
CDN tiers, souvent filtré par les réseaux d'entreprise.

## Voir l'interface tout de suite

Ouvrir `index.html?demo` — un double-clic suffit, aucun serveur, aucune
configuration. Les données sont fictives et rien n'est enregistré. Le parcours
complet est jouable : capsule non avançable, questionnaire, cas pratique.

## Mettre en service

**1. Renseigner `config.js`**

Supabase → *Settings* → *API* :
- *Project URL* → `SUPABASE_URL`
- clé *anon / public* → `SUPABASE_ANON_KEY`

Ne jamais y mettre la clé `service_role`. La clé anon est publique par nature :
c'est la RLS qui protège les données.

**2. Vérifier que les schémas sont exposés**

Supabase → *Settings* → *API* → *Exposed schemas* : `contenu`, `lms`, `eval`.
Jamais `prive`.

**3. Publier**

Déposer le dossier dans un dépôt GitHub, activer Pages sur la branche.
`exemple/` et `demo.js` peuvent être supprimés une fois la mise en service faite.

## Ce que fait la page

| Écran | Contenu |
|---|---|
| Connexion | adresse + mot de passe. Pas de réinitialisation en autonomie : le message renvoie vers la gestionnaire. |
| Mes séances | la séance du jour en évidence, les suivantes en liste. La barre de journée montre 08h30–16h30 et la marge jusqu'à 18h30. |
| La séance | le fil vertical des étapes, verrouillées tant que la précédente n'est pas validée. |

Les étapes vidéo se valident seules au visionnage. Toute tentative d'avance
rapide ramène la lecture à ce qui a réellement été vu — côté page pour le
confort, côté serveur pour de bon.

## Ce qui n'est pas encore là

- Reprise fine de la capsule après fermeture du navigateur en cours de lecture
  (la reprise se fait au dernier point enregistré, à 10 secondes près).
- Affichage du contenu textuel des étapes `lecture` et `exercice` : la table
  `contenu.etapes` ne porte aujourd'hui qu'un lien, pas de corps de texte.
- Aucun envoi de courrier : la convocation passe par le planning.
