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

// Polygon point-in-polygon helper
function isPointInPolygon(pt: [number, number], polygon: [number, number][]) {
  const x = pt[0], y = pt[1];
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i][0], yi = polygon[i][1];
    const xj = polygon[j][0], yj = polygon[j][1];
    const intersect = ((yi > y) !== (yj > y))
        && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

// Safe rounded rectangle drawing helper
const drawRoundRect = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) => {
  if (typeof ctx.roundRect === "function") {
    ctx.roundRect(x, y, w, h, r);
  } else {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }
};

const landPolygons: [number, number][][] = [
  // Africa
  [[-17, 32], [-13, 31], [-9, 35], [11, 37], [20, 32], [34, 31], [33, 27], [43, 12], [51, 11], [46, -3], [40, -15], [33, -28], [20, -34], [18, -34], [12, -22], [9, 4], [-13, 8], [-17, 14]],
  // Arabia
  [[34, 30], [45, 31], [48, 30], [60, 25], [59, 22], [54, 16], [45, 13], [43, 12], [38, 20], [34, 28]],
  // Eurasia
  [[-9, 36], [-9, 43], [-3, 43], [-2, 49], [-5, 48], [-5, 55], [0, 58], [5, 58], [5, 62], [10, 60], [15, 68], [25, 71], [40, 68], [60, 70], [80, 73], [100, 77], [120, 77], [140, 72], [160, 70], [170, 66], [190, 65], [170, 60], [140, 50], [142, 43], [130, 35], [121, 31], [120, 22], [109, 18], [107, 10], [99, 5], [97, 15], [89, 22], [80, 8], [76, 8], [68, 24], [60, 25], [48, 30], [45, 31], [34, 30], [35, 32], [26, 40], [15, 38], [9, 38], [3, 36]],
  // North America
  [[-168, 65], [-150, 70], [-120, 70], [-80, 70], [-60, 80], [-55, 60], [-50, 50], [-60, 46], [-80, 25], [-82, 23], [-98, 16], [-83, 8], [-80, 8], [-90, 14], [-100, 15], [-105, 20], [-110, 22], [-115, 32], [-125, 48], [-140, 60], [-160, 55]],
  // Greenland
  [[-60, 60], [-40, 60], [-30, 70], [-20, 83], [-60, 83], [-70, 75]],
  // South America
  [[-80, 8], [-72, 12], [-60, 10], [-50, -5], [-35, -5], [-40, -22], [-60, -38], [-65, -53], [-75, -55], [-73, -42], [-81, -15], [-81, -5], [-80, 5]],
  // Australia
  [[113, -26], [114, -35], [120, -35], [135, -34], [145, -38], [151, -34], [153, -28], [143, -11], [136, -12], [136, -16], [128, -15], [121, -20]],
  // Madagascar
  [[49, -12], [50, -15], [47, -25], [43, -25], [45, -16]],
  // United Kingdom
  [[-6, 50], [-8, 55], [-4, 58], [-1, 58], [2, 51]],
  // Japan
  [[130, 31], [132, 33], [136, 35], [140, 38], [142, 43], [141, 45], [138, 40], [135, 35]],
  // Sumatra
  [[95, 5], [100, 0], [105, -5], [102, -5], [96, 2]],
  // Borneo
  [[109, 0], [115, 6], [118, 4], [119, -3], [111, -3]],
  // Java
  [[105, -6], [115, -7], [115, -8], [105, -8]],
  // New Guinea
  [[131, -1], [140, -3], [150, -10], [140, -8], [135, -4]],
  // Philippines
  [[120, 15], [122, 18], [125, 13], [122, 10], [120, 13]]
];

const landPolygonsWithBBox = landPolygons.map(poly => {
  let minLon = Infinity, maxLon = -Infinity;
  let minLat = Infinity, maxLat = -Infinity;
  for (const [lon, lat] of poly) {
    if (lon < minLon) minLon = lon;
    if (lon > maxLon) maxLon = lon;
    if (lat < minLat) minLat = lat;
    if (lat > maxLat) maxLat = lat;
  }
  return { poly, minLon, maxLon, minLat, maxLat };
});

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
  const tooltipRef = useRef<HTMLDivElement>(null);
  const pinCoordsRef = useRef<{ x: number; y: number; visible: boolean }[]>([]);
  
  // Ref-based state to keep values stable and readable inside requestAnimationFrame
  const hoveredIdxRef = useRef(hoveredIdx);
  const isDraggingRef = useRef(false);
  const dragMovedRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const rotationRef = useRef({ 
    // Start rotated slightly so that the Middle East (Suez/Yanbu) is centered
    lambda: -35 * Math.PI / 180, 
    tilt: 22 * Math.PI / 180 
  });
  const lastInteractedRef = useRef(0);
  const [cursorStyle, setCursorStyle] = useState("grab");

  useEffect(() => {
    hoveredIdxRef.current = hoveredIdx;
  }, [hoveredIdx]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    // Generate high-fidelity land points from polygons using bounding-box culling
    const landPoints: { lat: number; lon: number }[] = [];
    const step = 2.2;
    for (let lat = -60; lat <= 75; lat += step) {
      for (let lon = -180; lon <= 180; lon += step) {
        let isLand = false;
        for (const { poly, minLon, maxLon, minLat, maxLat } of landPolygonsWithBBox) {
          if (lon >= minLon && lon <= maxLon && lat >= minLat && lat <= maxLat) {
            if (isPointInPolygon([lon, lat], poly)) {
              isLand = true;
              break;
            }
          }
        }
        if (isLand) {
          landPoints.push({ lat: lat * Math.PI / 180, lon: lon * Math.PI / 180 });
        }
      }
    }

    const cx = 275; // Centered on a 550x550 canvas
    const cy = 275;
    const R = 200; // Radius increased to 200 for a larger map

    // Suez (Egypt) and Yanbu (Saudi Arabia)
    const pins = [
      { lat: 29.9667 * Math.PI / 180, lon: 32.5498 * Math.PI / 180 },
      { lat: 24.0900 * Math.PI / 180, lon: 38.0633 * Math.PI / 180 }
    ];

    let pulseScale = 0;

    const render = () => {
      ctx.clearRect(0, 0, 550, 550); // Clears the 550x550 canvas

      const activeIdx = hoveredIdxRef.current;
      const isDragging = isDraggingRef.current;
      const timeSinceInteraction = Date.now() - lastInteractedRef.current;

      // Rotate automatically if not dragging, not hovering a pin, and after initial delay
      if (activeIdx !== null && !isDragging) {
        // Smoothly rotate the globe to center the hovered project pin
        const targetPin = pins[activeIdx];
        const targetLambda = -targetPin.lon;
        
        let diff = targetLambda - rotationRef.current.lambda;
        diff = Math.atan2(Math.sin(diff), Math.cos(diff)); // Shortest rotation direction
        rotationRef.current.lambda += diff * 0.08;

        const targetTilt = 22 * Math.PI / 180;
        rotationRef.current.tilt += (targetTilt - rotationRef.current.tilt) * 0.08;
      } else if (!isDragging && timeSinceInteraction > 1500) {
        rotationRef.current.lambda += 0.003;

        // Easing back to default premium tilt (22 deg)
        const targetTilt = 22 * Math.PI / 180;
        rotationRef.current.tilt += (targetTilt - rotationRef.current.tilt) * 0.01;
      }

      const lambda = rotationRef.current.lambda;
      const tilt = rotationRef.current.tilt;

      pulseScale = (pulseScale + 0.04) % (2 * Math.PI);

      // Sphere background glow
      const bgGlow = ctx.createRadialGradient(cx, cy, R * 0.4, cx, cy, R * 1.35);
      bgGlow.addColorStop(0, "rgba(19, 40, 64, 0.45)");
      bgGlow.addColorStop(1, "rgba(11, 22, 35, 0)");
      ctx.fillStyle = bgGlow;
      ctx.fillRect(0, 0, 550, 550);

      // Solid sphere back
      ctx.beginPath();
      ctx.arc(cx, cy, R - 1, 0, 2 * Math.PI);
      ctx.fillStyle = "#0c1b2d";
      ctx.fill();

      // Draw latitude lines (parallels)
      ctx.strokeStyle = "rgba(229, 193, 88, 0.02)";
      ctx.lineWidth = 1;
      for (let latDeg = -60; latDeg <= 60; latDeg += 20) {
        const latRad = latDeg * Math.PI / 180;
        ctx.beginPath();
        let pathStarted = false;
        for (let lonDeg = 0; lonDeg <= 360; lonDeg += 5) {
          const theta = lonDeg * Math.PI / 180 + lambda;
          const x3d = Math.cos(latRad) * Math.sin(theta);
          const y3d = Math.sin(latRad);
          const z3d = Math.cos(latRad) * Math.cos(theta);

          const y3d_tilted = y3d * Math.cos(tilt) - z3d * Math.sin(tilt);
          const z3d_tilted = y3d * Math.sin(tilt) + z3d * Math.cos(tilt);

          if (z3d_tilted > 0) {
            const sx = cx + R * x3d;
            const sy = cy - R * y3d_tilted;
            if (!pathStarted) {
              ctx.moveTo(sx, sy);
              pathStarted = true;
            } else {
              ctx.lineTo(sx, sy);
            }
          } else {
            pathStarted = false;
          }
        }
        ctx.stroke();
      }

      // Draw longitude lines (meridians)
      ctx.strokeStyle = "rgba(229, 193, 88, 0.02)";
      for (let lonDeg = 0; lonDeg < 360; lonDeg += 30) {
        const theta = lonDeg * Math.PI / 180 + lambda;
        ctx.beginPath();
        let first = true;
        for (let latDeg = -80; latDeg <= 80; latDeg += 5) {
          const latRad = latDeg * Math.PI / 180;
          const x3d = Math.cos(latRad) * Math.sin(theta);
          const y3d = Math.sin(latRad);
          const z3d = Math.cos(latRad) * Math.cos(theta);

          const y3d_tilted = y3d * Math.cos(tilt) - z3d * Math.sin(tilt);
          const z3d_tilted = y3d * Math.sin(tilt) + z3d * Math.cos(tilt);

          if (z3d_tilted > 0) {
            const sx = cx + R * x3d;
            const sy = cy - R * y3d_tilted;
            if (first) {
              ctx.moveTo(sx, sy);
              first = false;
            } else {
              ctx.lineTo(sx, sy);
            }
          } else {
            first = true;
          }
        }
        ctx.stroke();
      }

      // Render world map land points
      for (const pt of landPoints) {
        const theta = pt.lon + lambda;
        const x3d = Math.cos(pt.lat) * Math.sin(theta);
        const y3d = Math.sin(pt.lat);
        const z3d = Math.cos(pt.lat) * Math.cos(theta);

        const y3d_tilted = y3d * Math.cos(tilt) - z3d * Math.sin(tilt);
        const z3d_tilted = y3d * Math.sin(tilt) + z3d * Math.cos(tilt);

        if (z3d_tilted > 0) {
          const sx = cx + R * x3d;
          const sy = cy - R * y3d_tilted;
          
          ctx.fillStyle = `rgba(229, 193, 88, ${0.06 + z3d_tilted * 0.16})`;
          ctx.fillRect(sx - 1, sy - 1, 2, 2);
        }
      }

      // Sphere border stroke
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, 2 * Math.PI);
      ctx.strokeStyle = "rgba(229, 193, 88, 0.25)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Render pins and tooltips
      const coords: any[] = [];
      pins.forEach((pin, index) => {
        const theta = pin.lon + lambda;
        const x3d = Math.cos(pin.lat) * Math.sin(theta);
        const y3d = Math.sin(pin.lat);
        const z3d = Math.cos(pin.lat) * Math.cos(theta);

        const y3d_tilted = y3d * Math.cos(tilt) - z3d * Math.sin(tilt);
        const z3d_tilted = y3d * Math.sin(tilt) + z3d * Math.cos(tilt);

        const isVisible = z3d_tilted > -0.1;
        const sx = cx + R * x3d;
        const sy = cy - R * y3d_tilted;

        coords.push({ x: sx, y: sy, visible: isVisible });

        if (isVisible) {
          const isHovered = activeIdx === index;
          // Substantially larger markers
          const size = isHovered ? 13 : 9.5; 
          
          ctx.beginPath();
          ctx.moveTo(sx, sy);
          ctx.lineTo(sx, sy - 28); // Taller pin line
          ctx.strokeStyle = isHovered ? "rgba(255, 255, 255, 0.95)" : "rgba(229, 193, 88, 0.75)";
          ctx.lineWidth = 2.5; // Thicker pin line
          ctx.stroke();

          // Larger ping pulse
          const t = pulseScale / (2 * Math.PI);
          ctx.beginPath();
          ctx.arc(sx, sy, size + 25 * t, 0, 2 * Math.PI);
          ctx.strokeStyle = `rgba(229, 193, 88, ${0.45 * (1 - t)})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Main dot
          ctx.beginPath();
          ctx.arc(sx, sy, size, 0, 2 * Math.PI);
          ctx.fillStyle = isHovered ? "#ffffff" : "#e5c158";
          ctx.fill();
          ctx.strokeStyle = "#0c1b2d";
          ctx.lineWidth = 2.0; // Thicker dot border
          ctx.stroke();

          // Update absolute HTML/CSS tooltip overlay
          if (isHovered) {
            const tooltipEl = tooltipRef.current;
            if (tooltipEl) {
              let title = "";
              let subtitle = "";
              let descLine1 = "";
              let descLine2 = "";
              let actionText = "";

              if (index === 0) {
                title = "Suez SOP Plant";
                subtitle = "K₂SO₄ · Mannheim Process";
                if (locale === "ar") {
                  descLine1 = "تشغيل كامل للمصنع من مرحلة ما قبل التشغيل إلى أول";
                  descLine2 = "منتج تجاري. الطاقة الإنتاجية المصممة: 40,000 طن/سنوياً.";
                  actionText = "انقر للتمرير إلى تفاصيل المشروع";
                } else if (locale === "zh") {
                  descLine1 = "从试运行前到首批商业化产品的全面调试。";
                  descLine2 = "设计 SOP 硫酸钾厂年产能为 40,000 吨。";
                  actionText = "点击滚动查看项目详情";
                } else {
                  descLine1 = "Full commissioning from pre-startup to first commercial";
                  descLine2 = "product. Designed SOP plant capacity: 40,000 Tons/year.";
                  actionText = "Click to scroll to project details";
                }
              } else {
                title = "Yanbu Granulation Facility";
                subtitle = "NPK · Granulation";
                if (locale === "ar") {
                  descLine1 = "مشروع كفاءة البارز في الخليج. تشغيل وحدة تحبيب سماد";
                  descLine2 = "NPK عالي الكفاءة بنجاح ووفقًا للجدول المخطط له.";
                  actionText = "انقر للتمرير إلى تفاصيل المشروع";
                } else if (locale === "zh") {
                  descLine1 = "Kafaah 在海湾地区的里程碑项目。";
                  descLine2 = "高效率 NPK 复合肥造粒装置按期成功调试。";
                  actionText = "点击滚动查看项目详情";
                } else {
                  descLine1 = "Kafaah's landmark project in the Gulf region. High-efficiency";
                  descLine2 = "NPK granulation unit commissioned successfully on schedule.";
                  actionText = "Click to scroll to project details";
                }
              }

              const titleEl = tooltipEl.querySelector(".tooltip-title") as HTMLDivElement;
              const subtitleEl = tooltipEl.querySelector(".tooltip-subtitle") as HTMLDivElement;
              const descEl = tooltipEl.querySelector(".tooltip-desc") as HTMLDivElement;
              const actionEl = tooltipEl.querySelector(".tooltip-action") as HTMLDivElement;
              
              if (titleEl) titleEl.innerText = title;
              if (subtitleEl) subtitleEl.innerText = subtitle;
              if (descEl) descEl.innerHTML = `${descLine1}<br/>${descLine2}`;
              if (actionEl) actionEl.innerText = actionText;

              const rect = canvas.getBoundingClientRect();
              const tw = 290;
              const th = 150;
              
              let left = (sx / 550) * rect.width - tw / 2;
              let top = (sy / 550) * rect.height + 34; // Offset below the pin (adjusted for taller stem)
              
              // Keep within bounds of the canvas
              if (left < 10) left = 10;
              if (left + tw > rect.width - 10) left = rect.width - tw - 10;
              if (top + th > rect.height - 10) {
                top = (sy / 550) * rect.height - th - 34; // Show above the pin if going below bounds
              }
              
              tooltipEl.style.left = `${left}px`;
              tooltipEl.style.top = `${top}px`;
              tooltipEl.style.display = "block";
            }
          }
        }
      });

      pinCoordsRef.current = coords;

      // Hide HTML tooltip if nothing is hovered
      const tooltipEl = tooltipRef.current;
      if (tooltipEl && activeIdx === null) {
        tooltipEl.style.display = "none";
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [locale, rtl]);

  const handleScrollTo = (idx: number) => {
    const el = document.getElementById(`project-${idx}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    isDraggingRef.current = true;
    dragMovedRef.current = false;
    dragStartRef.current = { x, y };
    lastInteractedRef.current = Date.now();
    setCursorStyle("grabbing");
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const canvasX = x * scaleX;
    const canvasY = y * scaleY;

    if (isDraggingRef.current) {
      const dx = x - dragStartRef.current.x;
      const dy = y - dragStartRef.current.y;
      
      if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
        dragMovedRef.current = true;
      }

      const sensitivity = 0.005;
      rotationRef.current.lambda += dx * sensitivity;
      rotationRef.current.tilt -= dy * sensitivity;
      
      // Clamp tilt to avoid flipping
      const maxTilt = 60 * Math.PI / 180;
      if (rotationRef.current.tilt > maxTilt) rotationRef.current.tilt = maxTilt;
      if (rotationRef.current.tilt < -maxTilt) rotationRef.current.tilt = -maxTilt;

      dragStartRef.current = { x, y };
      lastInteractedRef.current = Date.now();
      setCursorStyle("grabbing");
    } else {
      let matchedIdx: number | null = null;
      pinCoordsRef.current.forEach((coord, idx) => {
        if (coord.visible) {
          const dx = canvasX - coord.x;
          const dy = canvasY - (coord.y - 28); // Updated collision check offset
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 26) { // Slightly wider hover radius for larger pins
            matchedIdx = idx;
          }
        }
      });

      if (matchedIdx !== hoveredIdx) {
        setHoveredIdx(matchedIdx);
      }
      setCursorStyle(matchedIdx !== null ? "pointer" : "grab");
    }
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
    setCursorStyle("grab");
  };

  const handleMouseLeave = () => {
    isDraggingRef.current = false;
    setCursorStyle("grab");
    setHoveredIdx(null);
  };

  const handleCanvasClick = () => {
    if (hoveredIdx !== null && !dragMovedRef.current) {
      handleScrollTo(hoveredIdx);
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || e.touches.length === 0) return;
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    isDraggingRef.current = true;
    dragMovedRef.current = false;
    dragStartRef.current = { x, y };
    lastInteractedRef.current = Date.now();
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || e.touches.length === 0) return;
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    if (isDraggingRef.current) {
      const dx = x - dragStartRef.current.x;
      const dy = y - dragStartRef.current.y;

      if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
        dragMovedRef.current = true;
      }

      const sensitivity = 0.005;
      rotationRef.current.lambda += dx * sensitivity;
      rotationRef.current.tilt -= dy * sensitivity;

      const maxTilt = 60 * Math.PI / 180;
      if (rotationRef.current.tilt > maxTilt) rotationRef.current.tilt = maxTilt;
      if (rotationRef.current.tilt < -maxTilt) rotationRef.current.tilt = -maxTilt;

      dragStartRef.current = { x, y };
      lastInteractedRef.current = Date.now();
    }
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
    if (!dragMovedRef.current && hoveredIdx !== null) {
      handleScrollTo(hoveredIdx);
    }
  };

  const handleTooltipClick = () => {
    const activeIdx = hoveredIdxRef.current;
    if (activeIdx !== null) {
      handleScrollTo(activeIdx);
    }
  };

  return (
    <div className="relative w-full h-[500px] sm:h-[550px] flex flex-col justify-between overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
      
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full max-w-[550px] aspect-square scale-95 sm:scale-100 select-none">
          <canvas 
            ref={canvasRef}
            width={550}
            height={550}
            style={{ cursor: cursorStyle }}
            className="w-full h-full select-none touch-action-none"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onClick={handleCanvasClick}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          />
          
          {/* Crisp HTML/CSS Tooltip Overlay */}
          <div 
            ref={tooltipRef}
            style={{ display: "none", position: "absolute" }}
            onClick={handleTooltipClick}
            className="z-20 w-[290px] bg-navy-dark/95 backdrop-blur-md border border-gold/40 rounded-sm p-4 shadow-[0_20px_50px_rgba(0,0,0,0.8)] select-none transition-opacity duration-150 cursor-pointer pointer-events-auto text-start"
          >
            {/* Gold accent line at the top */}
            <div className="h-[3px] bg-gold absolute top-0 left-0 right-0 rounded-t-sm" />
            
            <div className="tooltip-title text-white font-bold text-[14px] leading-snug tracking-wide mb-1" />
            <div className="tooltip-subtitle text-gold font-mono font-bold text-[10px] uppercase tracking-wider mb-2.5" />
            <div className="tooltip-desc text-silver/90 text-[12px] leading-relaxed font-light mb-3" />
            
            <div className="flex items-center gap-1.5 pt-2 border-t border-white/[0.06]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="tooltip-action text-gold/90 font-semibold text-[10px] uppercase tracking-wider" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between text-[9px] font-mono text-silver/40 relative z-10 pointer-events-none">
        <span>3D_ORTHOGRAPHIC_SPHERE</span>
        <span>SYS STATUS: {isDraggingRef.current ? "DRAGGING" : hoveredIdx !== null ? "FOCUSED" : "SPINNING [LIVE]"}</span>
      </div>

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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Title, Heading & Description */}
            <div className="lg:col-span-6 space-y-6">
              <FadeIn className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className={`${isEn ? "font-[family-name:var(--font-ui)] text-[10px] tracking-[0.25em]" : fcUi + " text-[12px]"} font-bold text-gold uppercase`}>
                    {dict.pageTitle[locale]}
                  </span>
                  <div className="w-8 h-px bg-gradient-to-r from-gold to-transparent" />
                </div>
                <h1 className={`${fcDisplay} text-[clamp(30px,4.2vw,44px)] leading-[1.1] tracking-tight text-white font-semibold`}>
                  <HoverWords text={isEn ? "Proven Operational Footprint." : dict.completedProjects[locale]} locale={locale} />
                </h1>
              </FadeIn>

              <FadeIn delay={0.15}>
                <p className={`${fcBody} text-silver/85 text-[15px] sm:text-[16px] leading-[1.8] font-light text-justify`}>
                  {isEn 
                    ? "A record of engineering accountability inside chemical facilities. From Mannheim SOP furnaces to NPK compaction units, Kafaah leads critical projects to stable commercial yields." 
                    : dict.backgroundText[locale]}
                </p>
              </FadeIn>
            </div>

            {/* Right Column: Founder Display Card */}
            <div className="lg:col-span-6">
              <FadeIn delay={0.2}>
                <div className="relative group overflow-hidden rounded-sm border border-white/[0.08] bg-navy-card/10 backdrop-blur-md p-5 sm:p-6 lg:p-7 flex flex-col sm:flex-row gap-6 items-center">
                  {/* Founder photo with grayscale transition and scaling */}
                  <div className="relative w-[155px] h-[175px] shrink-0 rounded-sm overflow-hidden bg-navy-deep border border-white/[0.06]">
                    <div className="absolute inset-0 bg-navy-dark/10 z-10" />
                    <img
                      src="/founder.jpeg"
                      alt="Eng. Mostafa Abdel Ghaffar - Managing Director & Chief Engineer"
                      className="w-full h-full object-cover grayscale brightness-[0.98] group-hover:scale-105 group-hover:grayscale-0 transition-all duration-[1.5s] ease-out object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/70 via-transparent to-transparent z-25" />
                  </div>

                  {/* Caption & Title Details */}
                  <div className="flex-1 min-w-0">
                    <p className={`${fcUi} text-[11px] sm:text-[11.5px] font-bold tracking-[0.15em] text-gold uppercase mb-1.5`}>
                      {locale === "ar" ? "المدير التنفيذي وكبير المهندسين" : locale === "zh" ? "总经理兼总工程师" : "Managing Director & Chief Engineer"}
                    </p>
                    <p className={`${fcBody} text-[15px] sm:text-[16.5px] text-white font-semibold mb-2.5`}>
                      {locale === "ar" ? "م. مصطفى عبد الغفار" : locale === "zh" ? "莫斯塔法·阿卜杜勒·加法尔 工程师" : "Eng. Mostafa Abdel Ghaffar"}
                    </p>
                    <p className={`${fcBody} text-[13px] sm:text-[13.5px] text-silver/80 leading-relaxed font-light text-justify`}>
                      {locale === "ar" 
                        ? "يقود العمليات التشغيلية وبدء التشغيل الميداني للمشاريع الكيميائية والأسمدة بخبرة تزيد عن 20 عاماً."
                        : locale === "zh"
                        ? "凭借20多年的现场经验，亲自领导无机化工和化肥项目的调试、启动与运行。"
                        : "Leads on-site commissioning and startup operations for fertilizer and chemical plants with 20+ years of direct experience."}
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>

          </div>
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
