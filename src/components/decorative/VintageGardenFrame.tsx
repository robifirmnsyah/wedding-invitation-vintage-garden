"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const ASSET_ROOT = "/assets/decorative/vintage-garden-frame";
const EASE = [0.22, 1, 0.36, 1] as const;

type DecorativeImageProps = {
  src: string;
  sizes: string;
  className: string;
  priority?: boolean;
};

function DecorativeImage({
  src,
  sizes,
  className,
  priority = false,
}: DecorativeImageProps) {
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

export function VintageGardenFrame() {
  return (
    <div
      className="pointer-events-none absolute inset-0 isolate overflow-hidden"
      aria-hidden="true"
    >
      <motion.div
        className="absolute inset-x-[6%] bottom-[3%] top-[3%] z-0"
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 0.84, scale: [1, 1.012, 1], y: [0, -6, 0] }}
        transition={{
          opacity: { duration: 1.4, ease: EASE },
          scale: { duration: 18, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 18, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <DecorativeImage
          src="garden-landscape.png"
          sizes="(max-width: 640px) 94vw, 34rem"
          className="object-contain object-bottom"
          priority
        />
      </motion.div>

      <div className="vintage-garden-arch absolute inset-x-[11%] bottom-[9%] top-[9%] z-[1]" />

      <motion.div
        className="absolute -left-[23%] bottom-[1%] z-[3] h-[78%] w-[69%] origin-bottom-left sm:-left-[17%]"
        initial={{ opacity: 0, x: -32 }}
        animate={{ opacity: 0.95, x: 0, rotate: [-0.55, 0.25, -0.55] }}
        transition={{
          opacity: { duration: 1.1, delay: 0.25, ease: EASE },
          x: { duration: 1.1, delay: 0.25, ease: EASE },
          rotate: { duration: 10, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <DecorativeImage
          src="floral-left.png"
          sizes="(max-width: 640px) 69vw, 24rem"
          className="object-contain object-left-bottom"
        />
      </motion.div>

      <motion.div
        className="absolute -right-[23%] bottom-[1%] z-[3] h-[78%] w-[69%] origin-bottom-right sm:-right-[17%]"
        initial={{ opacity: 0, x: 32 }}
        animate={{ opacity: 0.95, x: 0, rotate: [0.55, -0.25, 0.55] }}
        transition={{
          opacity: { duration: 1.1, delay: 0.3, ease: EASE },
          x: { duration: 1.1, delay: 0.3, ease: EASE },
          rotate: { duration: 11, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <DecorativeImage
          src="floral-right.png"
          sizes="(max-width: 640px) 69vw, 24rem"
          className="object-contain object-right-bottom"
        />
      </motion.div>

      <motion.div
        className="absolute -left-[14%] -right-[14%] -top-[1.5%] z-[4] h-[31%] origin-top"
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 0.98, y: 0, rotate: [-0.35, 0.35, -0.35] }}
        transition={{
          opacity: { duration: 1, delay: 0.15, ease: EASE },
          y: { duration: 1, delay: 0.15, ease: EASE },
          rotate: { duration: 9, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <DecorativeImage
          src="floral-top.png"
          sizes="(max-width: 640px) 128vw, 44rem"
          className="object-contain object-top"
        />
      </motion.div>

      <motion.div
        className="absolute bottom-[1%] left-[8%] z-[2] h-[10%] w-[20%]"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 0.72,
          x: [-4, 5, -4],
          y: [2, -5, 2],
          rotate: [-1.5, 1.5, -1.5],
        }}
        transition={{
          opacity: { duration: 0.9, delay: 1 },
          x: { duration: 6.4, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 5.8, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 6.4, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <DecorativeImage
          src="bird-flying-right.png"
          sizes="8rem"
          className="object-contain"
        />
      </motion.div>

      <motion.div
        className="absolute right-[7%] top-[36%] z-[2] h-[11%] w-[20%]"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 0.68,
          x: [4, -5, 4],
          y: [-1, -7, -1],
          rotate: [1.5, -1.5, 1.5],
        }}
        transition={{
          opacity: { duration: 0.9, delay: 1.15 },
          x: { duration: 7, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 6.2, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 7, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <DecorativeImage
          src="bird-hovering.png"
          sizes="8rem"
          className="object-contain"
        />
      </motion.div>

      <motion.div
        className="absolute -bottom-[2%] -left-[16%] -right-[16%] z-[6] h-[27%] origin-bottom"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 0.98, y: [0, 3, 0] }}
        transition={{
          opacity: { duration: 1.1, delay: 0.35, ease: EASE },
          y: { duration: 8, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <DecorativeImage
          src="floral-bottom.png"
          sizes="(max-width: 640px) 132vw, 46rem"
          className="object-contain object-bottom"
        />
      </motion.div>
    </div>
  );
}
