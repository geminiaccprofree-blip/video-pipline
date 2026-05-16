"use client";
import React, { useState, useEffect, useRef } from "react";
import { Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { TimelineItem } from "@/data/pipelineData";

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
  activePhaseId: number;
  onPhaseSelect: (id: number) => void;
}

export default function RadialOrbitalTimeline({
  timelineData,
  activePhaseId,
  onPhaseSelect,
}: RadialOrbitalTimelineProps) {
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-rotation logic
  useEffect(() => {
    let rotationTimer: any;
    if (autoRotate) {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => (prev + 0.15) % 360);
      }, 50);
    }
    return () => clearInterval(rotationTimer);
  }, [autoRotate]);

  // Center view on active node
  useEffect(() => {
    if (activePhaseId) {
      const index = timelineData.findIndex((item) => item.id === activePhaseId);
      if (index !== -1) {
        const totalNodes = timelineData.length;
        const targetAngle = (index / totalNodes) * 360;
        // Adjust rotation to bring active node to the front (270 degrees)
        setRotationAngle(270 - targetAngle);
        setAutoRotate(false);
      }
    } else {
      setAutoRotate(true);
    }
  }, [activePhaseId, timelineData]);

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 220; // Reduced radius to fit screen perfectly
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian);
    const y = radius * Math.sin(radian);

    // Dynamic z-index, scale, and opacity for a deep 3D effect
    const zIndex = Math.round(100 + 100 * Math.sin(radian));
    const scale = 0.7 + 0.5 * ((1 + Math.sin(radian)) / 2);
    const opacity = 0.3 + 0.7 * ((1 + Math.sin(radian)) / 2);

    return { x, y, angle, zIndex, scale, opacity };
  };

  return (
    <div
      className="relative w-full h-full flex items-center justify-center overflow-visible"
      ref={containerRef}
    >
      {/* Central Core */}
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", damping: 15 }}
        className="absolute w-28 h-28 rounded-full bg-gradient-to-br from-amber-400 via-orange-500 to-yellow-300 flex items-center justify-center z-10 shadow-[0_0_80px_rgba(245,158,11,0.4)] translate-y-[80px]"
      >
        <div className="absolute w-40 h-40 rounded-full border border-amber-500/10 animate-ping opacity-30"></div>
        <div className="w-16 h-16 rounded-full bg-black/50 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-inner">
            <Zap className="text-amber-400 fill-amber-400" size={28} />
        </div>
      </motion.div>

      {/* Orbit Rings (Subtle) */}
      {[520, 320].map((size, i) => (
        <div 
          key={size}
          className="absolute rounded-full border border-white/5 pointer-events-none translate-y-[80px]"
          style={{ width: `${size}px`, height: `${size}px`, opacity: 1 - i * 0.5 }}
        ></div>
      ))}

      {/* Nodes */}
      <div className="relative w-full h-full flex items-center justify-center overflow-visible translate-y-[80px]" style={{ perspective: "1500px" }}>
        {timelineData.map((item, index) => {
          const pos = calculateNodePosition(index, timelineData.length);
          const isActive = activePhaseId === item.id;
          const Icon = item.icon;

          return (
            <motion.div
              key={item.id}
              initial={false}
              animate={{
                x: pos.x,
                y: pos.y,
                scale: isActive ? 1.6 : pos.scale,
                opacity: isActive ? 1 : pos.opacity,
                zIndex: isActive ? 200 : pos.zIndex,
              }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="absolute cursor-pointer group"
              onClick={() => onPhaseSelect(item.id)}
            >
              {/* Connection Lines (Visual Polish) */}
              {isActive && (
                <motion.div 
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   className="absolute top-1/2 left-1/2 w-[260px] h-px bg-gradient-to-r from-amber-500/50 to-transparent origin-left -z-10"
                   style={{ transform: `rotate(${pos.angle + 180}deg)` }}
                />
              )}

              {/* Node Glow */}
              <div
                className={`absolute inset-0 rounded-full blur-2xl transition-opacity duration-500 ${
                  isActive ? "bg-amber-500/50 opacity-100" : "bg-white/10 opacity-0 group-hover:opacity-100"
                }`}
                style={{ width: "80px", height: "80px", left: "-20px", top: "-20px" }}
              ></div>

              {/* Node Circle */}
              <div
                className={`
                  w-12 h-12 rounded-full flex items-center justify-center
                  backdrop-blur-xl transition-all duration-300
                  ${
                    isActive
                      ? "bg-amber-500 text-black border-white shadow-[0_0_30px_rgba(245,158,11,0.6)]"
                      : "bg-white/5 text-white border-white/10 group-hover:border-amber-500/50 group-hover:bg-white/10"
                  }
                  border-2
                `}
              >
                <Icon size={20} className={isActive ? "animate-pulse" : ""} />
              </div>

              {/* Label - Improved Spacing & Contrast */}
              <AnimatePresence>
                {(isActive || pos.opacity > 0.8) && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`
                      absolute top-16 left-1/2 -translate-x-1/2 whitespace-nowrap
                      px-3 py-1 rounded-full text-[9px] font-black tracking-[0.2em] uppercase
                      ${isActive ? "text-amber-400 bg-amber-500/10 border border-amber-500/20" : "text-white/60"}
                    `}
                  >
                    {item.title}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
