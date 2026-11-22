import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import Home from './page';

const meta = {
  component: Home,
  tags: ['ai-generated'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Home>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { level: 1 })).toHaveTextContent(
      /to get started, edit the page\.tsx file/i,
    );
    await expect(canvas.getByRole('link', { name: /documentation/i })).toHaveAttribute(
      'href',
      expect.stringContaining('https://nextjs.org/docs'),
    );
    const deploy = canvas.getByRole('link', { name: /deploy now/i });
    await expect(deploy).toHaveAttribute('target', '_blank');
    await expect(deploy).toHaveAttribute('rel', 'noopener noreferrer');
  },
};

export const Mobile: Story = {
  globals: { viewport: { value: 'mobile1', isRotated: false } },
};

export const CssCheck: Story = {
  play: async ({ canvas }) => {
    const deploy = canvas.getByRole('link', { name: /deploy now/i });
    // "Deploy Now" uses bg-foreground → --foreground (#171717 in light mode) and h-12 (48px).
    // Fails if globals.css / Tailwind did not load.
    await expect(getComputedStyle(deploy).backgroundColor).toBe('rgb(23, 23, 23)');
    await expect(getComputedStyle(deploy).height).toBe('48px');
  },
};
