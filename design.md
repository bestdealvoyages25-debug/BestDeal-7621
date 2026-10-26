# Best Deal Voyages — Design

Site vitrine de **Best Deal Voyages**, agence de voyage algérienne spécialisée dans le **désert algérien** (Djanet / Tassili n'Ajjer, Timimoun / Gourara, Ghardaïa / M'zab, Tamanrasset / Hoggar). Structure et sections calquées sur la référence fournie par le client (timboo-voyage.com), avec l'identité visuelle de la marque (logo noir & or) : accueil riche (slider, recherche, forfaits vedette, destinations, avis, blog), liste de circuits filtrable, fiche circuit détaillée avec programme jour par jour, destinations, blog, à-propos et contact avec demande de devis enregistrée en base.

Plateforme : **web** (le desktop charge la même UI).

## Brand & Colors

Identité : désert haut de gamme — **noir profond + or**, sable et terre cuite en soutien. Pas de coins arrondis généreux : angles francs, filets or fins, grandes images plein cadre.

| Token | Valeur | Usage |
|-------|--------|-------|
| `--ink` | `#0B0A08` | Fond sombre (header, footer, bandes CTA) |
| `--night` | `#14110D` | Surfaces sombres secondaires |
| `--gold` | `#C89B3C` | Accent principal : boutons, filets, prix, labels |
| `--gold-soft` | `#E7C878` | Accent clair, hover, texte or sur fond noir |
| `--terracotta` | `#B65A32` | Accent secondaire (badges promo, soulignés) |
| `--cream` | `#FBF7F0` | Fond de section alterné |
| `--sand` | `#EFE4D2` | Cartes, encarts, bordures chaudes |
| `--paper` | `#FFFFFF` | Fond principal clair |
| `--text` | `#1C1814` | Texte courant |
| `--muted` | `#6E6459` | Texte secondaire |

## Typography

- **Display — Marcellus** (serif, capitales espacées) : titres de section, noms de circuits, chiffres de prix. Jamais en dessous de 20px.
- **Body — Jost** (sans géométrique) : texte, navigation, boutons, formulaires.
- Labels de section en Jost 500, uppercase, `letter-spacing: .22em`, couleur or.
- Échelle : 12 / 14 / 16 / 18 / 24 / 32 / 44 / 60 px. Hauteur de ligne généreuse (1.7 sur le corps).
- Chargées depuis Google Fonts dans `index.html`.

## Layout & Components

- Conteneur max `1240px`, gouttières 20px (mobile) → 40px (desktop).
- Header sombre collant : barre d'info (tagline + email/tél + réseaux) puis logo à gauche, navigation uppercase, bouton or « Demande de devis ».
- Slider d'accueil plein écran (≈ 86vh) avec voile dégradé, titre Marcellus, carte prix/durée en surimpression à droite, flèches + puces.
- Barre de recherche en carte blanche qui chevauche le bas du slider (destination, type de séjour, durée, budget).
- Cartes circuit : image 3:2, bordure or 1px, badge destination, durée, prix en Marcellus or, bouton « Voir plus ».
- Sections numérotées visuellement : label or → titre Marcellus → sous-titre muted.
- Alternance des fonds : paper → cream → ink (bandes sombres pour « types de séjour », CTA et footer).
- Grilles asymétriques : 3 colonnes features, 3+1 destinations, 2 colonnes blog.
- Révélations au scroll (IntersectionObserver + CSS), fondu/translation 24px, décalage en cascade.

## Pages

- **Accueil** (`pages/index.tsx`) — slider, recherche, pourquoi nous (6 atouts), forfaits vedette, destinations, offres spéciales, types de séjour, blog récent, avis clients, bande CTA.
- **Circuits** (`pages/circuits.tsx`) — grille filtrable (destination, type, durée, budget), tri par prix.
- **Fiche circuit** (`pages/circuit-detail.tsx`) — hero, barre d'infos, description, points forts, programme jour par jour, prestations incluses/non incluses, formulaire de devis, circuits similaires.
- **Destinations** (`pages/destinations.tsx`) — Djanet, Timimoun, Ghardaïa, Tamanrasset : texte, saison, circuits liés.
- **Blog** + article (`pages/blog.tsx`, `pages/blog-post.tsx`).
- **À propos** (`pages/a-propos.tsx`) — histoire, valeurs, chiffres, engagement.
- **Contact** (`pages/contact.tsx`) — coordonnées, horaires, formulaire de contact + devis enregistré en base.

## Key User Flows

1. Accueil → recherche (destination / type / durée / budget) → liste filtrée → fiche circuit → « Demander un devis » (formulaire prérempli avec le circuit) → enregistrement en base + confirmation.
2. Accueil → forfait vedette → fiche circuit → devis.
3. Contact → formulaire général (sujet, message) → enregistrement en base.
4. Navigation mobile : menu plein écran sombre, CTA téléphone fixe.

## Architecture

- **API** : procédures oRPC (`src/api/routes/`) — `circuits` (liste filtrable, détail, vedettes), `destinations`, `testimonials`, `posts`, `requests` (création des demandes de contact/devis).
- **DB** : Drizzle + Turso — tables `circuits`, `destinations`, `testimonials`, `posts`, `requests` (seed via `src/api/seed.ts`).
- **Front** : React + Wouter, hooks TanStack Query dans `src/web/queries/` (un fichier par feature), contenu éditable (coordonnées, navigation, atouts) dans `src/web/lib/site.ts`.
