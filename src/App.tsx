"use client";

import React, { useMemo, useRef, useState, useEffect } from "react";

type Step = "intro" | "reasons" | "final" | "yes";

export default function Page() {
  // ==== CUSTOMIZE THESE ====
  const herName = "Hawanatu"; // <-- change
  const yourName = "Edward"; // <-- change
  const nickname = "Baby umm"; // <-- change
  const dateLine = "This Valentine’s Day ❤️"; // <-- change
  const footerNote = "P.S. You’re my best decision, every day."; // <-- change

  const reasons = [
    "You make my life feel warm and safe.",
    "Your smile fixes my mood instantly.",
    "You’re my peace… and my excitement.",
    "I love how you show up with your whole heart.",
    "I don’t just love you — I choose you.",
    "I want to keep making memories with you.",
  ];

  // Optional: Use your own images (recommended) by placing them in /public
  // then use src like "/photos/1.jpg"
  const photos = [
    "/photos/1.jpg",
    "/photos/2.jpg",
    "/photos/3.jpg",
  ];
  // =========================

  const [step, setStep] = useState<Step>("intro");
  const [reasonIndex, setReasonIndex] = useState(0);

  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);

  const yesButtonSize = Math.min(22 + noCount * 6, 56);

  const noPhrases = useMemo(
    () => [
      "No",
      "Are you sure? 🥺",
      "Like… sure sure?",
      "Think again, pretty please 😭",
      "I wrote this with love though…",
      "Okay wait… don’t do this to me 😩",
      "My heart is doing backflips…",
      "You’re really gonna press that? 😔",
      "One more chance… for us? 💘",
      "You’re breaking my heart a lil 😭",
      "Last chance… (I’m shaking)",
      "Okay fine… but I’ll still adore you 😤❤️",
    ],
    []
  );

  const currentNoText = noPhrases[Math.min(noCount, noPhrases.length - 1)];

  const nextReason = () => {
    if (reasonIndex < reasons.length - 1) setReasonIndex((i) => i + 1);
    else setStep("final");
  };

  const goFinal = () => setStep("final");

  const handleNoClick = () => setNoCount((c) => c + 1);

  const onYes = () => {
    setYesPressed(true);
    setStep("yes");
  };

  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-pink-50 via-rose-50 to-white text-slate-900 flex items-center justify-center px-4">
      <FloatingHearts active={step === "yes"} />

      <div className="w-full max-w-xl">
        <Card>
          <TopBadge text={dateLine} />

          {step !== "yes" && (
            <div className="text-center mb-6">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                {step === "intro" && (
                  <>
                    Hey {herName}…{" "}
                    <span className="text-rose-600">I made something for you</span>
                  </>
                )}
                {step === "reasons" && (
                  <>
                    Before I ask…{" "}
                    <span className="text-rose-600">here’s why you mean so much</span>
                  </>
                )}
                {step === "final" && (
                  <>
                    Okay… deep breath 😳{" "}
                    <span className="text-rose-600">I have a question</span>
                  </>
                )}
              </h1>

              <p className="mt-3 text-base sm:text-lg text-slate-700">
                {step === "intro" && (
                  <>
                    From {yourName} to {nickname}. <br />
                    Tap through — it’s short, sweet, and very real.
                  </>
                )}
                {step === "reasons" && (
                  <>
                    No long speech. Just the truth — one reason at a time.
                  </>
                )}
                {step === "final" && (
                  <>
                    Whatever you choose… you’re still my favorite. ❤️
                  </>
                )}
              </p>
            </div>
          )}

          {/* Content */}
          {step === "intro" && (
            <div className="flex flex-col items-center">
              <MediaFrame>
                <img
                  className="h-[220px] w-auto select-none"
                  src="https://gifdb.com/images/high/cute-love-bear-roses-ou7zho5oosxnpo6k.gif"
                  alt="Cute bear with roses"
                  draggable={false}
                />
              </MediaFrame>

              <div className="mt-6 flex gap-3">
                <PrimaryButton onClick={() => setStep("reasons")}>
                  Start 💌
                </PrimaryButton>
                <GhostButton onClick={goFinal}>Skip to the question 😅</GhostButton>
              </div>
            </div>
          )}

          {step === "reasons" && (
            <div className="flex flex-col items-center">
              <MediaFrame>
                <MiniSlideshow images={photos} />
              </MediaFrame>

              <div className="mt-6 w-full">
                <div className="rounded-2xl bg-white border border-rose-100 p-5 shadow-sm">
                  <div className="text-sm text-rose-600 font-semibold mb-2">
                    Reason {reasonIndex + 1} of {reasons.length}
                  </div>
                  <div className="text-xl sm:text-2xl font-bold leading-snug">
                    {reasons[reasonIndex]}
                  </div>
                </div>

                <div className="mt-5 flex justify-center gap-3">
                  <GhostButton
                    onClick={() => setReasonIndex((i) => Math.max(0, i - 1))}
                    disabled={reasonIndex === 0}
                  >
                    Back
                  </GhostButton>
                  <PrimaryButton onClick={nextReason}>
                    {reasonIndex < reasons.length - 1 ? "Next 💗" : "Okay… ask me 😳"}
                  </PrimaryButton>
                </div>
              </div>
            </div>
          )}

          {step === "final" && (
            <div className="flex flex-col items-center">
              <MediaFrame>
                <img
                  className="h-[220px] w-auto select-none"
                  src="https://media.tenor.com/0u9n9s7p6Q0AAAAi/peach-goma-love.gif"
                  alt="Cute love gif"
                  draggable={false}
                />
              </MediaFrame>

              <h2 className="mt-6 text-3xl sm:text-4xl font-extrabold text-center">
                Will you be my Valentine, <span className="text-rose-600">{herName}</span>?
              </h2>

              <p className="mt-3 text-slate-700 text-center">
                I’m not asking for perfection… just <span className="font-semibold">you</span>.
              </p>

              <div className="mt-6 flex items-center justify-center gap-4">
                <button
                  className="rounded-2xl px-6 py-3 font-bold text-white shadow-md active:scale-[0.98] transition"
                  style={{
                    fontSize: yesButtonSize,
                    background: "linear-gradient(135deg, #22c55e, #16a34a)",
                  }}
                  onClick={onYes}
                >
                  Yes 💘
                </button>

                <button
                  className="rounded-2xl px-5 py-3 font-bold text-white shadow-md active:scale-[0.98] transition bg-rose-500 hover:bg-rose-600"
                  onClick={handleNoClick}
                  aria-label="No"
                >
                  {currentNoText}
                </button>
              </div>

              <div className="mt-5 text-sm text-slate-500 text-center">
                {noCount >= 5 ? "😭 okay you’re scary… but still cute." : "No pressure… (tiny pressure) 😅"}
              </div>
            </div>
          )}

          {step === "yes" && (
            <div className="flex flex-col items-center text-center">
              <MediaFrame>
                <img
                  className="h-[240px] w-auto select-none"
                  src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif"
                  alt="Bear kiss"
                  draggable={false}
                />
              </MediaFrame>

              <h2 className="mt-6 text-4xl sm:text-5xl font-extrabold text-rose-600">
                YAYYYYY!!! 💖
              </h2>

              <p className="mt-3 text-lg text-slate-700 max-w-md">
                {herName}, you just made my whole heart smile. <br />
                I love you — and I’m so happy it’s you. 🥹
              </p>

              <div className="mt-6 rounded-2xl bg-white border border-rose-100 p-5 shadow-sm max-w-md">
                <div className="font-semibold text-slate-800">
                  A promise from {yourName}:
                </div>
                <div className="mt-2 text-slate-700">
                  I’ll keep choosing you, protecting your peace, and loving you loudly — in the little moments and the big ones.
                </div>
              </div>

              <div className="mt-6 text-sm text-slate-500">{footerNote}</div>

              <div className="mt-6 flex gap-3">
                <PrimaryButton onClick={() => { setNoCount(0); setReasonIndex(0); setYesPressed(false); setStep("intro"); }}>
                  Replay 🔁
                </PrimaryButton>
                <GhostButton onClick={() => window.print()}>
                  Print / Save 💾
                </GhostButton>
              </div>
            </div>
          )}
        </Card>

        <div className="mt-5 text-center text-xs text-slate-400">
          Built with love by {yourName} 💗
        </div>
      </div>
    </main>
  );
}

/* ---------------- UI bits ---------------- */

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-white/70 backdrop-blur border border-rose-100 shadow-xl p-6 sm:p-8">
      <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-rose-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-pink-200/40 blur-3xl" />
      {children}
    </div>
  );
}

function TopBadge({ text }: { text: string }) {
  return (
    <div className="flex justify-center mb-6">
      <div className="rounded-full bg-rose-100 text-rose-700 px-4 py-1 text-sm font-semibold border border-rose-200">
        {text}
      </div>
    </div>
  );
}

function MediaFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full flex justify-center">
      <div className="rounded-3xl bg-white border border-rose-100 shadow-sm px-5 py-4">
        {children}
      </div>
    </div>
  );
}

function PrimaryButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="rounded-2xl px-6 py-3 font-bold text-white shadow-md active:scale-[0.98] transition
      bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600"
    >
      {children}
    </button>
  );
}

function GhostButton({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded-2xl px-6 py-3 font-semibold border shadow-sm active:scale-[0.98] transition
      ${disabled ? "opacity-40 cursor-not-allowed" : "hover:bg-white"}
      bg-white/60 border-rose-200 text-rose-700`}
    >
      {children}
    </button>
  );
}

/* ---------------- Mini slideshow ---------------- */
function MiniSlideshow({ images }: { images: string[] }) {
  const [i, setI] = useState(0);

  // If no photos provided, show a cute fallback
  const hasPhotos = images?.filter(Boolean).length > 0;

  useEffect(() => {
    if (!hasPhotos) return;
    const t = setInterval(() => setI((x) => (x + 1) % images.length), 2200);
    return () => clearInterval(t);
  }, [hasPhotos, images.length]);

  if (!hasPhotos) {
    return (
      <img
        className="h-[220px] w-auto select-none"
        src="https://media.tenor.com/8pQh9l9VvXkAAAAi/love-you.gif"
        alt="Love gif"
        draggable={false}
      />
    );
  }

  return (
    <img
      className="h-[220px] w-[320px] object-cover rounded-2xl select-none"
      src={images[i]}
      alt="Memory"
      draggable={false}
      onError={(e) => {
        // If images not found, avoid broken icons.
        (e.currentTarget as HTMLImageElement).src =
          "https://media.tenor.com/8pQh9l9VvXkAAAAi/love-you.gif";
      }}
    />
  );
}

/* ---------------- Floating hearts overlay ---------------- */
function FloatingHearts({ active }: { active: boolean }) {
  const [hearts, setHearts] = useState<{ id: number; left: number; size: number; dur: number; delay: number }[]>([]);
  const idRef = useRef(1);

  useEffect(() => {
    if (!active) {
      setHearts([]);
      return;
    }

    const spawn = () => {
      const id = idRef.current++;
      const left = Math.random() * 100;
      const size = 14 + Math.random() * 22;
      const dur = 4 + Math.random() * 3.5;
      const delay = Math.random() * 0.6;

      setHearts((h) => [...h, { id, left, size, dur, delay }]);

      // cleanup after animation
      setTimeout(() => {
        setHearts((h) => h.filter((x) => x.id !== id));
      }, (dur + delay) * 1000 + 100);
    };

    const interval = setInterval(spawn, 180);
    return () => clearInterval(interval);
  }, [active]);

  if (!active) return null;

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {hearts.map((h) => (
        <div
          key={h.id}
          style={{
            position: "absolute",
            left: `${h.left}%`,
            bottom: "-40px",
            fontSize: `${h.size}px`,
            animation: `floatUp ${h.dur}s ease-in forwards`,
            animationDelay: `${h.delay}s`,
            filter: "drop-shadow(0 6px 10px rgba(244, 63, 94, 0.25))",
          }}
        >
          💗
        </div>
      ))}

      <style jsx global>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) scale(0.9);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          100% {
            transform: translateY(-110vh) scale(1.25);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
