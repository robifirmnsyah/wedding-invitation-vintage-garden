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
  };

  return (
    <MotionConfig reducedMotion="user">
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Quote />
              <Story />
              <BrideGroom />
              <SaveDate />
              <EventDetails />
              <Gallery />
              <Wishes />
              <Gift />
              <Closing />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </MotionConfig>
  );
}
