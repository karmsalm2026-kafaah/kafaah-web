"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import * as THREE from "three";
import {
  ArrowRight, Clock, MapPin, Factory, Award, CheckCircle2, Globe, Flame, Settings, Zap, Cpu, Database, Beaker, Mail, Microscope
} from "lucide-react";
import { FadeIn } from "@/components/Animations";
import { useRole } from "@/lib/RoleContext";
import { experiencePage as dict, shared, getFontClass, isRtl } from "@/lib/i18n";
import { ImageWithSkeleton } from "@/components/ImageWithSkeleton";

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

function latLonToVector3(lat: number, lon: number, radius: number) {
  // Matches Three.js SphereGeometry vertex formula exactly
  const phi = (90 - lat) * (Math.PI / 180);   // polar angle (latitude)
  const theta = (lon + 180) * (Math.PI / 180); // azimuthal angle (longitude)

  // Three.js SphereGeometry: x=-r*cos(θ)*sin(φ), y=r*cos(φ), z=r*sin(θ)*sin(φ)
  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);

  return new THREE.Vector3(x, y, z);
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
  const tooltipRef = useRef<HTMLDivElement>(null);

  const hoveredIdxRef = useRef(hoveredIdx);
  const [cursorStyle, setCursorStyle] = useState("grab");

  useEffect(() => {
    hoveredIdxRef.current = hoveredIdx;
  }, [hoveredIdx]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // 1. Scene Setup
    const scene = new THREE.Scene();

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.z = 5.5;

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    const parent = canvas.parentElement;
    const size = parent && parent.offsetWidth > 0 ? parent.offsetWidth : 450;
    renderer.setSize(size, size);

    // 4. Globe Mesh Creation
    const globeRadius = 1.8;
    const earthGeom = new THREE.SphereGeometry(globeRadius, 64, 64);

    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin("anonymous");

    const texture = loader.load("https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg");
    const bumpMap = loader.load("https://unpkg.com/three-globe/example/img/earth-topology.png");

    const earthMat = new THREE.MeshStandardMaterial({
      map: texture,
      bumpMap: bumpMap,
      bumpScale: 0.04,
      roughness: 0.75,
      metalness: 0.1
    });

    const earthMesh = new THREE.Mesh(earthGeom, earthMat);

    const globeGroup = new THREE.Group();
    globeGroup.add(earthMesh);
    scene.add(globeGroup);

    // Initial Rotation — face the Middle East (lon ~41°E midpoint between Suez & Yanbu)
    globeGroup.rotation.y = -131 * Math.PI / 180;
    globeGroup.rotation.x = 20 * Math.PI / 180;

    // 5. Lights Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.3);
    dirLight.position.set(5, 3, 5);
    scene.add(dirLight);

    // 6. Create Interactive Pins — visually positioned for clarity on the globe
    //    Suez → clearly in Egypt (west of Red Sea)
    //    Yanbu → clearly in Saudi Arabia (east of Red Sea)
    const pinCoords = [
      { lat: 30.5, lon: 32, index: 0, color: 0xf0a020 },   // Suez, Egypt — GOLD pin
      { lat: 31, lon: 50, index: 1, color: 0x00d4ff }     // Yanbu, KSA — CYAN pin
    ];

    const pinsList: THREE.Group[] = [];
    const pulsesList: THREE.Mesh[] = [];

    pinCoords.forEach(coord => {
      const pos = latLonToVector3(coord.lat, coord.lon, globeRadius);
      const normal = pos.clone().normalize();

      const pinGroup = new THREE.Group();

      // Pin Stem — unique color per location
      const stemGeom = new THREE.CylinderGeometry(0.01, 0.01, 0.18, 8);
      const stemMat = new THREE.MeshBasicMaterial({ color: coord.color });
      const stem = new THREE.Mesh(stemGeom, stemMat);
      stem.position.y = 0.09;
      pinGroup.add(stem);

      // Pin Head — larger, unique color
      const headGeom = new THREE.SphereGeometry(0.045, 16, 16);
      const headMat = new THREE.MeshBasicMaterial({ color: coord.color });
      const head = new THREE.Mesh(headGeom, headMat);
      head.position.y = 0.18;
      pinGroup.add(head);

      pinGroup.position.copy(pos);
      const up = new THREE.Vector3(0, 1, 0);
      pinGroup.quaternion.setFromUnitVectors(up, normal);

      // Attach metadata for raycasting
      pinGroup.userData = { index: coord.index };
      head.userData = { index: coord.index };
      stem.userData = { index: coord.index };

      globeGroup.add(pinGroup);
      pinsList.push(pinGroup);

      // Pulsing Ring at base — color matched
      const pulseGeom = new THREE.RingGeometry(0.02, 0.08, 32);
      const pulseMat = new THREE.MeshBasicMaterial({
        color: coord.color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8
      });
      const pulseMesh = new THREE.Mesh(pulseGeom, pulseMat);
      pulseMesh.position.copy(pos.clone().add(normal.clone().multiplyScalar(0.005)));
      pulseMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
      globeGroup.add(pulseMesh);
      pulsesList.push(pulseMesh);
    });

    // 7. Interaction State
    let isDragging = false;
    let dragStart = { x: 0, y: 0 };
    let rotationStart = { y: globeGroup.rotation.y, x: globeGroup.rotation.x };
    let lastInteracted = 0;

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleResize = () => {
      const parent = canvas.parentElement;
      const size = parent && parent.offsetWidth > 0 ? parent.offsetWidth : 450;
      camera.aspect = 1;
      camera.updateProjectionMatrix();
      renderer.setSize(size, size);
    };
    window.addEventListener("resize", handleResize);

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      dragStart = { x: e.clientX, y: e.clientY };
      rotationStart = { y: globeGroup.rotation.y, x: globeGroup.rotation.x };
      lastInteracted = Date.now();
      setCursorStyle("grabbing");
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (isDragging) {
        const dx = e.clientX - dragStart.x;
        const dy = e.clientY - dragStart.y;

        globeGroup.rotation.y = rotationStart.y + dx * 0.005;
        globeGroup.rotation.x = rotationStart.x + dy * 0.005;

        // Clamp X rotation to avoid flipping
        globeGroup.rotation.x = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, globeGroup.rotation.x));
        lastInteracted = Date.now();
      } else {
        // Raycasting check for hover
        raycaster.setFromCamera(mouse, camera);

        // Intersect recursive check (so it finds heads and stems)
        const intersects = raycaster.intersectObjects(pinsList, true);

        if (intersects.length > 0) {
          const hitObj = intersects[0].object;
          const matchedIdx = hitObj.userData.index !== undefined ? hitObj.userData.index : hitObj.parent?.userData.index;
          if (matchedIdx !== undefined && matchedIdx !== null) {
            setHoveredIdx(matchedIdx);
            setCursorStyle("pointer");
          }
        } else {
          setHoveredIdx(null);
          setCursorStyle("grab");
        }
      }
    };

    const onMouseUp = () => {
      isDragging = false;
      setCursorStyle("grab");
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        dragStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        rotationStart = { y: globeGroup.rotation.y, x: globeGroup.rotation.x };
        lastInteracted = Date.now();
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - dragStart.x;
      const dy = e.touches[0].clientY - dragStart.y;

      globeGroup.rotation.y = rotationStart.y + dx * 0.005;
      globeGroup.rotation.x = rotationStart.x + dy * 0.005;
      globeGroup.rotation.x = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, globeGroup.rotation.x));
      lastInteracted = Date.now();
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    const onCanvasClick = () => {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(pinsList, true);
      if (intersects.length > 0) {
        const hitObj = intersects[0].object;
        const matchedIdx = hitObj.userData.index !== undefined ? hitObj.userData.index : hitObj.parent?.userData.index;
        if (matchedIdx !== undefined && matchedIdx !== null) {
          const targetEl = document.getElementById(`project-${matchedIdx}`);
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }
      }
    };

    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("touchstart", onTouchStart, { passive: true });
    canvas.addEventListener("touchmove", onTouchMove, { passive: true });
    canvas.addEventListener("touchend", onTouchEnd);
    canvas.addEventListener("click", onCanvasClick);

    // 8. Render Loop
    let animationFrameId: number;

    const render = () => {
      // Auto rotation if not dragged recently
      if (!isDragging && Date.now() - lastInteracted > 5000) {
        globeGroup.rotation.y += 0.0012;
      }

      // Animate pulses
      pulsesList.forEach(pulse => {
        pulse.scale.addScalar(0.012);
        const mat = pulse.material as THREE.MeshBasicMaterial;
        mat.opacity -= 0.012;
        if (pulse.scale.x > 3.0) {
          pulse.scale.set(1, 1, 1);
          mat.opacity = 0.8;
        }
      });

      // Render scene
      renderer.render(scene, camera);

      // Tooltip position update
      const activeIdx = hoveredIdxRef.current;
      const tooltipEl = tooltipRef.current;

      if (activeIdx !== null && activeIdx !== undefined && tooltipEl) {
        const activePin = pinsList[activeIdx];
        if (activePin) {
          const worldPos = new THREE.Vector3();
          activePin.getWorldPosition(worldPos);

          const cameraDir = new THREE.Vector3();
          camera.getWorldDirection(cameraDir);
          const pinToCamera = camera.position.clone().sub(worldPos).normalize();
          const dot = worldPos.clone().normalize().dot(pinToCamera);

          if (dot > 0.15) { // Only show if on facing side
            const vector = worldPos.clone();
            vector.project(camera);

            const canvasRect = canvas.getBoundingClientRect();
            const x = (vector.x * 0.5 + 0.5) * canvasRect.width;
            const y = (-(vector.y * 0.5) + 0.5) * canvasRect.height;

            let title = "";
            let subtitle = "";
            let descLine1 = "";
            let descLine2 = "";
            let actionText = "";

            if (activeIdx === 0) {
              title = "Suez SOP Plant";
              subtitle = "K₂SO₄ · Mannheim Process";
              if (locale === "ar") {
                descLine1 = "تشغيل كامل للمصنع من مرحلة ما قبل التشغيل إلى أول";
                descLine2 = "منتج تجاري. الطاقة الإنتاجية المصممة: 40,000 طن/سنوياً.";
                actionText = "انقر للتمرير إلى تفاصيل المشروع";
              } else if (locale === "zh") {
                descLine1 = "从试运行前 to 首批商业化产品的全面调试。";
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

            const tw = 290;
            const th = 150;

            let tooltipLeft = x - tw / 2;
            let tooltipTop = y - th - 24;

            if (tooltipLeft < 10) tooltipLeft = 10;
            if (tooltipLeft + tw > canvasRect.width - 10) tooltipLeft = canvasRect.width - tw - 10;
            if (tooltipTop < 10) tooltipTop = y + 24;

            tooltipEl.style.left = `${tooltipLeft}px`;
            tooltipEl.style.top = `${tooltipTop}px`;
            tooltipEl.style.display = "block";
          } else {
            tooltipEl.style.display = "none";
          }
        }
      } else if (tooltipEl) {
        tooltipEl.style.display = "none";
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // 9. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousedown", onMouseDown);
      canvas.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("touchend", onTouchEnd);
      canvas.removeEventListener("click", onCanvasClick);

      earthGeom.dispose();
      earthMat.dispose();
      texture.dispose();
      bumpMap.dispose();

      pinsList.forEach(pin => {
        pin.traverse(child => {
          if (child instanceof THREE.Mesh) {
            child.geometry.dispose();
            if (Array.isArray(child.material)) {
              child.material.forEach(m => m.dispose());
            } else {
              child.material.dispose();
            }
          }
        });
      });

      pulsesList.forEach(pulse => {
        pulse.geometry.dispose();
        (pulse.material as THREE.Material).dispose();
      });

      renderer.dispose();
    };
  }, [locale, rtl]);

  const handleTooltipClick = () => {
    const activeIdx = hoveredIdxRef.current;
    if (activeIdx !== null && activeIdx !== undefined) {
      const targetEl = document.getElementById(`project-${activeIdx}`);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  return (
    <div className="relative w-full h-[500px] sm:h-[550px] flex flex-col justify-between overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full max-w-[550px] aspect-square scale-95 sm:scale-100 select-none mx-auto flex items-center justify-center">
          <canvas
            ref={canvasRef}
            style={{ cursor: cursorStyle }}
            className="w-full h-full select-none touch-action-none mx-auto block"
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
        <span>3D_WEBGL_SPHERE_GRID</span>
        <span>SYS STATUS: {cursorStyle === "grabbing" ? "DRAGGING" : hoveredIdx !== null ? "FOCUSED" : "ROTATING [LIVE]"}</span>
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
          <ImageWithSkeleton
            src="/services-hero-bg.webp"
            alt="Kafaah Experience Background"
            className="w-full h-full object-fill opacity-25 mix-blend-luminosity"
            containerClassName="w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/40 via-navy-dark/45 to-navy-dark/35" />
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-navy-deep/80 to-transparent" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left Column: Title, Heading & Description */}
            <div className="lg:col-span-5 space-y-6">
              <FadeIn className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className={`${isEn ? "font-[family-name:var(--font-ui)] text-[10px] tracking-[0.25em]" : fcUi + " text-[12px]"} font-bold text-gold uppercase`}>
                    {dict.pageTitle[locale]}
                  </span>
                  <div className="w-8 h-px bg-gradient-to-r from-gold to-transparent" />
                </div>
                <h1 className={`${fcDisplay} text-[clamp(22px,4.2vw,44px)] leading-[1.1] tracking-tight text-white font-semibold`}>
                  <HoverWords text={isEn ? "Proven Operational Footprint." : dict.completedProjects[locale]} locale={locale} />
                </h1>
              </FadeIn>

              <FadeIn delay={0.15}>
                <p className={`${fcBody} text-silver/85 text-[15px] sm:text-[16px] leading-[1.8] font-light text-start`}>
                  {isEn
                    ? "A record of engineering accountability inside chemical facilities. From Mannheim SOP furnaces to NPK compaction units, Kafaah leads critical projects to stable commercial yields."
                    : dict.backgroundText[locale]}
                </p>
              </FadeIn>
            </div>

            {/* Right Column: Founder Display Card */}
            <div className="lg:col-span-7">
              <FadeIn delay={0.2}>
                <div className="relative group overflow-hidden rounded-sm border border-white/[0.08] bg-navy-card/10 backdrop-blur-md p-4 sm:p-6 lg:p-7 flex flex-row gap-4 sm:gap-6 items-center">
                  {/* Founder photo with grayscale transition and scaling */}
                  <div className="relative w-[110px] h-[130px] sm:w-[155px] sm:h-[175px] shrink-0 rounded-sm overflow-hidden bg-navy-deep border border-white/[0.06]">
                    <div className="absolute inset-0 bg-navy-dark/10 z-10" />
                    <ImageWithSkeleton
                      src="/founder.jpeg"
                      alt="Eng. Mostafa Abdel Ghaffar - Managing Director & Chief Engineer"
                      className="w-full h-full object-cover grayscale brightness-[0.98] group-hover:scale-105 group-hover:grayscale-0 transition-all duration-[1.5s] ease-out object-top"
                      containerClassName="w-full h-full"
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
                    <p className={`${fcBody} text-[13px] sm:text-[13.5px] text-silver/80 leading-relaxed font-light text-start`}>
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
                  className={`relative group border rounded-sm p-6 sm:p-8 lg:p-10 transition-all duration-500 shadow-[0_10px_40px_rgba(0,0,0,0.3)] overflow-hidden ${hoveredIdx === idx
                    ? "bg-navy-card-hover/75 border-gold/50 shadow-[0_20px_50px_rgba(229,193,88,0.06)] -translate-y-1"
                    : "bg-navy-card/40 border-white/[0.08] hover:border-gold/35 hover:bg-navy-card-hover/55"
                    }`}
                >

                  {/* Glowing Vertical accent line */}
                  <div className={`absolute top-0 bottom-0 left-0 w-[4px] transition-all duration-300 ${hoveredIdx === idx ? "bg-white w-[6px]" : "bg-gradient-to-b from-gold/60 to-gold"
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

            <h3 className={`${fcDisplay} text-[clamp(17px,3vw,30px)] text-white leading-[1.5] font-light italic mb-8 max-w-3xl mx-auto`}>
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
                <p className={`${fcBody} text-silver/80 text-[13.5px] sm:text-[14.5px] leading-[1.8] font-light text-start lg:text-start`}>
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
