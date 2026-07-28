"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { motionTokens } from "@/animations/tokens";

const ASSET_ROOT = "/assets/decorative/vintage-garden-frame";
const EASE = motionTokens.easeOut;
const SOFT = motionTokens.easeSoft;
const AMBIENT_DELAY = 4.05;

const BEAT = {
  landscape: 0.12,
  arch: 0.36,
  topLeft: 0.58,
  topRight: 0.78,
  sideLeft: 0.94,
  sideRight: 1.12,
  topCenter: 1.34,
  bottom: 1.72,
  birds: 2.12,
} as const;

type DecorativeImageProps = {
  src: string;
  sizes: string;
  className: string;
  priority?: boolean;
};

function DecorativeImage({ src, sizes, className, priority = false }: DecorativeImageProps) {
  return (
    <Image
      src={`${ASSET_ROOT}/${src}`}
      alt=""
      fill
      priority={priority}
      sizes={sizes}
      className={className}
      aria-hidden="true"
    />
  );
}

type FloralClusterProps = {
  className: string;
  imageClassName: string;
  src: string;
  sizes: string;
  delay: number;
  initial: { x?: number; y?: number; rotate: number; scale: number };
  origin: string;
  wind: { x?: number[]; y?: number[]; rotate: number[] };
  windDuration: number;
  opened: boolean;
  openX?: number;
  openY?: number;
};

function FloralCluster({
  className,
  imageClassName,
  src,
  sizes,
  delay,
  initial,
  origin,
  wind,
  windDuration,
  opened,
  openX = 0,
  openY = 0,
}: FloralClusterProps) {
  return (
    <motion.div
      className={className}
      style={{ transformOrigin: origin }}
      initial={{ opacity: 0, ...initial }}
      animate={{
        opacity: opened ? 0.35 : 0.98,
        x: opened ? openX : 0,
        y: opened ? openY : 0,
        rotate: opened ? initial.rotate * 0.4 : 0,
        scale: opened ? 1.025 : 1,
      }}
      transition={{
        opacity: { duration: opened ? 0.5 : 0.82, delay: opened ? 0.08 : delay, ease: EASE },
        x: { duration: opened ? 0.95 : 1.15, delay: opened ? 0.08 : delay, ease: EASE },
        y: { duration: opened ? 0.95 : 1.15, delay: opened ? 0.08 : delay, ease: EASE },
        rotate: { duration: opened ? 0.95 : 1.25, delay: opened ? 0.08 : delay, ease: EASE },
        scale: { duration: opened ? 0.95 : 1.25, delay: opened ? 0.08 : delay, ease: EASE },
      }}
    >
      <motion.div
        className="absolute inset-0"
        style={{ transformOrigin: origin }}
        animate={wind}
        transition={{ duration: windDuration, delay: AMBIENT_DELAY, repeat: Infinity, ease: SOFT }}
      >
        <DecorativeImage src={src} sizes={sizes} className={imageClassName} />
      </motion.div>
    </motion.div>
  );
}

interface Props {
  opened?: boolean;
}

export function VintageGardenFrame({ opened = false }: Props) {
  return (
    <div className="pointer-events-none absolute inset-0 isolate overflow-hidden" aria-hidden="true">
      <motion.div
        className="absolute inset-x-[6%] bottom-[3%] top-[3%] z-0 will-change-transform"
        initial={{ opacity: 0, scale: 1.12, y: 24, clipPath: "inset(100% 6% 0 6% round 48% 48% 0 0)" }}
        animate={{
          opacity: opened ? 0.48 : 0.86,
          scale: opened ? 1.055 : 1,
          y: opened ? -8 : 0,
          clipPath: "inset(0% 0% 0% 0% round 0 0 0 0)",
        }}
        transition={{
          opacity: { duration: 1.15, delay: opened ? 0 : BEAT.landscape, ease: EASE },
          scale: { duration: 1.55, delay: opened ? 0 : BEAT.landscape, ease: EASE },
          y: { duration: 1.55, delay: opened ? 0 : BEAT.landscape, ease: EASE },
          clipPath: { duration: 1.45, delay: BEAT.landscape, ease: EASE },
        }}
      >
        <motion.div
          className="absolute inset-0 origin-bottom"
          animate={{ y: [0, -7, 0], scale: [1, 1.018, 1] }}
          transition={{ duration: 21, delay: AMBIENT_DELAY, repeat: Infinity, ease: SOFT }}
        >
          <DecorativeImage src="garden-landscape.png" sizes="(max-width: 640px) 94vw, 34rem" className="object-contain object-bottom" priority />
        </motion.div>
      </motion.div>

      <motion.svg
        className="absolute inset-x-[10.5%] bottom-[8.5%] top-[8.5%] z-[1] h-[83%] w-[79%]"
        viewBox="0 0 100 160"
        fill="none"
        preserveAspectRatio="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: opened ? 0.22 : 0.78 }}
        transition={{ duration: 0.38, delay: BEAT.arch, ease: EASE }}
      >
        <motion.path
          d="M 3 160 L 3 63 C 3 29 24 4 50 4 C 76 4 97 29 97 63 L 97 160"
          stroke="rgba(157, 116, 48, 0.62)"
          strokeWidth="0.8"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.35, delay: BEAT.arch, ease: EASE }}
        />
        <motion.path
          d="M 6 160 L 6 64 C 6 32 25 8 50 8 C 75 8 94 32 94 64 L 94 160"
          stroke="rgba(157, 116, 48, 0.28)"
          strokeWidth="0.45"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: BEAT.arch + 0.13, ease: EASE }}
        />
      </motion.svg>

      <FloralCluster
        className="absolute -left-[12%] -top-[7%] z-[4] h-[33%] w-[66%]"
        imageClassName="object-contain object-left-top"
        src="floral-top-left.png"
        sizes="(max-width: 640px) 66vw, 23rem"
        delay={BEAT.topLeft}
        initial={{ x: -88, y: -76, rotate: -7, scale: 0.92 }}
        origin="18% 10%"
        wind={{ x: [0, 3, 0], y: [0, 2, 0], rotate: [-0.5, 0.42, -0.5] }}
        windDuration={9.4}
        opened={opened}
        openX={-62}
        openY={-24}
      />
      <FloralCluster
        className="absolute -right-[12%] -top-[7%] z-[4] h-[33%] w-[66%]"
        imageClassName="object-contain object-right-top"
        src="floral-top-right.png"
        sizes="(max-width: 640px) 66vw, 23rem"
        delay={BEAT.topRight}
        initial={{ x: 88, y: -76, rotate: 7, scale: 0.92 }}
        origin="82% 10%"
        wind={{ x: [0, -3, 0], y: [0, 3, 0], rotate: [0.58, -0.4, 0.58] }}
        windDuration={10.8}
        opened={opened}
        openX={62}
        openY={-24}
      />
      <FloralCluster
        className="absolute left-[14%] -top-[5.5%] z-[5] h-[31%] w-[72%]"
        imageClassName="object-contain object-top"
        src="floral-top-center.png"
        sizes="(max-width: 640px) 72vw, 25rem"
        delay={BEAT.topCenter}
        initial={{ y: -110, rotate: -2, scale: 0.9 }}
        origin="50% 6%"
        wind={{ y: [0, 3, 0], rotate: [-0.32, 0.38, -0.32] }}
        windDuration={8.7}
        opened={opened}
        openY={-46}
      />
      <FloralCluster
        className="absolute -left-[23%] bottom-[1%] z-[3] h-[78%] w-[69%] sm:-left-[17%]"
        imageClassName="object-contain object-left-bottom"
        src="floral-left.png"
        sizes="(max-width: 640px) 69vw, 24rem"
        delay={BEAT.sideLeft}
        initial={{ x: -118, y: 22, rotate: -5, scale: 0.94 }}
        origin="16% 92%"
        wind={{ x: [0, 4, 0], y: [0, -3, 0], rotate: [-0.8, 0.48, -0.8] }}
        windDuration={11.3}
        opened={opened}
        openX={-78}
      />
      <FloralCluster
        className="absolute -right-[23%] bottom-[1%] z-[3] h-[78%] w-[69%] sm:-right-[17%]"
        imageClassName="object-contain object-right-bottom"
        src="floral-right.png"
        sizes="(max-width: 640px) 69vw, 24rem"
        delay={BEAT.sideRight}
        initial={{ x: 118, y: 28, rotate: 5, scale: 0.94 }}
        origin="84% 92%"
        wind={{ x: [0, -4, 0], y: [0, -4, 0], rotate: [0.76, -0.46, 0.76] }}
        windDuration={12.6}
        opened={opened}
        openX={78}
      />

      <motion.div
        className="absolute -bottom-[2%] -left-[16%] -right-[16%] z-[6] h-[27%] origin-bottom overflow-hidden"
        initial={{ opacity: 0, y: 78, scale: 0.96, clipPath: "inset(100% 0 0 0)" }}
        animate={{ opacity: opened ? 0.3 : 0.98, y: opened ? 72 : 0, scale: opened ? 1.025 : 1, clipPath: "inset(0% 0 0 0)" }}
        transition={{
          opacity: { duration: 0.9, delay: opened ? 0.08 : BEAT.bottom, ease: EASE },
          y: { duration: opened ? 0.92 : 1.18, delay: opened ? 0.08 : BEAT.bottom, ease: EASE },
          scale: { duration: 1.2, delay: BEAT.bottom, ease: EASE },
          clipPath: { duration: 1.1, delay: BEAT.bottom, ease: EASE },
        }}
      >
        <motion.div
          className="absolute inset-0 origin-bottom"
          animate={{ y: [0, 4, 0], rotate: [-0.18, 0.22, -0.18] }}
          transition={{ duration: 8.2, delay: AMBIENT_DELAY + 0.35, repeat: Infinity, ease: SOFT }}
        >
          <DecorativeImage src="floral-bottom.png" sizes="(max-width: 640px) 132vw, 46rem" className="object-contain object-bottom" />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-[2%] left-[8%] z-[2] h-[9%] w-[18%]"
        initial={{ opacity: 0, y: 16, scale: 0.9 }}
        animate={{ opacity: opened ? 0 : 0.68, y: 0, scale: 1 }}
        transition={{ duration: 0.75, delay: BEAT.birds, ease: EASE }}
      >
        <motion.div className="absolute inset-0" animate={{ x: [-3, 4, -3], y: [2, -5, 2], rotate: [-1.2, 1.1, -1.2] }} transition={{ duration: 7.4, delay: AMBIENT_DELAY, repeat: Infinity, ease: SOFT }}>
          <DecorativeImage src="bird-flying-right.png" sizes="7rem" className="object-contain" />
        </motion.div>
      </motion.div>
      <motion.div
        className="absolute right-[7%] top-[37%] z-[2] h-[10%] w-[18%]"
        initial={{ opacity: 0, y: 14, scale: 0.9 }}
        animate={{ opacity: opened ? 0 : 0.64, y: 0, scale: 1 }}
        transition={{ duration: 0.75, delay: BEAT.birds + 0.16, ease: EASE }}
      >
        <motion.div className="absolute inset-0" animate={{ x: [3, -4, 3], y: [0, -6, 0], rotate: [1.2, -1.1, 1.2] }} transition={{ duration: 8.6, delay: AMBIENT_DELAY + 0.5, repeat: Infinity, ease: SOFT }}>
          <DecorativeImage src="bird-hovering.png" sizes="7rem" className="object-contain" />
        </motion.div>
      </motion.div>
    </div>
  );
}
