import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn } from 'storybook/test';
import { Button, type ButtonSize, type ButtonVariant } from './Button';
import { StarIcon, XIcon } from './story-icons';

/*
 * Expected values come from the Figma variables (Simple Design System › Button, set 43:61).
 * The play functions assert computed styles, so a broken token chain fails the test.
 */
const C = {
  brand800: 'rgb(44, 44, 44)', // #2c2c2c
  brand900: 'rgb(30, 30, 30)', // #1e1e1e
  brand100: 'rgb(245, 245, 245)', // #f5f5f5
  gray300: 'rgb(217, 217, 217)', // #d9d9d9
  gray400: 'rgb(179, 179, 179)', // #b3b3b3
  gray900: 'rgb(30, 30, 30)', // #1e1e1e
  slate200: 'rgb(227, 227, 227)', // #e3e3e3
  slate300: 'rgb(205, 205, 205)', // #cdcdcd
  slate600: 'rgb(118, 118, 118)', // #767676
  slate900: 'rgb(48, 48, 48)', // #303030
  transparent: 'rgba(0, 0, 0, 0)',
};

function expectColors(el: HTMLElement, { bg, border, text }: { bg: string; border: string; text: string }) {
  const s = getComputedStyle(el);
  expect(s.backgroundColor).toBe(bg);
  expect(s.borderTopColor).toBe(border);
  expect(s.color).toBe(text);
}

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['ai-generated'],
  parameters: { layout: 'centered' },
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'medium',
    onPress: fn(),
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'neutral', 'subtle'] },
    size: { control: 'inline-radio', options: ['medium', 'small'] },
    iconStart: { control: false },
    iconEnd: { control: false },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ---------- Overview ---------- */

const VARIANTS: ButtonVariant[] = ['primary', 'neutral', 'subtle'];
const SIZES: ButtonSize[] = ['medium', 'small'];

export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="grid grid-cols-[auto_repeat(4,auto)] items-center justify-start gap-(--sds-size-space-300)">
      {VARIANTS.flatMap((variant) =>
        SIZES.map((size) => (
          <div key={`${variant}-${size}`} className="contents">
            <span className="text-sm">
              {variant} / {size}
            </span>
            <Button variant={variant} size={size}>
              Button
            </Button>
            <Button variant={variant} size={size} iconStart={<StarIcon />}>
              Button
            </Button>
            <Button variant={variant} size={size} iconStart={<StarIcon />} iconEnd={<XIcon />}>
              Button
            </Button>
            <Button variant={variant} size={size} isDisabled>
              Button
            </Button>
          </div>
        )),
      )}
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getAllByRole('button')).toHaveLength(VARIANTS.length * SIZES.length * 4);
  },
};

/* ---------- Variants: Default state ---------- */

export const Primary: Story = {
  play: async ({ canvas, args, userEvent }) => {
    const button = canvas.getByRole('button', { name: 'Button' });
    expectColors(button, { bg: C.brand800, border: C.brand800, text: C.brand100 });
    const s = getComputedStyle(button);
    await expect(s.height).toBe('40px');
    await expect(s.borderTopWidth).toBe('1px');
    await expect(s.borderTopLeftRadius).toBe('8px');
    await expect(s.fontSize).toBe('16px');
    await expect(s.fontWeight).toBe('400');
    await expect(s.fontFamily).toMatch(/inter/i);
    await userEvent.click(button);
    await expect(args.onPress).toHaveBeenCalledTimes(1);
  },
};

export const Neutral: Story = {
  args: { variant: 'neutral' },
  play: async ({ canvas }) => {
    expectColors(canvas.getByRole('button'), { bg: C.slate200, border: C.slate600, text: C.gray900 });
  },
};

export const Subtle: Story = {
  args: { variant: 'subtle' },
  play: async ({ canvas }) => {
    // Figma: Subtle/Medium text uses Text/Neutral/Default (Slate/900).
    expectColors(canvas.getByRole('button'), { bg: C.transparent, border: C.transparent, text: C.slate900 });
  },
};

/* ---------- Size: Small ---------- */

export const PrimarySmall: Story = {
  args: { size: 'small' },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button');
    expectColors(button, { bg: C.brand800, border: C.brand800, text: C.brand100 });
    await expect(getComputedStyle(button).height).toBe('32px');
  },
};

export const NeutralSmall: Story = {
  args: { variant: 'neutral', size: 'small' },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button');
    expectColors(button, { bg: C.slate200, border: C.slate600, text: C.gray900 });
    await expect(getComputedStyle(button).height).toBe('32px');
  },
};

export const SubtleSmall: Story = {
  args: { variant: 'subtle', size: 'small' },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button');
    // Figma: Subtle/Small text uses Text/Default/Default (Gray/900).
    expectColors(button, { bg: C.transparent, border: C.transparent, text: C.gray900 });
    await expect(getComputedStyle(button).height).toBe('32px');
  },
};

/* ---------- State: Hover ---------- */

export const PrimaryHover: Story = {
  play: async ({ canvas, userEvent }) => {
    const button = canvas.getByRole('button');
    await userEvent.hover(button);
    await expect(button).toHaveAttribute('data-hovered');
    expectColors(button, { bg: C.brand900, border: C.brand800, text: C.brand100 });
  },
};

export const NeutralHover: Story = {
  args: { variant: 'neutral' },
  play: async ({ canvas, userEvent }) => {
    const button = canvas.getByRole('button');
    await userEvent.hover(button);
    await expect(button).toHaveAttribute('data-hovered');
    expectColors(button, { bg: C.slate300, border: C.slate600, text: C.gray900 });
  },
};

export const SubtleHover: Story = {
  args: { variant: 'subtle' },
  play: async ({ canvas, userEvent }) => {
    const button = canvas.getByRole('button');
    await userEvent.hover(button);
    await expect(button).toHaveAttribute('data-hovered');
    expectColors(button, { bg: C.transparent, border: C.gray300, text: C.gray900 });
  },
};

/* ---------- State: Pressed (not in Figma, reuses Hover tokens) ---------- */

export const PrimaryPressed: Story = {
  play: async ({ canvas, userEvent }) => {
    const button = canvas.getByRole('button');
    await userEvent.pointer({ keys: '[MouseLeft>]', target: button });
    await expect(button).toHaveAttribute('data-pressed');
    expectColors(button, { bg: C.brand900, border: C.brand800, text: C.brand100 });
  },
};

export const NeutralPressed: Story = {
  args: { variant: 'neutral' },
  play: async ({ canvas, userEvent }) => {
    const button = canvas.getByRole('button');
    await userEvent.pointer({ keys: '[MouseLeft>]', target: button });
    await expect(button).toHaveAttribute('data-pressed');
    expectColors(button, { bg: C.slate300, border: C.slate600, text: C.gray900 });
  },
};

export const SubtlePressed: Story = {
  args: { variant: 'subtle' },
  play: async ({ canvas, userEvent }) => {
    const button = canvas.getByRole('button');
    await userEvent.pointer({ keys: '[MouseLeft>]', target: button });
    await expect(button).toHaveAttribute('data-pressed');
    expectColors(button, { bg: C.transparent, border: C.gray300, text: C.gray900 });
  },
};

/* ---------- State: Focus visible (not in Figma) ---------- */

export const FocusVisible: Story = {
  play: async ({ canvas, args, userEvent }) => {
    const button = canvas.getByRole('button');
    await userEvent.tab();
    await expect(button).toHaveFocus();
    await expect(button).toHaveAttribute('data-focus-visible');
    const s = getComputedStyle(button);
    await expect(s.outlineStyle).toBe('solid');
    await expect(s.outlineColor).toBe(C.brand800);
    await userEvent.keyboard('{Enter}');
    await expect(args.onPress).toHaveBeenCalledTimes(1);
  },
};

/* ---------- State: Disabled ---------- */

const disabledColors = { bg: C.gray300, border: C.gray400, text: C.gray400 };

export const PrimaryDisabled: Story = {
  args: { isDisabled: true },
  play: async ({ canvas, args, userEvent }) => {
    const button = canvas.getByRole('button');
    await expect(button).toBeDisabled();
    await expect(button).toHaveAttribute('data-disabled');
    expectColors(button, disabledColors);
    await userEvent.click(button);
    await expect(args.onPress).not.toHaveBeenCalled();
  },
};

export const NeutralDisabled: Story = {
  args: { variant: 'neutral', isDisabled: true },
  play: async ({ canvas }) => {
    expectColors(canvas.getByRole('button'), disabledColors);
  },
};

export const SubtleDisabled: Story = {
  args: { variant: 'subtle', isDisabled: true },
  play: async ({ canvas }) => {
    expectColors(canvas.getByRole('button'), disabledColors);
  },
};

/* ---------- Icons ---------- */

export const WithIconStart: Story = {
  args: { iconStart: <StarIcon /> },
  play: async ({ canvas, canvasElement }) => {
    await expect(canvas.getByRole('button', { name: 'Button' })).toBeVisible();
    const icon = canvasElement.querySelector('button > span[aria-hidden="true"]') as HTMLElement;
    await expect(getComputedStyle(icon).width).toBe('16px');
    await expect(getComputedStyle(icon).height).toBe('16px');
    await expect(getComputedStyle(canvas.getByRole('button')).columnGap).toBe('8px');
  },
};

export const WithIconEnd: Story = {
  args: { iconEnd: <XIcon /> },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: 'Button' })).toBeVisible();
  },
};

export const WithBothIcons: Story = {
  args: { iconStart: <StarIcon />, iconEnd: <XIcon /> },
  play: async ({ canvas }) => {
    // Icons are decorative: the accessible name stays the label.
    await expect(canvas.getByRole('button', { name: 'Button' })).toBeVisible();
  },
};
