import React from 'react';
import {
  Code,
  Image,
  ImageIcon,
  Calculator,
  Clock,
  FileText,
  RefreshCw,
  Braces,
  Globe,
  Percent,
  CalendarDays,
  Binary,
  Link,
  Hash,
  Crop,
  AlignLeft,
  Type,
  Ruler,
  HardDrive,
  LucideIcon,
  Wrench,
} from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  Code,
  Image,
  ImageIcon,
  Calculator,
  Clock,
  FileText,
  RefreshCw,
  Braces,
  Globe,
  Percent,
  CalendarDays,
  Binary,
  Link,
  Hash,
  Crop,
  AlignLeft,
  Type,
  Ruler,
  HardDrive,
};

interface DynamicIconProps {
  name: string;
  className?: string;
}

export const DynamicIcon: React.FC<DynamicIconProps> = ({ name, className = 'w-5 h-5' }) => {
  const IconComponent = ICON_MAP[name] || Wrench;
  return <IconComponent className={className} />;
};
