import type { Preview } from '@storybook/nextjs-vite'
import { Geist, Geist_Mono, Inter } from 'next/font/google'
import '../app/globals.css'

// Mirror app/layout.tsx: the font CSS variables and base classes live on <html>/<body>.
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

// Inter backs the --sds-typography-family-sans token (tokens/brand.css).
const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

// The font variables must sit on <html> (as in app/layout.tsx): tokens declared on
// :root, such as --sds-typography-family-sans, resolve var(--font-inter) there.
document.documentElement.classList.add(geistSans.variable, geistMono.variable, inter.variable)

const preview: Preview = {
  decorators: [
    (Story) => (
      <div
        className="antialiased min-h-full flex flex-col"
      >
        <Story />
      </div>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'error'
    }
  },
};

export default preview;