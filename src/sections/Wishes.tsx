"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  HiOutlinePaperAirplane,
  HiCheckBadge,
  HiOutlineArrowUturnLeft,
} from "react-icons/hi2";
import { SectionTitle } from "@/components/Decor";
import { StaggerGroup, RevealItem } from "@/components/Reveal";
import { WatercolorLayer } from "@/components/decorative/WatercolorLayer";
import { useGuestInfo } from "@/hooks/useGuestName";
import { motionTokens } from "@/animations/tokens";
import {
  slideFromLeft,
  slideFromRight,
  staggerContainer,
} from "@/animations/variants";
import { attendanceLabel, relativeTime } from "@/lib/utils";
import type { Wish } from "@/lib/types";

const PAGE_SIZE = 4;
const ATTENDANCE: Wish["attendance"][] = ["hadir", "tidak_hadir", "ragu"];
const GUEST_FALLBACK = "Tamu Undangan";

const COUNTERS: {
  key: Wish["attendance"];
  label: string;
  ring: string;
  text: string;
  bg: string;
}[] = [
  { key: "hadir", label: "Hadir", ring: "ring-emerald-500/30", text: "text-emerald-700", bg: "bg-emerald-50" },
  { key: "tidak_hadir", label: "Tidak Hadir", ring: "ring-rose-500/30", text: "text-rose-700", bg: "bg-rose-50" },
  { key: "ragu", label: "Masih Ragu", ring: "ring-amber-500/30", text: "text-amber-700", bg: "bg-amber-50" },
];

interface RegisteredGuest {
  id: string;
  unique_code: string;
  name: string;
  pax: number;
  rsvp_status: string;
  wish_message: string;
}

/** Crossfade between the form's mutually-exclusive states. */
const formState = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: {
    duration: motionTokens.durationBase,
    ease: motionTokens.easeOut,
  },
} as const;

/**
 * Guestbook: RSVP counters + form + paginated wishes with replies.
 * Editorial restyle only — Supabase lookup, RSVP submission, wish posting,
 * replies, and pagination are unchanged (IMPLEMENTATION_PLAN §P2.1–P2.2).
 */
export function Wishes() {
  const guestInfo = useGuestInfo();
  const guestName = guestInfo.name;
  const guestCode = guestInfo.code;
  const isPersonalised = guestName !== GUEST_FALLBACK;
  const hasInvitationCode = !!guestCode;

  // Registered guest data from Supabase
  const [registeredGuest, setRegisteredGuest] = useState<RegisteredGuest | null>(null);
  const [guestLookupDone, setGuestLookupDone] = useState(false);

  const [wishes, setWishes] = useState<Wish[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [attendance, setAttendance] = useState<Wish["attendance"]>("hadir");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  // reply thread state (one open form at a time)
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyName, setReplyName] = useState("");
  const [replyMessage, setReplyMessage] = useState("");
  const [replyStatus, setReplyStatus] = useState<"idle" | "sending" | "error">(
    "idle"
  );

  // Look up registered guest by unique code
  useEffect(() => {
    if (!guestCode) {
      setGuestLookupDone(true);
      return;
    }

    fetch(`/api/rsvp?code=${encodeURIComponent(guestCode)}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.guest) {
          setRegisteredGuest(d.guest);
          // Prefill form with existing data
          if (d.guest.rsvp_status && d.guest.rsvp_status !== "pending") {
            setAttendance(d.guest.rsvp_status as Wish["attendance"]);
          }
          if (d.guest.wish_message) {
            setMessage(d.guest.wish_message);
          }
        }
        setGuestLookupDone(true);
      })
      .catch(() => {
        setGuestLookupDone(true);
      });
  }, [guestCode]);

  useEffect(() => {
    fetch("/api/wishes")
      .then((r) => r.json())
      .then((d) => setWishes(d.wishes ?? []))
      .catch(() => {});
  }, []);

  // prefill the name with the invited guest's name once it resolves
  useEffect(() => {
    if (registeredGuest) {
      setName(registeredGuest.name);
      setReplyName(registeredGuest.name);
    } else if (isPersonalised) {
      setName((cur) => (cur ? cur : guestName));
      setReplyName((cur) => (cur ? cur : guestName));
    }
  }, [guestName, isPersonalised, registeredGuest]);

  const counts = useMemo(() => {
    const c = { hadir: 0, tidak_hadir: 0, ragu: 0 } as Record<
      Wish["attendance"],
      number
    >;
    for (const w of wishes) c[w.attendance] = (c[w.attendance] ?? 0) + 1;
    return c;
  }, [wishes]);

  const submitRsvp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!hasInvitationCode || !registeredGuest) return;
    if (!message.trim()) return;

    setStatus("sending");

    try {
      // Submit RSVP to Supabase via the RSVP API
      const rsvpRes = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: guestCode,
          rsvp_status: attendance,
          wish_message: message.trim(),
        }),
      });

      if (!rsvpRes.ok) throw new Error();

      // Also add to the wishes guestbook (file-based) for display
      const wishRes = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: registeredGuest.name,
          message: message.trim(),
          attendance,
          verified: true,
        }),
      });

      if (wishRes.ok) {
        const { wish } = await wishRes.json();
        setWishes((prev) => [wish, ...prev]);
      }

      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const submitReply = async (wishId: string) => {
    if (!replyName.trim() || !replyMessage.trim()) return;
    setReplyStatus("sending");
    try {
      const res = await fetch("/api/wishes/reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wishId, name: replyName, message: replyMessage }),
      });
      if (!res.ok) throw new Error();
      const { reply } = await res.json();
      setWishes((prev) =>
        prev.map((w) =>
          w.id === wishId
            ? { ...w, replies: [...(w.replies ?? []), reply] }
            : w
        )
      );
      setReplyMessage("");
      setReplyTo(null);
      setReplyStatus("idle");
    } catch {
      setReplyStatus("error");
    }
  };

  return (
    <section
      aria-labelledby="wishes-title"
      className="section-pad relative isolate overflow-hidden bg-ivory-50"
    >
      <WatercolorLayer
        src="watercolor-tree-grove.png"
        className="bottom-0 left-1/2 h-[min(21rem,54vw)] w-[min(62rem,128vw)] -translate-x-1/2"
        opacity={0.16}
        sizes="(max-width: 640px) 128vw, 62rem"
      />
      <div className="relative z-[1]">
        <SectionTitle id="wishes-title" eyebrow="Send Your Love" title="Wedding Wishes" />

      <StaggerGroup
        variants={staggerContainer}
        early
        className="mx-auto mt-12 grid max-w-4xl gap-8 lg:grid-cols-2"
      >
        {/* form */}
        <RevealItem variants={slideFromLeft} className="paper-card h-fit p-6 sm:p-8">
          <AnimatePresence mode="wait" initial={false}>
          {!guestLookupDone ? (
            <motion.div key="loading" {...formState} className="flex items-center justify-center py-8" role="status">
              <div
                aria-hidden="true"
                className="h-6 w-6 animate-spin rounded-full border-2 border-olive-600 border-t-transparent"
              />
              <span className="sr-only">Memuat data tamu…</span>
            </motion.div>
          ) : !hasInvitationCode ? (
            /* No invitation code — show a message */
            <motion.div key="no-code" {...formState} className="py-8 text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-sage-300 bg-sage-100">
                <svg
                  aria-hidden="true"
                  className="h-7 w-7 text-olive-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>
              </div>
              <p
                className="font-display font-semibold text-olive-900"
                style={{ fontSize: "var(--text-h3)" }}
              >
                RSVP Khusus Tamu Terdaftar
              </p>
              <p className="mt-3 font-body text-base leading-relaxed text-olive-700">
                Untuk mengisi RSVP dan memberikan ucapan, silakan buka undangan melalui link khusus yang telah dikirimkan kepada Anda.
              </p>
            </motion.div>
          ) : !registeredGuest ? (
            /* Invalid code */
            <motion.div key="invalid" {...formState} className="py-8 text-center">
              <p
                className="font-display font-semibold text-error"
                style={{ fontSize: "var(--text-h3)" }}
              >
                Kode Undangan Tidak Valid
              </p>
              <p className="mt-3 font-body text-base leading-relaxed text-olive-700">
                Kode undangan yang Anda gunakan tidak ditemukan. Pastikan Anda membuka link yang benar.
              </p>
            </motion.div>
          ) : status === "success" ? (
            /* Success message */
            <motion.div key="success" {...formState} className="py-8 text-center" role="status">
              <motion.div
                className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-olive-600 bg-sage-100"
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ ...motionTokens.spring, delay: 0.1 }}
              >
                <svg
                  aria-hidden="true"
                  className="h-7 w-7 text-olive-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </motion.div>
              <p
                className="font-display font-semibold text-olive-900"
                style={{ fontSize: "var(--text-h3)" }}
              >
                Terima Kasih, {registeredGuest.name}!
              </p>
              <p className="mt-3 font-body text-base leading-relaxed text-olive-700">
                RSVP dan ucapan Anda telah tersimpan. Kami sangat menantikan kehadiran Anda.
              </p>
            </motion.div>
          ) : (
            /* RSVP Form for registered guests */
            <motion.form key="form" {...formState} onSubmit={submitRsvp} className="space-y-5">
              <div className="border border-sage-300 bg-sage-100 p-3">
                <div className="flex items-center gap-2">
                  <HiCheckBadge
                    aria-hidden="true"
                    className="text-lg text-olive-600"
                  />
                  <span className="font-body text-base font-medium text-olive-900">
                    {registeredGuest.name}
                  </span>
                </div>
                <p className="mt-1 font-body text-sm text-olive-700">
                  Kode: {registeredGuest.unique_code} · Kuota: {registeredGuest.pax} orang
                </p>
              </div>

              <div>
                <span
                  id="attendance-label"
                  className="font-body text-sm font-medium text-olive-700"
                >
                  Kehadiran
                </span>
                <div
                  role="radiogroup"
                  aria-labelledby="attendance-label"
                  className="mt-2 grid grid-cols-3 gap-2"
                >
                  {ATTENDANCE.map((a) => (
                    <button
                      type="button"
                      key={a}
                      role="radio"
                      aria-checked={attendance === a}
                      onClick={() => setAttendance(a)}
                      className={`min-h-11 cursor-pointer rounded border px-2 py-2 font-body text-sm transition-colors duration-200 ${
                        attendance === a
                          ? "border-olive-600 bg-olive-600 text-ivory-50"
                          : "border-sage-300 bg-ivory-50 text-olive-700 hover:bg-sage-100"
                      }`}
                    >
                      {attendanceLabel[a]}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label
                  htmlFor="wish-message"
                  className="font-body text-sm font-medium text-olive-700"
                >
                  Ucapan &amp; Doa
                </label>
                <textarea
                  id="wish-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={500}
                  required
                  rows={3}
                  placeholder="Tulis ucapan dan doa terbaik Anda..."
                  className="mt-2 w-full resize-none rounded border border-sage-300 bg-ivory-50 px-4 py-3 font-body text-base text-olive-900 outline-none transition-colors duration-200 placeholder:text-sage-500 focus:border-olive-600"
                />
                <p className="mt-1 font-body text-sm text-olive-700">
                  Maksimal 500 karakter.
                </p>
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="btn-olive w-full disabled:cursor-not-allowed disabled:opacity-45"
              >
                <HiOutlinePaperAirplane aria-hidden="true" />
                {status === "sending" ? "Mengirim..." : "Kirim RSVP & Ucapan"}
              </button>
              <AnimatePresence>
                {status === "error" && (
                  <motion.p
                    role="alert"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: motionTokens.durationFast }}
                    className="text-center font-body text-sm text-error"
                  >
                    Gagal mengirim. Silakan coba lagi.
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.form>
          )}
          </AnimatePresence>
        </RevealItem>

        {/* list */}
        <RevealItem variants={slideFromRight} className="flex flex-col">
          <p className="mb-3 font-body text-sm text-olive-700" aria-live="polite">
            {wishes.length} ucapan
          </p>
          <div className="no-scrollbar max-h-[28rem] space-y-3 overflow-y-auto pr-1">
            {wishes.length === 0 && (
              <p className="paper-card p-4 text-center font-body text-base text-olive-700">
                Jadilah yang pertama memberi ucapan
              </p>
            )}
            <AnimatePresence initial={false}>
            {wishes.slice(0, visible).map((w) => (
              <motion.article
                key={w.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{
                  duration: motionTokens.durationBase,
                  ease: motionTokens.easeOut,
                }}
                className="paper-card p-4 sm:p-5"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="flex items-center gap-1.5 font-body text-base font-medium text-olive-900">
                    {w.name}
                    {w.verified && (
                      <span
                        className="inline-flex items-center gap-0.5 rounded-full border border-sage-300 bg-sage-100 px-1.5 py-0.5 text-xs font-medium text-olive-700"
                        title="Tamu undangan"
                      >
                        <HiCheckBadge
                          aria-hidden="true"
                          className="text-sm text-olive-600"
                        />
                        Tamu
                      </span>
                    )}
                  </p>
                  <span className="shrink-0 rounded-full border border-sage-300 bg-sage-100 px-2 py-0.5 text-xs uppercase tracking-wide text-olive-700">
                    {attendanceLabel[w.attendance]}
                  </span>
                </div>

                <p className="mt-2 font-body text-base leading-relaxed text-olive-700">
                  {w.message}
                </p>

                <div className="mt-3 flex items-center gap-4">
                  <span className="font-body text-xs text-sage-500">
                    {relativeTime(w.createdAt)}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setReplyTo((cur) => (cur === w.id ? null : w.id));
                      setReplyStatus("idle");
                    }}
                    aria-expanded={replyTo === w.id}
                    className="inline-flex min-h-8 cursor-pointer items-center gap-1 py-1 font-body text-sm font-medium text-olive-600 transition-colors duration-200 hover:text-olive-700"
                  >
                    <HiOutlineArrowUturnLeft aria-hidden="true" className="text-sm" />
                    Balas
                  </button>
                </div>

                {/* replies */}
                {w.replies && w.replies.length > 0 && (
                  <ul className="mt-3 space-y-2 border-l border-sage-300 pl-3">
                    {w.replies.map((r) => (
                      <li key={r.id}>
                        <div className="flex items-center gap-2">
                          <p className="font-body text-sm font-medium text-olive-900">
                            {r.name}
                          </p>
                          <span className="font-body text-xs text-sage-500">
                            {relativeTime(r.createdAt)}
                          </span>
                        </div>
                        <p className="font-body text-sm leading-relaxed text-olive-700">
                          {r.message}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}

                {/* inline reply form */}
                <AnimatePresence initial={false}>
                {replyTo === w.id && (
                  <motion.div
                    key="reply-form"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{
                      duration: motionTokens.durationBase,
                      ease: motionTokens.easeOut,
                    }}
                    className="overflow-hidden"
                  >
                  <div className="mt-3 space-y-3 border border-sage-300 bg-sage-100 p-3">
                    <div>
                      <label
                        htmlFor={`reply-name-${w.id}`}
                        className="font-body text-sm font-medium text-olive-700"
                      >
                        Nama Anda
                      </label>
                      <input
                        id={`reply-name-${w.id}`}
                        value={replyName}
                        onChange={(e) => setReplyName(e.target.value)}
                        maxLength={60}
                        placeholder="Nama Anda"
                        className="mt-1 min-h-11 w-full rounded border border-sage-300 bg-ivory-50 px-3 py-2 font-body text-base text-olive-900 outline-none transition-colors duration-200 placeholder:text-sage-500 focus:border-olive-600"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor={`reply-message-${w.id}`}
                        className="font-body text-sm font-medium text-olive-700"
                      >
                        Balasan
                      </label>
                      <textarea
                        id={`reply-message-${w.id}`}
                        value={replyMessage}
                        onChange={(e) => setReplyMessage(e.target.value)}
                        maxLength={300}
                        rows={2}
                        placeholder={`Balas ${w.name}...`}
                        className="mt-1 w-full resize-none rounded border border-sage-300 bg-ivory-50 px-3 py-2 font-body text-base text-olive-900 outline-none transition-colors duration-200 placeholder:text-sage-500 focus:border-olive-600"
                      />
                    </div>
                    <div className="flex items-center justify-end gap-2">
                      {replyStatus === "error" && (
                        <span role="alert" className="mr-auto font-body text-sm text-error">
                          Gagal mengirim.
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => setReplyTo(null)}
                        className="min-h-11 cursor-pointer rounded px-3 py-1.5 font-body text-sm text-olive-700 transition-colors duration-200 hover:text-olive-900"
                      >
                        Batal
                      </button>
                      <button
                        type="button"
                        onClick={() => submitReply(w.id)}
                        disabled={replyStatus === "sending"}
                        className="btn-olive !min-h-11 !px-4 !py-1.5 !text-sm disabled:cursor-not-allowed disabled:opacity-45"
                      >
                        {replyStatus === "sending" ? "Mengirim..." : "Kirim"}
                      </button>
                    </div>
                  </div>
                  </motion.div>
                )}
                </AnimatePresence>
              </motion.article>
            ))}
            </AnimatePresence>
          </div>
          {visible < wishes.length && (
            <button
              onClick={() => setVisible((v) => v + PAGE_SIZE)}
              className="btn-ghost mx-auto mt-4"
            >
              Lihat ucapan lainnya
            </button>
          )}
        </RevealItem>
      </StaggerGroup>
      </div>
    </section>
  );
}
