'use client';

import React from 'react';
import { siteConfig } from "@/lib/constants";

export function Intro() {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between min-h-[20vh] mt-16 mb-16 md:mb-12">
      <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
      {siteConfig.name}
      </h1>
      <h4 className="text-center md:text-left text-lg mt-5 md:pl-8">
        {siteConfig.description}
      </h4>
    </section>
  );
}
