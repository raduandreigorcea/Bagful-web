# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro 5 static site (existing, `D:\Bagful-web`); GSAP and its plugins are installed as skills for motion. No client framework.

## Users

Everyone who shops together: families, partners, flatmates, friends. Whoever shares the fridge shares the list. They arrive from a recommendation or a share link and need to understand in seconds what Bagful is and how to start. Mostly on a phone.

## Product Purpose

Bagful is a shared shopping list that updates on every phone in the same second (web app and Android app). The site presents the product as already launched: it explains the mechanism, then sends visitors to open the web app or download the app. Success is a visitor who opens or installs it.

## Positioning

One list for everyone you shop with, always in sync: items added at home appear on a flatmate's screen before they reach the shop; works offline and catches up; bought items are crossed off so nobody buys the third jar of pickles.

## Operating Context

The app is the real, running product at famcart-app.vercel.app (the domain is permanent on purpose). Source lives at github.com/raduandreigorcea/Bagful under the PolyForm Noncommercial License. The app UI (list bar, flat item rows with product icons, bottom action bar with Add disc, slide-to-check-out bar, dark toast) is the reference for every phone mockup on the site.

## Capabilities and Constraints

- Shared lists joined with a short invite code; owner manages members.
- Real-time sync across phones; offline adds and ticks sync when the signal returns.
- Duplicates merge into one item with a higher quantity; items get automatic product icons.
- Slide to check out; bought items go to a history grouped by trip.
- Push notifications only when it matters, easy to switch off.
- Installs as a PWA and ships as a native Android app. Light/dark themes exist in the app.
- The site is presented as launched: it prepares every action (Open the web app, Download the app). The Android store/download destination is not yet decided; do not invent a store link.
- Privacy and Terms pages exist as plain drafts.

## Brand Commitments

Name: Bagful (the app was renamed from FamCart; the famcart-app.vercel.app domain stays). Product icons, the Bagful bag logo with a smile handle, Plus Jakarta Sans and the brand green (#4d8c65) belong to the app. Demo people are generic (Sam, Alex, Jo, Mom); no real names of the maker or their circle appear on the site. The user wants a site that looks like an Awwwards winner, not a conventional SaaS landing page (binding ambition level, not a style).

## Evidence on Hand

Real, runnable app; public source on GitHub; an Android APK. No testimonials, user counts, press or reviews exist: none may be fabricated.

## Product Principles

1. Show the mechanism working, not described: sync, offline catch-up, cross-off.
2. Honest by default: no invented numbers, quotes or store links.
3. Plain language for people who just want to stop buying duplicates.
4. Every phone on the site looks like the real app.

## Accessibility & Inclusion

Reduced-motion and no-JS must show a complete, finished page. Text contrast at least 4.5:1; keyboard and screen-reader access preserved.
