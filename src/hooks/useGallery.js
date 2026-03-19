import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../config/supabase.js';

function getSessionId() {
  let id = sessionStorage.getItem('hc-session');
  if (!id) {
    id = Math.random().toString(36).slice(2) + Date.now().toString(36);
    sessionStorage.setItem('hc-session', id);
  }
  return id;
}

export function useGallery(category = 'all') {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPhotos() {
      setLoading(true);
      try {
        let query = supabase
          .from('gallery_photos')
          .select('*')
          .eq('published', true)
          .order('event_date', { ascending: false });

        if (category !== 'all') {
          query = query.eq('category', category);
        }

        const { data, error } = await query;
        if (error) throw error;
        setPhotos(data || []);
      } catch (err) {
        console.error('Gallery fetch error:', err);
        setError(err);
        setPhotos(SAMPLE_PHOTOS);
      } finally {
        setLoading(false);
      }
    }
    fetchPhotos();
  }, [category]);

  return { photos, loading, error };
}

export function useReactions(photoId) {
  const [reactions, setReactions] = useState({});
  const [flags, setFlags] = useState({});
  const [myReactions, setMyReactions] = useState(new Set());
  const [myFlags, setMyFlags] = useState(new Set());
  const sessionId = getSessionId();

  const fetchCounts = useCallback(async () => {
    if (!photoId) return;
    try {
      const [{ data: rData }, { data: fData }] = await Promise.all([
        supabase.from('gallery_reactions').select('reaction_id').eq('photo_id', photoId),
        supabase.from('gallery_flags').select('country_id').eq('photo_id', photoId),
      ]);

      const rCounts = {};
      (rData || []).forEach(r => { rCounts[r.reaction_id] = (rCounts[r.reaction_id] || 0) + 1; });
      setReactions(rCounts);

      const fCounts = {};
      (fData || []).forEach(f => { fCounts[f.country_id] = (fCounts[f.country_id] || 0) + 1; });
      setFlags(fCounts);

      const myR = new Set((rData || []).filter(r => r.session_id === sessionId).map(r => r.reaction_id));
      const myF = new Set((fData || []).filter(f => f.session_id === sessionId).map(f => f.country_id));
      setMyReactions(myR);
      setMyFlags(myF);
    } catch (err) {
      console.error('Reaction fetch error:', err);
    }
  }, [photoId, sessionId]);

  useEffect(() => { fetchCounts(); }, [fetchCounts]);

  const toggleReaction = useCallback(async (reactionId) => {
    if (!photoId) return;
    const isActive = myReactions.has(reactionId);

    setMyReactions(prev => {
      const next = new Set(prev);
      isActive ? next.delete(reactionId) : next.add(reactionId);
      return next;
    });
    setReactions(prev => ({
      ...prev,
      [reactionId]: Math.max(0, (prev[reactionId] || 0) + (isActive ? -1 : 1))
    }));

    try {
      if (isActive) {
        await supabase.from('gallery_reactions')
          .delete()
          .eq('photo_id', photoId)
          .eq('reaction_id', reactionId)
          .eq('session_id', sessionId);
      } else {
        await supabase.from('gallery_reactions')
          .insert({ photo_id: photoId, reaction_id: reactionId, session_id: sessionId });
      }
    } catch (err) {
      console.error('Reaction toggle error:', err);
      fetchCounts();
    }
  }, [photoId, myReactions, sessionId, fetchCounts]);

  const toggleFlag = useCallback(async (countryId) => {
    if (!photoId) return;
    const isActive = myFlags.has(countryId);

    setMyFlags(prev => {
      const next = new Set(prev);
      isActive ? next.delete(countryId) : next.add(countryId);
      return next;
    });
    setFlags(prev => ({
      ...prev,
      [countryId]: Math.max(0, (prev[countryId] || 0) + (isActive ? -1 : 1))
    }));

    try {
      if (isActive) {
        await supabase.from('gallery_flags')
          .delete()
          .eq('photo_id', photoId)
          .eq('country_id', countryId)
          .eq('session_id', sessionId);
      } else {
        await supabase.from('gallery_flags')
          .insert({ photo_id: photoId, country_id: countryId, session_id: sessionId });
      }
    } catch (err) {
      console.error('Flag toggle error:', err);
      fetchCounts();
    }
  }, [photoId, myFlags, sessionId, fetchCounts]);

  const totalReactions = Object.values(reactions).reduce((a, b) => a + b, 0)
    + Object.values(flags).reduce((a, b) => a + b, 0);

  return { reactions, flags, myReactions, myFlags, toggleReaction, toggleFlag, totalReactions };
}

const SAMPLE_PHOTOS = [
  {
    id: 'sample-1',
    photo_url: '/images/community/health-days/placeholder.jpg',
    caption_es: 'Día de salud con Bon Secours en Cherrydale.',
    caption_en: 'Health day with Bon Secours in Cherrydale.',
    location: 'Cherrydale · Greenville, SC',
    category: 'health',
    event_date: '2026-02-15',
  },
  {
    id: 'sample-2',
    photo_url: '/images/community/workshops/placeholder.jpg',
    caption_es: 'Graduación de Ruta Empresarial — Clase de Invierno 2026.',
    caption_en: 'Ruta Empresarial Graduation — Winter 2026 Cohort.',
    location: 'Sede Principal · Laurens Rd',
    category: 'workshops',
    event_date: '2026-01-20',
  },
];
