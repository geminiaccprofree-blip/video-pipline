"use client";
import React, { useState, useEffect } from "react";
import { Zap, Copy, Check, ChevronRight, RotateCcw, ArrowLeft, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

interface PhaseContentProps {
  phaseId: number;
  onComplete: (phaseId: number) => void;
}

export default function PhaseContent({ phaseId, onComplete }: PhaseContentProps) {
  const [selections, setSelections] = useState<{ [key: string]: string }>({});
  const [inputs, setInputs] = useState<{ [key: number]: string }>({});
  const [outputs, setOutputs] = useState<{ [key: number]: string }>({});
  const [history, setHistory] = useState<any[]>([]);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    setCopied(false);
  }, [phaseId]);

  const saveToHistory = () => {
    setHistory([...history, { selections: { ...selections }, inputs: { ...inputs }, outputs: { ...outputs } }]);
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const previous = history[history.length - 1];
    setSelections(previous.selections);
    setInputs(previous.inputs);
    setOutputs(previous.outputs);
    setHistory(history.slice(0, -1));
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generatePrompt = () => {
    saveToHistory();
    let prompt = "";
    // ... generation logic remains the same (Architect's domain) ...
    if (phaseId === 1) {
      if (!selections.q1 || !selections.q2 || !selections.q3 || !selections.q4) return;
      prompt = `You are a YouTube strategist for faceless cinematic finance channels.\n\nMY CHANNEL:\nNiche: Personal Finance | Style: Faceless cinematic\nEarning: AdSense + Affiliate + Digital products | Platform: Shorts only\n\nQ1. AUDIENCE: ${selections.q1}\nQ2. PURPOSE:  ${selections.q2}\nQ3. AFFILIATE: ${selections.q3}\nQ4. HOOK STYLE: ${selections.q4}\n\nGenerate 5 video ideas. STRICT RULES:\n- No get rich quick angles\n- No income promises in titles\n- Sort by strongest hook first\n\nFor EACH idea use EXACTLY this format:\n\nIDEA [NUMBER]\n─────────────────────────\nTITLE: [Max 60 chars. Curiosity gap or counter-intuitive. No clickbait.]\nUNIQUE ANGLE: [What most finance channels miss]\nEMOTION TRIGGER: [fear / hope / shock / curiosity / anger / relief]\nHOOK QUESTION: [The one question viewer desperately needs answered]\nAFFILIATE PRODUCT: [Specific product fitting naturally as story element]\n─────────────────────────`;
    } else if (phaseId === 2) {
      prompt = `You are a cinematic scriptwriter for finance YouTube Shorts.\n\nVideo idea from Phase 1:\n${inputs[2]}\n\nFormat: Shorts (40-55 seconds). Build structure only. No script yet.\n\nSTEP 1 — FRAME SELECTION\nSelect the best frame from these 5. State which frame you selected. State why in one sentence.\n\nFRAME 1 — AGITATE & SOLVE: Hook → Pain → Agitate → Solve → CTA\nFRAME 2 — PROBLEM/SOLUTION: Hook → Problem → Insight → Payoff + CTA\nFRAME 3 — MYTH BUST: Hook → False Belief → Reality → New Action + CTA\nFRAME 4 — PERSPECTIVE FLIP: Hook → Current View → Flip → New View + CTA\nFRAME 5 — EMOTIONAL MIRROR: Hook → Mirror → Validate → Direction + CTA\n\nSTEP 2 — STRUCTURE OUTPUT\nRules: Total video 40-55 seconds. Every section minimum 5 seconds. Hook maximum 3 seconds.\nCTA always inside final section — never standalone.\n\nOutput exactly this format for each section:\n[SECTION NAME]\n─────────────────────────\nContent direction: [What this section must accomplish — one line only]\nViewer feeling: [What viewer feels — one word only]\n─────────────────────────\nMICRO CTA — inside final section:\n[Choose: "Follow for more" / "Link in bio" / "Comment [word] if [relevant]"]`;
    } else if (phaseId === 3) {
      prompt = `You are a voiceover scriptwriter for finance YouTube Shorts.\n\nScript structure from Phase 2:\n${inputs[3]}\n\nFormat: Shorts (40-55 seconds) | Word limit: 85-135 words\n\nTONE RULE (decided by Purpose — never override):\nWARN → Direct. Urgent. No softening.\nMENTOR → Conversational. Clear. Friendly.\nCORRECT → Confident. Calm. Authoritative.\nSHIFT → Philosophical. Slow. Deliberate.\nVALIDATE → Empathetic. Warm. Then direct.\n\nWRITING RULES:\n- Write section by section following selected frame order exactly\n- Each section: minimum 1 sentence, maximum 3 sentences\n- Every sentence: under 12 words\n- Zero filler phrases. Zero filler words.\n- First word: powerful noun or number (never "So", "Hey", "Okay", "Basically")\n- Maximum one [PAUSE] — use only after most shocking line\n- Every statistic must be tagged [VERIFY] — no exceptions\n- No income promises. No specific investment advice.\n\nOUTPUT: Label every section by frame section name. Word count at end.`;
    } else if (phaseId === 4) {
      prompt = `You are a cinematic director for AI-generated finance content.\n\nVoiceover script from Phase 3:\n${inputs[4]}\n\nLOCKED VISUAL IDENTITY — NEVER CHANGE:\nColors: Deep navy blue, charcoal black | Accent: Gold/amber only\nForbidden: Bright red, neon, pure white backgrounds\nLighting: High contrast dramatic shadows\nStyle: Cinematic realism — not cartoon, not bright, not corporate\n\nCHARACTER RULE: Human figures allowed. Face NEVER visible — hidden by shadow, hood, or angle. Clothing: dark charcoal/navy only. Accent: gold only.\n\nCAMERA MOVEMENTS (Dynamic & Premium):\nWARN → snap-zoom / FPV drop shot / aggressive dolly zoom (vertigo) / low angle tracking\nMENTOR → smooth orbital tracking / parallax slide / seamless zoom-through\nCORRECT → macro-to-wide pullout / kinetic speed-ramp (fast-to-slow) / dynamic orbital pan\nSHIFT → hyper-lapse sequence / infinite zoom-through / dynamic drone tracking\nVALIDATE → intimate handheld organic motion / cinematic rack focus / soft focus pull\n\nTRANSITIONS ALLOWED: Match-cuts, whip-pans, seamless zoom-throughs, kinetic masking. NO cheesy flash or generic cross-dissolves.\n\nFor EACH scene output exactly:\nSCENE [N]\n━━━━━━━━━━━━━━━━━━━━━━━━━\nVOICEOVER: [Exact words]\nVISUAL SUBJECT: [ONE subject — no face if human, no literal money]\nSETTING: [Specific environment with financial weight or emotional metaphor]\nCAMERA MOVEMENT: [One from allowed list]\nLIGHTING: [Specific — not just "dark"]\nCOLOR APPLICATION: [How navy/charcoal/gold appear dramatically]\nMOTION ELEMENT: [Floating particles / light rays / data streams — premium 3D]\nMOOD: [One word]\nTRANSITION TO NEXT SCENE: [From allowed list]\nSTANDALONE VERIFICATION: [Yes/No]\n━━━━━━━━━━━━━━━━━━━━━━━━━`;
    } else if (phaseId === 5) {
      prompt = `You are an AI video prompt engineer for Veo 3 with integrated voiceover.\n\nScene breakdown from Phase 4:\n${inputs[5]}\n\nLOCKED VOICE SETTINGS — NEVER CHANGE:\nVoice tone: calm and authoritative, documentary narrator style\nVoice gender: male | Voice pace: slow and deliberate\nMusic tone: tense cinematic\n\nFor EACH scene generate exactly:\nSCENE [N] — COMPLETE PACKAGE\n━━━━━━━━━━━━━━━━━━━━━━━━━\nVEO 3 PROMPT (max 75 words):\nVISUAL: [ONE subject — no face if human, no literal money] + [specific action or stillness] + [setting with financial weight] + [specific lighting] + [camera movement from Phase 4]\nAUDIO:\nAmbient: [one subtle background sound — must not compete with voiceover]\nVoiceover: "[Paste exact words from this scene]"\nVoice tone: calm and authoritative. Voice gender: male. Voice pace: slow and deliberate.\nMusic: tense cinematic. Background only. Never louder than voiceover.\nSTYLE:\nVertical 9:16, Shot on RED V-Raptor 8K, Unreal Engine 5 render aesthetic, volumetric lighting, global illumination, deep navy and charcoal tones, gold amber accent light, high contrast dramatic shadows, silky smooth 60fps, dynamic motion blur, hyper-detailed textures, cinematic, no text, no watermarks.\n━━━━━━━━━━━━━━━━━━━━━━━━━`;
    } else if (phaseId === 6) {
      prompt = `You are a still image prompt engineer for Nano image generation.\n\nVeo 3 prompts from Phase 5:\n${inputs[6]}\n\nVisual style locked: Deep navy and charcoal tones, gold amber accent light, high contrast dramatic shadows, cinematic, vertical 9:16.\nCHARACTER RULE: Face NEVER visible — shadow/hood/angle. Dark charcoal/navy clothing. Gold accent only.\n\nFor EVERY scene generate TWO still image prompts:\n\nSCENE [N] — FRAME PACKAGE\n━━━━━━━━━━━━━━━━━━━━━━━━━\nFIRST FRAME — NANO PROMPT:\n"Photorealistic still, [exact subject from Phase 4], [exact lighting], [exact camera angle], [one anchoring visual detail — specific], [if human: face hidden, dark charcoal/navy clothing, gold accent], 8k resolution, raw photography, ultra-sharp focus, award-winning composition, Unreal Engine 5 render aesthetic, volumetric lighting, global illumination, deep navy and charcoal tones, gold amber accent light, high contrast dramatic shadows, hyper-detailed textures, cinematic, no text, no watermarks, vertical 9:16"\n\nLAST FRAME — NANO PROMPT:\n"Photorealistic still, [subject at camera movement END position], [same lighting unless Phase 4 specifies shift], [angle at movement end], [specific visual detail that carries into NEXT scene's first frame — be exact], [if human: face hidden, dark charcoal/navy clothing, gold accent], 8k resolution, raw photography, ultra-sharp focus, award-winning composition, Unreal Engine 5 render aesthetic, volumetric lighting, global illumination, deep navy and charcoal tones, gold amber accent light, high contrast dramatic shadows, hyper-detailed textures, cinematic, no text, no watermarks, vertical 9:16"\n\nBRIDGE ELEMENT: [One concrete object or light condition shared between this scene's last frame and next scene's first frame]\n━━━━━━━━━━━━━━━━━━━━━━━━━\nFINAL SCENE NOTE: Match last frame to Scene 1 first frame — visual circle complete.`;
    }

    setOutputs({ ...outputs, [phaseId]: prompt });
    onComplete(phaseId);
  };

  const selectOption = (q: string, value: string) => {
    saveToHistory();
    setSelections({ ...selections, [q]: value });
  };

  // Agent B (Designer): Fluid typography constraints
  const titleText = phaseId === 1 ? "Strategy Protocol" : 
                    phaseId === 2 ? "Logic Flow" : 
                    phaseId === 3 ? "Narrative Script" : 
                    phaseId === 4 ? "Visual Direction" : 
                    phaseId === 5 ? "Video Synthesis" : "Frame Architecture";

  const subtitleText = phaseId === 1 ? "Initialize AI reasoning engine." : 
                       phaseId === 2 ? "Architect narrative flow." : 
                       phaseId === 3 ? "Generate high-retention script." : 
                       phaseId === 4 ? "Translate to cinematic visuals." : 
                       phaseId === 5 ? "Synthesize AI video prompts." : "Engineer looping frame prompts.";

  return (
    <div className="w-full max-w-4xl mx-auto pb-40 px-2 md:px-0">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-16">
        <div className="space-y-1">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500 tracking-tight">
                {titleText}
            </h2>
            <p className="text-amber-500/80 text-[10px] md:text-sm font-black uppercase tracking-[0.3em]">{subtitleText}</p>
        </div>
        
        {/* Undo Button - Designer refined for better visibility and mobile safety */}
        <Button 
            variant="outline" 
            size="sm" 
            disabled={history.length === 0}
            onClick={handleUndo}
            className="flex-shrink-0 border-white/10 bg-white/5 hover:bg-amber-500 hover:text-black transition-all group rounded-xl px-4 py-6"
        >
            <History size={16} className="mr-2 group-hover:rotate-[-45deg] transition-transform text-amber-500 group-hover:text-black" />
            <span className="text-[10px] font-black uppercase tracking-widest">Undo Action</span>
        </Button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
            key={phaseId}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="space-y-12"
        >
          {phaseId === 1 ? (
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10">
                {[
                    { q: 'q1', label: 'Audience Psychographic', opts: [{l:'Salary Stress',i:'💸'}, {l:'Analysis Paralysis',i:'🧊'}, {l:'The Skeptic',i:'🔥'}] },
                    { q: 'q2', label: 'Mission Purpose', opts: [{l:'Warn',i:'⚠️'}, {l:'Mentor',i:'🧭'}, {l:'Correct',i:'💥'}, {l:'Shift',i:'🌀'}] },
                    { q: 'q3', label: 'Monetization Axis', opts: [{l:'Apps',i:'📱'}, {l:'Books',i:'📚'}, {l:'Courses',i:'🎓'}] },
                    { q: 'q4', label: 'Neural Hook', opts: [{l:'Fear',i:'😨'}, {l:'Curiosity',i:'🔍'}, {l:'Shock',i:'⚡'}, {l:'Relatable',i:'🪞'}] }
                ].map(group => (
                    <div key={group.q} className="space-y-4">
                        <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-white/30 pl-1">{group.label}</h4>
                        <div className="space-y-3">
                            {group.opts.map(opt => (
                                <button 
                                    key={opt.l}
                                    onClick={() => selectOption(group.q, opt.l)}
                                    className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-300 flex items-center justify-between group ${selections[group.q] === opt.l ? 'border-amber-500 bg-amber-500/10 shadow-[0_0_20px_rgba(245,158,11,0.15)]' : 'border-white/5 bg-white/5 hover:border-white/10'}`}
                                >
                                    <div className="flex items-center space-x-4">
                                        <span className="text-2xl group-hover:scale-125 transition-transform">{opt.i}</span>
                                        <span className="font-bold text-sm tracking-wide">{opt.l}</span>
                                    </div>
                                    {selections[group.q] === opt.l && <Check size={16} className="text-amber-500" />}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
             </div>
          ) : (
            <div className="space-y-6">
                <div className="flex justify-between items-end pr-2">
                    <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-white/30">System Input Buffer</h4>
                    <span className="text-[8px] font-bold text-amber-500/40 uppercase tracking-widest">Awaiting Data Transfer...</span>
                </div>
                <div className="relative group">
                    <textarea 
                        className="w-full h-64 md:h-80 bg-black/50 border-2 border-white/5 rounded-[2rem] p-8 text-white focus:border-amber-500/40 outline-none transition-all font-sans text-base leading-relaxed resize-none shadow-inner"
                        placeholder="Paste ChatGPT results here for next-phase transformation..."
                        value={inputs[phaseId] || ""}
                        onChange={(e) => setInputs({ ...inputs, [phaseId]: e.target.value })}
                    />
                    <div className="absolute top-6 right-6 w-10 h-10 rounded-full border border-white/5 flex items-center justify-center opacity-20 group-focus-within:opacity-100 transition-opacity">
                        <RotateCcw size={14} className="text-amber-500" />
                    </div>
                </div>
            </div>
          )}

          <Button 
            className="w-full h-20 rounded-[1.5rem] btn-gold text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] shadow-[0_20px_40px_rgba(245,158,11,0.15)] disabled:opacity-20"
            disabled={phaseId === 1 ? (!selections.q1 || !selections.q2 || !selections.q3 || !selections.q4) : !inputs[phaseId]}
            onClick={generatePrompt}
          >
            Compute AI Protocol 0{phaseId}
          </Button>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {outputs[phaseId] && (
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-24 p-10 rounded-[2.5rem] glass-panel border-amber-500/30 relative overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>
                
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
                    <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                            <Zap size={18} className="text-amber-500" />
                        </div>
                        <div>
                            <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-amber-500">Neural Matrix Ready</span>
                            <span className="text-[8px] font-bold text-white/40 uppercase tracking-[0.1em]">Verified by FinanceStudio v4.0</span>
                        </div>
                    </div>
                    <Button 
                        onClick={() => handleCopy(outputs[phaseId])}
                        className={`h-12 px-6 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${copied ? 'bg-green-500 text-white' : 'bg-amber-500/10 text-amber-500 border border-amber-500/20 hover:bg-amber-500 hover:text-black'}`}
                    >
                        {copied ? <Check size={14} className="mr-2" /> : <Copy size={14} className="mr-2" />}
                        {copied ? "Encrypted to Clipboard" : "Capture Protocol"}
                    </Button>
                </div>
                
                <textarea 
                    readOnly 
                    className="w-full h-96 bg-transparent text-sm md:text-base font-mono text-amber-100/70 leading-relaxed outline-none resize-none custom-scrollbar"
                    value={outputs[phaseId]}
                />
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
