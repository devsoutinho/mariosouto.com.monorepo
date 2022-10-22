import { StatusBarProps } from './types';
import  Head from 'next/head';

export function StatusBar({ title }: StatusBarProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      {/* <meta name="theme-color" content="#EF4444" /> */}
    </Head>
  );
}
