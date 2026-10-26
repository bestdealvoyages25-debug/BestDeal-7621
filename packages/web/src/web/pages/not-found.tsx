import { Link } from "wouter";
import { Section } from "../components/ui/section";
import { useT } from "../lib/i18n";

export default function NotFoundPage() {
  const t = useT();
  return (
    <Section tone="ink" className="py-32 text-center">
      <p className="label-gold">{t("nf.label")}</p>
      <h1 className="mt-6 font-display text-4xl text-cream">{t("nf.title")}</h1>
      <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-sand/70">{t("nf.text")}</p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link to="/" className="btn-gold">
          {t("nf.home")}
        </Link>
        <Link to="/circuits" className="btn-ghost-gold">
          {t("nf.circuits")}
        </Link>
      </div>
    </Section>
  );
}
