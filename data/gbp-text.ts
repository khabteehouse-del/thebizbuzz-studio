import type { Lang } from "@/data/i18n";
import type { BandId } from "@/lib/gbp-audit";

/*
  All the words for the Google Business Profile check, in English and
  Spanish. The scoring lives in lib/gbp-audit.ts and does not change with
  language. The type below makes the compiler refuse a language that is
  missing a question, an answer or a piece of advice.

  The advice is the real local search know-how of the tool. Rewrite any of
  it in your own words and the tool improves without touching code.
*/

export type SectionId = "foundation" | "reviews" | "content" | "details";

export type Advice = { action: string; why: string };

export type QuestionText = {
  question: string;
  help?: string;
  options: Record<string, string>;
};

export type GbpText = {
  meta: { title: string; description: string };
  page: { eyebrow: string; h1: string; h1Mark: string; intro: string };
  sections: Record<SectionId, string>;
  questions: Record<string, QuestionText>;
  advice: Record<string, Record<string, Advice>>;
  bands: Record<BandId, { label: string; note: string }>;
  ui: {
    introText: string;
    nameLabel: string;
    namePlaceholder: string;
    typeLabel: string;
    typePlaceholder: string;
    cityLabel: string;
    cityPlaceholder: string;
    optional: string;
    start: string;
    startNote: string;
    questionOf: string;
    back: string;
    outOf: string;
    gateTitle: string;
    gateText: string;
    gateBusiness: string;
    gateContact: string;
    gateWebsite: string;
    gateButton: string;
    gateSending: string;
    gateNote: string;
    errName: string;
    errContact: string;
    errSend: string;
    planTitle: string;
    planNoneTitle: string;
    planNoneText: string;
    nextTitle: string;
    nextText: string;
    nextButton: string;
    again: string;
    backToSite: string;
  };
};

const en: GbpText = {
  meta: {
    title: "Free Google Business Profile check",
    description:
      "Twelve questions, two minutes. Find out what your Google listing is costing you in customers, and get a written plan to fix it.",
  },
  page: {
    eyebrow: "Free tool",
    h1: "How good is your Google listing?",
    h1Mark: "Google listing",
    intro:
      "Most local businesses lose customers to competitors with worse service and better profiles. Two minutes tells you which side you are on.",
  },
  sections: {
    foundation: "Foundation",
    reviews: "Reviews",
    content: "Content",
    details: "Details",
  },
  questions: {
    verified: {
      question: "Is your profile claimed and verified?",
      help: "A verified profile shows a dashboard when you search your own business name while signed in.",
      options: {
        yes: "Yes, verified",
        claimed: "Claimed but not verified",
        no: "No, or I am not sure",
      },
    },
    category: {
      question: "How specific is your primary category?",
      help: "Specific beats broad. Dental clinic outranks health service for someone searching for a dentist.",
      options: {
        specific: "Specific to what I actually do",
        broad: "Broad or generic",
        unsure: "I have not looked at it",
      },
    },
    secondary: {
      question: "Have you added secondary categories?",
      options: { several: "Three or more", few: "One or two", none: "None" },
    },
    nap: {
      question: "Are your name, address and phone identical everywhere online?",
      help: "Directories, your website, social profiles. Google reads inconsistency as uncertainty.",
      options: {
        yes: "Yes, consistent everywhere",
        mostly: "Mostly, with a few old listings",
        no: "No, or I have never checked",
      },
    },
    reviews: {
      question: "How many Google reviews do you have?",
      options: {
        many: "More than 50",
        some: "15 to 50",
        few: "1 to 14",
        none: "None",
      },
    },
    responses: {
      question: "Do you reply to reviews?",
      help: "Replying is a ranking signal and it visibly changes how a stranger reads a bad review.",
      options: {
        all: "Yes, to nearly all of them",
        negative: "Only the negative ones",
        rarely: "Rarely or never",
      },
    },
    asking: {
      question: "Do you have a system for asking customers for reviews?",
      options: {
        system: "Yes, a repeatable process",
        "ad-hoc": "Sometimes, when I remember",
        no: "No",
      },
    },
    photos: {
      question: "How many photos are on your profile?",
      help: "Profiles with photos get significantly more direction requests and calls.",
      options: {
        many: "More than 20, added regularly",
        some: "Between 5 and 20",
        few: "Fewer than 5",
        none: "None",
      },
    },
    posts: {
      question: "Do you publish Google Posts?",
      options: { weekly: "Weekly or more", sometimes: "Occasionally", never: "Never" },
    },
    services: {
      question: "Are your services or products listed on the profile?",
      options: {
        full: "Yes, with descriptions and prices",
        partial: "A few, without detail",
        none: "No",
      },
    },
    hours: {
      question: "Are your hours complete and kept current?",
      help: "Wrong hours on a public holiday is the fastest way to earn a one star review.",
      options: {
        yes: "Yes, including holiday hours",
        basic: "Regular hours only",
        no: "Incomplete or out of date",
      },
    },
    website: {
      question: "Does your profile link to a working website?",
      options: {
        yes: "Yes, a site built for the business",
        social: "It links to a social page",
        no: "No website linked",
      },
    },
  },
  advice: {
    verified: {
      claimed: {
        action:
          "Finish verification this week. Google will send a postcard, a phone call or an email depending on your business type, and the whole thing takes about ten minutes of your time once the code arrives.",
        why: "Until you are verified you cannot edit most of your own listing, and anyone can suggest changes to it that go live without your approval.",
      },
      no: {
        action:
          "Search your business name on Google while signed in to the account you want to own the listing. If a dashboard appears, claim it. If nothing appears, create the profile from scratch at business.google.com.",
        why: "An unclaimed listing is the single most expensive gap on this list. Google still shows it, but with whatever information it has scraped, and competitors can suggest edits to it.",
      },
    },
    category: {
      broad: {
        action:
          "Change your primary category to the most specific one that describes what you actually do most of. Look at the three businesses ranking above you and see what they use.",
        why: "Primary category is the strongest single ranking factor you control. Broad categories put you in a much larger pool competing for much less relevant searches.",
      },
      unsure: {
        action:
          "Open your profile, find Business category, and read what is currently set. Then pick the most specific option that matches your main service.",
        why: "Most profiles are still on whatever category was chosen at signup, often by someone who was guessing. It is a two minute fix with an outsized effect.",
      },
    },
    secondary: {
      few: {
        action:
          "Add two or three more secondary categories covering services you genuinely offer but that your primary category does not capture.",
        why: "Each legitimate secondary category is another set of searches you can appear in without competing against your own primary listing.",
      },
      none: {
        action:
          "Add three secondary categories for services you actually provide. Only real ones. Google penalizes category stuffing and customers notice when a listing overclaims.",
        why: "You are currently only visible for one type of search when you probably serve several.",
      },
    },
    nap: {
      mostly: {
        action:
          "Search your business name and phone number in quotes on Google and list every site that shows old details. Fix or remove them, starting with the directories that rank highest.",
        why: "Old listings with a previous address or number split your authority and occasionally send customers to a place you no longer occupy.",
      },
      no: {
        action:
          "Write down your exact business name, address and phone as they appear on your Google profile. That is now the master version. Then check every directory, social profile and page on your own site against it.",
        why: "Google reads inconsistency as uncertainty about whether you are a real, stable business, and ranks you accordingly.",
      },
    },
    reviews: {
      some: {
        action:
          "Set a target of five new reviews a month and ask every satisfied customer at the moment they are happiest, not days later by email.",
        why: "You are past the credibility threshold but still below the businesses taking the top three map positions in most categories.",
      },
      few: {
        action:
          "Ask your ten most loyal customers this week, in person or by text message, with a direct link to your review form. Not a request to leave a review somewhere, an actual link.",
        why: "Under fifteen reviews, most people assume the business is either new or not busy. Both cost you the click.",
      },
      none: {
        action:
          "Get your first five reviews this week from customers you already know well. Send them the direct review link rather than asking them to search for you.",
        why: "A listing with no reviews reads as unproven no matter how long you have been in business. This is the fastest change on the list.",
      },
    },
    responses: {
      negative: {
        action:
          "Reply to every review, including the good ones. Two sentences is enough. Thank them and mention something specific they said.",
        why: "Replying only to complaints makes your profile look defensive. Replying to everything shows an owner who is present and paying attention.",
      },
      rarely: {
        action:
          "Reply to every review from the last three months, then set a reminder to check weekly. Keep replies short and never argue, even when you are right.",
        why: "Response rate is a ranking signal, and a well handled negative review often persuades more customers than a five star one.",
      },
    },
    asking: {
      "ad-hoc": {
        action:
          "Turn asking into a fixed step. Same moment every time: after the appointment, at payment, or when you hand over the work. Give them the direct link on a card or by text message.",
        why: "Occasional asking produces occasional reviews. A steady stream is what actually moves you up the map pack.",
      },
      no: {
        action:
          "Get your review link from your profile, shorten it, and put it in three places: on a printed card, on your invoice or receipt, and saved as a quick reply on your phone.",
        why: "Almost nobody leaves a review unprompted. The businesses ranking above you are not better liked, they just ask.",
      },
    },
    photos: {
      some: {
        action:
          "Add ten more photos and then keep adding two or three a month. Your location, your team, and the work itself. Real photos from a phone beat stock every time.",
        why: "Profiles with regularly updated photos get noticeably more calls and direction requests than static ones.",
      },
      few: {
        action:
          "Take fifteen photos this week: your location so people can find it, your team, your vehicles if you have them, and your actual work.",
        why: "A near empty photo section makes people wonder whether the business is still operating.",
      },
      none: {
        action:
          "Add at least ten photos today, starting with your storefront or your work van, taken from the street. People use that photo to recognize you.",
        why: "No photos is one of the most common reasons a customer picks the competitor listed under you.",
      },
    },
    posts: {
      sometimes: {
        action:
          "Post weekly. It does not need to be clever: an offer, a new service, a busy day, a finished job. Fifteen minutes on a Monday covers it.",
        why: "Posts show Google the profile is actively managed, and they occupy space on your listing that would otherwise be empty.",
      },
      never: {
        action:
          "Publish one post this week and put a recurring reminder in your calendar. Photo, two lines, done.",
        why: "An inactive profile ranks below an active one with otherwise identical information.",
      },
    },
    services: {
      partial: {
        action:
          "Complete the list with a short description for each service, and add prices or price ranges where you can.",
        why: "People compare before they call. A listing without prices loses to one with them, even when the priced option is more expensive.",
      },
      none: {
        action:
          "Add every service you offer with a one line description each. This takes about half an hour and only needs doing once.",
        why: "Your services list is searchable. Leaving it empty means you are invisible for every search that names a specific service rather than your category.",
      },
    },
    hours: {
      basic: {
        action:
          "Add holiday and special hours ahead of time, such as Memorial Day, the Fourth of July, Thanksgiving and Christmas, and any day you close early.",
        why: "Someone who drives to a closed business writes a one star review about it, and that review outlives the mistake by years.",
      },
      no: {
        action:
          "Fix your regular hours today, then add special hours for the next three months of holidays.",
        why: "Google shows a warning that hours may differ on profiles it does not trust, and every person who looks you up sees it.",
      },
    },
    website: {
      social: {
        action:
          "Point the website field at a proper site with your services, location and a way to contact you. A single well built page is enough.",
        why: "A social page as your website suggests a side operation rather than an established business, and you cannot control what else the visitor sees there.",
      },
      no: {
        action:
          "Get a one page site up with your services, service area, hours and a phone number, then link it from the profile.",
        why: "The website link is one of the few places on your listing where you control the whole message rather than filling in Google's fields.",
      },
    },
  },
  bands: {
    strong: {
      label: "Strong",
      note: "Your profile is in good shape. The remaining gains are in consistency and volume rather than setup.",
    },
    competitive: {
      label: "Competitive",
      note: "The foundations are there. A few specific gaps are holding you back from the top three results.",
    },
    underperforming: {
      label: "Underperforming",
      note: "You are visible but losing customers to businesses with better profiles, not better service.",
    },
    atRisk: {
      label: "At risk",
      note: "Nearby customers searching right now are very unlikely to find you. This is fixable, and quickly.",
    },
  },
  ui: {
    introText:
      "Twelve questions about your Google listing. Takes about two minutes. You get a score and a written plan you can act on yourself, starting with the gaps costing you the most customers.",
    nameLabel: "Business name",
    namePlaceholder: "Your business name",
    typeLabel: "What kind of business",
    typePlaceholder: "For example, house painting",
    cityLabel: "City",
    cityPlaceholder: "Houston",
    optional: "optional",
    start: "Start the check",
    startNote:
      "No account needed. We only contact you if you ask us to, and we never add you to a list.",
    questionOf: "of",
    back: "Back",
    outOf: "out of 100",
    gateTitle: "See your action plan",
    gateText:
      "Tell us where to reach you and your plan opens right here. We read every score and, if we can help, we reply with a clear next step.",
    gateBusiness: "Business name",
    gateContact: "Email or phone number",
    gateWebsite: "Website or Google profile link",
    gateButton: "Show my plan",
    gateSending: "One moment",
    gateNote: "Used only to reply to you. No lists, no spam.",
    errName: "Please enter your business name.",
    errContact: "Please enter a valid email or phone number.",
    errSend: "We could not send that just now. Please try again in a minute.",
    planTitle: "Your action plan",
    planNoneTitle: "Nothing urgent",
    planNoneText:
      "Your profile is in good shape across every question we asked. Check it once a quarter, since categories get suggested, hours go stale and competitors catch up.",
    nextTitle: "Want us to do it instead?",
    nextText:
      "Write to us with your score and a line about your business, and we will tell you honestly whether it needs an agency or an afternoon.",
    nextButton: "Talk to us",
    again: "Start again",
    backToSite: "Back to site",
  },
};

const es: GbpText = {
  meta: {
    title: "Revisión gratis de su Perfil de Negocio de Google",
    description:
      "Doce preguntas, dos minutos. Descubra cuántos clientes le está costando su perfil de Google y reciba un plan escrito para arreglarlo.",
  },
  page: {
    eyebrow: "Herramienta gratis",
    h1: "¿Qué tan bueno es su perfil de Google?",
    h1Mark: "perfil de Google",
    intro:
      "Muchos negocios locales pierden clientes frente a competidores con peor servicio y mejor perfil. En dos minutos sabrá de qué lado está.",
  },
  sections: {
    foundation: "Base",
    reviews: "Reseñas",
    content: "Contenido",
    details: "Detalles",
  },
  questions: {
    verified: {
      question: "¿Su perfil está reclamado y verificado?",
      help: "Un perfil verificado muestra un panel de control cuando busca el nombre de su negocio con su cuenta iniciada.",
      options: {
        yes: "Sí, verificado",
        claimed: "Reclamado pero sin verificar",
        no: "No, o no estoy seguro",
      },
    },
    category: {
      question: "¿Qué tan específica es su categoría principal?",
      help: "Lo específico supera a lo amplio. \"Clínica dental\" se posiciona mejor que \"servicio de salud\" para quien busca un dentista.",
      options: {
        specific: "Específica para lo que realmente hago",
        broad: "Amplia o genérica",
        unsure: "No la he revisado",
      },
    },
    secondary: {
      question: "¿Ha agregado categorías secundarias?",
      options: { several: "Tres o más", few: "Una o dos", none: "Ninguna" },
    },
    nap: {
      question:
        "¿Su nombre, dirección y teléfono son idénticos en todos los sitios en línea?",
      help: "Directorios, su sitio web, redes sociales. Google interpreta la inconsistencia como incertidumbre.",
      options: {
        yes: "Sí, iguales en todas partes",
        mostly: "Casi todos, con algunos listados viejos",
        no: "No, o nunca lo he revisado",
      },
    },
    reviews: {
      question: "¿Cuántas reseñas tiene en Google?",
      options: {
        many: "Más de 50",
        some: "De 15 a 50",
        few: "De 1 a 14",
        none: "Ninguna",
      },
    },
    responses: {
      question: "¿Responde a las reseñas?",
      help: "Responder es una señal de posicionamiento y cambia claramente cómo un desconocido lee una reseña mala.",
      options: {
        all: "Sí, a casi todas",
        negative: "Solo a las negativas",
        rarely: "Casi nunca o nunca",
      },
    },
    asking: {
      question: "¿Tiene un sistema para pedir reseñas a sus clientes?",
      options: {
        system: "Sí, un proceso que repito",
        "ad-hoc": "A veces, cuando me acuerdo",
        no: "No",
      },
    },
    photos: {
      question: "¿Cuántas fotos tiene su perfil?",
      help: "Los perfiles con fotos reciben bastantes más solicitudes de ruta y llamadas.",
      options: {
        many: "Más de 20, y agrego con frecuencia",
        some: "Entre 5 y 20",
        few: "Menos de 5",
        none: "Ninguna",
      },
    },
    posts: {
      question: "¿Publica Publicaciones de Google?",
      options: {
        weekly: "Cada semana o más",
        sometimes: "De vez en cuando",
        never: "Nunca",
      },
    },
    services: {
      question: "¿Sus servicios o productos están en el perfil?",
      options: {
        full: "Sí, con descripciones y precios",
        partial: "Algunos, sin detalles",
        none: "No",
      },
    },
    hours: {
      question: "¿Su horario está completo y actualizado?",
      help: "Un horario equivocado en un día festivo es la forma más rápida de recibir una reseña de una estrella.",
      options: {
        yes: "Sí, incluido el horario de días festivos",
        basic: "Solo el horario normal",
        no: "Incompleto o desactualizado",
      },
    },
    website: {
      question: "¿Su perfil enlaza a un sitio web que funciona?",
      options: {
        yes: "Sí, un sitio hecho para el negocio",
        social: "Enlaza a una página de redes sociales",
        no: "No tiene sitio web enlazado",
      },
    },
  },
  advice: {
    verified: {
      claimed: {
        action:
          "Termine la verificación esta semana. Google enviará una postal, una llamada o un correo según su tipo de negocio, y todo toma unos diez minutos de su tiempo cuando llega el código.",
        why: "Mientras no esté verificado no puede editar la mayor parte de su propio perfil, y cualquiera puede sugerir cambios que se publican sin su aprobación.",
      },
      no: {
        action:
          "Busque el nombre de su negocio en Google con la cuenta que quiere que sea la dueña del perfil. Si aparece un panel, reclámelo. Si no aparece nada, cree el perfil desde cero en business.google.com.",
        why: "Un perfil sin reclamar es la brecha más costosa de esta lista. Google lo sigue mostrando, pero con la información que encontró por su cuenta, y sus competidores pueden sugerir cambios.",
      },
    },
    category: {
      broad: {
        action:
          "Cambie su categoría principal por la más específica que describa lo que más hace. Mire qué categoría usan los tres negocios que aparecen arriba de usted.",
        why: "La categoría principal es el factor de posicionamiento más fuerte que usted controla. Una categoría amplia lo mete en un grupo mucho mayor, con búsquedas mucho menos relevantes.",
      },
      unsure: {
        action:
          "Abra su perfil, busque Categoría del negocio y lea cuál está puesta. Luego elija la opción más específica que corresponda a su servicio principal.",
        why: "La mayoría de los perfiles siguen con la categoría elegida al inicio, muchas veces por alguien que adivinó. Se arregla en dos minutos y el efecto es grande.",
      },
    },
    secondary: {
      few: {
        action:
          "Agregue dos o tres categorías secundarias más, para servicios que sí ofrece y que su categoría principal no cubre.",
        why: "Cada categoría secundaria legítima le abre otro grupo de búsquedas donde puede aparecer, sin competir contra su propio perfil principal.",
      },
      none: {
        action:
          "Agregue tres categorías secundarias para servicios que realmente presta. Solo las reales. Google penaliza el exceso de categorías y los clientes notan cuando un perfil promete de más.",
        why: "Ahora solo aparece en un tipo de búsqueda, cuando probablemente atiende varios.",
      },
    },
    nap: {
      mostly: {
        action:
          "Busque en Google el nombre de su negocio y su teléfono entre comillas, y haga una lista de los sitios que muestran datos viejos. Corríjalos o elimínelos, empezando por los directorios que mejor aparecen.",
        why: "Los listados viejos con una dirección o un número anterior dividen su autoridad y a veces mandan clientes a un lugar donde ya no está.",
      },
      no: {
        action:
          "Anote el nombre exacto de su negocio, la dirección y el teléfono como aparecen en su perfil de Google. Esa es la versión oficial. Luego compare con ella cada directorio, red social y página de su propio sitio.",
        why: "Google interpreta la inconsistencia como duda sobre si es un negocio real y estable, y lo posiciona en consecuencia.",
      },
    },
    reviews: {
      some: {
        action:
          "Póngase la meta de cinco reseñas nuevas al mes y pídaselas a cada cliente satisfecho en el momento en que está más contento, no días después por correo.",
        why: "Ya pasó el umbral de credibilidad, pero sigue por debajo de los negocios que ocupan los tres primeros lugares del mapa en la mayoría de las categorías.",
      },
      few: {
        action:
          "Pídaselas esta semana a sus diez clientes más fieles, en persona o por mensaje de texto, con un enlace directo a su formulario de reseñas. No un \"deje una reseña por ahí\", sino el enlace de verdad.",
        why: "Con menos de quince reseñas, la mayoría piensa que el negocio es nuevo o que no tiene mucho movimiento. Las dos cosas le cuestan el clic.",
      },
      none: {
        action:
          "Consiga sus primeras cinco reseñas esta semana con clientes que ya conoce bien. Envíeles el enlace directo en lugar de pedirles que lo busquen.",
        why: "Un perfil sin reseñas parece no probado, sin importar cuántos años lleve trabajando. Es el cambio más rápido de esta lista.",
      },
    },
    responses: {
      negative: {
        action:
          "Responda todas las reseñas, también las buenas. Con dos frases basta. Dé las gracias y mencione algo concreto que dijo la persona.",
        why: "Responder solo a las quejas hace que su perfil parezca a la defensiva. Responder a todas muestra a un dueño presente y atento.",
      },
      rarely: {
        action:
          "Responda todas las reseñas de los últimos tres meses y ponga un recordatorio para revisar cada semana. Sea breve y nunca discuta, aunque tenga la razón.",
        why: "La tasa de respuesta es una señal de posicionamiento, y una reseña negativa bien manejada muchas veces convence a más clientes que una de cinco estrellas.",
      },
    },
    asking: {
      "ad-hoc": {
        action:
          "Convierta el pedir reseñas en un paso fijo. Siempre en el mismo momento: al terminar la cita, al cobrar o al entregar el trabajo. Dé el enlace directo en una tarjeta o por mensaje de texto.",
        why: "Pedir de vez en cuando produce reseñas de vez en cuando. Un flujo constante es lo que realmente lo sube en el mapa.",
      },
      no: {
        action:
          "Copie el enlace de reseñas desde su perfil, acórtelo y póngalo en tres lugares: en una tarjeta impresa, en su factura o recibo, y como respuesta rápida guardada en su teléfono.",
        why: "Casi nadie deja una reseña sin que se la pidan. Los negocios que aparecen arriba de usted no son más queridos, simplemente la piden.",
      },
    },
    photos: {
      some: {
        action:
          "Agregue diez fotos más y luego siga con dos o tres al mes. Su local, su equipo y el trabajo mismo. Las fotos reales tomadas con el teléfono siempre superan a las de banco de imágenes.",
        why: "Los perfiles con fotos actualizadas con frecuencia reciben notablemente más llamadas y solicitudes de ruta que los que no cambian.",
      },
      few: {
        action:
          "Tome quince fotos esta semana: su local para que lo encuentren, su equipo, sus vehículos si los tiene y su trabajo real.",
        why: "Una sección de fotos casi vacía hace que la gente se pregunte si el negocio sigue funcionando.",
      },
      none: {
        action:
          "Agregue al menos diez fotos hoy, empezando por la fachada de su local o su camioneta de trabajo, tomada desde la calle. La gente usa esa foto para reconocerlo.",
        why: "No tener fotos es una de las razones más comunes por las que un cliente elige al competidor que aparece debajo de usted.",
      },
    },
    posts: {
      sometimes: {
        action:
          "Publique cada semana. No tiene que ser ingenioso: una oferta, un servicio nuevo, un día con mucho trabajo, un trabajo terminado. Quince minutos un lunes bastan.",
        why: "Las publicaciones le muestran a Google que el perfil se atiende, y ocupan espacio de su perfil que de otra forma estaría vacío.",
      },
      never: {
        action:
          "Haga una publicación esta semana y ponga un recordatorio que se repita en su calendario. Una foto, dos líneas y listo.",
        why: "Un perfil inactivo se posiciona por debajo de uno activo con la misma información.",
      },
    },
    services: {
      partial: {
        action:
          "Complete la lista con una descripción corta de cada servicio y agregue precios o rangos de precio donde pueda.",
        why: "La gente compara antes de llamar. Un perfil sin precios pierde contra uno que los tiene, aunque el que tiene precios sea más caro.",
      },
      none: {
        action:
          "Agregue cada servicio que ofrece con una descripción de una línea. Toma media hora y solo se hace una vez.",
        why: "La lista de servicios aparece en las búsquedas. Si está vacía, es invisible para toda búsqueda que nombra un servicio concreto en lugar de su categoría.",
      },
    },
    hours: {
      basic: {
        action:
          "Agregue con anticipación el horario de días festivos y horarios especiales, como el Memorial Day, el 4 de julio, Acción de Gracias y Navidad, y cualquier día que cierre temprano.",
        why: "Quien maneja hasta un negocio cerrado escribe una reseña de una estrella, y esa reseña dura años más que el error.",
      },
      no: {
        action:
          "Corrija hoy su horario normal y luego agregue horarios especiales para los días festivos de los próximos tres meses.",
        why: "Google muestra un aviso de que el horario puede variar en los perfiles en los que no confía, y lo ve cualquiera que lo busque.",
      },
    },
    website: {
      social: {
        action:
          "Haga que el campo del sitio web enlace a un sitio de verdad, con sus servicios, su ubicación y una forma de contactarlo. Una sola página bien hecha es suficiente.",
        why: "Una página de redes sociales como sitio web parece un negocio secundario y no uno establecido, y usted no controla qué más ve ahí el visitante.",
      },
      no: {
        action:
          "Publique un sitio de una página con sus servicios, su zona de servicio, su horario y un teléfono, y enlácelo desde el perfil.",
        why: "El enlace al sitio web es uno de los pocos lugares de su perfil donde usted controla todo el mensaje, en lugar de llenar los campos de Google.",
      },
    },
  },
  bands: {
    strong: {
      label: "Fuerte",
      note: "Su perfil está en buena forma. Lo que queda por ganar está en la constancia y el volumen, no en la configuración.",
    },
    competitive: {
      label: "Competitivo",
      note: "Las bases están. Unas pocas brechas concretas le impiden estar entre los tres primeros resultados.",
    },
    underperforming: {
      label: "Por debajo de su potencial",
      note: "Lo encuentran, pero pierde clientes frente a negocios con mejor perfil, no con mejor servicio.",
    },
    atRisk: {
      label: "En riesgo",
      note: "Es muy poco probable que los clientes cercanos que buscan ahora mismo lo encuentren. Tiene arreglo, y rápido.",
    },
  },
  ui: {
    introText:
      "Doce preguntas sobre su perfil de Google. Toma unos dos minutos. Recibe una calificación y un plan escrito que puede aplicar usted mismo, empezando por las brechas que más clientes le cuestan.",
    nameLabel: "Nombre del negocio",
    namePlaceholder: "El nombre de su negocio",
    typeLabel: "Tipo de negocio",
    typePlaceholder: "Por ejemplo, pintura de casas",
    cityLabel: "Ciudad",
    cityPlaceholder: "Houston",
    optional: "opcional",
    start: "Empezar la revisión",
    startNote:
      "No necesita cuenta. Solo lo contactamos si usted lo pide, y nunca lo agregamos a una lista.",
    questionOf: "de",
    back: "Atrás",
    outOf: "de 100",
    gateTitle: "Vea su plan de acción",
    gateText:
      "Díganos cómo contactarlo y su plan se abre aquí mismo. Leemos cada calificación y, si podemos ayudar, le respondemos con un siguiente paso claro.",
    gateBusiness: "Nombre del negocio",
    gateContact: "Correo o número de teléfono",
    gateWebsite: "Sitio web o enlace de su perfil de Google",
    gateButton: "Mostrar mi plan",
    gateSending: "Un momento",
    gateNote: "Se usa solo para responderle. Sin listas, sin spam.",
    errName: "Escriba el nombre de su negocio.",
    errContact: "Escriba un correo o un número de teléfono válido.",
    errSend: "No pudimos enviarlo ahora. Inténtelo de nuevo en un minuto.",
    planTitle: "Su plan de acción",
    planNoneTitle: "Nada urgente",
    planNoneText:
      "Su perfil está en buena forma en todas las preguntas que hicimos. Revíselo una vez por trimestre, porque se sugieren categorías, los horarios se desactualizan y los competidores se acercan.",
    nextTitle: "¿Prefiere que lo hagamos nosotros?",
    nextText:
      "Escríbanos con su calificación y una línea sobre su negocio, y le diremos con honestidad si necesita una agencia o solo una tarde de trabajo.",
    nextButton: "Hablar con nosotros",
    again: "Empezar de nuevo",
    backToSite: "Volver al sitio",
  },
};

export const gbpText: Record<Lang, GbpText> = { en, es };
