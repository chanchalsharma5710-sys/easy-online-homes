import { useChat } from "@ai-sdk/react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { DefaultChatTransport } from "ai";
import { BookOpen, BedDouble, IndianRupee, RotateCcw, Award, Briefcase, ClipboardCheck } from "lucide-react";
import { useEffect, useMemo, useRef } from "react";
import { toast } from "sonner";

import assistantImg from "@/assets/ju-assistant.png";
import { Conversation, ConversationContent, ConversationScrollButton } from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
  type PromptInputMessage,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { Button } from "@/components/ui/button";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/assistant")({
  head: () => ({
    meta: [
      { title: "JU Smart Assistant — AI College Enquiry Chatbot | JECRC University" },
      { name: "description", content: "Chat with JU Smart Assistant in English or Hindi about JECRC University courses, fees, admission, scholarships, hostel and placements." },
      { property: "og:title", content: "JU Smart Assistant – JECRC University" },
      { property: "og:description", content: "AI chatbot that answers student enquiries about JECRC University in English and Hindi." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AssistantPage,
});

const suggestions = {
  en: [
    { icon: BookOpen, text: "What courses are available at JECRC?" },
    { icon: IndianRupee, text: "What is the fee for B.Tech CSE with AI & Data Science?" },
    { icon: ClipboardCheck, text: "What is the admission process and which documents are needed?" },
    { icon: Award, text: "I scored 87% in 12th. Which scholarship can I get?" },
    { icon: BedDouble, text: "Hostel fees for AC and non-AC rooms?" },
    { icon: Briefcase, text: "What was the highest placement package?" },
  ],
  hi: [
    { icon: BookOpen, text: "JECRC में कौन-कौन से कोर्स हैं?" },
    { icon: IndianRupee, text: "B.Tech CSE की फीस कितनी है?" },
    { icon: ClipboardCheck, text: "एडमिशन के लिए कौन से दस्तावेज़ चाहिए?" },
    { icon: Award, text: "12वीं में 87% हैं, कितनी स्कॉलरशिप मिलेगी?" },
    { icon: BedDouble, text: "हॉस्टल की फीस कितनी है?" },
    { icon: Briefcase, text: "मुझे कोडिंग पसंद है, कौन सा कोर्स लूँ?" },
  ],
};

function AssistantPage() {
  const { t, lang } = useLang();
  const transport = useMemo(() => new DefaultChatTransport({ api: "/api/chat" }), []);
  const { messages, sendMessage, status, stop, setMessages, error } = useChat({
    transport,
    onError: (err) => {
      const msg = err.message?.includes("fetch") ? "Network problem — check your connection and try again." : err.message || "Something went wrong.";
      toast.error(msg);
    },
  });
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (status === "ready" || status === "error") textareaRef.current?.focus();
  }, [status]);

  const send = (text: string) => {
    const value = text.trim();
    if (!value || busy) return;
    void sendMessage({ text: value });
    requestAnimationFrame(() => textareaRef.current?.focus());
  };

  const handleSubmit = (m: PromptInputMessage) => send(m.text);

  return (
    <section className="mx-auto flex h-[calc(100vh-72px)] min-h-[560px] max-w-5xl flex-col px-3 py-4 sm:px-6">
      {/* Agent header */}
      <div className="flex items-center gap-4 rounded-2xl bg-navy-gradient p-4 text-navy-foreground shadow-lift">
        <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-card ring-2 ring-saffron">
          <img src={assistantImg} alt="JU Smart Assistant" width={56} height={56} className="size-12" />
        </span>
        <div className="min-w-0 flex-1">
          <h1 className="truncate font-display text-xl font-bold">{t("chat.name")} – JECRC University</h1>
          <p className="flex items-center gap-2 text-xs text-navy-foreground/75">
            <span className="size-2 rounded-full bg-saffron" /> {t("chat.sub")} · English + हिंदी
          </p>
        </div>
        {messages.length > 0 && (
          <Button
            variant="heroOutline"
            size="sm"
            className="rounded-full"
            onClick={() => {
              stop();
              setMessages([]);
              textareaRef.current?.focus();
            }}
          >
            <RotateCcw /> <span className="hidden sm:inline">{t("chat.new")}</span>
          </Button>
        )}
      </div>

      <Conversation className="mt-3 rounded-2xl border border-border bg-card shadow-card">
        <ConversationContent className="gap-6 p-4 sm:p-6">
          {/* Welcome */}
          <Message from="assistant">
            <MessageContent>
              <div className="flex gap-3">
                <img src={assistantImg} alt="" width={32} height={32} className="size-8 shrink-0" />
                <p className="pt-1 text-[15px] leading-relaxed">{t("chat.welcome")}</p>
              </div>
            </MessageContent>
          </Message>

          {messages.length === 0 && (
            <div>
              <p className="eyebrow mb-3">{t("chat.try")}</p>
              <div className="grid gap-2 sm:grid-cols-2">
                {suggestions[lang].map(({ icon: Icon, text }) => (
                  <button
                    key={text}
                    type="button"
                    onClick={() => send(text)}
                    className="flex items-center gap-3 rounded-xl border border-border bg-background p-3 text-left text-sm font-medium transition-colors hover:border-saffron hover:bg-accent"
                  >
                    <Icon className="size-4 shrink-0 text-saffron" /> {text}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m) => (
            <Message key={m.id} from={m.role}>
              <MessageContent className="text-[15px] leading-relaxed">
                {m.parts.map((part, i) =>
                  part.type === "text" ? (
                    m.role === "assistant" ? (
                      <MessageResponse key={i} isAnimating={status === "streaming" && m.id === messages.at(-1)?.id}>
                        {part.text}
                      </MessageResponse>
                    ) : (
                      <p key={i} className="whitespace-pre-wrap">
                        {part.text}
                      </p>
                    )
                  ) : null,
                )}
              </MessageContent>
            </Message>
          ))}

          {status === "submitted" && (
            <Message from="assistant">
              <MessageContent>
                <Shimmer className="text-sm">{t("chat.thinking")}</Shimmer>
              </MessageContent>
            </Message>
          )}

          {error && status === "error" && (
            <p className="rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
              {error.message || "Something went wrong."}
            </p>
          )}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      <div className="mt-3">
        <PromptInput onSubmit={handleSubmit} className="rounded-2xl bg-card shadow-card">
          <PromptInputTextarea ref={textareaRef} autoFocus placeholder={t("chat.placeholder")} className="min-h-14 text-[15px]" />
          <PromptInputFooter className="justify-between">
            <p className="px-2 text-[11px] text-muted-foreground">
              {t("chat.note")}{" "}
              <Link to="/faq" className="underline">
                FAQ
              </Link>
            </p>
            <PromptInputSubmit status={status} onStop={stop} className="shrink-0 rounded-full" />
          </PromptInputFooter>
        </PromptInput>
      </div>
    </section>
  );
}
