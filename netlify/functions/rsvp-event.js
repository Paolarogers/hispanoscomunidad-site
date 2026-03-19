exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  try {
    const data = JSON.parse(event.body);
    const { name, phone, email, lang, eventId, eventTitle, eventDate, eventLocation } = data;

    if (!name || !phone || !eventId) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Missing required fields' }) };
    }

    const cleanPhone = phone.replace(/\D/g, '');

    // ── 1. CREATE ZOHO CRM LEAD ──
    // Zoho OAuth token refresh then create lead
    const zohoTokenRes = await fetch('https://accounts.zoho.com/oauth/v2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        client_id: process.env.ZOHO_CLIENT_ID,
        client_secret: process.env.ZOHO_CLIENT_SECRET,
        refresh_token: process.env.ZOHO_REFRESH_TOKEN,
      }),
    });
    const { access_token } = await zohoTokenRes.json();

    if (access_token) {
      await fetch('https://www.zohoapis.com/crm/v2/Leads', {
        method: 'POST',
        headers: {
          'Authorization': `Zoho-oauthtoken ${access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: [{
            Last_Name: name,
            Phone: phone,
            Email: email || '',
            Lead_Source: 'Event RSVP',
            Description: `Event: ${eventTitle} · Date: ${eventDate} · Location: ${eventLocation} · Lang: ${lang}`,
            Lead_Status: 'New',
            Owner: { email: 'hola@hispanoscomunidad.com' },
          }],
        }),
      });
    }

    // ── 2. SEND WHATSAPP CONFIRMATION VIA RINGCENTRAL ──
    if (process.env.RINGCENTRAL_JWT && cleanPhone.length >= 10) {
      const rcTokenRes = await fetch('https://platform.ringcentral.com/restapi/oauth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${Buffer.from(`${process.env.RINGCENTRAL_CLIENT_ID}:${process.env.RINGCENTRAL_CLIENT_SECRET}`).toString('base64')}`,
        },
        body: new URLSearchParams({
          grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
          assertion: process.env.RINGCENTRAL_JWT,
        }),
      });
      const { access_token: rcToken } = await rcTokenRes.json();

      if (rcToken) {
        const confirmMsg = lang === 'es'
          ? `¡Hola ${name}! ✅ Tu lugar está reservado para *${eventTitle}*.\n\n📅 Fecha: ${eventDate}\n📍 Lugar: ${eventLocation}\n\nTe recordaremos el día anterior. ¡Nos vemos! — Equipo HC`
          : `Hi ${name}! ✅ Your spot is reserved for *${eventTitle}*.\n\n📅 Date: ${eventDate}\n📍 Location: ${eventLocation}\n\nWe will remind you the day before. See you there! — HC Team`;

        await fetch(`https://platform.ringcentral.com/restapi/v1.0/account/~/extension/~/sms`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${rcToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: { phoneNumber: process.env.RINGCENTRAL_FROM_NUMBER },
            to: [{ phoneNumber: `+1${cleanPhone}` }],
            text: confirmMsg,
          }),
        });
      }
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, message: 'RSVP confirmed' }),
    };

  } catch (err) {
    console.error('RSVP error:', err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Server error — please try WhatsApp instead' }),
    };
  }
};
