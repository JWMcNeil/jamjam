import localFont from 'next/font/local'

export const schibstedGrotesk = localFont({
  src: [
    { path: '../fonts/schibsted-grotesk-400.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/schibsted-grotesk-500.woff2', weight: '500', style: 'normal' },
    { path: '../fonts/schibsted-grotesk-600.woff2', weight: '600', style: 'normal' },
    { path: '../fonts/schibsted-grotesk-700.woff2', weight: '700', style: 'normal' },
    { path: '../fonts/schibsted-grotesk-800.woff2', weight: '800', style: 'normal' },
    { path: '../fonts/schibsted-grotesk-900.woff2', weight: '900', style: 'normal' },
  ],
  variable: '--font-sans',
  display: 'swap',
  fallback: ['ui-sans-serif', 'system-ui', 'sans-serif'],
})

export const jetbrainsMono = localFont({
  src: [
    { path: '../fonts/jetbrains-mono-400.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/jetbrains-mono-500.woff2', weight: '500', style: 'normal' },
    { path: '../fonts/jetbrains-mono-700.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-mono',
  display: 'swap',
  fallback: ['ui-monospace', 'Courier New', 'monospace'],
})
