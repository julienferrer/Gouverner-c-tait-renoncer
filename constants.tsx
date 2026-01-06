
import { GameCard, Monologue, Ending } from './types';

export const INITIAL_STATS = {
  family: 100,
  people: 100,
  nobility: 100
};

export const MONOLOGUES: Record<number, Monologue> = {
  1: { id: 'm1', text: ["J’ai une couronne trop grande pour ma tête.", "Elle brille encore, mais je sens déjà son poids sur ma nuque.", "Ils me sourient tous, comme si l’avenir était certain."] },
  2: { id: 'm2', text: ["Chaque jour, je décide. Chaque nuit, je doute.", "Le trône ne parle pas, mais il écoute mes silences.", "Et parfois, il me juge."] },
  3: { id: 'm3', text: ["J’ai gagné. On m’a dit que j’avais gagné.", "Pourtant, les cris ne quittent pas mes rêves.", "La victoire sent le sang séché et la peur qui ne part plus."] },
  4: { id: 'm4', text: ["Autour de moi, il y a du monde. En moi, il n’y a plus personne.", "Ils parlent au roi, jamais à l’homme.", "Et l’homme commence à disparaître."] },
  5: { id: 'm5', text: ["Mes enfants m’appellent “père”, mais leurs yeux cherchent autre chose.", "Peut-être un homme que j’ai cessé d’être.", "J’ai construit un royaume, et détruit un foyer."] },
  6: { id: 'm6', text: ["Je peux tout décider. Qui vit. Qui meurt. Qui ment pour moi.", "Et pourtant…", "Je ne peux plus décider d’être heureux."] },
  7: { id: 'm7', text: ["Ils me regardent avec crainte. Plus avec espoir.", "La peur obéit mieux que l’amour, mais elle ne remercie jamais.", "Elle attend seulement ma chute."] },
  8: { id: 'm8', text: ["Je suis fatigué sans avoir marché. Fatigué sans avoir dormi.", "Fatigué d’être nécessaire.", "Le trône ne m’a jamais demandé si je voulais encore continuer."] },
  9: { id: 'm9', text: ["Je parle seul désormais. Même mes pensées me quittent.", "Il ne reste que des décisions mécaniques.", "Comme si je n’étais plus qu’une main qui signe sans comprendre."] },
  10: { id: 'm10', text: ["Si je tombais aujourd’hui, que resterait-il de moi ?", "Un nom dans un livre. Une erreur dans l’histoire.", "Ou simplement… rien."] },
  99: { id: 'm99', text: ["J’ai eu le pouvoir. J’ai eu le temps. J’ai eu le choix.", "Et pourtant, je n’ai jamais su quoi préserver."] }
};

export const CARDS: GameCard[] = [
  // ACTE I - L'ILLUSION
  {
    id: 1,
    speaker: "Le Chambellan",
    characterType: 'advisor',
    prompt: "Réduire les impôts du peuple",
    description: "Le peuple attend un geste. Mais la noblesse gronde déjà. Le pouvoir commence par un sacrifice.",
    left: { text: "Refuser", impact: { people: -8, nobility: +5 } },
    right: { text: "Réduire", impact: { people: +12, nobility: -12 } }
  },
  {
    id: 2,
    speaker: "La Reine Mère",
    characterType: 'royal',
    prompt: "Organiser une grande fête de couronnement",
    description: "Ils veulent voir l'éclat de la couronne. Mais l'or ne tombe pas du ciel.",
    left: { text: "Humble", impact: { people: +5, nobility: -8, family: +5 } },
    right: { text: "Grandiose", impact: { people: -8, nobility: +12 } }
  },
  {
    id: 3,
    speaker: "Conseiller Ambitieux",
    characterType: 'advisor',
    prompt: "Accepter ses services exclusifs",
    description: "Il promet l'ordre et la discrétion. Mais sa loyauté a un prix invisible.",
    left: { text: "Écarter", impact: { nobility: -5 } },
    right: { text: "Accepter", impact: { people: -8, nobility: +15 } }
  },
  {
    id: 4,
    speaker: "Votre Épouse",
    characterType: 'royal',
    prompt: "Passer la soirée en famille",
    description: "Le royaume attendra une nuit. Tes enfants aussi.",
    left: { text: "Travailler", impact: { family: -15, nobility: +5 } },
    right: { text: "Rester", impact: { family: +12, people: -5 } }
  },
  {
    id: 5,
    speaker: "Le Trésorier",
    characterType: 'elite',
    prompt: "Baisser les taxes sur le blé",
    description: "Le pain est cher. La colère monte.",
    left: { text: "Maintenir", impact: { people: -15, nobility: +8 } },
    right: { text: "Baisser", impact: { people: +15, nobility: -15 } }
  },
  // ACTE II - LA GUERRE
  {
    id: 6,
    speaker: "Le Maréchal",
    characterType: 'military',
    prompt: "Le royaume voisin menace. Frapper le premier ?",
    description: "La guerre est inévitable. Autant choisir le terrain.",
    left: { text: "Attendre", impact: { people: +5, nobility: -12 } },
    right: { text: "Frapper", impact: { people: -15, nobility: +15 } }
  },
  {
    id: 7,
    speaker: "Capitaine de la Garde",
    characterType: 'military',
    prompt: "Envoyer l'armée immédiatement au front",
    description: "Nos frontières brûlent.",
    left: { text: "Repli", impact: { people: -12, nobility: -8 } },
    right: { text: "Attaque", impact: { family: -8, nobility: +12 } }
  },
  {
    id: 8,
    speaker: "Le Prévôt",
    characterType: 'advisor',
    prompt: "Lever un impôt de guerre exceptionnel",
    description: "Le fer et le sang coûtent cher.",
    left: { text: "Refuser", impact: { nobility: -15 } },
    right: { text: "Lever", impact: { people: -20, nobility: +12 } }
  },
  {
    id: 9,
    speaker: "Sergent Recruteur",
    characterType: 'military',
    prompt: "Enrôler les jeunes civils de force",
    description: "Nous manquons d'hommes. Les champs attendront.",
    left: { text: "Épargner", impact: { people: +12, nobility: -15 } },
    right: { text: "Enrôler", impact: { people: -25, family: -12, nobility: +8 } }
  },
  {
    id: 10,
    speaker: "L'Aumônier",
    characterType: 'mystic',
    prompt: "Continuer la guerre malgré les pertes ?",
    description: "La victoire est à portée. Mais à quel prix ?",
    left: { text: "Paix", impact: { people: +15, nobility: -20 } },
    right: { text: "Guerre", impact: { people: -20, nobility: +12 } }
  },
  // ACTE III - LA FAMINE & LES CHOIX BRUTAUX
  {
    id: 11,
    speaker: "Un Héraut",
    characterType: 'citizen',
    prompt: "Annoncer une victoire fragile ?",
    description: "Ils ont besoin d'espoir, même s'il est menteur.",
    left: { text: "Vérité", impact: { people: -15 } },
    right: { text: "Mensonge", impact: { people: +12, nobility: +5 } }
  },
  {
    id: 12,
    speaker: "L'Intendant",
    characterType: 'advisor',
    prompt: "La nourriture manque. Sacrifier le confort de la cour ?",
    description: "Les nobles mangent pendant que la rue meurt.",
    left: { text: "Garder", impact: { people: -25, nobility: +15 } },
    right: { text: "Sacrifier", impact: { people: +18, nobility: -20, family: -8 } }
  },
  {
    id: 13,
    speaker: "Un Marchand",
    characterType: 'citizen',
    prompt: "Taxer davantage la population pour acheter du blé ?",
    description: "Prendre aux pauvres pour les nourrir. Un cercle de fer.",
    left: { text: "Refuser", impact: { people: -20 } },
    right: { text: "Taxer", impact: { people: -12, nobility: +8 } }
  },
  {
    id: 14,
    speaker: "Chef de la Garde",
    characterType: 'military',
    prompt: "Réprimer les pillages par la force ?",
    description: "La faim rend les hommes fous. La loi doit rester debout.",
    left: { text: "Clémence", impact: { people: +12, nobility: -15 } },
    right: { text: "Frapper", impact: { people: -22, nobility: +12 } }
  },
  {
    id: 15,
    speaker: "Votre Frère",
    characterType: 'royal',
    prompt: "Je veux épouser cette roturière. L'autorises-tu ?",
    description: "Le sang royal ne doit pas se mélanger. Mais c'est ton frère.",
    left: { text: "Refuser", impact: { family: -20, nobility: +12 } },
    right: { text: "Accepter", impact: { family: +15, people: +8, nobility: -18 } }
  },
  // ACTE IV - L'ISOLEMENT
  {
    id: 16,
    speaker: "Ambassadeur Étranger",
    characterType: 'elite',
    prompt: "Mariage politique ou mariage d'amour ?",
    description: "L'État demande une alliance. Ton cœur demande une vie.",
    left: { text: "Amour", impact: { family: +18, nobility: -22 } },
    right: { text: "Alliance", impact: { family: -18, nobility: +22 } }
  },
  {
    id: 17,
    speaker: "Le Précepteur",
    characterType: 'advisor',
    prompt: "Passer du temps avec vos enfants ?",
    description: "Ils grandissent. Vous devenez un étranger pour eux.",
    left: { text: "Régner", impact: { family: -15, nobility: +5 } },
    right: { text: "Père", impact: { family: +15, people: -8, nobility: -8 } }
  },
  {
    id: 18,
    speaker: "Le Médecin",
    characterType: 'mystic',
    prompt: "Ta mère est mourante. Quitter le conseil pour elle ?",
    description: "Le royaume est en crise. Mais elle n'a plus que vous.",
    left: { text: "Rester", impact: { family: -25, nobility: +8 } },
    right: { text: "Partir", impact: { family: +20, people: -12, nobility: -12 } }
  },
  {
    id: 19,
    speaker: "Le Chambellan",
    characterType: 'advisor',
    prompt: "Organiser de grandes funérailles royales ?",
    description: "Glorifier sa mémoire ou rester humble devant la crise ?",
    left: { text: "Humble", impact: { family: -8, people: +8, nobility: -8 } },
    right: { text: "Royale", impact: { family: +12, people: -15, nobility: +12 } }
  },
  {
    id: 20,
    speaker: "L'Espion",
    characterType: 'advisor',
    prompt: "Ton conseiller le plus proche trahit. L'exécuter ?",
    description: "Le peuple l'aime, mais la noblesse veut un exemple.",
    left: { text: "Épargner", impact: { people: +12, nobility: -22 } },
    right: { text: "Exécuter", impact: { people: -22, nobility: +18 } }
  },
  // ACTE V - LA CORRUPTION
  {
    id: 21,
    speaker: "Le Duc",
    characterType: 'elite',
    prompt: "La noblesse propose son aide contre des privilèges.",
    description: "La stabilité a un prix. Vendre le peuple pour le trône ?",
    left: { text: "Refuser", impact: { people: +12, nobility: -22 } },
    right: { text: "Accepter", impact: { people: -28, nobility: +18 } }
  },
  {
    id: 22,
    speaker: "Un Artiste",
    characterType: 'citizen',
    prompt: "On vous caricature dans les rues. Censurer ?",
    description: "Le rire est une arme. Faut-il la briser ?",
    left: { text: "Laisser", impact: { people: +12, nobility: -12 } },
    right: { text: "Taire", impact: { people: -25, nobility: +12 } }
  },
  {
    id: 23,
    speaker: "Docteur de la Ville",
    characterType: 'mystic',
    prompt: "Une maladie apparaît. Quarantaine stricte ?",
    description: "Isoler les pauvres pour sauver le reste. Condamner des milliers.",
    left: { text: "Aider", impact: { people: +18, nobility: -15 } },
    right: { text: "Isoler", impact: { people: -35, nobility: +12 } }
  },
  {
    id: 24,
    speaker: "Le Garde-Frontière",
    characterType: 'military',
    prompt: "Des réfugiés arrivent. Ouvrir les portes ?",
    description: "Ils fuient la mort. Mais nous manquons de tout.",
    left: { text: "Fermer", impact: { people: -12, nobility: +8 } },
    right: { text: "Ouvrir", impact: { people: +15, nobility: -18 } }
  },
  {
    id: 25,
    speaker: "Le Savant",
    characterType: 'mystic',
    prompt: "Rendre l'éducation obligatoire ?",
    description: "Un peuple éduqué est une menace pour les nobles. Et cela coûte cher.",
    left: { text: "Refuser", impact: { people: -15, nobility: +12 } },
    right: { text: "Éduquer", impact: { people: +22, nobility: -35 } }
  },
  // ACTE VI - LE VIDE (Cartes finales)
  {
    id: 26,
    speaker: "Le Trésorier",
    characterType: 'elite',
    prompt: "Financer les écoles ou l'armée ?",
    description: "Demain ou aujourd'hui. Choisissez votre sacrifice.",
    left: { text: "Écoles", impact: { people: +12, nobility: -18 } },
    right: { text: "Armée", impact: { people: -15, nobility: +15 } }
  },
  {
    id: 27,
    speaker: "Vos Enfants",
    characterType: 'royal',
    prompt: "Ils demandent votre temps. Encore.",
    description: "Le dossier du jour ou le regard de votre fils.",
    left: { text: "Travail", impact: { family: -25 } },
    right: { text: "Temps", impact: { family: +15, nobility: -8 } }
  },
  {
    id: 28,
    speaker: "Le Vieux Conseiller",
    characterType: 'advisor',
    prompt: "Déléguer certaines décisions ?",
    description: "Lâcher prise pour respirer. Ou tout contrôler jusqu'au bout.",
    left: { text: "Garder", impact: { nobility: -8 } },
    right: { text: "Déléguer", impact: { nobility: +12, people: -8 } }
  },
  {
    id: 29,
    speaker: "La Solitude",
    characterType: 'destiny',
    prompt: "Gouverner seul jusqu'au bout ?",
    description: "Il n'y a plus personne à qui parler. Juste le bois du trône.",
    left: { text: "Abdiquer", impact: { family: -50, people: -50, nobility: -50 } },
    right: { text: "Régner", impact: { people: -8, nobility: -8 } }
  },
  {
    id: 30,
    speaker: "Le Destin",
    characterType: 'destiny',
    prompt: "L'acte final est proche.",
    description: "J'ai eu le pouvoir. J’ai eu le temps. J’ai eu le choix.",
    left: { text: "Finir", impact: { people: -60 } },
    right: { text: "Finir", impact: { nobility: -60 } }
  }
];

export const ENDINGS: Record<string, Ending> = {
  FAMILY: {
    title: "Le Trône de Cendre",
    context: "Ils sont partis sans bruit.",
    description: [
      "Pas de cris. Pas de reproches.",
      "Juste des chambres vides et des souvenirs qui ne répondent plus.",
      "J’ai gardé le trône. J’ai perdu tout ce qui me regardait comme un homme."
    ],
    finalQuote: "Le pouvoir ne remplace jamais l’amour.",
    characterType: 'royal'
  },
  PEOPLE: {
    title: "La Couronne Renversée",
    context: "Ils ont crié mon nom. Pas pour me remercier.",
    description: [
      "Pour me renverser.",
      "J’ai gouverné pour eux, pensais-je. Mais j’ai oublié de les écouter.",
      "Un roi sans peuple n’est qu’un homme assis trop haut."
    ],
    finalQuote: "Un roi sans peuple n'est qu'un homme assis trop haut.",
    characterType: 'citizen'
  },
  NOBILITY: {
    title: "Le Baiser du Serpent",
    context: "Le poison n’a pas de visage.",
    description: [
      "Il sourit avant de frapper.",
      "J’ai cru contrôler les serpents. Ils attendaient seulement que je me détourne.",
      "Le pouvoir partagé est toujours prêt à trahir."
    ],
    finalQuote: "Le pouvoir partagé est toujours prêt à trahir.",
    characterType: 'elite'
  },
  VOID: {
    title: "La Survie Vide",
    context: "Tout est là. Mais vous n'y êtes plus.",
    description: [
      "J’ai tout. Une famille qui me respecte. Un peuple stable. Une noblesse soumise.",
      "Et pourtant… je ne ressens plus rien.",
      "Peut-être que le vrai échec n’est pas de perdre, mais de survivre sans jamais vivre."
    ],
    finalQuote: "Le vrai échec est de survivre sans jamais vivre.",
    characterType: 'destiny'
  },
  ABDICATION: {
    title: "L'Abdication",
    context: "Le trône est laissé vide.",
    description: [
      "Personne ne m’a chassé. Je suis parti.",
      "J’ai laissé le trône avant qu’il ne me prenne entièrement."
    ],
    finalQuote: "Tous les poisons ne tuent pas. Certains endorment.",
    characterType: 'destiny'
  }
};
