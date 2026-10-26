/**
 * Contenu de départ du site Best Deal Voyages.
 * Exécution : `cd packages/web && bun run src/api/seed.ts` (après `bun run db:push`).
 * Relancer le script réinitialise le contenu éditorial (circuits, destinations, avis, blog).
 */
import { db } from "./database";
import * as schema from "./database/schema";

const J = (v: unknown) => JSON.stringify(v);

type SeedCircuit = {
  slug: string;
  title: string;
  destination: string;
  destinationLabel: string;
  type: string;
  level: string;
  summary: string;
  description: string;
  image: string;
  durationDays: number;
  durationBucket: string;
  priceFrom: number | null;
  departureCity: string;
  groupSize: string;
  pension: string;
  months: string;
  rating: number;
  reviews: number;
  promo: number | null;
  featured: number;
  privateOnDemand: number;
  highlights: string[];
  program: { day: string; title: string; text: string }[];
  included: string[];
  notIncluded: string[];
};

const circuits: SeedCircuit[] = [
  {
    slug: "djanet-plateau-tadjlahine",
    title: "Djanet : Les plateaux de Tadjlahine, Ihéren et Tahilahi",
    destination: "djanet",
    destinationLabel: "Djanet",
    type: "Trekking",
    level: "Difficile",
    summary:
      "Six jours de trek et 90 km de marche sur le plateau de Tadjlahine, entre Djanet et Illizi : les abris peints d'Ihéren et de Tahilahi, une aventure unique pour les passionnés d'archéologie.",
    description:
      "Le plateau de Tadjlahine est un vaste massif de grès situé au cœur du Parc culturel du Tassili n'Ajjer, dans le sud-est de l'Algérie, à mi-chemin entre Djanet et Illizi, près de l'oasis d'Iherir. Peu fréquenté, il se parcourt à pied, loin des pistes, entre canyons, tours de grès et gueltas.\n\nLe plateau est réputé pour abriter des peintures préhistoriques remarquables, notamment celles des abris sous roche d'Ihéren et de Tahilahi, qui ont donné leur nom au style naturaliste « Iheren-Tahilahi », daté approximativement de 4500 à 2200 av. J.-C. : troupeaux, scènes de chasse, girafes, femmes parées et campements pastoraux peints avec une finesse rare.\n\nSix jours de trek, environ 90 km de marche : une aventure unique pour les passionnés d'archéologie. Le camp et les vivres suivent avec l'équipe d'assistance, un bivouac différent chaque soir. Les vols vers Djanet sont inclus dans le prix.",
    image: "/images/circuits/djanet-plateau-tadjlahine.jpg",
    durationDays: 6,
    durationBucket: "5-6 jours",
    priceFrom: null,
    departureCity: "Djanet",
    groupSize: "4 à 12 personnes",
    pension: "Bivouac, pension complète",
    months: "Oct - Nov - Déc - Jan - Fév - Mar",
    rating: 5,
    reviews: 0,
    promo: null,
    featured: 1,
    privateOnDemand: 1,
    highlights: [
      "Abris peints d'Ihéren et de Tahilahi, style naturaliste « Iheren-Tahilahi »",
      "Peintures préhistoriques datées d'environ 4500 à 2200 av. J.-C.",
      "Trek de 6 jours, environ 90 km de marche",
      "Massif de grès au cœur du Parc culturel du Tassili n'Ajjer",
      "Oasis d'Iherir, ses gueltas et ses jardins",
      "Vols vers Djanet inclus",
    ],
    program: [
      {
        day: "Jour 1",
        title: "Djanet — oasis d'Iherir",
        text: "Vol vers Djanet, accueil à l'aéroport et route en 4x4 vers l'oasis d'Iherir, à mi-chemin d'Illizi. Première marche dans la palmeraie et les gueltas, bivouac (environ 5 km).",
      },
      {
        day: "Jour 2",
        title: "Montée sur le plateau de Tadjlahine",
        text: "Ascension par un col de grès jusqu'au plateau. Premières stations rupestres et bivouac face aux canyons (environ 15 km).",
      },
      {
        day: "Jour 3",
        title: "L'abri d'Ihéren",
        text: "Marche vers l'abri sous roche d'Ihéren, l'un des sommets de l'art naturaliste saharien : troupeaux, girafes et scènes de chasse (environ 20 km).",
      },
      {
        day: "Jour 4",
        title: "Les parois de Tahilahi",
        text: "Journée vers Tahilahi : femmes parées, campements pastoraux et finesse du trait du style « Iheren-Tahilahi » (environ 20 km).",
      },
      {
        day: "Jour 5",
        title: "Traversée du plateau",
        text: "Longue étape entre tours et couloirs de grès, à la recherche de stations moins connues avec le guide. Dernier bivouac (environ 20 km).",
      },
      {
        day: "Jour 6",
        title: "Descente et retour à Djanet",
        text: "Descente du plateau, retour en 4x4 vers Djanet et transfert à l'aéroport pour le vol retour (environ 10 km).",
      },
    ],
    included: [
      "Vols aller-retour vers Djanet",
      "Guide spécialisé en art rupestre, cuisinier et logistique de trek",
      "Assistance pour le camp et les vivres",
      "Bivouac et pension complète pendant le trek",
      "Transferts aéroport et route Djanet – Iherir en 4x4",
      "Autorisations d'accès au Parc culturel du Tassili n'Ajjer",
    ],
    notIncluded: [
      "Vols internationaux",
      "Assurance voyage",
      "Sac à dos, sac de couchage et chaussures de marche",
      "Dépenses personnelles",
    ],
  },
  {
    slug: "djanet-tadrart-rouge",
    title: "Djanet : La Tadrart, joyaux du grand Sahara",
    destination: "djanet",
    destinationLabel: "Djanet",
    type: "Aventure",
    level: "Facile",
    summary:
      "Célèbre pour ses formations rocheuses incroyablement sculptées par l'érosion et ses vastes dunes de sable rouge, qui créent un panorama à la fois sauvage et majestueux.",
    description:
      "La Tadrart est l'un des joyaux du grand Sahara, située dans l'extrême Est du Tassili n'Ajjer : un désert de sable et de pierre où les couleurs se transforment au fil du jour. Ses dunes rouges flamboyantes, ses arches naturelles et ses canyons sculptés par le vent offrent un spectacle saisissant, particulièrement au lever et au coucher du soleil.\n\nVéritable décor de rêve, la Tadrart est aussi un lieu de mémoire, abritant des peintures et des gravures rupestres qui témoignent de la vie des Néolithiques. Explorer la Tadrart, c'est vivre une immersion totale dans la beauté brute du désert, entre silence, immensité et poésie des paysages.\n\nLe parcours se fait en 4x4 et à pied, à un rythme accessible à tous : bivouac monté chaque soir, repas chauds, eau en quantité et un chauffeur-pisteur qui connaît chaque col. Circuit privé possible : privatisation à la demande pour les groupes, les familles et les entreprises.",
    image: "/images/circuits/djanet-tadrart-rouge.jpg",
    durationDays: 6,
    durationBucket: "5-6 jours",
    priceFrom: null,
    departureCity: "Djanet",
    groupSize: "de 04 à 16 PAX",
    pension: "Bivouac",
    months: "Oct - Nov - Déc - Jan - Fév - Mar",
    rating: 5,
    reviews: 28,
    promo: null,
    featured: 1,
    privateOnDemand: 1,
    highlights: [
      "Dunes rouges flamboyantes et vastes étendues de sable",
      "Formations rocheuses sculptées par l'érosion : arches, tours et canyons",
      "Spectacle des couleurs au lever et au coucher du soleil",
      "Peintures et gravures rupestres néolithiques",
      "Parcours 4x4 et randonnée, niveau facile",
      "Bivouac sous les étoiles, pension complète",
      "Privatisation à la demande (groupes, familles, entreprises)",
    ],
    program: [
      {
        day: "Jour 1",
        title: "Arrivée à Djanet",
        text: "Accueil à Djanet, formalités et nuit en ville. Briefing de l'itinéraire avec le guide et le pisteur.",
      },
      {
        day: "Jour 2",
        title: "Erg Admer — entrée dans le sable rouge",
        text: "Premier contact avec les dunes : piste en 4x4 dans l'erg Admer, courte marche sur les crêtes et premier bivouac dans le sable.",
      },
      {
        day: "Jour 3",
        title: "Tin Merzouga, les grandes dunes",
        text: "Route vers les dunes rouges de Tin Merzouga, les plus hautes de la région. Randonnée facile sur la crête et coucher de soleil sur le désert.",
      },
      {
        day: "Jour 4",
        title: "Arches et canyons sculptés",
        text: "Journée d'exploration dans les chaos de grès rouge : arches naturelles, cathédrales de pierre, canyons creusés par le vent et abris sous roche.",
      },
      {
        day: "Jour 5",
        title: "Mémoire du Néolithique",
        text: "Recherche des peintures et gravures rupestres avec le guide, marche dans les oueds à sec, dernier bivouac loin de toute lumière.",
      },
      {
        day: "Jour 6",
        title: "Djanet — fin du circuit",
        text: "Remontée vers Djanet par la piste, temps libre au marché et transfert aéroport selon votre horaire de vol.",
      },
    ],
    included: [
      "4x4 avec chauffeur-pisteur et carburant",
      "Guide francophone, cuisinier et matériel de bivouac",
      "Bivouac et pension complète du jour 2 au jour 5",
      "Autorisations d'accès et taxes locales",
      "Eau minérale à volonté pendant le circuit",
      "Privatisation du circuit à la demande (groupes, familles, entreprises)",
    ],
    notIncluded: [
      "Vols vers Djanet",
      "Assurance voyage",
      "Boissons et dépenses personnelles",
      "Nuit supplémentaire en ville",
    ],
  },
  {
    slug: "djanet-mehari-tadrart",
    title: "Djanet : circuit méhari dans la Tadrart — Amen Samidnine",
    destination: "djanet",
    destinationLabel: "Djanet",
    type: "Trekking",
    level: "Modéré",
    summary:
      "Chevaucher un méhari dans la Tadrart, c'est accepter de se fondre dans le rythme millénaire du Sahara : huit jours au pas du dromadaire, entre dunes rouges, silence et méditation.",
    description:
      "Chevaucher un méhari dans la Tadrart, c'est accepter de se fondre dans le rythme millénaire du Sahara. Le pas lent et balancé du dromadaire devient une respiration, une prière silencieuse qui relie le voyageur à la mémoire des nomades. Chaque dune franchie est une méditation, chaque halte une communion avec le sable et le vent.\n\nIci, l'effort physique n'est pas un obstacle mais une initiation : endurance, chaleur, longues heures de marche ou de chevauchée… autant d'épreuves qui ouvrent la porte à une expérience intérieure. Le méhari ne transporte pas seulement le corps, il guide l'âme vers une rencontre intime avec l'infini.\n\nHuit jours de trek dans la Tadrart, avec une assistance 4x4 qui porte le camp, l'eau et les vivres : vous ne portez qu'un sac de journée. Les étapes alternent chevauchée au pas du dromadaire, marches à pied et longues pauses à l'ombre. Bivouac chaque soir, groupe limité à 10 PAX.",
    image: "/images/circuits/djanet-mehari-tadrart.jpg",
    durationDays: 8,
    durationBucket: "7-8 jours",
    priceFrom: null,
    departureCity: "Djanet",
    groupSize: "10 PAX maximum",
    pension: "Bivouac",
    months: "Nov - Déc - Jan - Fév - Mar",
    rating: 5,
    reviews: 12,
    promo: null,
    featured: 0,
    privateOnDemand: 0,
    highlights: [
      "Chevauchée au pas du méhari, au rythme des anciennes caravanes",
      "Trek accompagné d'une assistance 4x4 (camp, eau et vivres)",
      "Bivouacs dans la Tadrart : dunes rouges et chaos de grès",
      "Endurance, chaleur et longues heures de marche : une initiation",
      "Groupe de 10 PAX maximum, encadré par des chameliers du Sud",
      "Silence total et nuits sous les étoiles",
    ],
    program: [
      {
        day: "Jour 1",
        title: "Djanet — rencontre avec les chameliers",
        text: "Accueil à Djanet, rencontre de l'équipe et des méharis, briefing de la chevauchée et nuit en ville.",
      },
      {
        day: "Jour 2",
        title: "Premiers pas du méhari",
        text: "Départ de la caravane, apprentissage de la monte et du pas balancé, première étape courte et bivouac.",
      },
      {
        day: "Jour 3",
        title: "Dunes rouges de la Tadrart",
        text: "Longue étape au pas du dromadaire entre les dunes rouges, sieste à l'heure chaude et bivouac dans le sable.",
      },
      {
        day: "Jour 4",
        title: "Chaos de grès",
        text: "Journée mixte marche et chevauchée dans les formations rocheuses sculptées par l'érosion.",
      },
      {
        day: "Jour 5",
        title: "L'épreuve de l'endurance",
        text: "Étape la plus longue du séjour, au rythme lent des méharis. Repos, thé et dîner sous les étoiles.",
      },
      {
        day: "Jour 6",
        title: "Sites rupestres",
        text: "Découverte des parois peintes et gravées avec le guide, à pied, entre deux étapes de chevauchée.",
      },
      {
        day: "Jour 7",
        title: "Dernière chevauchée",
        text: "Retour progressif vers Djanet, dernier bivouac et soirée avec les chameliers.",
      },
      {
        day: "Jour 8",
        title: "Djanet — fin du circuit",
        text: "Retour en ville, temps libre et transfert aéroport selon votre horaire de vol.",
      },
    ],
    included: [
      "Méharis, chameliers et logistique de caravane",
      "Assistance 4x4 pour le camp, l'eau et les vivres",
      "Guide francophone et cuisinier",
      "Bivouac et pension complète pendant le trek",
      "Autorisations d'accès et taxes locales",
    ],
    notIncluded: [
      "Vols vers Djanet",
      "Assurance voyage",
      "Sac de couchage et chaussures de marche",
      "Dépenses personnelles et pourboires",
    ],
  },
  {
    slug: "djanet-iherir-essendilene",
    title: "Djanet : vallée d'Iherir et oasis d'Essendilène",
    destination: "djanet",
    destinationLabel: "Djanet",
    type: "Découverte",
    level: "Facile",
    summary:
      "Iherir, une vallée entourée de montagnes, et Essendilène, oasis verdoyante surnommée « le jardin suspendu », offrent des paysages rares au cœur du désert.",
    description:
      "Ce séjour invite à découvrir les sites emblématiques du Nord-Nord-Ouest du Tassili n'Ajjer. Il combine nature, oasis, culture et immersion humaine, avec bivouacs sous les étoiles et campings dans les zeribas traditionnelles, et des rencontres chaleureuses avec le peuple autochtone, pour une expérience saharienne authentique et inoubliable. Nous vous proposons un itinéraire hors du classique, fait par le reste des agences.\n\nIherir, une vallée entourée de montagnes, et Essendilène, oasis verdoyante surnommée « le jardin suspendu », offrent des paysages rares au cœur du désert.\n\nLe parcours se fait en 4x4 et à pied, à un rythme facile : bivouacs sous les étoiles, campings en zeriba chez l'habitant, gueltas et palmeraies. De 04 à 16 PAX, avec privatisation à la demande pour les groupes, les familles et les entreprises.",
    image: "/images/circuits/djanet-iherir-essendilene.jpg",
    durationDays: 6,
    durationBucket: "5-6 jours",
    priceFrom: null,
    departureCity: "Djanet",
    groupSize: "de 04 à 16 PAX",
    pension: "Bivouac / camping en zeriba",
    months: "Oct - Nov - Déc - Jan - Fév - Mar",
    rating: 5,
    reviews: 14,
    promo: null,
    featured: 0,
    privateOnDemand: 1,
    highlights: [
      "Vallée d'Iherir, oasis entourée de montagnes",
      "Essendilène, le « jardin suspendu » et son canyon verdoyant",
      "Bivouacs sous les étoiles et campings dans les zeribas traditionnelles",
      "Rencontres avec les populations autochtones du Tassili",
      "Itinéraire hors du classique, peu proposé par les autres agences",
      "Parcours 4x4 et randonnée, niveau facile",
      "De 04 à 16 PAX, privatisation à la demande",
    ],
    program: [
      {
        day: "Jour 1",
        title: "Djanet — accueil",
        text: "Accueil à Djanet, installation, premier thé et briefing de l'itinéraire avec le guide.",
      },
      {
        day: "Jour 2",
        title: "Route vers la vallée d'Iherir",
        text: "Transfert en 4x4 vers le nord-ouest du Tassili, installation du camp dans la vallée et première marche.",
      },
      {
        day: "Jour 3",
        title: "Iherir, gueltas et jardins",
        text: "Journée dans la vallée : gueltas permanentes, jardins irrigués, village et rencontres avec les habitants.",
      },
      {
        day: "Jour 4",
        title: "Canyon d'Essendilène",
        text: "Marche jusqu'au canyon d'Essendilène et son oasis verdoyante, bivouac au cœur du « jardin suspendu ».",
      },
      {
        day: "Jour 5",
        title: "Camping en zeriba",
        text: "Nuit chez l'habitant dans une zeriba traditionnelle, cuisine locale et veillée au rythme du Tassili.",
      },
      {
        day: "Jour 6",
        title: "Djanet — fin du circuit",
        text: "Retour en 4x4 vers Djanet, temps libre au marché et transfert aéroport selon votre vol.",
      },
    ],
    included: [
      "4x4 avec chauffeur-pisteur et carburant",
      "Guide francophone et cuisinier",
      "Bivouac, camping en zeriba et pension complète",
      "Autorisations d'accès et taxes locales",
      "Privatisation du circuit à la demande (groupes, familles, entreprises)",
    ],
    notIncluded: [
      "Vols vers Djanet",
      "Assurance voyage",
      "Boissons et dépenses personnelles",
      "Nuit supplémentaire en ville",
    ],
  },
  {
    slug: "djanet-tadjlahine",
    title: "Djanet : Tadjlahine, l'art rupestre hors sentier",
    destination: "djanet",
    destinationLabel: "Djanet",
    type: "Exploration",
    level: "Difficile",
    summary:
      "Un endroit rarement fréquenté et non entièrement exploré par les scientifiques : l'art rupestre de Tadjlahine parle de la vie quotidienne du monde chasseur-nomade de 3 000 ans B.C.",
    description:
      "Un endroit rarement fréquenté et non entièrement exploré par les scientifiques. L'art rupestre de Tadjlahine parle de la vie quotidienne du monde chasseur/nomade du 3 000 ans B.C., un monde qui ressemble beaucoup à celui de nos jours.\n\nDes peintures rupestres innombrables, de type europoïde méditerranéen : grands, peaux claires, cheveux longs, visages nets aux profils bien dessinés avec des barbes raccourcies. Ils se distinguent nettement des personnages aux traits négroïdes.\n\nCe circuit se fait en trek, hors sentier, sur environ 100 km : bivouac chaque soir, camp et vivres portés par l'assistance, aucun itinéraire balisé. Un style rupestre inconnu, que peu d'agences proposent.",
    image: "/images/circuits/djanet-tadjlahine.jpg",
    durationDays: 8,
    durationBucket: "7-8 jours",
    priceFrom: null,
    departureCity: "Djanet",
    groupSize: "12 PAX maximum",
    pension: "Bivouac",
    months: "Nov - Déc - Jan - Fév",
    rating: 5,
    reviews: 8,
    promo: null,
    featured: 0,
    privateOnDemand: 1,
    highlights: [
      "Style rupestre inconnu, hors des sentiers balisés",
      "Trek d'environ 100 km sur 07 nuits / 08 jours",
      "Peintures de type europoïde méditerranéen : profils nets, cheveux longs",
      "Vie quotidienne du monde chasseur-nomade de 3 000 ans B.C.",
      "Site rarement fréquenté, non entièrement exploré par les scientifiques",
      "Bivouac chaque soir, 12 PAX maximum",
      "Privatisation à la demande",
    ],
    program: [
      {
        day: "Jour 1",
        title: "Djanet — briefing",
        text: "Accueil à Djanet, vérification du matériel de trek et briefing sur l'itinéraire hors sentier.",
      },
      {
        day: "Jour 2",
        title: "Départ hors piste",
        text: "Transfert puis première marche vers les zones non balisées, installation du camp et repérage.",
      },
      {
        day: "Jour 3",
        title: "Premières parois",
        text: "Journée de marche et de recherche : premières stations rupestres, relevé des figures avec le guide.",
      },
      {
        day: "Jour 4",
        title: "Tadjlahine, l'art des chasseurs",
        text: "Exploration du site principal : scènes de chasse, troupeaux et figures humaines du Néolithique.",
      },
      {
        day: "Jour 5",
        title: "Style europoïde méditerranéen",
        text: "Parois aux grands personnages aux profils nets, cheveux longs et barbes raccourcies.",
      },
      {
        day: "Jour 6",
        title: "Traversée vers le sud",
        text: "Longue étape de trek dans les canyons et plateaux, bivouac isolé loin de toute piste.",
      },
      {
        day: "Jour 7",
        title: "Dernier bivouac",
        text: "Marche de retour, arrêt sur un dernier ensemble rupestre et dîner de clôture sous les étoiles.",
      },
      {
        day: "Jour 8",
        title: "Djanet — fin du circuit",
        text: "Retour en ville, douche, marché et transfert aéroport selon votre horaire de vol.",
      },
    ],
    included: [
      "Guide spécialisé, cuisinier et logistique de trek",
      "Assistance 4x4 pour le camp et les vivres",
      "Bivouac et pension complète pendant le circuit",
      "Autorisations d'accès et taxes locales",
      "Privatisation du circuit à la demande",
    ],
    notIncluded: [
      "Vols vers Djanet",
      "Assurance voyage",
      "Sac à dos, sac de couchage et chaussures de marche",
      "Dépenses personnelles",
    ],
  },
  {
    slug: "djanet-trekking-sefar",
    title: "Djanet : Séfar, trek au cœur de l'art rupestre",
    destination: "djanet",
    destinationLabel: "Djanet",
    type: "Trekking",
    level: "Difficile",
    summary:
      "Huit jours de trek difficile vers le Séfar : plus de 15 000 peintures rupestres et 8 000 ans d'histoire humaine, animale et climatique.",
    description:
      "Le Séfar est le plus grand ensemble de peintures du plateau du Tassili n'Ajjer : plus de 15 000 peintures rupestres et 8 000 ans d'histoire humaine, animale et climatique, peintes et gravées sur les parois de grès.\n\nPourquoi Safar ? D'abord pour les paysages et l'atmosphère : la forêt de cyprès millénaires et les reliefs sculptés par le vent confèrent au site une aura intemporelle. Ensuite pour le labyrinthe de roches monumentales, de canyons et de plateaux, qui crée une ambiance mystique, propice à la méditation et à l'imaginaire.\n\nLe trek est exigeant : longues étapes à pied, sac de journée seulement, chaleur et terrain accidenté. Le camp et les vivres suivent en 4x4, un bivouac différent chaque soir. Groupe de 12 PAX maximum, privatisation à la demande.",
    image: "/images/circuits/djanet-sefar.jpg",
    durationDays: 8,
    durationBucket: "7-8 jours",
    priceFrom: null,
    departureCity: "Djanet",
    groupSize: "12 PAX maximum",
    pension: "Bivouac",
    months: "Nov - Déc - Jan - Fév - Mar",
    rating: 5,
    reviews: 17,
    promo: null,
    featured: 0,
    privateOnDemand: 1,
    highlights: [
      "Plus de 15 000 peintures rupestres",
      "8 000 ans d'histoire humaine, animale et climatique",
      "La forêt de cyprès millénaires et les reliefs sculptés par le vent",
      "Labyrinthe de roches monumentales, de canyons et de plateaux",
      "Ambiance mystique, propice à la méditation et à l'imaginaire",
      "Trek difficile, sac de journée, assistance 4x4",
      "12 PAX maximum, privatisation à la demande",
    ],
    program: [
      {
        day: "Jour 1",
        title: "Djanet — mise en jambes",
        text: "Transfert en 4x4 jusqu'au point de départ du trek. Première marche courte et installation du camp.",
      },
      {
        day: "Jour 2",
        title: "Traversée des salles de grès",
        text: "Longue étape entre les colonnes de grès. Pause thé à l'ombre et arrivée au bivouac en fin d'après-midi.",
      },
      {
        day: "Jour 3",
        title: "Forêt de cyprès millénaires",
        text: "Marche vers les cyprès endémiques du Tassili, vestiges d'un Sahara humide, puis couloir de sable vers le plateau.",
      },
      {
        day: "Jour 4",
        title: "Vers le Séfar",
        text: "Montée douce vers le plateau et découverte des premières parois peintes au coucher du soleil.",
      },
      {
        day: "Jour 5",
        title: "Sefar, la cité des peintures",
        text: "Journée complète sur le site : figures à tête ronde, scènes pastorales, troupeaux et gravures.",
      },
      {
        day: "Jour 6",
        title: "Labyrinthe de roches monumentales",
        text: "Exploration des canyons et plateaux qui font l'aura mystique du site, marche et lecture des parois.",
      },
      {
        day: "Jour 7",
        title: "Retour par les arches",
        text: "Marche de retour par les arches naturelles, dernier bivouac face aux dunes de l'erg Admer.",
      },
      {
        day: "Jour 8",
        title: "Djanet — fin du circuit",
        text: "Transfert vers Djanet, temps libre et transfert aéroport selon votre vol.",
      },
    ],
    included: [
      "Guide de trek, cuisinier et logistique 4x4",
      "Tentes, matelas et repas chauds",
      "Bivouac et pension complète pendant le trek",
      "Autorisations du parc du Tassili",
      "Privatisation du circuit à la demande",
    ],
    notIncluded: [
      "Vols",
      "Assurance voyage",
      "Sac à dos de randonnée et chaussures",
      "Dépenses personnelles",
    ],
  },
  {
    slug: "djanet-zones-humides",
    title: "Djanet : autour des zones humides",
    destination: "djanet",
    destinationLabel: "Djanet",
    type: "Nature",
    level: "Facile",
    summary:
      "Le Tassili des oiseaux : lacs temporaires, palmeraies et gueltas, à la rencontre des dernières zones humides du Sahara.",
    description:
      "À côté des grands circuits, Djanet cache un autre désert : celui des gueltas, des lacs temporaires et des palmeraies qui survivent à la saison sèche. C'est un circuit court, doux, idéal pour un premier contact avec le Sahara ou pour les familles.\n\nOn y observe les oiseaux migrateurs qui font halte entre l'Europe et l'Afrique, on marche en bord de palmeraie, on partage le repas chez l'habitant et on finit par une nuit en bivouac léger, assez près de la ville pour rentrer tôt le matin.",
    image: "/images/circuits/djanet-zones-humides.jpg",
    durationDays: 4,
    durationBucket: "4-5 jours",
    priceFrom: null,
    departureCity: "Djanet",
    groupSize: "6 à 14 personnes",
    pension: "Bivouac, demi-pension",
    months: "Oct - Nov - Déc - Jan - Fév - Mar",
    rating: 4,
    reviews: 21,
    promo: null,
    featured: 0,
    privateOnDemand: 0,
    highlights: [
      "Gueltas et lacs temporaires du Tassili",
      "Observation des oiseaux migrateurs",
      "Palmeraies et jardins de Djanet",
      "Repas partagé chez l'habitant",
      "Circuit court, accessible aux familles",
    ],
    program: [
      {
        day: "Jour 1",
        title: "Djanet et sa palmeraie",
        text: "Marche dans la palmeraie, découverte des jardins irrigués et du système traditionnel de partage de l'eau.",
      },
      {
        day: "Jour 2",
        title: "Gueltas et oiseaux",
        text: "Route vers les zones humides, observation des oiseaux au lever du jour, pique-nique à l'ombre des tamaris.",
      },
      {
        day: "Jour 3",
        title: "Bivouac léger",
        text: "Après-midi libre, puis bivouac près des dunes. Dîner sous les étoiles et nuit en tente.",
      },
      {
        day: "Jour 4",
        title: "Djanet — fin du circuit",
        text: "Lever de soleil sur les dunes, retour en ville et transfert aéroport selon votre vol.",
      },
    ],
    included: [
      "4x4, chauffeur et guide naturaliste",
      "Matériel d'observation et bivouac léger",
      "Demi-pension et eau minérale",
      "Repas chez l'habitant",
    ],
    notIncluded: [
      "Vols",
      "Assurance voyage",
      "Déjeuners hors programme",
      "Dépenses personnelles",
    ],
  },
  {
    slug: "timimoun-joyau-zenete",
    title: "Timimoun : le joyau zénète",
    destination: "timimoun",
    destinationLabel: "Timimoun",
    type: "Découverte",
    level: "Facile",
    summary:
      "L'oasis rouge du Gourara : ksour de terre, foggaras millénaires et coucher de soleil sur la sebkha.",
    description:
      "Timimoun, c'est une architecture de terre rouge posée au bord d'une immense sebkha salée. La ville est un dédale de ruelles ocre, de mosquées à minaret bas et de portes cloutées ; autour, plus de cent ksour et une centaine de foggaras — ces galeries souterraines qui amènent l'eau depuis le plateau depuis plus de mille ans.\n\nCe séjour se vit lentement : on marche dans les jardins, on descend dans une foggara avec l'équipe qui l'entretient, on écoute de la musique ahellil le soir, et on finit par un coucher de soleil sur les dunes rouges qui dominent la palmeraie.",
    image: "/images/circuits/timimoun-joyau-zenete.jpg",
    durationDays: 5,
    durationBucket: "4-5 jours",
    priceFrom: null,
    departureCity: "Timimoun",
    groupSize: "6 à 16 personnes",
    pension: "Hôtel et bivouac",
    months: "Oct - Nov - Déc - Jan - Fév - Mar",
    rating: 5,
    reviews: 26,
    promo: null,
    featured: 1,
    privateOnDemand: 0,
    highlights: [
      "Ksour de terre rouge du Gourara",
      "Descente dans une foggara en activité",
      "Coucher de soleil sur la sebkha et les dunes",
      "Soirée de musique ahellil",
      "Artisanat du tapis et de la vannerie",
    ],
    program: [
      {
        day: "Jour 1",
        title: "Arrivée à Timimoun",
        text: "Accueil, installation et première promenade dans la vieille ville. Coucher de soleil sur la sebkha.",
      },
      {
        day: "Jour 2",
        title: "Ksour du Gourara",
        text: "Journée en 4x4 entre trois ksour : Ouled Saïd, Aghlad et Tala. Déjeuner chez l'habitant.",
      },
      {
        day: "Jour 3",
        title: "Foggaras et jardins",
        text: "Descente dans une foggara avec les maîtres de l'eau, marche dans les jardins irrigués, thé au bord du bassin.",
      },
      {
        day: "Jour 4",
        title: "Dunes rouges et ahellil",
        text: "Après-midi dans les dunes rouges, bivouac léger et soirée musicale ahellil autour du feu.",
      },
      {
        day: "Jour 5",
        title: "Timimoun — fin du séjour",
        text: "Marché artisanal, temps libre et transfert aéroport selon votre vol.",
      },
    ],
    included: [
      "Transport 4x4 et chauffeur local",
      "Guide du Gourara francophone",
      "Hébergement 3 nuits et 1 nuit en bivouac",
      "Demi-pension et entrées des sites",
      "Soirée musicale ahellil",
    ],
    notIncluded: [
      "Vols vers Timimoun",
      "Assurance voyage",
      "Déjeuners libres",
      "Achats d'artisanat",
    ],
  },
  {
    slug: "timimoun-gourara-ksour",
    title: "Timimoun : Gourara, ksour et foggaras",
    destination: "timimoun",
    destinationLabel: "Timimoun",
    type: "Culturel",
    level: "Facile",
    summary:
      "Quatre jours d'immersion culturelle dans les oasis du Gourara, entre patrimoine hydraulique et hospitalité saharienne.",
    description:
      "Ce circuit est un voyage dans le génie humain du désert. Le Gourara ne tient pas seulement par ses palmeraies mais par un système d'irrigation souterrain — les foggaras — entretenu par des familles depuis des siècles, avec ses règles de partage de l'eau et ses maîtres-puisatiers.\n\nNous alternons visites de ksour, rencontres avec les associations qui restaurent le patrimoine et ateliers d'artisanat. Un séjour à la portée de tous, y compris pour un premier voyage dans le Sud algérien.",
    image: "/images/circuits/timimoun-gourara.jpg",
    durationDays: 4,
    durationBucket: "4-5 jours",
    priceFrom: null,
    departureCity: "Timimoun",
    groupSize: "8 à 18 personnes",
    pension: "Hôtel, demi-pension",
    months: "Oct - Nov - Déc - Jan - Fév - Mar",
    rating: 4,
    reviews: 14,
    promo: null,
    featured: 0,
    privateOnDemand: 0,
    highlights: [
      "Patrimoine hydraulique des foggaras",
      "Trois ksour classés du Gourara",
      "Ateliers de vannerie et de tissage",
      "Rencontres avec les habitants",
      "Dîner traditionnel chez une famille zénète",
    ],
    program: [
      {
        day: "Jour 1",
        title: "Timimoun, ville rouge",
        text: "Visite guidée de la vieille ville, mosquée de Sidi Othmane et marché couvert.",
      },
      {
        day: "Jour 2",
        title: "Route des foggaras",
        text: "Découverte du réseau de galeries et rencontre avec les maîtres de l'eau. Visite du ksour d'Aghlad.",
      },
      {
        day: "Jour 3",
        title: "Ksour et artisanat",
        text: "Ksour de Tala et Ouled Saïd, atelier de vannerie et de tapis, dîner chez une famille.",
      },
      {
        day: "Jour 4",
        title: "Timimoun — fin du séjour",
        text: "Temps libre, transfert aéroport ou prolongation possible vers Ghardaïa.",
      },
    ],
    included: [
      "Transport en 4x4 ou minibus climatisé",
      "Guide local et frais d'entrée des sites",
      "Hébergement en hôtel et demi-pension",
      "Dîner traditionnel et ateliers artisanaux",
    ],
    notIncluded: ["Vols", "Assurance voyage", "Déjeuners libres", "Dépenses personnelles"],
  },
  {
    slug: "ghardaia-porte-du-sahara",
    title: "Ghardaïa : la porte du Sahara",
    destination: "ghardaia",
    destinationLabel: "Ghardaïa",
    type: "Culturel",
    level: "Facile",
    summary:
      "La pentapole du M'zab, classée UNESCO : cités en gradins, palmeraies et architecture mozabite de terre et de chaux.",
    description:
      "Ghardaïa est la ville la plus singulière d'Algérie : cinq cités — Ghardaïa, Melika, Beni Isguen, Bou Noura, El Atteuf — construites en spirale autour de leur mosquée, montant en gradins pour économiser le sol cultivable. Le M'zab est inscrit au patrimoine mondial de l'UNESCO depuis 1982.\n\nCe circuit vous fait entrer dans les ruelles parfumées à la chaux, dans les palmeraies irriguées, et jusqu'au marché de Beni Isguen, l'un des plus vivants du Sahara. Un voyage court, dense, à 600 km d'Alger.",
    image: "/images/circuits/ghardaia-porte-du-sahara.jpg",
    durationDays: 4,
    durationBucket: "4-5 jours",
    priceFrom: null,
    departureCity: "Alger / Ghardaïa",
    groupSize: "8 à 20 personnes",
    pension: "Hôtel, demi-pension",
    months: "Oct - Nov - Déc - Jan - Fév - Mar",
    rating: 5,
    reviews: 31,
    promo: null,
    featured: 1,
    privateOnDemand: 0,
    highlights: [
      "Pentapole du M'zab inscrite à l'UNESCO",
      "Marché de Beni Isguen",
      "Palmeraie et système d'irrigation partagé",
      "Atelier de tapis et de poterie mozabite",
      "Coucher de soleil depuis le belvédère de Ghardaïa",
    ],
    program: [
      {
        day: "Jour 1",
        title: "Arrivée à Ghardaïa",
        text: "Installation, première marche dans la vieille ville et montée au belvédère pour le coucher de soleil.",
      },
      {
        day: "Jour 2",
        title: "Beni Isguen et Melika",
        text: "Visite guidée de la cité sainte de Beni Isguen puis de Melika, la plus petite des cinq. Déjeuner en palmeraie.",
      },
      {
        day: "Jour 3",
        title: "El Atteuf et artisanat",
        text: "El Atteuf, la plus ancienne cité du M'zab, puis atelier de tissage et marché libre de Ghardaïa.",
      },
      {
        day: "Jour 4",
        title: "Ghardaïa — fin du séjour",
        text: "Matinée libre, transfert aéroport ou départ vers Timimoun et le Gourara.",
      },
    ],
    included: [
      "Transport climatisé et guide local",
      "Hébergement 3 nuits et demi-pension",
      "Droits d'entrée et guides des cités",
      "Visite d'ateliers artisanaux",
    ],
    notIncluded: ["Vols", "Assurance voyage", "Déjeuners libres", "Achats personnels"],
  },
  {
    slug: "ghardaia-vallee-mzab",
    title: "Ghardaïa : week-end dans la vallée du M'zab",
    destination: "ghardaia",
    destinationLabel: "Ghardaïa",
    type: "Week-end",
    level: "Facile",
    summary:
      "Trois jours pour découvrir le M'zab au départ d'Alger : cités en gradins, palmeraies et marché du dimanche.",
    description:
      "Le format court idéal pour un premier contact avec le Sahara : départ d'Alger le vendredi matin, retour le dimanche soir. En trois jours, vous aurez vu l'essentiel du M'zab — les cités en gradins, les jardins, le marché — et dormi dans une maison d'hôtes mozabite.\n\nLes journées sont douces : visites le matin, sieste à l'heure chaude, marches en fin d'après-midi quand la lumière devient dorée.",
    image: "/images/circuits/ghardaia-vallee-mzab.jpg",
    durationDays: 3,
    durationBucket: "2-3 jours",
    priceFrom: null,
    departureCity: "Alger",
    groupSize: "10 à 25 personnes",
    pension: "Maison d'hôtes, demi-pension",
    months: "Oct - Nov - Déc - Jan - Fév - Mar",
    rating: 4,
    reviews: 19,
    promo: null,
    featured: 0,
    privateOnDemand: 0,
    highlights: [
      "Départ d'Alger, format week-end",
      "Cités en gradins du M'zab",
      "Nuit en maison d'hôtes mozabite",
      "Marché du dimanche de Ghardaïa",
      "Panorama sur la palmeraie au coucher du soleil",
    ],
    program: [
      {
        day: "Jour 1",
        title: "Alger — Ghardaïa",
        text: "Départ matinal, arrivée en fin de journée, installation et premier tour dans la cité de Ghardaïa.",
      },
      {
        day: "Jour 2",
        title: "Beni Isguen et palmeraie",
        text: "Visite de Beni Isguen, marche en palmeraie, thé chez l'habitant et coucher de soleil au belvédère.",
      },
      {
        day: "Jour 3",
        title: "Marché et retour",
        text: "Marché de Ghardaïa, temps libre et route de retour vers Alger en fin d'après-midi.",
      },
    ],
    included: [
      "Transport depuis Alger en minibus climatisé",
      "Hébergement 2 nuits et demi-pension",
      "Guide local et droits d'entrée",
    ],
    notIncluded: ["Assurance voyage", "Déjeuners libres", "Dépenses personnelles"],
  },
  {
    slug: "tamanrasset-hoggar-assekrem",
    title: "Tamanrasset : Hoggar et Assekrem",
    destination: "tamanrasset",
    destinationLabel: "Tamanrasset",
    type: "Aventure",
    level: "Modéré",
    summary:
      "Le massif du Hoggar et son lever de soleil mythique depuis l'Assekrem, en 4x4 et en bivouac.",
    description:
      "Le Hoggar est un massif volcanique de 540 000 km², culminant à 2 918 m au mont Tahat. C'est un désert de laves noires et de pitons de phonolite, habité par les Touaregs Kel Ahaggar. Au sommet de l'Assekrem, à 2 780 m, on assiste à l'un des plus beaux levers de soleil du monde.\n\nCe circuit combine piste, marche courte et bivouac. Le froid nocturne en altitude est réel : nous fournissons couvertures et vêtements chauds, et nous adaptons le rythme à l'altitude.",
    image: "/images/circuits/tamanrasset-hoggar.jpg",
    durationDays: 8,
    durationBucket: "7-8 jours",
    priceFrom: null,
    departureCity: "Tamanrasset",
    groupSize: "6 à 12 personnes",
    pension: "Bivouac, pension complète",
    months: "Oct - Nov - Déc - Jan - Fév - Mar",
    rating: 5,
    reviews: 23,
    promo: null,
    featured: 0,
    privateOnDemand: 0,
    highlights: [
      "Lever de soleil à l'Assekrem (2 780 m)",
      "Pitons volcaniques du massif du Hoggar",
      "Ermitage de Charles de Foucauld",
      "Bivouacs touaregs Kel Ahaggar",
      "Gravures et peintures rupestres du massif",
    ],
    program: [
      {
        day: "Jour 1",
        title: "Tamanrasset",
        text: "Accueil, installation et visite du musée du Hoggar. Briefing sur le circuit et l'altitude.",
      },
      {
        day: "Jour 2",
        title: "Vers l'Atakor",
        text: "Départ par la piste de l'Atakor, arrêt aux gravures rupestres, premier bivouac en altitude.",
      },
      {
        day: "Jour 3",
        title: "Tahat et pitons",
        text: "Approche du mont Tahat, marche courte entre les pitons de phonolite, bivouac abrité.",
      },
      {
        day: "Jour 4",
        title: "Assekrem",
        text: "Montée à l'Assekrem en fin de journée, nuit au refuge. Lever de soleil sur la mer de laves.",
      },
      {
        day: "Jour 5",
        title: "Hoggar central",
        text: "Traversée du plateau, rencontres avec des familles touaregs, thé et musique au bivouac.",
      },
      {
        day: "Jour 6",
        title: "Oueds et palmeraies",
        text: "Descente vers les oueds, arrêt dans une palmeraie de montagne, dernière nuit en bivouac.",
      },
      {
        day: "Jour 7",
        title: "Retour à Tamanrasset",
        text: "Retour par la piste, temps libre en ville et dîner de clôture.",
      },
      {
        day: "Jour 8",
        title: "Tamanrasset — fin du circuit",
        text: "Visite du marché touareg et transfert aéroport selon votre vol.",
      },
    ],
    included: [
      "4x4, chauffeur et guide touareg",
      "Bivouac complet et couvertures chaudes",
      "Pension complète du jour 2 au jour 7",
      "Nuit au refuge de l'Assekrem",
      "Autorisations et taxes du parc de l'Ahaggar",
    ],
    notIncluded: ["Vols", "Assurance voyage", "Vêtements chauds personnels", "Dépenses personnelles"],
  },
  {
    slug: "el-menea-mer-de-dunes",
    title: "El Ménéa : la mer de dunes",
    destination: "el-menea",
    destinationLabel: "El Ménéa",
    type: "Détente",
    level: "Facile",
    summary:
      "Trois jours entre l'erg occidental et les oasis d'El Goléa : dunes, palmeraies et nuits fraîches sous les étoiles.",
    description:
      "El Ménéa, l'ancienne El Goléa, est posée à la lisière de l'erg occidental : un océan de dunes de 200 km de large. C'est la destination la plus accessible du grand Sud, à 270 km de Ghardaïa, et la plus adaptée à un séjour court et confortable.\n\nOn y vient pour le silence, les couchers de soleil sur les dunes, les baignades dans les sources chaudes de la région et les dîners en palmeraie. Le format trois jours se combine parfaitement avec un passage à Ghardaïa.",
    image: "/images/circuits/el-menea-dunes.jpg",
    durationDays: 3,
    durationBucket: "2-3 jours",
    priceFrom: null,
    departureCity: "Ghardaïa / El Ménéa",
    groupSize: "8 à 20 personnes",
    pension: "Hôtel et bivouac",
    months: "Oct - Nov - Déc - Jan - Fév - Mar",
    rating: 4,
    reviews: 12,
    promo: null,
    featured: 0,
    privateOnDemand: 0,
    highlights: [
      "Erg occidental et grandes dunes",
      "Source chaude au pied de la palmeraie",
      "Nuit en bivouac dans le sable",
      "Dîner traditionnel en palmeraie",
      "Facilement combinable avec Ghardaïa",
    ],
    program: [
      {
        day: "Jour 1",
        title: "Arrivée à El Ménéa",
        text: "Installation, visite de la vieille ville et de la palmeraie, coucher de soleil sur l'erg.",
      },
      {
        day: "Jour 2",
        title: "Dunes et source chaude",
        text: "Matinée dans les dunes, baignade à la source chaude, bivouac léger en bord d'erg.",
      },
      {
        day: "Jour 3",
        title: "El Ménéa — fin du séjour",
        text: "Lever de soleil sur les dunes, retour et transfert vers Ghardaïa ou l'aéroport.",
      },
    ],
    included: [
      "Transport 4x4 et chauffeur",
      "Guide local et bivouac",
      "1 nuit en hôtel, 1 nuit en bivouac",
      "Demi-pension",
    ],
    notIncluded: ["Vols", "Assurance voyage", "Déjeuners libres", "Dépenses personnelles"],
  },
  {
    slug: "grand-sud-caravane-bivouac",
    title: "Grand Sud : caravane et bivouac touareg",
    destination: "djanet",
    destinationLabel: "Grand Sud",
    type: "Évasion",
    level: "Modéré",
    summary:
      "Sept jours au rythme des caravanes : marche à dos de chameau, bivouacs nomades et vie dans les campements touaregs.",
    description:
      "Ce circuit reprend la logique des anciennes caravanes : on avance lentement, à dos de chameau, avec des étapes courtes et des bivouacs installés à l'avance par l'équipe. Les chameliers viennent de familles qui ont toujours pratiqué le transport caravanier.\n\nVous apprendrez à charger un chameau, à monter un camp, à cuire le pain sous le sable. Les journées sont longues et calmes, les nuits froides et magnifiques. Aucune expérience préalable n'est nécessaire.",
    image: "/images/circuits/grand-sud-caravane.jpg",
    durationDays: 7,
    durationBucket: "7-8 jours",
    priceFrom: null,
    departureCity: "Djanet",
    groupSize: "6 à 14 personnes",
    pension: "Bivouac, pension complète",
    months: "Nov - Déc - Jan - Fév - Mar",
    rating: 5,
    reviews: 15,
    promo: null,
    featured: 0,
    privateOnDemand: 0,
    highlights: [
      "Déplacement à dos de chameau",
      "Apprentissage de la vie nomade",
      "Bivouacs installés par les chameliers",
      "Thé, pain sous le sable et cuisine touareg",
      "Aucune expérience requise",
    ],
    program: [
      {
        day: "Jour 1",
        title: "Djanet — rencontre avec les chameliers",
        text: "Accueil, présentation de l'équipe et des chameaux, nuit en ville ou en camp proche.",
      },
      {
        day: "Jour 2",
        title: "Départ de la caravane",
        text: "Première étape à dos de chameau, installation du camp par l'équipe, dîner nomade.",
      },
      {
        day: "Jour 3",
        title: "Dunes et oueds",
        text: "Étape tranquille entre dunes et oueds, sieste à l'ombre, thé à la menthe à volonté.",
      },
      {
        day: "Jour 4",
        title: "Journée de marche",
        text: "Marche à pied au rythme des chameaux, découverte des traces de la vie sauvage du désert.",
      },
      {
        day: "Jour 5",
        title: "Campement long",
        text: "Journée sur place : ateliers de cuisine, réparation du matériel, repos et photographie.",
      },
      {
        day: "Jour 6",
        title: "Retour progressif",
        text: "Dernière étape vers la ville, bivouac final et soirée musicale avec les chameliers.",
      },
      {
        day: "Jour 7",
        title: "Djanet — fin du circuit",
        text: "Transfert aéroport selon votre vol.",
      },
    ],
    included: [
      "Chameaux, chameliers et logistique de camp",
      "Guide francophone et cuisinier",
      "Pension complète pendant le circuit",
      "Tentes, matelas et couvertures",
    ],
    notIncluded: ["Vols", "Assurance voyage", "Chaussures de marche", "Dépenses personnelles"],
  },
  {
    slug: "tadrart-expedition-4x4",
    title: "Tadrart : expédition 4x4 et bivouac étoilé",
    destination: "djanet",
    destinationLabel: "Tadrart",
    type: "Exploration",
    level: "Sportif",
    summary:
      "Neuf jours d'expédition dans le Tadrart Rouge, jusqu'aux sites rupestres les plus reculés du sud de Djanet.",
    description:
      "C'est notre circuit le plus engagé. Neuf jours de piste et de bivouac dans le Tadrart Rouge, avec des étapes longues, des passages techniques et des nuits très loin de toute présence humaine.\n\nLe programme reste souple : nous décidons chaque matin en fonction du vent, de la chaleur et de l'état des pistes. Il faut aimer la vie en camp, la poussière et les repas simples. En échange, vous verrez des sites rupestres que très peu de voyageurs atteignent, et des paysages de grès rouge d'une variété infinie.",
    image: "/images/circuits/tadrart-exploration.jpg",
    durationDays: 9,
    durationBucket: "7-8 jours",
    priceFrom: null,
    departureCity: "Djanet",
    groupSize: "4 à 8 personnes",
    pension: "Bivouac, pension complète",
    months: "Déc - Jan - Fév",
    rating: 5,
    reviews: 9,
    promo: null,
    featured: 0,
    privateOnDemand: 0,
    highlights: [
      "Expédition de 9 jours en autonomie",
      "Sites rupestres reculés du Tadrart",
      "Passages techniques et navigation sur piste",
      "Nuits sans aucune lumière artificielle",
      "Petit groupe (8 personnes maximum)",
    ],
    program: [
      {
        day: "Jour 1",
        title: "Djanet — préparation",
        text: "Vérification du matériel, chargement des 4x4 et briefing détaillé avec le pisteur.",
      },
      {
        day: "Jour 2",
        title: "Erg Admer",
        text: "Entrée dans le grand erg, bivouac au pied des dunes après une première journée de piste.",
      },
      {
        day: "Jour 3",
        title: "Tin Merzouga",
        text: "Dunes rouges et crêtes, longue pause photo en fin d'après-midi.",
      },
      {
        day: "Jour 4",
        title: "Grès rouge",
        text: "Journée dans les chaos de grès : arches, tunnels de sable et abris peints.",
      },
      {
        day: "Jour 5",
        title: "Canyon du sud",
        text: "Descente d'un canyon, marche dans les oueds à sec, recherche de gravures avec le guide.",
      },
      {
        day: "Jour 6",
        title: "Site reculé",
        text: "Étape longue vers un ensemble rupestre rarement visité. Bivouac isolé.",
      },
      {
        day: "Jour 7",
        title: "Retour vers le nord",
        text: "Remontée par la piste de Bordj El Haouas, arrêt aux sources et bivouac abrité.",
      },
      {
        day: "Jour 8",
        title: "Dernier bivouac",
        text: "Journée courte, temps libre pour la photographie et dîner de clôture sous les étoiles.",
      },
      {
        day: "Jour 9",
        title: "Djanet — fin de l'expédition",
        text: "Retour en ville, douche, marché et transfert aéroport selon votre vol.",
      },
    ],
    included: [
      "Deux 4x4 avec chauffeurs-pisteurs et carburant",
      "Guide, cuisinier et logistique complète",
      "Pension complète du jour 2 au jour 8",
      "Autorisations d'accès et taxes locales",
      "Eau, vivres et matériel de camp",
    ],
    notIncluded: [
      "Vols",
      "Assurance voyage et frais médicaux",
      "Matériel photo et sac de couchage personnel",
      "Dépenses personnelles",
    ],
  },
];

const destinations = [
  {
    slug: "djanet",
    name: "Djanet — Tassili n'Ajjer",
    tagline: "Le plus grand musée à ciel ouvert du monde",
    description:
      "À l'extrême sud-est du pays, Djanet ouvre sur le Tassili n'Ajjer : 72 000 km² de grès sculpté, de canyons et de 15 000 peintures rupestres. C'est la destination reine du désert algérien, inscrite au patrimoine mondial de l'UNESCO.",
    image: "/images/destinations/djanet.jpg",
    season: "Octobre à mars",
    bestFor: "Randonnée, art rupestre, bivouac",
    sortOrder: 1,
  },
  {
    slug: "timimoun",
    name: "Timimoun — Gourara",
    tagline: "L'oasis rouge du Sahara algérien",
    description:
      "Posée au bord d'une immense sebkha, Timimoun aligne ses ksour de terre rouge et ses foggaras millénaires. Une oasis d'architecture, de jardins partagés et de musique ahellil, à 1 000 km au sud-ouest d'Alger.",
    image: "/images/destinations/timimoun.jpg",
    season: "Octobre à mars",
    bestFor: "Architecture, oasis, culture zénète",
    sortOrder: 2,
  },
  {
    slug: "ghardaia",
    name: "Ghardaïa — Vallée du M'zab",
    tagline: "Cinq cités en gradins, classées UNESCO",
    description:
      "La pentapole du M'zab est un chef-d'œuvre d'urbanisme saharien : cités en spirale, palmeraies irriguées et marchés vivants. C'est la porte d'entrée du Sahara, à une nuit de route d'Alger.",
    image: "/images/destinations/ghardaia.jpg",
    season: "Toute l'année, idéal d'octobre à mars",
    bestFor: "Patrimoine, artisanat, week-ends",
    sortOrder: 3,
  },
  {
    slug: "tamanrasset",
    name: "Tamanrasset — Hoggar",
    tagline: "Les pitons volcaniques du pays touareg",
    description:
      "Le massif de l'Ahaggar culmine à 2 918 m et abrite les communautés touaregs Kel Ahaggar. L'Assekrem, à 2 780 m, offre l'un des plus beaux levers de soleil du Sahara.",
    image: "/images/destinations/tamanrasset.jpg",
    season: "Novembre à février",
    bestFor: "Trek, altitude, culture touareg",
    sortOrder: 4,
  },
];

const testimonials = [
  {
    name: "Nadia Benali",
    city: "Alger",
    message:
      "Huit jours dans le Tassili, une organisation impeccable et des guides qui connaissent chaque pierre. Le bivouac sous les étoiles reste mon meilleur souvenir de voyage.",
    rating: 5,
    sortOrder: 1,
  },
  {
    name: "Karim Haddad",
    city: "Oran",
    message:
      "Premier voyage dans le Sud et zéro mauvaise surprise : véhicules solides, repas chauds, rythme adapté. On repart avec l'envie de revenir au Hoggar.",
    rating: 5,
    sortOrder: 2,
  },
  {
    name: "Amina Cherifi",
    city: "Constantine",
    message:
      "Le week-end à Ghardaïa est parfait pour découvrir le M'zab quand on a peu de temps. Notre guide nous a ouvert des portes que nous n'aurions jamais trouvées seuls.",
    rating: 5,
    sortOrder: 3,
  },
  {
    name: "Yacine Meziane",
    city: "Sétif",
    message:
      "Timimoun, ses ksour et sa musique ahellil : un choc culturel à 1 000 km de chez nous. L'équipe est réactive, honnête sur les prix et disponible avant le départ.",
    rating: 4,
    sortOrder: 4,
  },
  {
    name: "Salima Toumi",
    city: "Blida",
    message:
      "Voyage en famille avec deux enfants de 9 et 12 ans. Circuit court, beaucoup d'attention, et une organisation vraiment sécurisante sur la piste.",
    rating: 5,
    sortOrder: 5,
  },
];

const posts = [
  {
    slug: "quand-partir-dans-le-sahara-algerien",
    title: "Quand partir dans le Sahara algérien ?",
    excerpt:
      "Saisons, températures, vents de sable et fêtes locales : le calendrier utile pour choisir la bonne période selon votre destination.",
    content:
      "La saison du désert algérien va d'octobre à mars. En dehors de cette fenêtre, la chaleur devient difficile à supporter en journée et certaines pistes ferment.\n\n**Octobre et novembre** : les nuits restent douces, les journées tournent autour de 28 à 32 °C. C'est la meilleure période pour le Tassili n'Ajjer et les longs treks.\n\n**Décembre et janvier** : les journées sont parfaites (20 à 25 °C), mais les nuits descendent près de 0 °C sur le plateau et à l'Assekrem. Prévoyez une couche chaude et un bon duvet.\n\n**Février et mars** : le vent se lève plus souvent, surtout dans le Grand Erg. Les températures remontent et la lumière devient très contrastée, idéale pour la photographie.\n\n**Avril** : encore praticable au nord (Ghardaïa, El Ménéa) mais déjà chaud au sud. À partir de mai, nous ne programmons plus de circuits dans le Tassili.\n\nEnfin, si vous voulez voir une fête : le festival de la musique ahellil à Timimoun et les fêtes du M'zab à Ghardaïa tombent en fin d'hiver — demandez-nous le calendrier exact de l'année.",
    image: "/images/blog/blog-1.jpg",
    category: "Conseils pratiques",
    author: "Équipe Best Deal",
    readMinutes: 5,
    publishedAt: new Date("2026-09-28T09:00:00Z"),
  },
  {
    slug: "djanet-tassili-premier-voyage",
    title: "Premier voyage à Djanet : ce qu'il faut savoir",
    excerpt:
      "Formalités, vols, bagages, altitude et confort en bivouac : le guide pratique avant de partir pour le Tassili n'Ajjer.",
    content:
      "**Comment y aller.** Djanet se rejoint en avion depuis Alger, Constantine ou Oran (vols réguliers, 2 h depuis Alger). Les départs sont limités : réservez tôt pour les mois de décembre et janvier.\n\n**Formalités.** Le Tassili n'Ajjer est un parc national : l'accès se fait avec une autorisation délivrée aux agences agréées. Nous nous occupons de l'ensemble du dossier ; prévoyez simplement une copie de votre pièce d'identité et un passeport valide pour les visiteurs étrangers.\n\n**Bagages.** Un sac souple de 60 à 80 litres, des chaussures de marche déjà rodées, un chapeau, des lunettes, une lampe frontale, une gourde d'un litre et demi, et une couche chaude pour les nuits. Le reste — tentes, matelas, cuisine — est fourni.\n\n**Confort en bivouac.** On dort sous tente, sur matelas, avec couvertures. Il n'y a pas de douche pendant les nuits de piste : prévoyez des lingettes et un peu de patience. Les repas sont chauds et copieux.\n\n**Santé.** Le principal risque est la déshydratation, pas la chaleur extrême : buvez régulièrement, même sans soif. Nous transportons une trousse de premiers secours et une réserve d'eau dimensionnée pour tout le groupe.",
    image: "/images/blog/blog-2.jpg",
    category: "Destination Djanet",
    author: "Équipe Best Deal",
    readMinutes: 6,
    publishedAt: new Date("2026-09-12T09:00:00Z"),
  },
  {
    slug: "ghardaia-timimoun-en-une-semaine",
    title: "Relier Ghardaïa et Timimoun en une semaine",
    excerpt:
      "L'itinéraire que nous recommandons pour combiner la vallée du M'zab et l'oasis rouge du Gourara dans un seul voyage.",
    content:
      "Ghardaïa et Timimoun se répondent : d'un côté l'architecture mozabite en gradins, de l'autre les ksour de terre rouge et les foggaras du Gourara. Les relier en une semaine donne un panorama complet du Sahara du nord.\n\n**Jours 1 à 3 — Ghardaïa.** Arrivée, visite de la pentapole du M'zab, marché de Beni Isguen, palmeraie et belvédère au coucher du soleil.\n\n**Jour 4 — Route du sud-ouest.** Longue journée de route par El Goléa, avec arrêt dans les dunes de l'erg occidental. Nuit à El Ménéa.\n\n**Jours 5 à 7 — Timimoun.** Vieille ville, ksour d'Ouled Saïd et d'Aghlad, descente dans une foggara, coucher de soleil sur la sebkha et soirée ahellil.\n\n**Jour 8 — Retour.** Vol Timimoun–Alger ou route de retour par Ghardaïa selon votre point de départ.\n\nLe meilleur moment : de novembre à février. Comptez 7 à 8 jours sur place, hors transport international. Nous adaptons cet itinéraire en circuit privé à partir de quatre personnes.",
    image: "/images/blog/blog-3.jpg",
    category: "Itinéraires",
    author: "Équipe Best Deal",
    readMinutes: 4,
    publishedAt: new Date("2026-08-30T09:00:00Z"),
  },
];

async function main() {
  await db.delete(schema.circuits);
  await db.delete(schema.destinations);
  await db.delete(schema.testimonials);
  await db.delete(schema.posts);

  await db.insert(schema.circuits).values(
    circuits.map((c) => ({
      ...c,
      highlights: J(c.highlights),
      program: J(c.program),
      included: J(c.included),
      notIncluded: J(c.notIncluded),
    })),
  );
  await db.insert(schema.destinations).values(destinations);
  await db.insert(schema.testimonials).values(testimonials);
  await db.insert(schema.posts).values(posts);

  console.log(
    `Seed terminé : ${circuits.length} circuits, ${destinations.length} destinations, ${testimonials.length} avis, ${posts.length} articles.`,
  );
}

main();
