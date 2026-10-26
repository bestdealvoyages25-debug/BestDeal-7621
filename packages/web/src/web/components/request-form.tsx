import { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { useCreateRequest } from "../queries/requests";
import { useI18n } from "../lib/i18n";
import { cn } from "../lib/utils";

interface RequestFormProps {
  kind?: "contact" | "devis";
  circuitSlug?: string;
  circuitTitle?: string;
  className?: string;
}

export function RequestForm({
  kind = "devis",
  circuitSlug,
  circuitTitle,
  className,
}: RequestFormProps) {
  const create = useCreateRequest();
  const { t } = useI18n();
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    travelers: "",
    period: "",
    message: "",
  });
  const [error, setError] = useState<string | null>(null);

  const set = (key: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [key]: event.target.value }));

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    create.mutate(
      {
        kind,
        name: form.name,
        email: form.email,
        phone: form.phone,
        circuitSlug: circuitSlug ?? "",
        travelers: form.travelers ? Number(form.travelers) : undefined,
        period: form.period,
        message: circuitTitle
          ? `${circuitTitle} — ${form.message}`.trim()
          : form.message,
      },
      {
        onSuccess: () => setDone(true),
        onError: (mutationError) => {
          const message = mutationError instanceof Error ? mutationError.message : "";
          setError(!message || /validation/i.test(message) ? t("form.error") : message);
        },
      },
    );
  };

  if (done) {
    return (
      <div className={cn("border border-gold/40 bg-cream p-8 text-center", className)}>
        <CheckCircle2 className="mx-auto size-10 text-gold" />
        <h3 className="mt-5 font-display text-2xl">{t("form.done.title")}</h3>
        <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">
          {t("form.done.text", { name: form.name.split(" ")[0] || "" })}
        </p>
        <button
          type="button"
          onClick={() => {
            setDone(false);
            setForm({ name: "", email: "", phone: "", travelers: "", period: "", message: "" });
          }}
          className="mt-6 border border-gold/60 px-5 py-2 text-[11px] font-medium uppercase tracking-[0.14em] text-gold transition-colors hover:bg-gold hover:text-ink"
        >
          {t("form.done.again")}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className={cn("space-y-4", className)}>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-[11px] uppercase tracking-[0.18em] text-ink-soft">
            {t("form.name")}
          </span>
          <input
            required
            minLength={2}
            aria-label={t("form.nameAria")}
            value={form.name}
            onChange={set("name")}
            className="field"
            placeholder={t("form.namePlaceholder")}
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-[11px] uppercase tracking-[0.18em] text-ink-soft">
            {t("form.email")}
          </span>
          <input
            required
            type="email"
            aria-label={t("form.emailAria")}
            value={form.email}
            onChange={set("email")}
            className="field"
            placeholder={t("form.emailPlaceholder")}
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-[11px] uppercase tracking-[0.18em] text-ink-soft">
            {t("form.phone")}
          </span>
          <input
            aria-label={t("form.phoneAria")}
            value={form.phone}
            onChange={set("phone")}
            className="field"
            placeholder={t("form.phonePlaceholder")}
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-[11px] uppercase tracking-[0.18em] text-ink-soft">
            {t("form.travelers")}
          </span>
          <input
            type="number"
            min={1}
            aria-label={t("form.travelersAria")}
            value={form.travelers}
            onChange={set("travelers")}
            className="field"
            placeholder="2"
          />
        </label>
      </div>

      <label className="block">
        <span className="mb-2 block text-[11px] uppercase tracking-[0.18em] text-ink-soft">
          {t("form.period")}
        </span>
        <input
          aria-label={t("form.periodAria")}
          value={form.period}
          onChange={set("period")}
          className="field"
          placeholder={t("form.periodPlaceholder")}
        />
      </label>

      <label className="block">
        <span className="mb-2 block text-[11px] uppercase tracking-[0.18em] text-ink-soft">
          {t("form.message")}
        </span>
        <textarea
          aria-label={t("form.messageAria")}
          value={form.message}
          onChange={set("message")}
          rows={4}
          className="field resize-none"
          placeholder={kind === "devis" ? t("form.messageQuote") : t("form.messageContact")}
        />
      </label>

      {error ? <p className="text-[13px] text-destructive">{error}</p> : null}

      <button
        type="submit"
        disabled={create.isPending}
        className="btn-gold w-full disabled:cursor-not-allowed disabled:opacity-60"
      >
        {create.isPending ? (
          <>
            <Loader2 className="size-4 animate-spin" /> {t("form.sending")}
          </>
        ) : (
          <>
            <Send className="size-4" />
            {kind === "devis" ? t("form.submitQuote") : t("form.submitContact")}
          </>
        )}
      </button>
      <p className="text-[12px] leading-relaxed text-ink-soft">{t("form.privacy")}</p>
    </form>
  );
}
