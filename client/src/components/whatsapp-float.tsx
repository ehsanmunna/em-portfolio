import { FaWhatsapp } from "react-icons/fa6";
import { portfolioContent } from "@/config/portfolio";

export function buildWhatsappUrl(number: string, defaultMessage?: string): string | null {
  const digits = (number ?? "").replace(/\D/g, "");
  if (!digits) {
    return null;
  }
  const message = (defaultMessage ?? "").trim();
  const query = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${digits}${query}`;
}

type WhatsappFloatProps = {
  number?: string;
  defaultMessage?: string;
  label?: string;
};

export function WhatsappFloat({
  number = portfolioContent.contact.whatsapp.number,
  defaultMessage = portfolioContent.contact.whatsapp.defaultMessage,
  label = portfolioContent.contact.whatsapp.label,
}: WhatsappFloatProps = {}) {
  const href = buildWhatsappUrl(number, defaultMessage);
  if (!href) {
    return null;
  }

  return (
    <a
      className="whatsapp-float"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
    >
      <FaWhatsapp aria-hidden="true" size={28} />
    </a>
  );
}
