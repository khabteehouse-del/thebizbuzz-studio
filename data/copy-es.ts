import type { Copy } from "@/data/copy-types";

/*
  Spanish copy. Written for business owners in Texas, in a neutral and
  respectful register (usted). A native Spanish speaker should review it
  before launch.
*/

export const es: Copy = {
  htmlLang: "es",
  locale: "es_US",
  nav: {
    websites: "Sitios web",
    localSeo: "SEO local",
    gbp: "Perfil de Google",
    industries: "Industrias",
    mizar: "Mizar",
    about: "Nosotros",
    cta: "Auditoría gratis",
    switchLabel: "English",
    switchAria: "View this site in English",
    menuOpen: "Abrir menú",
    menuClose: "Cerrar menú",
    home: "Inicio",
  },
  common: {
    learnMore: "Más información",
    freeAudit: "Reciba su auditoría gratis",
    bookConsultation: "Reserve una consulta gratis",
    seeServices: "Vea lo que hacemos",
    inDevelopment: "En desarrollo",
    illustration: "Ilustración",
  },
  home: {
    metaTitle: "Sitios web, SEO local y Perfil de Negocio de Google para negocios de Texas",
    metaDescription:
      "Ayudamos a los negocios de servicios de Texas a aparecer en Google, verse confiables en línea y convertir las búsquedas en llamadas. Sitios web, SEO local y Perfil de Negocio de Google, en inglés y español.",
    eyebrow: "Sitios web · SEO local · Perfil de Negocio de Google",
    h1Before: "Acentúe sus ",
    h1Mark: "ingresos",
    h1After: ".",
    sub: "Ayudamos a los negocios de servicios de Texas a aparecer en Google, verse confiables en línea y convertir las búsquedas en llamadas. Sitios web, SEO local y Perfil de Negocio de Google, nosotros nos encargamos.",
    note: "Gratis y sin compromiso. Trabajamos en español y en inglés.",
    chips: [
      "Español e inglés",
      "Hecho primero para el celular",
      "Lenguaje claro, sin tecnicismos",
    ],
    heroCardTitle: "Su negocio, más fácil de encontrar",
    heroCardChips: ["Aparezca en Google", "Más llamadas", "Reseñas confiables"],
    soundsTitle: "Los clientes buscan primero. Luego llaman al negocio que pueden encontrar.",
    sounds: [
      {
        title: "Su perfil de Google está a medias",
        text: "Si faltan horarios, fotos o servicios, la gente pasa de largo.",
      },
      {
        title: "Su sitio web se ve mal en el celular",
        text: "La mayoría de las búsquedas locales se hacen desde el celular. Un sitio lento o confuso pierde la llamada.",
      },
      {
        title: "La competencia aparece primero",
        text: "Cuando un cliente cercano busca, los negocios de arriba reciben las llamadas.",
      },
    ],
    servicesEyebrow: "Lo que hacemos",
    servicesTitle: "Tres servicios. Una meta: más clientes que puedan encontrarlo.",
    servicesIntro:
      "Nos enfocamos en el trabajo que hace que un negocio local sea visible y fácil de elegir.",
    auditEyebrow: "Empiece aquí",
    auditTitle: "Una auditoría gratis de su Perfil de Negocio de Google",
    auditText:
      "Envíenos el nombre de su negocio. Revisamos su perfil de Google y le decimos, en lenguaje claro, qué lo está frenando y qué arreglar primero.",
    auditPoints: [
      "Sin costo y sin compromiso",
      "Lenguaje claro, sin tecnicismos",
      "En español o en inglés",
    ],
    stepsEyebrow: "Cómo funciona",
    stepsTitle: "Pasos sencillos, claros desde el inicio",
    steps: [
      {
        title: "Auditoría gratis y conversación",
        text: "Revisamos su perfil y su sitio web, y hablamos de lo que usted quiere lograr.",
      },
      {
        title: "Plan y cotización",
        text: "Recibe un plan claro, un precio fijo en dólares y un calendario por escrito.",
      },
      {
        title: "Construimos y optimizamos",
        text: "Nosotros hacemos el trabajo. Usted se enfoca en sus clientes.",
      },
      {
        title: "Lanzamiento y crecimiento",
        text: "Publicamos, revisamos los resultados con usted y seguimos mejorando.",
      },
    ],
    industriesEyebrow: "A quién ayudamos",
    industriesTitle: "Hecho para negocios locales de servicios",
    industriesIntro:
      "Pintores, profesionales de belleza, limpieza, contratistas y servicios para mascotas. Elija el suyo para ver lo que hacemos.",
    mizarBadge: "En desarrollo",
    mizarTitle: "Mizar: un asistente de IA para profesionales de servicios móviles",
    mizarText:
      "Mizar se está creando para contestar llamadas, mensajes de texto y mensajes de WhatsApp mientras usted atiende a un cliente. Todavía no está disponible. Únase a la lista de acceso anticipado y le avisaremos cuando esté listo.",
    mizarCta: "Conozca Mizar",
    proofEyebrow: "Nuestro trabajo",
    proofTitle: "Los casos de estudio de Texas están en camino",
    proofText:
      "Somos la rama en Estados Unidos de BizBuzz, un estudio creativo y de tecnología. Mientras preparamos nuestros casos de estudio en Texas, puede ver el trabajo del estudio.",
    proofLink: "Ver el portafolio de BizBuzz",
    proofNote:
      "Aquí solo mostraremos proyectos reales, con permiso de cada dueño.",
    whyTitle: "Por qué nos eligen",
    why: [
      {
        title: "Bilingüe desde el primer día",
        text: "Su sitio web y su atención en español e inglés, escritos bien por personas, no solo traducidos por una herramienta.",
      },
      {
        title: "Claros y honestos",
        text: "Lenguaje sencillo, cotización por escrito y sin promesas que nadie puede cumplir.",
      },
      {
        title: "Creativos y técnicos",
        text: "Buen diseño e ingeniería sólida, juntos. La marca se une con la inteligencia.",
      },
      {
        title: "Hecho para el celular",
        text: "Páginas rápidas y sencillas que funcionan en la pantalla pequeña que usan sus clientes.",
      },
    ],
    faqEyebrow: "Preguntas",
    faqTitle: "Lo que nos preguntan",
    faqs: [
      {
        q: "¿Tienen una oficina en Texas?",
        a: "No. Somos un equipo remoto que atiende a negocios de Texas. Hablamos por teléfono y por video, y cuando es importante nos adaptamos a su horario.",
      },
      {
        q: "¿El sitio web está disponible en español?",
        a: "Sí. Cada página tiene su versión en español, y podemos crear su sitio web en español, en inglés o en ambos.",
      },
      {
        q: "¿Cuánto cuesta?",
        a: "Depende de lo que necesite. Usted recibe un precio fijo en dólares, por escrito, antes de que empiece cualquier trabajo.",
      },
      {
        q: "¿Pueden garantizar el primer lugar en Google?",
        a: "Ninguna agencia honesta puede. Hacemos el trabajo que mejora su visibilidad y le mostramos qué cambia.",
      },
      {
        q: "¿Qué es un Perfil de Negocio de Google?",
        a: "Es el listado gratuito que aparece en la Búsqueda y en Maps de Google con su horario, fotos, reseñas y número de teléfono. Para un negocio local, suele ser lo primero que ve un cliente.",
      },
      {
        q: "¿Qué es Mizar?",
        a: "Mizar es un asistente de IA para profesionales de servicios móviles que estamos creando. Todavía está en desarrollo y no está a la venta. Puede unirse a la lista de acceso anticipado.",
      },
    ],
    finalTitle: "¿Listo para que lo encuentren más fácil?",
    finalText:
      "Cuéntenos sobre su negocio. Le respondemos con un siguiente paso claro, en español o en inglés.",
  },
  services: {
    websites: {
      navLabel: "Desarrollo web",
      title: "Desarrollo web",
      cardLine: "Sitios web profesionales que atraen llamadas.",
      bullets: [
        "Sitios web profesionales para su negocio",
        "Diseño rápido, primero para el celular",
        "Páginas hechas para conseguir clientes",
        "Diseños para su industria",
      ],
      metaTitle: "Desarrollo web para negocios locales",
      metaDescription:
        "Sitios web profesionales, pensados primero para el celular, para negocios de servicios de Texas. Hechos para atraer llamadas y solicitudes de cotización. En español e inglés.",
      eyebrow: "Desarrollo web",
      h1: "Un sitio web que trabaja tan duro como usted",
      h1Mark: "trabaja tan duro",
      intro:
        "Su sitio web debe lograr que un desconocido confíe en usted en pocos segundos y facilitar que le llame o pida una cotización. Diseñamos y construimos sitios web que hacen justo eso, en cualquier pantalla.",
      featuresTitle: "Lo que usted recibe",
      features: [
        {
          title: "Un sitio web profesional",
          text: "Páginas claras sobre sus servicios, su zona y su historia, escritas en lenguaje sencillo.",
        },
        {
          title: "Diseño primero para el celular",
          text: "Lo diseñamos primero para el celular y luego lo adaptamos. Rápido, fácil de leer y fácil de tocar.",
        },
        {
          title: "Páginas enfocadas en conseguir clientes",
          text: "Páginas hechas alrededor de una sola acción, como llamarle o pedir una cotización.",
        },
        {
          title: "Estructuras para su industria",
          text: "Estructura y textos que se adaptan a cómo se contrata a pintores, personal de limpieza, profesionales de belleza y más.",
        },
      ],
      stepsTitle: "Cómo lo construimos",
      steps: [
        {
          title: "Plan",
          text: "Acordamos las páginas, los textos y la acción que cada página debe lograr.",
        },
        {
          title: "Diseño y construcción",
          text: "Usted ve una vista previa temprano y nos dice qué cambiar.",
        },
        {
          title: "Lanzamiento",
          text: "Publicamos, conectamos su perfil de Google y lo probamos en celulares reales.",
        },
      ],
      fitTitle: "Es para usted si",
      fit: [
        "No tiene sitio web, o el que tiene se ve anticuado en el celular",
        "Los clientes lo encuentran por recomendación, pero no en Google",
        "Quiere un solo lugar que muestre su trabajo y reciba solicitudes de cotización",
      ],
      ctaTitle: "Planeemos su sitio web",
      ctaText:
        "Cuéntenos sobre su negocio y le enviaremos un plan claro y un precio fijo.",
    },
    localSeo: {
      navLabel: "SEO local",
      title: "SEO local",
      cardLine: "Aparezca cuando los clientes cercanos busquen lo que usted hace.",
      bullets: [
        "Visibilidad en búsquedas locales",
        "Palabras clave locales",
        "Optimización SEO de su sitio web",
        "Mejoras en el rendimiento de búsqueda",
      ],
      metaTitle: "SEO local para negocios de servicios",
      metaDescription:
        "SEO local para que los negocios de servicios de Texas aparezcan cuando los clientes cercanos buscan. Trabajo claro, informes honestos, en español e inglés.",
      eyebrow: "SEO local",
      h1: "Sea el negocio que los clientes encuentran cerca",
      h1Mark: "encuentran cerca",
      intro:
        "Cuando alguien busca un pintor, un servicio de limpieza o un peluquero de mascotas cerca de su casa, unos pocos negocios reciben la llamada. El SEO local es el trabajo que lo pone entre ellos.",
      featuresTitle: "En qué trabajamos",
      features: [
        {
          title: "Visibilidad en búsquedas locales",
          text: "Mejoramos cómo aparece en las búsquedas de las ciudades y los barrios donde usted trabaja.",
        },
        {
          title: "Palabras clave locales",
          text: "Encontramos las palabras que sus clientes realmente usan, en español y en inglés, y las ponemos donde cuentan.",
        },
        {
          title: "SEO de su sitio web",
          text: "Títulos, encabezados, velocidad y estructura que los buscadores pueden leer.",
        },
        {
          title: "Rendimiento de búsqueda",
          text: "Vigilamos qué cambia y seguimos mejorando, con informes sencillos que usted puede entender.",
        },
      ],
      stepsTitle: "Cómo funciona",
      steps: [
        {
          title: "Revisión",
          text: "Vemos dónde aparece hoy y dónde le ganan sus competidores.",
        },
        {
          title: "Mejora",
          text: "Corregimos el sitio, los listados y los textos que lo frenan.",
        },
        {
          title: "Seguimiento",
          text: "Le informamos en lenguaje claro y ajustamos el plan.",
        },
      ],
      fitTitle: "Es para usted si",
      fit: [
        "Sus competidores aparecen antes que usted en su propia ciudad",
        "Atiende varios barrios o ciudades",
        "Quiere clientes constantes por búsqueda, no solo por recomendación",
      ],
      ctaTitle: "Vea dónde está hoy",
      ctaText:
        "Empiece con una auditoría gratis. Nadie puede prometer el primer lugar, pero sí podemos mostrarle qué lo está frenando.",
    },
    gbp: {
      navLabel: "Perfil de Negocio de Google",
      title: "Perfil de Negocio de Google",
      cardLine: "Un perfil completo en el que los clientes confían y eligen.",
      bullets: [
        "Creación y optimización del perfil",
        "Gestión de la información del negocio",
        "Mejoras en la visibilidad local",
        "Orientación sobre reseñas y reputación",
      ],
      metaTitle: "Gestión del Perfil de Negocio de Google",
      metaDescription:
        "Creación, optimización y gestión del Perfil de Negocio de Google para negocios locales, según las normas de Google. En español e inglés.",
      eyebrow: "Perfil de Negocio de Google",
      h1: "Un perfil de Google en el que los clientes confían",
      h1Mark: "los clientes confían",
      intro:
        "Su Perfil de Negocio de Google suele ser lo primero que ve un cliente. Un perfil completo y correcto, con fotos reales y buenas reseñas, recibe más llamadas que uno vacío.",
      featuresTitle: "De qué nos encargamos",
      features: [
        {
          title: "Creación y optimización",
          text: "Categorías, servicios, descripción, fotos y horarios, completados como debe ser.",
        },
        {
          title: "Información del negocio",
          text: "Mantenemos correctos y consistentes su nombre, teléfono, horario y zona de servicio.",
        },
        {
          title: "Visibilidad local",
          text: "Publicaciones, actualizaciones y detalles que ayudan a que su perfil aparezca en las búsquedas correctas.",
        },
        {
          title: "Reseñas y reputación",
          text: "Orientación honesta para pedir reseñas y responderlas bien.",
        },
      ],
      stepsTitle: "Cómo funciona",
      steps: [
        {
          title: "Auditoría gratis",
          text: "Revisamos su perfil y le damos la lista de lo que hay que arreglar primero.",
        },
        {
          title: "Corregir y completar",
          text: "Actualizamos el perfil y seguimos las normas de Google sobre cómo se puede mostrar un negocio.",
        },
        {
          title: "Mantener",
          text: "Lo mantenemos al día a medida que su negocio cambia.",
        },
      ],
      fitTitle: "Es para usted si",
      fit: [
        "Usted va a donde están los clientes y no tiene local",
        "Su perfil está incompleto o tiene datos incorrectos",
        "Quiere un plan sencillo para conseguir más reseñas",
      ],
      ctaTitle: "Reciba su auditoría gratis del perfil",
      ctaText:
        "Envíenos el nombre de su negocio y le diremos qué arreglar primero. Los negocios que atienden en la zona del cliente son bienvenidos.",
    },
  },
  industriesIndex: {
    metaTitle: "Industrias que atendemos",
    metaDescription:
      "Sitios web, SEO local y Perfil de Negocio de Google para pintores, profesionales de belleza móvil, empresas de limpieza, contratistas y servicios móviles para mascotas.",
    h1: "Hecho para negocios locales de servicios",
    h1Mark: "negocios locales",
    intro:
      "Cada oficio se contrata de forma distinta. Elija su industria y vea lo que hacemos por ella.",
    otherTitle: "¿No ve su oficio?",
    otherText:
      "Trabajamos con muchos negocios locales de servicios. Cuéntenos a qué se dedica y le diremos con honestidad si podemos ayudarle.",
  },
  industries: {
    "house-painters": {
      name: "Pintores de casas",
      focus: "Sitios web",
      metaTitle: "Sitios web para pintores de casas",
      metaDescription:
        "Sitios web profesionales para pintores de casas en Texas. Muestre su trabajo, genere confianza y reciba más solicitudes de cotización.",
      h1: "Sitios web para pintores de casas",
      h1Mark: "pintores de casas",
      intro:
        "Los dueños de casa contratan a pintores en quienes confían, y primero lo revisan en línea. Un sitio claro con su mejor trabajo le trae la solicitud de cotización.",
      painsTitle: "Lo que frena a los pintores en línea",
      pains: [
        {
          title: "No hay dónde mostrar su trabajo",
          text: "Las fotos en redes sociales no generan la misma confianza que una galería ordenada.",
        },
        {
          title: "Es difícil pedir una cotización",
          text: "Si pedir una cotización cuesta trabajo, el cliente llama al siguiente pintor.",
        },
        {
          title: "No lo encuentran en su zona",
          text: "La gente busca un pintor cerca, y su sitio debe decir dónde trabaja.",
        },
      ],
      includedTitle: "Lo que incluye su sitio",
      included: [
        "Galería de proyectos con fotos de antes y después",
        "Formulario rápido para pedir cotización y botón para llamar",
        "Páginas de los servicios y las zonas que cubre",
        "Reseñas y datos de confianza en los lugares correctos",
      ],
      closing:
        "Cada sitio se hace primero para el celular y está disponible en español y en inglés.",
    },
    "mobile-beauty": {
      name: "Belleza móvil",
      focus: "Sitios web",
      metaTitle: "Sitios web para profesionales de belleza móvil",
      metaDescription:
        "Sitios web para estilistas móviles, especialistas en depilación con cera y salones móviles en Texas. Véase profesional y facilite las reservas.",
      h1: "Sitios web para profesionales de belleza móvil",
      h1Mark: "belleza móvil",
      intro:
        "Usted lleva el salón hasta el cliente. Su sitio web debe verse tan cuidado como su trabajo y hacer fácil la reserva.",
      painsTitle: "Lo que frena a los profesionales de belleza en línea",
      pains: [
        {
          title: "Un perfil, no una marca",
          text: "Las redes muestran su estilo, pero un sitio web muestra que usted es un negocio de verdad.",
        },
        {
          title: "Reservar toma demasiados mensajes",
          text: "Tanto ir y venir por mensaje le cuesta tiempo y clientes.",
        },
        {
          title: "No queda claro adónde va",
          text: "Los clientes quieren saber rápido si usted va hasta ellos.",
        },
      ],
      includedTitle: "Lo que incluye su sitio",
      included: [
        "Una página limpia de servicios y precios",
        "Una forma sencilla de pedir una cita",
        "Su zona de servicio explicada con claridad",
        "Fotos y reseñas que muestran su calidad",
      ],
      closing:
        "Podemos configurar su perfil de Google como negocio que atiende en la zona del cliente, para que no tenga que mostrar la dirección de su casa.",
    },
    "cleaning-companies": {
      name: "Empresas de limpieza",
      focus: "SEO local",
      metaTitle: "SEO local para empresas de limpieza",
      metaDescription:
        "SEO local para empresas de limpieza en Texas. Aparezca cuando los clientes buscan un servicio de limpieza cerca.",
      h1: "SEO local para empresas de limpieza",
      h1Mark: "empresas de limpieza",
      intro:
        "La mayoría busca un servicio de limpieza desde el celular y llama a uno de los primeros que ve. El SEO local le ayuda a ser uno de ellos.",
      painsTitle: "Lo que frena a las empresas de limpieza en línea",
      pains: [
        {
          title: "Mucha competencia",
          text: "Muchas empresas de limpieza compiten por las mismas búsquedas en cada ciudad.",
        },
        {
          title: "Las zonas de servicio no están claras",
          text: "Los buscadores necesitan saber exactamente qué zonas cubre usted.",
        },
        {
          title: "Pocas reseñas",
          text: "Los clientes eligen a quien tiene reseñas reales que pueden leer.",
        },
      ],
      includedTitle: "En qué trabajamos",
      included: [
        "Palabras clave para cada ciudad y barrio que atiende",
        "Páginas para sus servicios, como limpieza de casas y de oficinas",
        "Mejoras de velocidad y estructura del sitio",
        "Informes mensuales sencillos, en lenguaje claro",
      ],
      closing:
        "Trabajamos con palabras clave en español y en inglés, para llegar a los clientes que buscan en cualquiera de los dos idiomas.",
    },
    contractors: {
      name: "Contratistas",
      focus: "Perfil de Negocio de Google",
      metaTitle: "Gestión del Perfil de Negocio de Google para contratistas",
      metaDescription:
        "Gestión del Perfil de Negocio de Google para contratistas en Texas. Un perfil completo que gana confianza y llamadas.",
      h1: "Perfil de Negocio de Google para contratistas",
      h1Mark: "contratistas",
      intro:
        "Cuando un dueño de casa necesita un contratista, primero mira en Google. Un perfil completo con fotos reales de sus proyectos se gana la llamada.",
      painsTitle: "Lo que frena a los contratistas en Google",
      pains: [
        {
          title: "Perfil incompleto",
          text: "Si faltan categorías, servicios y fotos, parece que su negocio está inactivo.",
        },
        {
          title: "Datos incorrectos o viejos",
          text: "Los teléfonos y horarios desactualizados le cuestan trabajos.",
        },
        {
          title: "Reseñas sin responder",
          text: "Responder bien las reseñas demuestra que toma su trabajo en serio.",
        },
      ],
      includedTitle: "De qué nos encargamos",
      included: [
        "Creación y optimización completa del perfil",
        "Servicios, categorías y zona de servicio",
        "Fotos de proyectos y actualizaciones frecuentes",
        "Orientación para conseguir y responder reseñas",
      ],
      closing:
        "Seguimos las normas de Google, para que su perfil quede bien configurado desde el principio.",
    },
    "mobile-pet-services": {
      name: "Servicios móviles para mascotas",
      focus: "Sitios web",
      metaTitle: "Sitios web para servicios móviles para mascotas",
      metaDescription:
        "Sitios web para peluqueros caninos móviles, cuidadores de mascotas y veterinarios móviles en Texas. Genere confianza y facilite las reservas.",
      h1: "Sitios web para servicios móviles para mascotas",
      h1Mark: "servicios móviles para mascotas",
      intro:
        "Los dueños de mascotas le confían a alguien que aman. Su sitio web debe sentirse cálido, claro y profesional, y hacer fácil la reserva.",
      painsTitle: "Lo que frena a los negocios de mascotas en línea",
      pains: [
        {
          title: "Primero va la confianza",
          text: "Los dueños quieren ver quién es usted, su experiencia y el cuidado que da.",
        },
        {
          title: "Preguntas antes de reservar",
          text: "Los dueños preguntan por sus mascotas, los lugares y los precios antes de llamar.",
        },
        {
          title: "No queda claro adónde va",
          text: "Los servicios móviles deben decir con claridad qué zonas cubren.",
        },
      ],
      includedTitle: "Lo que incluye su sitio",
      included: [
        "Una página Nosotros que genera confianza",
        "Servicios y zonas claros",
        "Una forma sencilla de reservar o contactarle",
        "Fotos y reseñas de dueños de mascotas satisfechos",
      ],
      closing:
        "Hecho primero para el celular y disponible en español y en inglés.",
    },
  },
  mizar: {
    metaTitle: "Mizar: asistente de IA para profesionales de servicios móviles",
    metaDescription:
      "Mizar es un asistente de negocios con IA y recepcionista para profesionales de servicios móviles. Está en desarrollo. Únase a la lista de acceso anticipado.",
    badge: "En desarrollo. Todavía no está disponible.",
    h1: "Mizar, un asistente de IA para profesionales de servicios móviles",
    h1Mark: "asistente de IA",
    intro:
      "No puede contestar el teléfono mientras trabaja con un cliente. Mizar se está creando para contestar por usted, para que no pierda al siguiente cliente.",
    notice:
      "Mizar todavía se está creando. Esta página describe lo que estamos diseñando, no un producto terminado. Aún no hay precio.",
    forTitle: "Pensado para",
    forList: [
      "Estilistas móviles y especialistas en depilación con cera",
      "Salones móviles",
      "Pintores de casas",
      "Veterinarios móviles",
      "Otros profesionales de servicios móviles",
    ],
    doesTitle: "Lo que Mizar se está creando para hacer",
    doesIntro: "Estas son nuestras metas para la primera versión.",
    does: [
      {
        title: "Háblele, no escriba",
        text: "Maneje su día con la voz, sin usar las manos, mientras trabaja.",
      },
      {
        title: "Una recepcionista con IA",
        text: "Atiende a los clientes por llamada, WhatsApp, mensaje de texto y correo cuando usted está ocupado.",
      },
      {
        title: "Ayuda para usted y para su cliente",
        text: "Le ayuda a mantenerse organizado y da al cliente una respuesta rápida.",
      },
      {
        title: "Multilingüe desde el primer día",
        text: "Se está creando para atender a clientes en español y en inglés.",
      },
    ],
    languageNote:
      "Se está creando como una aplicación móvil, primero para clientes de Estados Unidos.",
    formTitle: "Únase a la lista de acceso anticipado",
    formText:
      "Deje sus datos y le avisaremos cuando Mizar esté listo. Solo le escribiremos sobre Mizar.",
    formButton: "Unirme a la lista",
    formDone: "Ya está en la lista",
    parentLine: "Mizar es un producto de BizBuzz.",
  },
  about: {
    metaTitle: "Nosotros",
    metaDescription:
      "Ayudamos a los negocios locales de servicios de Texas a que los encuentren y los elijan en línea. Somos parte de BizBuzz, un estudio creativo y de tecnología.",
    eyebrow: "Nosotros",
    h1: "Crecimiento digital para negocios locales de servicios",
    h1Mark: "negocios locales de servicios",
    intro:
      "Ayudamos a los negocios locales a tener una marca más fuerte, un sitio web creíble y un perfil de Google que funciona, en español y en inglés.",
    storyTitle: "Quiénes somos",
    story: [
      "Somos un equipo pequeño, dirigido por sus fundadores, y la rama en Estados Unidos de BizBuzz, un estudio creativo y de tecnología. BizBuzz une marca, diseño, desarrollo web e inteligencia artificial.",
      "Empezamos este negocio por una razón sencilla. Buenos negocios locales pierden clientes porque son difíciles de encontrar en línea. Nosotros lo arreglamos con trabajo claro y honesto.",
      "Somos un equipo remoto. No tenemos oficina en Texas y nunca vamos a fingir que la tenemos. Hablamos por teléfono y por video, y trabajamos en su idioma.",
    ],
    valuesTitle: "Cómo trabajamos",
    values: [
      {
        title: "Lenguaje claro",
        text: "Sin tecnicismos. Usted siempre sabe qué hacemos y por qué.",
      },
      {
        title: "Promesas honestas",
        text: "Mostramos lo que podemos hacer e informamos lo que cambió.",
      },
      {
        title: "Calidad que se nota",
        text: "Diseño cuidado e ingeniería sólida, no una plantilla hecha de prisa.",
      },
      {
        title: "Respeto por su tiempo",
        text: "Respuestas rápidas, calendarios claros y precios fijos por escrito.",
      },
    ],
    familyTitle: "Cómo encajan las piezas",
    familyIntro: "Tres nombres, cada uno con una función clara.",
    familyParent: {
      title: "BizBuzz",
      text: "El estudio matriz. Marca, creatividad y tecnología. Donde la marca se une con la inteligencia.",
    },
    familyAgency: {
      title: "Accentuate Your Revenue",
      text: "Nuestro negocio de cara al cliente. Sitios web, SEO local y Perfil de Negocio de Google.",
    },
    familyProduct: {
      title: "Mizar",
      text: "Un producto de software de BizBuzz, en desarrollo. Un asistente de IA para profesionales de servicios móviles.",
    },
    honestTitle: "Una nota sobre las pruebas",
    honestText:
      "Estamos empezando nuestro trabajo en Texas. Publicaremos casos de estudio a medida que los terminemos, con permiso de cada dueño, y no inventaremos resultados.",
  },
  contact: {
    metaTitle: "Reserve una consulta gratis",
    metaDescription:
      "Cuéntenos sobre su negocio. Reciba una auditoría gratis de su perfil de Google o una consulta gratis, en español o en inglés.",
    eyebrow: "Contacto",
    h1: "Reserve una consulta gratis",
    h1Mark: "consulta gratis",
    intro:
      "Cuéntenos sobre su negocio y qué quiere cambiar. Le responderemos con un siguiente paso claro.",
    nextTitle: "Qué pasa después",
    next: [
      {
        title: "Usted envía el formulario",
        text: "Con unos pocos datos es suficiente.",
      },
      {
        title: "Revisamos su negocio",
        text: "Miramos su sitio web y su perfil de Google.",
      },
      {
        title: "Le respondemos",
        text: "Recibe un plan o una auditoría clara, sin presión.",
      },
    ],
    languageNote: "Escríbanos en español o en inglés. Ambos están bien.",
    remoteNote:
      "Somos un equipo remoto y nos reunimos por teléfono o por video. No tenemos oficina en Texas.",
  },
  form: {
    title: "Cuéntenos sobre su negocio",
    topicLabel: "¿Qué necesita?",
    topics: {
      audit: "Auditoría gratis del perfil de Google",
      website: "Un sitio web",
      seo: "SEO local",
      gbp: "Perfil de Negocio de Google",
    },
    nameLabel: "Su nombre",
    contactLabel: "Correo electrónico o número de teléfono",
    businessLabel: "Nombre del negocio",
    optional: "opcional",
    messageLabel: "¿Qué le gustaría cambiar?",
    messageHint: "Con una o dos frases es suficiente.",
    submit: "Enviar",
    sending: "Enviando",
    privacy: "Se usa solo para responderle. Sin listas ni correo no deseado.",
    doneTitle: "Gracias, lo recibimos",
    doneText: "Leeremos su mensaje y le responderemos directamente.",
    errName: "Por favor escriba su nombre.",
    errContact:
      "Por favor escriba un correo electrónico o un número de teléfono donde podamos contactarle.",
    errMessage: "Por favor cuéntenos un poco qué quiere cambiar.",
    errSend:
      "No pudimos enviarlo en este momento. Por favor intente de nuevo en un momento.",
    errGeneric: "Algo salió mal de nuestro lado. Por favor intente de nuevo.",
  },
  footer: {
    tagline:
      "Sitios web, SEO local y Perfil de Negocio de Google para negocios locales.",
    servicesTitle: "Servicios",
    industriesTitle: "Industrias",
    companyTitle: "Empresa",
    remote: "Un equipo remoto que atiende a negocios de Texas.",
    poweredBy: "Una empresa Accentuate, con tecnología de BizBuzz.",
    rights: "Todos los derechos reservados.",
  },
  notFound: {
    title: "No encontramos esa página",
    text: "Es posible que la página se haya movido. Pruebe la página de inicio.",
    back: "Volver al inicio",
  },
};
