"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { useLenis } from "@/hooks/useLenis";
import { useGuestName } from "@/hooks/useGuestName";
import { MusicButton } from "@/components/MusicButton";
import { Loading } from "@/sections/Loading";
import { Hero } from "@/sections/Hero";
import { Quote } from "@/sections/Quote";
import { Story } from "@/sections/Story";
import { BrideGroom } from "@/sections/BrideGroom";
import { SaveDate } from "@/sections/SaveDate";
import { EventDetails } from "@/sections/EventDetails";
import { Gallery } from "@/sections/Gallery";
import { Wishes } from "@/sections/Wishes";
import { Gift } from "@/sections/Gift";
import { Closing } from "@/sections/Closing";
import { SoftDivider } from "@/components/SoftDivider";
import { motionTokens } from "@/animations/tokens";
import config from "@/lib/config";

/**
 * Top-level client orchestrator: loading screen → cover → (on open) the full
 * scrollable invitation with smooth scroll and music.
 *
 * The page is a sequence of opaque paper "chapters" with alternating mat
 * backgrounds (MASTER.md §14) — the fixed painted backdrop is retired.
 */
export function InvitationShell() {
  const [loading, setLoading] = useState(true);
  const [opened, setOpened] = useState(false);
  const guestName = useGuestName();

  useLenis(opened);

  // hide the loading screen after a short reveal
  useEffect(() => {
    const id = setTimeout(() => setLoading(false), 2400);
    return () => clearTimeout(id);
  }, []);

  // lock body scroll until the invitation is opened
  useEffect(() => {
    document.body.classList.toggle("locked", !opened);
    return () => document.body.classList.remove("locked");
  }, [opened]);

  const handleOpen = () => {
    setOpened(true);
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "auto" });
    });

    window.setTimeout(() => {
      document.getElementById("isi-undangan")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 900);
  };

  return (
    <MotionConfig reducedMotion="never">
      <a href="#isi-undangan" className="skip-link">
        Lewati ke isi undangan
      </a>

      <Loading show={loading} />
      <MusicButton src={config.music} active={opened} />

      <main className="relative bg-ivory-50">
        <Hero guestName={guestName} opened={opened} onOpen={handleOpen} />

        <AnimatePresence>
          {opened && (
            <motion.div
              id="isi-undangan"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: motionTokens.durationSection,
                delay: 0.72,
                ease: motionTokens.easeOut,
              }}
            >
              <Quote />
              <SoftDivider from="var(--sage-100)" to="var(--ivory-50)" />
              <Story />
              <SoftDivider from="var(--ivory-50)" to="var(--beige-200)" />
              <BrideGroom />
              <SoftDivider from="var(--beige-200)" to="var(--ivory-50)" />
              <SaveDate />
              <SoftDivider from="var(--ivory-50)" to="var(--sage-100)" />
              <EventDetails />
              <SoftDivider from="var(--sage-100)" to="var(--beige-200)" />
              <Gallery />
              <SoftDivider from="var(--beige-200)" to="var(--ivory-50)" />
              <Wishes />
              <SoftDivider from="var(--ivory-50)" to="var(--sage-100)" />
              <Gift />
              <SoftDivider from="var(--sage-100)" to="var(--beige-200)" />
              <Closing />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </MotionConfig>
  );
}
