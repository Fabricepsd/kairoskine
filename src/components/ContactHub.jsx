import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const SYSTEM_PROMPT_MARTINIQUE = `Tu es l'assistant virtuel de KAIROS KINÉ, le cabinet de kinésithérapie de Fabrice PONSODA situé au QG CrossFit Le Diamant (Martinique).

Ton rôle : répondre aux questions des patients de manière chaleureuse, claire et professionnelle. Tu parles uniquement en français.

INFORMATIONS SUR LE CABINET :
- Nom : KAIROS KINÉ
- Praticien : Fabrice PONSODA, kinésithérapeute
- Adresse : QG CrossFit, ZA Taupinier, Le Diamant, Martinique (97223)
- Téléphone / WhatsApp : +33 6 95 70 39 06
- Prise de rendez-vous : en ligne via Calendly (bouton "Prendre rendez-vous" sur le site)

SOINS ET TARIFS :
- Séance de kinésithérapie (thérapie manuelle + dry needling) : 70 €
- Massage thérapeutique (45 min) : 75 €
- Récupération sportive (45 min) : 75 €
- Massage relaxant 30 min : 45 € / 60 min : 80 €

SPÉCIALITÉS :
- Thérapie manuelle ostéo-articulaire (mobilisations, manipulations, relâchement myofascial)
- Dry needling / puncture sèche (traitement des points trigger musculaires)
- Massages thérapeutiques et relaxants
- Récupération sportive
- Prise en charge : douleurs musculaires, lombalgies, cervicalgies, blocages articulaires, tendinites, points trigger, récupération post-effort

PUBLIC : tout le monde est bienvenu — sportifs, actifs, sédentaires, seniors.

RÈGLES ET CONDITIONS (TRÈS IMPORTANT) :
- Le cabinet ne prend PAS d'ordonnances (pas de prescriptions médicales).
- Les séances sont hors convention : elles ne sont PAS remboursées par la Sécurité Sociale (CPAM).
- Les séances peuvent cependant être prises en charge (partiellement ou totalement) par la Mutuelle du patient avec présentation d'une facture.
- Ne jamais inventer d'informations médicales non listées ci-dessus.
- Pour toute question médicale spécifique, recommander de contacter Fabrice directement.
- Toujours proposer la prise de RDV en ligne ou par WhatsApp si pertinent.
- Utiliser "vous" avec les patients.
- Garder les réponses concises (3-5 phrases max sauf si nécessaire).`;

const SYSTEM_PROMPT_BRIGNAIS = `Tu es l'assistant virtuel de KAIROS KINÉ — cabinet de Brignais, de Fabrice PONSODA, kinésithérapeute spécialisé.

Ton rôle : répondre aux questions des patients de manière chaleureuse, claire et professionnelle. Tu parles uniquement en français.

INFORMATIONS SUR LE CABINET :
- Nom : KAIROS KINÉ — Brignais
- Praticien : Fabrice PONSODA, kinésithérapeute diplômé, titulaire d'un Master en Thérapie Manuelle Structurelle (Université Catholique de Louvain, Belgique)
- Adresse : 163 rue du Général de Gaulle, 69530 Brignais
- Téléphone : 06 95 70 39 06
- Prise de rendez-vous : via Doctolib

SPÉCIALITÉS :
- Thérapie manuelle structurelle (mobilisations, manipulations articulaires)
- Dry needling / puncture sèche (traitement des points trigger musculaires)
- Prise en charge ciblée des douleurs musculo-squelettiques aiguës et résistantes

PATHOLOGIES TRAITÉES :
- Cervicalgies et torticolis
- Névralgies cervico-brachiales (NCB)
- Tendinopathies (y compris résistantes au traitement classique)
- Sciatiques
- Lombalgies aiguës
- Raideurs post-blessure

CE QUE LE CABINET NE PREND PAS EN CHARGE :
- Post-opératoire / Pré-opératoire
- Neurologie
- Respiratoire
- Enfants
- Fibromyalgie
- Douleurs chroniques diffuses (sans diagnostic structurel clair)
- Entorses (phase aiguë inflammatoire)
- Rééducation périnéale / pelvi-périnéologie
- Kinésithérapie vestibulaire (vertiges)

TARIFS :
- Conventionné : ~17 € (remboursé Sécurité Sociale)
- Dépassement hors nomenclature (HN) : 30 € par séance
- Total par séance : ~47-50 €
- Le dépassement de 30 € couvre les techniques spécialisées (dry needling, thérapie manuelle avancée) et le temps de consultation individuelle (30 min, 1 patient à la fois)
- Ce dépassement peut être pris en charge par la mutuelle du patient. Recommander de vérifier avant la 1re consultation.

APPROCHE :
- Prise en charge individuelle : 1 patient / 30 minutes
- Protocole court : 5 à 8 séances maximum
- Réévaluation à la 5e séance : si amélioration < 30%, réorientation vers imagerie ou spécialiste
- Pas 3-4 patients simultanés comme en cabinet classique

ARGUMENT CLÉ (si le patient questionne le tarif) :
- Chez un kiné standard : ~20 séances × 22 € = 440 € total, ~100 € out-of-pocket, sur 2-3 mois
- Chez nous : ~6 séances × 47 € = 282 € total, ~180 € out-of-pocket, sur 3 semaines
- Différence réelle : 80 € de plus en reste à charge, mais 14 séances et 2 mois de moins

RÈGLES (TRÈS IMPORTANT) :
- Ne jamais inventer d'informations médicales non listées ci-dessus.
- Pour toute question médicale spécifique, recommander de contacter Fabrice directement.
- Toujours proposer la prise de RDV via Doctolib si pertinent.
- Utiliser "vous" avec les patients.
- Garder les réponses concises (3-5 phrases max sauf si nécessaire).
- Si on te demande des infos sur le cabinet de Martinique, préciser que cette page concerne le cabinet de Brignais.`;

const WHATSAPP_NUMBER = '33695703906';
const WHATSAPP_MESSAGE = encodeURIComponent('Bonjour Fabrice, je vous contacte depuis votre site KAIROS KINÉ. ');
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

/**
 * Sends chat messages to our serverless API route (/api/chat)
 * The API key stays server-side — never exposed to the browser.
 */
const sendChatMessage = async (messages, systemPrompt) => {
    const history = [
        { role: 'system', content: systemPrompt },
        ...messages.map((m) => ({
            role: m.role === 'assistant' ? 'assistant' : 'user',
            content: m.content,
        })),
    ];

    const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
    });

    if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData?.error || `Erreur ${res.status}`);
    }
    const data = await res.json();
    return data.reply || "Je n'ai pas pu répondre. Veuillez réessayer.";
};

const ContactHub = () => {
    const location = useLocation();
    const isBrignais = location.pathname === '/brignais';
    const systemPrompt = isBrignais ? SYSTEM_PROMPT_BRIGNAIS : SYSTEM_PROMPT_MARTINIQUE;

    // UI States
    const [menuOpen, setMenuOpen] = useState(false);
    const [chatOpen, setChatOpen] = useState(false);

    const greeting = isBrignais
        ? 'Bonjour ! Je suis l\'assistant KAIROS KINÉ — Brignais. Comment puis-je vous aider ? (tarifs, approche, rendez-vous…)'
        : 'Bonjour ! Je suis l\'assistant KAIROS KINÉ. Comment puis-je vous aider ? (tarifs, soins, rendez-vous…)';

    // Chat States
    const [messages, setMessages] = useState([
        { role: 'assistant', content: greeting },
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const bottomRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        if (chatOpen) {
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [chatOpen]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, loading]);

    const sendMessage = async () => {
        if (!input.trim() || loading) return;

        const userMsg = { role: 'user', content: input.trim() };
        const newMessages = [...messages, userMsg];
        setMessages(newMessages);
        setInput('');
        setLoading(true);
        setError(null);

        try {
            const reply = await sendChatMessage(newMessages, systemPrompt);
            setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
        } catch (e) {
            setError(e.message || 'Erreur de connexion. Veuillez réessayer.');
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-3">
            {/* Chat panel */}
            <AnimatePresence>
                {chatOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 16, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 16, scale: 0.96 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="w-[340px] sm:w-[380px] flex flex-col shadow-2xl border border-white/10 overflow-hidden mb-2"
                        style={{
                            background: 'rgba(18,18,18,0.97)',
                            backdropFilter: 'blur(20px)',
                            clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)',
                            maxHeight: '480px',
                        }}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-4 py-3 border-b border-white/8"
                            style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.12), rgba(212,175,55,0.04))' }}
                        >
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="size-8 rounded-full bg-gradient-to-br from-gold/30 to-gold/10 flex items-center justify-center text-sm">
                                        ✦
                                    </div>
                                    <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full bg-emerald-400 border border-anthracite" />
                                </div>
                                <div>
                                    <p className="text-off-white text-xs font-semibold tracking-wide">KAIROS KINÉ — Assistant</p>
                                    <p className="text-off-white/40 text-[10px]">Répond en quelques secondes</p>
                                </div>
                            </div>
                            <button onClick={() => setChatOpen(false)} className="text-off-white/40 hover:text-off-white transition-colors text-lg leading-none">×</button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ maxHeight: '300px' }}>
                            {messages.map((msg, i) => (
                                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div
                                        className={`max-w-[80%] text-xs leading-relaxed px-3 py-2 rounded-lg ${msg.role === 'user'
                                            ? 'bg-gold/20 text-off-white border border-gold/20'
                                            : 'bg-white/5 text-off-white/80 border border-white/8'
                                            }`}
                                    >
                                        {msg.content}
                                    </div>
                                </div>
                            ))}

                            {loading && (
                                <div className="flex justify-start">
                                    <div className="bg-white/5 border border-white/8 px-3 py-2 rounded-lg flex gap-1.5 items-center">
                                        {[0, 1, 2].map((i) => (
                                            <motion.span
                                                key={i}
                                                animate={{ opacity: [0.3, 1, 0.3] }}
                                                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                                                className="size-1.5 rounded-full bg-gold/60"
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {error && (
                                <p className="text-red-400/80 text-[10px] text-center">{error}</p>
                            )}

                            <div ref={bottomRef} />
                        </div>

                        {/* Input */}
                        <div className="p-3 border-t border-white/8">
                            <div className="flex gap-2 items-center">
                                <input
                                    ref={inputRef}
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Votre question…"
                                    className="flex-1 bg-white/5 border border-white/10 text-off-white text-xs px-3 py-2.5 outline-none focus:border-gold/30 transition-colors placeholder:text-off-white/25"
                                    style={{ clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 0 100%)' }}
                                />
                                <button
                                    onClick={sendMessage}
                                    disabled={loading || !input.trim()}
                                    className="bg-gold/90 hover:bg-gold disabled:opacity-40 disabled:cursor-not-allowed text-deep-black text-xs px-3 py-2.5 font-semibold transition-colors shrink-0"
                                    style={{ clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 0 100%)' }}
                                >
                                    →
                                </button>
                            </div>
                            <p className="text-off-white/20 text-[9px] mt-2 text-center">Propulsé par Gemini AI · KAIROS KINÉ</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hub Menu (Speed Dial) */}
            <AnimatePresence>
                {menuOpen && !chatOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 10 }}
                        transition={{ duration: 0.15 }}
                        className="flex flex-col gap-3 mb-2 origin-bottom-right"
                    >
                        {/* WhatsApp Option */}
                        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center justify-end gap-3 group">
                            <span className="bg-anthracite border border-white/10 text-off-white text-xs px-3 py-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                Écrire sur WhatsApp
                            </span>
                            <div className="size-12 rounded-full flex items-center justify-center shadow-lg bg-[#25D366] text-white hover:scale-110 transition-transform">
                                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                            </div>
                        </a>

                        {/* Chat Option */}
                        <button onClick={() => { setChatOpen(true); setMenuOpen(false); }} className="flex items-center justify-end gap-3 group">
                            <span className="bg-anthracite border border-white/10 text-off-white text-xs px-3 py-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                Assistant IA
                            </span>
                            <div className="size-12 rounded-full flex items-center justify-center shadow-lg text-deep-black hover:scale-110 transition-transform" style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #B8960C 100%)' }}>
                                <span className="text-xl">✦</span>
                            </div>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Toggle Button */}
            {!chatOpen && (
                <motion.button
                    onClick={() => setMenuOpen((v) => !v)}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    animate={!menuOpen ? { y: [0, -4, 0] } : {}}
                    transition={!menuOpen ? { duration: 3, repeat: Infinity, ease: 'easeInOut' } : {}}
                    className="size-14 rounded-full flex items-center justify-center shadow-lg relative bg-anthracite border border-white/10"
                    aria-label="Options de contact"
                >
                    <AnimatePresence mode="wait">
                        {menuOpen ? (
                            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} className="text-off-white text-xl font-light">
                                ×
                            </motion.span>
                        ) : (
                            <motion.svg key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} className="w-6 h-6 text-off-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                            </motion.svg>
                        )}
                    </AnimatePresence>

                    {/* Notification dot */}
                    {!menuOpen && (
                        <motion.span
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute -top-0.5 -right-0.5 size-3 rounded-full bg-emerald-400 border-2 border-deep-black"
                        />
                    )}
                </motion.button>
            )}
        </div>
    );
};

export default ContactHub;
