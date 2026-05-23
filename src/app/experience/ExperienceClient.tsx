"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowRight, Clock, MapPin, Factory, Award, CheckCircle2, Globe, Flame, Settings, Zap, Cpu, Database, Beaker, Mail, Microscope
} from "lucide-react";
import { FadeIn } from "@/components/Animations";
import { useRole } from "@/lib/RoleContext";
import { experiencePage as dict, shared, getFontClass, isRtl } from "@/lib/i18n";

// Map domain icons
const techIcons: Record<string, any> = {
  "H₂SO₄": Flame,
  "H₃PO₄": Settings,
  "K₂SO₄": Zap,
  "NPK": Cpu,
  "MgSO₄": Database,
  "SSP": Award,
};

function HoverWords({ text, locale, isGradient = false }: { text: string; locale: string; isGradient?: boolean }) {
  const isChinese = locale === "zh";
  const words = isChinese ? text.split("") : text.split(" ");

  return (
    <>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className={`inline-block origin-center ${isChinese ? "" : "mr-[0.28em] rtl:mr-0 rtl:ml-[0.28em]"
            } ${isGradient
              ? "bg-clip-text text-transparent bg-gradient-to-r from-gold via-gold-light to-gold font-black"
              : ""
            }`}
          whileHover={{
            scale: 1.08,
            y: -3,
            filter: isGradient ? "drop-shadow(0 0 8px rgba(229, 193, 88, 0.6))" : "drop-shadow(0 0 8px rgba(255, 255, 255, 0.4))",
            color: isGradient ? undefined : "#f3e1b3",
            transition: { type: "spring", stiffness: 350, damping: 10 }
          }}
        >
          {word}
        </motion.span>
      ))}
    </>
  );
}

function HoverSubcopy({ text, locale }: { text: string; locale: string }) {
  const isChinese = locale === "zh";
  const words = isChinese ? text.split("") : text.split(" ");

  return (
    <>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className={`inline-block origin-center ${isChinese ? "" : "mr-[0.25em] rtl:mr-0 rtl:ml-[0.25em]"
            }`}
          whileHover={{
            scale: 1.04,
            y: -1,
            color: "#ffffff",
            textShadow: "0 0 4px rgba(255, 255, 255, 0.2)",
            transition: { type: "spring", stiffness: 300, damping: 12 }
          }}
        >
          {word}
        </motion.span>
      ))}
    </>
  );
}

function InteractiveMap({ 
  locale, 
  rtl,
  hoveredIdx,
  setHoveredIdx
}: { 
  locale: string; 
  rtl: boolean;
  hoveredIdx: number | null;
  setHoveredIdx: (idx: number | null) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isEn = locale === "en";
  const pinCoordsRef = useRef<{ x: number; y: number; visible: boolean }[]>([]);
  const hoveredIdxRef = useRef(hoveredIdx);

  useEffect(() => {
    hoveredIdxRef.current = hoveredIdx;
  }, [hoveredIdx]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let localLambda = 0;
    let animationFrameId: number;

    // Generate land points for a dotted 3D world map representation
    const landPoints: { lat: number; lon: number }[] = [];
    const CONTINENTS = [
      { clat: 10, clon: 20, r: 24 },    // Africa
      { clat: 50, clon: 15, r: 18 },    // Europe
      { clat: 40, clon: 85, r: 35 },    // Asia
      { clat: -18, clon: -60, r: 24 },  // South America
      { clat: 42, clon: -95, r: 28 },   // North America
      { clat: -25, clon: 135, r: 16 },  // Australia
      { clat: 22, clon: 45, r: 12 },    // Middle East / Arabia
      { clat: 28, clon: 30, r: 9 },     // Egypt
    ];

    for (let lat = -65; lat <= 70; lat += 4.5) {
      for (let lon = -180; lon <= 180; lon += 4.5) {
        let isLand = false;
        for (const c of CONTINENTS) {
          const dLat = lat - c.clat;
          const dLon = lon - c.clon;
          if (Math.sqrt(dLat * dLat + dLon * dLon) < c.r) {
            isLand = true;
            break;
          }
        }
        if (isLand) {
          landPoints.push({ lat: lat * Math.PI / 180, lon: lon * Math.PI / 180 });
        }
      }
    }

    const cx = 225;
    const cy = 225;
    const R = 150;
    const tilt = 22 * Math.PI / 180; // Earth axial tilt

    // Coordinates of our projects
    const pins = [
      { lat: 29.9667 * Math.PI / 180, lon: 32.5498 * Math.PI / 180 }, // Suez
      { lat: 24.0900 * Math.PI / 180, lon: 38.0633 * Math.PI / 180 }  // Yanbu
    ];

    let pulseScale = 0;

    const render = () => {
      // Clear with support for high DPI
      ctx.clearRect(0, 0, 450, 450);

      // Freeze globe rotation if user hovers on a pin
      const activeIdx = hoveredIdxRef.current;
      if (activeIdx === null) {
        localLambda += 0.003;
      }

      pulseScale = (pulseScale + 0.04) % (2 * Math.PI);

      // 1. Draw glowing space/ambient radial backdrop
      const bgGlow = ctx.createRadialGradient(cx, cy, R * 0.4, cx, cy, R * 1.35);
      bgGlow.addColorStop(0, "rgba(19, 40, 64, 0.4)");
      bgGlow.addColorStop(1, "rgba(11, 22, 35, 0)");
      ctx.fillStyle = bgGlow;
      ctx.fillRect(0, 0, 450, 450);

      // 2. Draw sphere backdrop mask (hides back-facing dots)
      ctx.beginPath();
      ctx.arc(cx, cy, R - 1, 0, 2 * Math.PI);
      ctx.fillStyle = "#0c1b2d";
      ctx.fill();

      // 3. Draw Parallels (Latitudes)
      ctx.strokeStyle = "rgba(229, 193, 88, 0.035)";
      ctx.lineWidth = 1;
      for (let latDeg = -60; latDeg <= 60; latDeg += 20) {
        const latRad = latDeg * Math.PI / 180;
        ctx.beginPath();
        ctx.ellipse(
          cx, 
          cy - R * Math.sin(latRad) * Math.cos(tilt), 
          R * Math.cos(latRad), 
          R * Math.cos(latRad) * Math.sin(tilt), 
          0, 0, 2 * Math.PI
        );
        ctx.stroke();
      }

      // 4. Draw Meridians (Longitudes)
      for (let lonDeg = 0; lonDeg < 360; lonDeg += 30) {
        const theta = lonDeg * Math.PI / 180 + localLambda;
        ctx.beginPath();
        for (let latDeg = -90; latDeg <= 90; latDeg += 5) {
          const latRad = latDeg * Math.PI / 180;
          const x3d = Math.cos(latRad) * Math.sin(theta);
          const y3d = Math.sin(latRad);
          const z3d = Math.cos(latRad) * Math.cos(theta);
          
          const y3d_tilted = y3d * Math.cos(tilt) - z3d * Math.sin(tilt);
          const sx = cx + R * x3d;
          const sy = cy - R * y3d_tilted;
          
          if (latDeg === -90) ctx.moveTo(sx, sy);
          else ctx.lineTo(sx, sy);
        }
        ctx.strokeStyle = "rgba(229, 193, 88, 0.03)";
        ctx.stroke();
      }

      // 5. Draw rotating Dotted landmasses (Continents)
      for (const pt of landPoints) {
        const theta = pt.lon + localLambda;
        const x3d = Math.cos(pt.lat) * Math.sin(theta);
        const y3d = Math.sin(pt.lat);
        const z3d = Math.cos(pt.lat) * Math.cos(theta);

        const y3d_tilted = y3d * Math.cos(tilt) - z3d * Math.sin(tilt);
        const z3d_tilted = y3d * Math.sin(tilt) + z3d * Math.cos(tilt);

        if (z3d_tilted > 0) {
          const sx = cx + R * x3d;
          const sy = cy - R * y3d_tilted;
          
          // Smooth fade out at the edges using z3d_tilted
          ctx.fillStyle = `rgba(229, 193, 88, ${0.06 + z3d_tilted * 0.16})`;
          ctx.fillRect(sx - 1, sy - 1, 2, 2);
        }
      }

      // 6. Draw outer glowing sphere border
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, 2 * Math.PI);
      ctx.strokeStyle = "rgba(229, 193, 88, 0.2)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // 7. Project and Draw interactive Suez & Yanbu Pins
      const coords: any[] = [];
      pins.forEach((pin, index) => {
        const theta = pin.lon + localLambda;
        const x3d = Math.cos(pin.lat) * Math.sin(theta);
        const y3d = Math.sin(pin.lat);
        const z3d = Math.cos(pin.lat) * Math.cos(theta);

        const y3d_tilted = y3d * Math.cos(tilt) - z3d * Math.sin(tilt);
        const z3d_tilted = y3d * Math.sin(tilt) + z3d * Math.cos(tilt);

        const isVisible = z3d_tilted > -0.1; // Small threshold to fade near horizon
        const sx = cx + R * x3d;
        const sy = cy - R * y3d_tilted;

        coords.push({ x: sx, y: sy, visible: isVisible });

        if (isVisible) {
          const isHovered = activeIdx === index;
          const alpha = isHovered ? 1 : 0.65 + 0.35 * Math.sin(pulseScale * 2);
          const size = isHovered ? 6 : 4.5;
          
          // Draw connector leader line to label
          ctx.beginPath();
          ctx.moveTo(sx, sy);
          ctx.lineTo(sx, sy - 16);
          ctx.strokeStyle = isHovered ? "rgba(255, 255, 255, 0.85)" : "rgba(229, 193, 88, 0.55)";
          ctx.lineWidth = 1.2;
          ctx.stroke();

          // Draw label box
          const labelText = index === 0 ? "Suez, EG" : "Yanbu, KSA";
          ctx.font = "bold 9px monospace";
          const textWidth = ctx.measureText(labelText).width;
          
          ctx.fillStyle = "rgba(11, 22, 35, 0.88)";
          ctx.strokeStyle = isHovered ? "#ffffff" : "#e5c158";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.roundRect(sx - textWidth/2 - 4, sy - 31, textWidth + 8, 14, 2);
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = isHovered ? "#ffffff" : "#e5c158";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(labelText, sx, sy - 24);

          // Draw pulse radar circle
          ctx.beginPath();
          ctx.arc(sx, sy, size + 5 * Math.sin(pulseScale * 1.5), 0, 2 * Math.PI);
          ctx.strokeStyle = `rgba(229, 193, 88, ${0.4 * (1 - Math.sin(pulseScale * 1.5)/2)})`;
          ctx.stroke();

          // Draw core pin dot
          ctx.beginPath();
          ctx.arc(sx, sy, size, 0, 2 * Math.PI);
          ctx.fillStyle = isHovered ? "#ffffff" : "#e5c158";
          ctx.fill();
          ctx.strokeStyle = "#0c1b2d";
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      });

      pinCoordsRef.current = coords;

      // Draw coordinates grid data
      ctx.fillStyle = "rgba(255, 255, 255, 0.12)";
      ctx.font = "8px monospace";
      ctx.textAlign = "left";
      ctx.fillText(`ROTATION: ${(localLambda * 180 / Math.PI % 360).toFixed(1)}°`, 20, 420);
      
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleScrollTo = (idx: number) => {
    const el = document.getElementById(`project-${idx}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const scaleX = 450 / rect.width;
    const scaleY = 450 / rect.height;
    const canvasX = x * scaleX;
    const canvasY = y * scaleY;

    let matchedIdx: number | null = null;
    pinCoordsRef.current.forEach((coord, idx) => {
      if (coord.visible) {
        const dx = canvasX - coord.x;
        const dy = canvasY - (coord.y - 16); // offset for label height
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 18) {
          matchedIdx = idx;
        }
      }
    });

    if (matchedIdx !== hoveredIdx) {
      setHoveredIdx(matchedIdx);
    }
  };

  const handleMouseLeave = () => {
    setHoveredIdx(null);
  };

  const handleCanvasClick = () => {
    if (hoveredIdx !== null) {
      handleScrollTo(hoveredIdx);
    }
  };

  return (
    <div className="relative w-full h-[400px] sm:h-[450px] bg-navy-deep border border-white/[0.08] rounded-sm overflow-hidden p-6 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.55)]">
      {/* Background World Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
      
      {/* 3D Spinning Globe Canvas */}
      <div className="absolute inset-0 flex items-center justify-center">
        <canvas 
          ref={canvasRef}
          width={900}
          height={900}
          style={{ width: "450px", height: "450px" }}
          className="cursor-pointer max-w-full aspect-square scale-90 sm:scale-100 origin-center"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={handleCanvasClick}
        />
      </div>

      {/* Coordinate metrics header */}
      <div className="flex justify-between text-[9px] font-mono text-silver/40 relative z-10 pointer-events-none">
        <span>3D_ORTHOGRAPHIC_SPHERE</span>
        <span>SYS STATUS: SPINNING [LIVE]</span>
      </div>

      {/* Interactive Tooltips overlay */}
      {hoveredIdx === 0 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className={`absolute z-30 left-[22%] top-[35%] -translate-x-1/2 bg-[#0c1b2d]/98 backdrop-blur-md border border-gold/40 p-4 rounded-sm shadow-[0_25px_50px_rgba(0,0,0,0.85)] w-[250px] ${rtl ? "text-right" : "text-left"}`}
        >
          <h4 className="text-white text-xs font-bold mb-1">Suez SOP Plant</h4>
          <div className="text-[10px] text-gold font-semibold mb-1.5">K₂SO₄ · Mannheim Process</div>
          <p className="text-[11px] text-silver/80 font-light leading-relaxed">
            {locale === "ar" 
              ? "تشغيل كامل من مرحلة ما قبل التشغيل إلى أول منتج بطاقة 40,000 طن/سنة." 
              : locale === "zh" 
              ? "从试运行前到首批产品的全面调试，产能 40,000 吨/年。" 
              : "Full commissioning to first product. Capacity: 40,000 T/yr."}
          </p>
          <div className="mt-2.5 text-[9px] font-mono text-gold/70 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            {locale === "ar" ? "انقر للتمرير إلى التفاصيل" : locale === "zh" ? "点击滚动查看详情" : "Click to scroll to details"}
          </div>
        </motion.div>
      )}

      {hoveredIdx === 1 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className={`absolute z-30 left-[68%] top-[25%] -translate-x-1/2 bg-[#0c1b2d]/98 backdrop-blur-md border border-gold/40 p-4 rounded-sm shadow-[0_25px_50px_rgba(0,0,0,0.85)] w-[250px] ${rtl ? "text-right" : "text-left"}`}
        >
          <h4 className="text-white text-xs font-bold mb-1">Yanbu Granulation Facility</h4>
          <div className="text-[10px] text-gold font-semibold mb-1.5">NPK · Granulation</div>
          <p className="text-[11px] text-silver/80 font-light leading-relaxed">
            {locale === "ar" 
              ? "أول مشروع لشركة كفاءة في منطقة الخليج. تشغيل وحدة تحبيب NPK في الموعد المحدد." 
              : locale === "zh" 
              ? "海湾地区首个项目，按期调试 NPK 造粒装置。" 
              : "Kafaah's first Gulf project. NPK granulation commissioned on schedule."}
          </p>
          <div className="mt-2.5 text-[9px] font-mono text-gold/70 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            {locale === "ar" ? "انقر للتمرير إلى التفاصيل" : locale === "zh" ? "点击滚动查看详情" : "Click to scroll to details"}
          </div>
        </motion.div>
      )}

      {/* Coordinate footer */}
      <div className="flex justify-between text-[9px] font-mono text-silver/40 relative z-10 pointer-events-none">
        <span>SCALE: 1 : 12,500,000</span>
        <span>TARGETS: SUEZ_SOP | YANBU_NPK</span>
      </div>
    </div>
  );
}

export function ExperienceClient() {
  const { locale } = useRole();
  const rtl = isRtl(locale);
  const fcDisplay = getFontClass(locale, "display");
  const fcUi = getFontClass(locale, "ui");
  const fcBody = getFontClass(locale);
  const isEn = locale === "en";

  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div dir={rtl ? "rtl" : "ltr"} className="bg-navy-dark min-h-screen relative overflow-hidden">
      {/* Background Noise & Overlay */}
      <div className="absolute inset-0 hero-noise opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />

      {/* ── HERO SECTION (90vh) ── */}
      <section className="relative min-h-[90vh] lg:h-[90vh] flex flex-col justify-center pt-28 pb-16 sm:pt-36 sm:pb-24 border-b border-white/[0.06] bg-navy-deep overflow-hidden">
        {/* Background Overlay Graphic */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <picture>
            <source srcSet="/services-hero-bg.webp" type="image/webp" />
            <img
              src="/services-hero-bg.png"
              alt="Kafaah Experience Background"
              className="w-full h-full object-fill opacity-25 mix-blend-luminosity"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/40 via-navy-dark/45 to-navy-dark/35" />
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-navy-deep/80 to-transparent" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10 max-w-5xl">
          <FadeIn className="space-y-4">
            <div className="flex items-center gap-3">
              <span className={`${isEn ? "font-[family-name:var(--font-ui)] text-[10px] tracking-[0.25em]" : fcUi + " text-[12px]"} font-bold text-gold uppercase`}>
                {dict.pageTitle[locale]}
              </span>
              <div className="w-8 h-px bg-gradient-to-r from-gold to-transparent" />
            </div>
            <h1 className={`${fcDisplay} text-[clamp(32px,5.5vw,56px)] leading-[1.1] text-white font-medium`}>
              <HoverWords text={isEn ? "Proven Operational Footprint." : dict.completedProjects[locale]} locale={locale} />
            </h1>
          </FadeIn>

          <FadeIn delay={0.15} className="mt-6 max-w-2xl">
            <p className={`${fcBody} text-silver/85 text-[15px] sm:text-[17px] leading-[1.8] font-light`}>
              <HoverSubcopy 
                text={isEn 
                  ? "A record of engineering accountability inside chemical facilities. From Mannheim SOP furnaces to NPK compaction units, Kafaah leads critical projects to stable commercial yields." 
                  : dict.backgroundText[locale]} 
                locale={locale} 
              />
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── SELECTED COMPLETED PROJECTS SECTION ── */}
      <section className="py-20 lg:py-28 bg-navy">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 max-w-5xl">
          <FadeIn className="mb-12">
            <motion.div 
              className="inline-flex items-center gap-2 group cursor-default"
              whileHover="hover"
            >
              <motion.span 
                className="w-1.5 h-1.5 bg-gold rounded-full" 
                variants={{ hover: { scale: 1.5, backgroundColor: "#ffffff" } }}
              />
              <span className={`${fcUi} text-[10.5px] font-bold tracking-[0.25em] text-gold uppercase transition-colors duration-300 group-hover:text-white`}>
                {dict.completedProjects[locale]}
              </span>
            </motion.div>
            <motion.h2 
              className={`${fcDisplay} text-2xl sm:text-3xl text-white font-semibold mt-2`}
              whileHover={{ x: rtl ? -4 : 4, color: "#f3e1b3" }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              {isEn ? "Major Plant Deployments & Commissions" : dict.completedProjects[locale]}
            </motion.h2>
          </FadeIn>

          <div className="space-y-12">
            {dict.projects[locale].map((proj: any, idx: number) => (
              <FadeIn delay={0.1 * (idx + 1)} key={idx}>
                <div 
                  id={`project-${idx}`}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className={`relative group border rounded-sm p-6 sm:p-8 lg:p-10 transition-all duration-500 shadow-[0_10px_40px_rgba(0,0,0,0.3)] overflow-hidden ${
                    hoveredIdx === idx 
                      ? "bg-navy-card-hover/75 border-gold/50 shadow-[0_20px_50px_rgba(229,193,88,0.06)] -translate-y-1" 
                      : "bg-navy-card/40 border-white/[0.08] hover:border-gold/35 hover:bg-navy-card-hover/55"
                  }`}
                >
                  
                  {/* Glowing Vertical accent line */}
                  <div className={`absolute top-0 bottom-0 left-0 w-[4px] transition-all duration-300 ${
                    hoveredIdx === idx ? "bg-white w-[6px]" : "bg-gradient-to-b from-gold/60 to-gold"
                  }`} />
                  
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Column: Details */}
                    <div className="lg:col-span-8 space-y-4">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className={`${fcUi} text-[9px] font-bold tracking-[0.18em] uppercase bg-gold/15 text-gold border border-gold/25 px-2.5 py-1 rounded-sm`}>
                          {proj.badge}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-xs text-silver/60">
                          <Clock className="w-3.5 h-3.5 text-gold/60" />
                          {proj.date}
                        </span>
                      </div>

                      <h3 className={`${fcDisplay} text-2xl sm:text-3xl text-white font-medium leading-tight group-hover:text-gold transition-colors duration-300`}>
                        {proj.title}
                      </h3>

                      <div className="font-mono text-[10.5px] font-semibold tracking-wider text-gold/80 bg-white/[0.02] border border-white/[0.04] px-2.5 py-1 inline-block rounded-sm">
                        {proj.tags}
                      </div>

                      <p className={`${fcBody} text-[13.5px] leading-relaxed text-silver/85 font-light`}>
                        {proj.desc}
                      </p>
                    </div>

                    {/* Right Column: Dashboard Metrics block */}
                    <div className="lg:col-span-4 bg-navy-deep/80 border border-white/[0.08] group-hover:border-gold/25 rounded-sm p-5 space-y-4 transition-all duration-300">
                      {/* Metric 1: Location */}
                      <div className="flex items-start gap-3">
                        <div className="p-1.5 bg-gold/10 rounded-sm border border-gold/15 shrink-0 mt-0.5">
                          <MapPin className="w-4 h-4 text-gold" />
                        </div>
                        <div>
                          <span className={`${fcUi} text-[9px] font-bold tracking-[0.15em] text-silver/45 uppercase block`}>
                            {dict.location[locale]}
                          </span>
                          <span className={`${fcBody} text-xs font-semibold text-white mt-0.5 block`}>
                            {proj.location}
                          </span>
                        </div>
                      </div>

                      {/* Metric 2: Capacity / Milestone */}
                      <div className="flex items-start gap-3 border-t border-white/[0.06] pt-3">
                        <div className="p-1.5 bg-gold/10 rounded-sm border border-gold/15 shrink-0 mt-0.5">
                          {proj.hasMilestone ? (
                            <Award className="w-4 h-4 text-gold" />
                          ) : (
                            <Factory className="w-4 h-4 text-gold" />
                          )}
                        </div>
                        <div>
                          <span className={`${fcUi} text-[9px] font-bold tracking-[0.15em] text-silver/45 uppercase block`}>
                            {proj.hasMilestone ? dict.milestone[locale] : dict.capacity[locale]}
                          </span>
                          <span className={`${fcBody} text-xs font-semibold text-white mt-0.5 block`}>
                            {proj.hasMilestone ? proj.milestone : proj.capacity}
                          </span>
                        </div>
                      </div>

                      {/* Metric 3: Outcome */}
                      <div className="flex items-start gap-3 border-t border-white/[0.06] pt-3">
                        <div className="p-1.5 bg-gold/10 rounded-sm border border-gold/15 shrink-0 mt-0.5">
                          <CheckCircle2 className="w-4 h-4 text-gold" />
                        </div>
                        <div>
                          <span className={`${fcUi} text-[9px] font-bold tracking-[0.15em] text-silver/45 uppercase block`}>
                            {dict.outcome[locale]}
                          </span>
                          <span className={`${fcBody} text-xs font-semibold text-white mt-0.5 block`}>
                            {proj.outcome}
                          </span>
                        </div>
                      </div>

                    </div>
                  </div>

                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── BACKGROUND QUOTE SECTION ── */}
      <section className="relative py-24 bg-navy-dark border-t border-b border-white/[0.06] overflow-hidden">
        {/* Glow circle overlay */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 max-w-4xl text-center relative z-10">
          <FadeIn>
            <div className="inline-flex items-center justify-center p-3 bg-gold/10 border border-gold/20 rounded-full mb-6 text-gold">
              <Microscope className="w-6 h-6" />
            </div>
            
            <h3 className={`${fcDisplay} text-[clamp(20px,3vw,30px)] text-white leading-[1.5] font-light italic mb-8 max-w-3xl mx-auto`}>
              "{dict.backgroundText[locale]}"
            </h3>

            {/* Micro KPI grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto pt-8 border-t border-white/[0.08]">
              <motion.div 
                className="text-center space-y-1 cursor-default"
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <span className="block font-[family-name:var(--font-display)] text-3xl font-bold text-gold">
                  20+
                </span>
                <span className={`${fcUi} text-[10px] tracking-[0.15em] font-bold text-silver/50 uppercase block`}>
                  {isEn ? "Years Field Operations" : "عاماً من العمليات الميدانية"}
                </span>
              </motion.div>
              <motion.div 
                className="text-center space-y-1 border-t sm:border-t-0 sm:border-l sm:border-r border-white/[0.08] py-4 sm:py-0 cursor-default"
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <span className="block font-[family-name:var(--font-display)] text-3xl font-bold text-gold">
                  6
                </span>
                <span className={`${fcUi} text-[10px] tracking-[0.15em] font-bold text-silver/50 uppercase block`}>
                  {isEn ? "Core Plant Chemistries" : "عمليات صناعية متكاملة"}
                </span>
              </motion.div>
              <motion.div 
                className="text-center space-y-1 cursor-default"
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <span className="block font-[family-name:var(--font-display)] text-3xl font-bold text-gold">
                  100%
                </span>
                <span className={`${fcUi} text-[10px] tracking-[0.15em] font-bold text-silver/50 uppercase block`}>
                  {isEn ? "Independent Support" : "تمثيل فني مستقل"}
                </span>
              </motion.div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── PERIODIC TABLE TECHNOLOGIES GRID ── */}
      <section className="py-20 lg:py-28 bg-navy">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 max-w-5xl">
          <FadeIn className="mb-12">
            <motion.div 
              className="inline-flex items-center gap-2 group cursor-default"
              whileHover="hover"
            >
              <motion.span 
                className="w-1.5 h-1.5 bg-gold rounded-full" 
                variants={{ hover: { scale: 1.5, backgroundColor: "#ffffff" } }}
              />
              <span className={`${fcUi} text-[10.5px] font-bold tracking-[0.25em] text-gold uppercase transition-colors duration-300 group-hover:text-white`}>
                {dict.techCovered[locale]}
              </span>
            </motion.div>
            <motion.h2 
              className={`${fcDisplay} text-2xl sm:text-3xl text-white font-semibold mt-2`}
              whileHover={{ x: rtl ? -4 : 4, color: "#f3e1b3" }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              {isEn ? "Chemical Plant Processes Covered" : dict.techCovered[locale]}
            </motion.h2>
          </FadeIn>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { formula: "H₂SO₄", name: { en: "Sulfuric Acid", ar: "حمض الكبريتيك", zh: "硫酸" }, index: "01" },
              { formula: "H₃PO₄", name: { en: "Phosphoric Acid", ar: "حمض الفوسفوريك", zh: "磷酸" }, index: "02" },
              { formula: "K₂SO₄", name: { en: "Sulfate of Potash", ar: "كبريتات البوتاسيوم", zh: "硫酸钾" }, index: "03" },
              { formula: "NPK", name: { en: "NPK Fertilizers", ar: "سماد مركب NPK", zh: "氮磷钾复合肥" }, index: "04" },
              { formula: "MgSO₄", name: { en: "Magnesium Sulphate", ar: "كبريتات المغنيسيوم", zh: "硫酸镁" }, index: "05" },
              { formula: "SSP", name: { en: "Single Superphosphate", ar: "سوبر فوسفات أحادي", zh: "普通过磷酸钙" }, index: "06" },
            ].map((tech) => {
              const Icon = techIcons[tech.formula] || Beaker;
              return (
                <motion.div 
                  key={tech.formula} 
                  className="relative group bg-navy-card/45 border border-white/[0.08] p-6 rounded-sm flex flex-col justify-between h-[160px] sm:h-[180px] shadow-md cursor-default"
                  whileHover="hover"
                  variants={{
                    hover: { 
                      y: -6, 
                      borderColor: "rgba(229,193,88,0.45)", 
                      backgroundColor: "rgba(19,40,64,0.6)",
                      boxShadow: "0 20px 40px rgba(0,0,0,0.4), 0 0 20px rgba(229,193,88,0.05)"
                    }
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {/* Top line detail */}
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-mono text-gold font-bold">
                      {tech.index}
                    </span>
                    <Icon className="w-5 h-5 text-gold/30 group-hover:text-gold/80 transition-colors duration-300" />
                  </div>
                  
                  {/* Chemical Element Symbol */}
                  <div className="text-center my-2">
                    <motion.span 
                      className="block font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-extrabold text-white tracking-wide" 
                      dir="ltr"
                      variants={{
                        hover: { scale: 1.08, color: "#e5c158" }
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    >
                      {tech.formula}
                    </motion.span>
                  </div>

                  {/* Chemical Name */}
                  <div className="text-center border-t border-white/[0.06] pt-2">
                    <span className={`${fcUi} text-[10.5px] font-bold uppercase tracking-[0.1em] text-silver/60 group-hover:text-white transition-colors duration-300 block`}>
                      {tech.name[locale]}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── GEOGRAPHY SECTION (COORDINATES MAP) ── */}
      <section className="py-20 lg:py-28 bg-navy-dark border-t border-white/[0.06]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Text & Locations */}
            <div className="lg:col-span-5 space-y-6">
              <FadeIn>
                <motion.div 
                  className="inline-flex items-center gap-2 group cursor-default"
                  whileHover="hover"
                >
                  <motion.span 
                    className="w-1.5 h-1.5 bg-gold rounded-full" 
                    variants={{ hover: { scale: 1.5, backgroundColor: "#ffffff" } }}
                  />
                  <span className={`${fcUi} text-[10.5px] font-bold tracking-[0.25em] text-gold uppercase transition-colors duration-300 group-hover:text-white`}>
                    {dict.geoFootprint[locale]}
                  </span>
                </motion.div>
                
                <h2 className={`${fcDisplay} text-2xl sm:text-3xl text-white font-semibold mt-2 leading-tight`}>
                  {isEn ? "Serving Industrial Centers Across MENA" : dict.geoFootprint[locale]}
                </h2>
                
                <p className={`${fcBody} text-sm text-silver/80 font-light leading-relaxed mt-4`}>
                  {isEn 
                    ? "Our engineers actively deploy directly to client sites in critical industrial zones. We coordinate site mobilization across Egypt, Saudi Arabia, and regional hubs."
                    : "ينتشر مهندسونا مباشرة في مواقع العملاء في المناطق الصناعية الحيوية. نقوم بالتنسيق وحشد الكفاءات الهندسية عبر مصر والسعودية والمحاور الإقليمية."}
                </p>
              </FadeIn>

              {/* Geographic Tags */}
              <div className="flex flex-wrap gap-2.5 pt-2">
                {dict.geoList[locale].map((loc) => (
                  <motion.span
                    key={loc}
                    className={`${fcUi} text-[10.5px] font-semibold tracking-wider uppercase text-silver bg-navy-deep border border-white/[0.08] px-4 py-2 rounded-sm shadow-sm cursor-default`}
                    whileHover={{ 
                      scale: 1.05, 
                      borderColor: "rgba(229,193,88,0.3)", 
                      color: "#ffffff", 
                      backgroundColor: "rgba(255,255,255,0.02)" 
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {loc}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Right: Abstract Map Coordinate visual */}
            <div className="lg:col-span-7">
              <FadeIn delay={0.15}>
                <InteractiveMap locale={locale} rtl={rtl} hoveredIdx={hoveredIdx} setHoveredIdx={setHoveredIdx} />
              </FadeIn>
            </div>

          </div>
        </div>
      </section>

      {/* ── CLOSING CTA SECTION ── */}
      <section className="relative py-20 sm:py-28 bg-navy-deep/30 border-t border-white/[0.03]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
            
            <div className="lg:col-span-6">
              <FadeIn>
                <h2 className={`${fcDisplay} text-[28px] sm:text-[36px] text-white font-bold leading-[1.3] text-center lg:text-start`}>
                  {locale === "ar" ? "هل لديك مشروع ترغب في مناقشته؟" : locale === "zh" ? "您有项目需要讨论吗？" : "Have a project to discuss?"}
                  <span className="block text-gold mt-1">
                    {locale === "ar" ? "تواصل مع كفاءة اليوم." : locale === "zh" ? "立即与 KAFAAH 联系。" : "Connect with Kafaah today."}
                  </span>
                </h2>
              </FadeIn>
            </div>

            <div className="lg:col-span-6 space-y-6 text-center lg:text-start">
              <FadeIn delay={0.1}>
                <p className={`${fcBody} text-silver/80 text-[13.5px] sm:text-[14.5px] leading-[1.8] font-light text-justify lg:text-start`}>
                  {dict.discussProject[locale]} {locale === "ar" 
                    ? "تواصل معنا لمراجعة تحديات مصنعك أو التشغيل التجريبي المقبل لمشروعك، وسيقوم أحد مهندسي العمليات لدينا بمراجعة طلبك والرد فوريًا." 
                    : locale === "zh" 
                    ? "与我们的技术团队取得联系，审查您的运营挑战或即将开始的项目调试，我们的工艺工程师将在24小时内与您对接。" 
                    : "Get in touch with our technical team to review your operational challenges or upcoming project commissioning. A principal process engineer will review your situation."}
                </p>
              </FadeIn>

              <FadeIn delay={0.2} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/contact/"
                  className={`group btn-premium-gold ${locale !== "en" ? fcUi + " text-[13px]" : "font-[family-name:var(--font-ui)] text-[11.5px] tracking-[0.12em] uppercase"} font-bold w-full sm:w-[270px] whitespace-nowrap justify-center`}
                >
                  {/* Premium animated light sweep */}
                  <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shimmer" />
                  <div className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-[1.2s] ease-in-out bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12" />

                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Mail className="w-4 h-4 shrink-0" />
                    <span>{locale === "ar" ? "اتصل بكفاءة" : locale === "zh" ? "联系 KAFAAH" : "CONTACT KAFAAH"}</span>
                  </span>
                </Link>
                <Link
                  href="/services/"
                  className={`group btn-premium-glass border border-white/20 hover:border-white/40 ${locale !== "en" ? fcUi + " text-[13px]" : "font-[family-name:var(--font-ui)] text-[11.5px] tracking-[0.08em] uppercase"} font-semibold w-full sm:w-[270px] whitespace-nowrap justify-center`}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Award className="w-4 h-4 shrink-0 text-gold" />
                    <span>{locale === "ar" ? "عرض خدماتنا" : locale === "zh" ? "浏览我们的服务" : "VIEW OUR SERVICES"}</span>
                  </span>
                </Link>
              </FadeIn>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
