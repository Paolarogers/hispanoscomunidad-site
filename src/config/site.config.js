export const SITE = {
  name: 'Hispanos Comunidad',
  url: 'https://hispanoscomunidad.com',
  phone: '(864) 777-0003',
  whatsapp: '18648440777',
  email: 'hola@hispanoscomunidad.com',
  instagram: 'https://instagram.com/hispanoscomunidad',
  facebook: 'https://facebook.com/hispanoscomunidad',
  youtube: 'https://youtube.com/@hispanoscomunidad',
  defaultLang: 'es',
};

export const WHATSAPP = {
  general:    `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent('¡Hola! Necesito ayuda')}`,
  bonanza:    `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent('¡Hola! Me interesa un préstamo')}`,
  bonanzaTitle: `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent('¡Hola! Quiero info sobre préstamo sobre título')}`,
  zivo:       `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent('¡Hola! Necesito cotización de seguro de auto')}`,
  zivoCommercial: `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent('¡Hola! Necesito seguro comercial')}`,
  media:      `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent('¡Hola! Me interesa trabajar con HC Business & Media')}`,
  ruta:       `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent('¡Hola! Quiero inscribirme en Ruta Empresarial')}`,
  orbita:     `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent('¡Hola! Quiero ver la plataforma HC Business 360')}`,
  unidos:     `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent('¡Hola! Me interesa ser socio de Hispanics United')}`,
  events:     `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent('¡Hola! Quiero registrarme para el evento')}`,
};
