'use client';

import type { ReactNode } from 'react';
import {
  Button as AriaButton,
  type ButtonProps as AriaButtonProps,
} from 'react-aria-components';

/**
 * Button: Figma "Simple Design System" › Button (component set 43:61).
 * Figma variant axes: Variant (Primary | Neutral | Subtle), Size (Medium | Small),
 * State (Default | Hover | Disabled). State comes from React Aria's data attributes.
 */
export type ButtonVariant = 'primary' | 'neutral' | 'subtle';
export type ButtonSize = 'medium' | 'small';

export interface ButtonProps extends Omit<AriaButtonProps, 'children' | 'className'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Figma: "Has Icon Start" / "Icon Start". Rendered at 16 × 16 px and hidden from assistive tech. */
  iconStart?: ReactNode;
  /** Figma: "Has Icon End" / "Icon End". Rendered at 16 × 16 px and hidden from assistive tech. */
  iconEnd?: ReactNode;
  className?: string;
  children?: ReactNode;
}

const base = [
  'inline-flex items-center justify-center whitespace-nowrap cursor-default',
  'gap-(--sds-size-space-200)',
  'rounded-(--sds-size-radius-200)',
  'border-solid border-(length:--sds-size-stroke-border)',
  // Typography: "Single Line/Body Base" (line height 100%)
  '[font-family:var(--sds-typography-body-font-family)]',
  'text-(length:--sds-typography-body-size-medium)',
  '[font-weight:var(--sds-typography-body-font-weight-regular)]',
  'leading-none',
  // Focus ring: not defined in Figma; uses the brand border token.
  'outline-none data-focus-visible:outline-solid data-focus-visible:outline-2 data-focus-visible:outline-offset-2',
  'data-focus-visible:outline-(--sds-color-border-brand-default)',
  // Disabled: identical for all variants in Figma
  'data-disabled:bg-(--sds-color-background-disabled-default)',
  'data-disabled:border-(--sds-color-border-disabled-default)',
  'data-disabled:text-(--sds-color-text-disabled-on-disabled)',
].join(' ');

// Figma strokes sit inside the box, so the border width comes off the padding
// to keep the Figma heights (Medium 40px, Small 32px).
const sizes: Record<ButtonSize, string> = {
  medium: 'p-[calc(var(--sds-size-space-300)-var(--sds-size-stroke-border))]',
  small: 'p-[calc(var(--sds-size-space-200)-var(--sds-size-stroke-border))]',
};

// Pressed is not defined in Figma; it reuses the Hover tokens.
const variants: Record<ButtonVariant, string> = {
  primary: [
    'bg-(--sds-color-background-brand-default)',
    'border-(--sds-color-border-brand-default)',
    'text-(--sds-color-text-brand-on-brand)',
    'data-hovered:bg-(--sds-color-background-brand-hover)',
    'data-pressed:bg-(--sds-color-background-brand-hover)',
  ].join(' '),
  neutral: [
    'bg-(--sds-color-background-neutral-tertiary)',
    'border-(--sds-color-border-neutral-secondary)',
    'text-(--sds-color-text-default-default)',
    'data-hovered:bg-(--sds-color-background-neutral-tertiary-hover)',
    'data-pressed:bg-(--sds-color-background-neutral-tertiary-hover)',
  ].join(' '),
  subtle: [
    'bg-transparent border-transparent',
    'data-hovered:border-(--sds-color-border-default-default)',
    'data-pressed:border-(--sds-color-border-default-default)',
  ].join(' '),
};

// Figma: Subtle/Default/Medium uses Text/Neutral/Default, while Subtle/Default/Small uses
// Text/Default/Default. Implemented as designed. Hover switches both to Text/Default/Default.
const subtleText: Record<ButtonSize, string> = {
  medium: [
    'text-(--sds-color-text-neutral-default)',
    'data-hovered:text-(--sds-color-text-default-default)',
    'data-pressed:text-(--sds-color-text-default-default)',
  ].join(' '),
  small: 'text-(--sds-color-text-default-default)',
};

const iconSlot = 'inline-flex shrink-0 size-4 [&>svg]:size-full';

export function Button({
  variant = 'primary',
  size = 'medium',
  iconStart,
  iconEnd,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = [
    base,
    sizes[size],
    variants[variant],
    variant === 'subtle' ? subtleText[size] : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <AriaButton {...props} className={classes}>
      {iconStart != null && (
        <span aria-hidden="true" className={iconSlot}>
          {iconStart}
        </span>
      )}
      {children}
      {iconEnd != null && (
        <span aria-hidden="true" className={iconSlot}>
          {iconEnd}
        </span>
      )}
    </AriaButton>
  );
}
