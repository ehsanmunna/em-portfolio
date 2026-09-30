import {
  Atom,
  Code2,
  Database,
  Gauge,
  GitBranch,
  Layers,
  LayoutGrid,
  PenTool,
  Terminal,
  type LucideIcon,
} from "lucide-react";
import {
  FaDribbble,
  FaFacebook,
  FaGithub,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
import type { IconType } from "react-icons";
import type { IconKey, SocialIconKey } from "@/config/portfolio";

const icons: Record<IconKey, LucideIcon> = {
  atom: Atom,
  layers: Layers,
  terminal: Terminal,
  code: Code2,
  figma: PenTool,
  database: Database,
  git: GitBranch,
  pen: PenTool,
  layout: LayoutGrid,
  gauge: Gauge,
};

const socialIcons: Record<SocialIconKey, IconType> = {
  github: FaGithub,
  linkedin: FaLinkedinIn,
  x: FaXTwitter,
  facebook: FaFacebook,
  dribbble: FaDribbble,
};

type IconProps = {
  name: IconKey;
  size?: number;
  className?: string;
};

export function Icon({ name, size = 20, className }: IconProps) {
  const Glyph = icons[name];
  return <Glyph aria-hidden="true" className={className} size={size} strokeWidth={1.8} />;
}

type SocialIconProps = {
  name: SocialIconKey;
  size?: number;
};

export function SocialIcon({ name, size = 18 }: SocialIconProps) {
  const Glyph = socialIcons[name];
  return <Glyph aria-hidden="true" size={size} />;
}