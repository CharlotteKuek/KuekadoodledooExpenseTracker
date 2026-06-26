<p align="center">
  <img src=".github/banner.png" alt="Kuekadoodledoo — Personal finance that actually sparks joy" width="100%" />
</p>

<h1 align="center">Kuekadoodledoo 🪙</h1>

<p align="center">
  <em>A cheerful, offline-first personal expense tracker — multi-currency, goal-setting, and installable on your phone like a real app.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Supabase-Auth_+_DB-3FCF8E?logo=supabase&logoColor=white" alt="Supabase" />
  <img src="https://img.shields.io/badge/PWA-installable-5A0FC8?logo=pwa&logoColor=white" alt="PWA" />
  <img src="https://img.shields.io/badge/Recharts-charts-FF6B6B" alt="Recharts" />
  <img src="https://img.shields.io/badge/made_with-%F0%9F%92%9B-138A4A" alt="Made with love" />
</p>

---

## ✨ What it does

Kuekadoodledoo turns the boring chore of expense-tracking into something you actually want to open:

- 💸 **Fast logging** — add expenses in seconds, split costs across days, and tag them by category & subcategory.
- 🌍 **Multi-currency** — log spending in any currency; pick your own default, with sensible conversion built in.
- 📊 **Insights** — animated donut & bar charts, a per-period breakdown, and a shareable **Monthly Wrap**.
- ✈️ **Trips** — group spending by trip and see exactly what each adventure cost you.
- 🎯 **Goals & "Financial Vision"** — guided reflection prompts to shape the money mindset you want.
- 📝 **Private notebook** — a tabbed, rich-text journal baked right in.
- 📤 **Excel export** — one-click `.xlsx` of everything.
- 🔒 **Private by design** — every user's data is sealed off by row-level security; nobody sees anyone else's.
- 📱 **Installs like an app** — add to your home screen and it opens fullscreen, offline-friendly.
- 🪙 **…and a coin that does something different every time you tap it.** (Go find out.)

## 🛠️ Built with

**React** · **Vite** · **Tailwind CSS** · **Recharts** · **lucide-react** · **SheetJS (xlsx)** · **Supabase** (Postgres + Auth + Row Level Security) · deployed on **Vercel** · shipped as a **PWA**.

A single-file React app at heart, wired to a tiny cloud backend so it syncs across every device while keeping each person's data completely private.

## 📱 Screenshots

> Drop a couple of screenshots into a `screenshots/` folder and they'll show up here.
> _(On your phone or browser, take shots of the Home, Insights, and Monthly Wrap screens — they look great.)_
>
> `![Home](screenshots/home.png)` · `![Insights](screenshots/insights.png)` · `![Monthly Wrap](screenshots/wrap.png)`

---

# 🚀 Run your own copy

Want it live on your own phone? Here's the whole thing, start to finish — it's all clicking and
pasting, and **nothing costs money**. The app itself uses **no AI** and **no credits**: once it's
live it runs entirely on its own.

You'll do four things — **Supabase** (free database + login), **GitHub** (host the code),
**Vercel** (publish it), then **phone + friends**. Take it slow. ☕

---

## Part 1 — Supabase (database + login) · ~10 min

1. Go to **https://supabase.com** → **Start your project** → sign in (you can use GitHub).
2. Click **New project**. Give it a name (e.g. `kuekadoodledoo`), set a database password
   (save it somewhere), pick a region near you, and create it. Wait ~1 minute for it to set up.
3. In the left sidebar open **SQL Editor** → **New query**. Open the file
   **`supabase-setup.sql`** from this folder, copy everything, paste it in, and click **Run**.
   You should see "Success". (This creates the table and the privacy rules.)

   > If your computer says *"no application set to open supabase-setup.sql"*, that's normal —
   > it's just a text file. Click **Cancel**, then right-click it → **Open With → TextEdit**
   > (Mac) or **Notepad** (Windows) to read/copy it. Nothing on your computer "runs" it —
   > Supabase does, when you paste it and click Run.
4. Let friends sign up instantly: left sidebar → **Authentication** → **Sign In / Providers**
   (or **Settings**) → find **Email** → turn **OFF "Confirm email"** → save. (This skips the
   confirmation email so signing up is instant.)
5. Get your two keys: left sidebar → **Project Settings** (gear) → **API**. Copy:
   - **Project URL** (looks like `https://abcd1234.supabase.co`)
   - the **publishable key** (a long string)

   Keep these two handy — you'll paste them into Vercel in Part 3.

> Use the **publishable** key, NOT the **secret** key. The publishable key is meant to be
> public and is safe in a website — it can only do what your privacy rules allow ("each
> logged-in person touches only their own row"). The **secret** key bypasses those rules,
> so never put it in your app, GitHub, or Vercel. You don't need it for this project.

---

## Part 2 — Put the code on GitHub · ~10 min

Easiest no-install way (through the website):

1. Go to **https://github.com** → top-right **+** → **New repository**.
2. Name it `kuekadoodledoo`, choose **Public** (so anyone can visit and admire your project 😎),
   click **Create repository**.
3. On the next page click the link **"uploading an existing file"**.
4. Open this project folder on your computer, select **all the files and folders inside it**
   (everything except a `node_modules` folder if one exists), and **drag them into the browser**.
5. Scroll down and click **Commit changes**. Done — your code now lives on GitHub.

> **Public repo + safe keys.** Since the repo is public, anyone can read every file — that's
> the point (show off!). Your secrets stay out of it automatically: your keys live in a `.env`
> file that's listed in `.gitignore`, so it never uploads. After uploading, glance at your repo's
> file list and make sure you see **`.env.example`** (a harmless placeholder) but **NOT** a file
> called `.env`. If you ever spot a real `.env` there, remove it. The publishable key you paste
> into Vercel is safe to be public anyway; only the *secret* key matters, and it's nowhere here.

> Prefer buttons over the website? Install **GitHub Desktop** (https://desktop.github.com),
> "Add an existing repository," choose this folder, then **Publish**. Same result.

Whenever you change the app later, you upload/commit the new files the same way and your
live site updates automatically (see Part 3).

---

## Part 3 — Vercel (make it live) · ~5 min

1. Go to **https://vercel.com** → **Sign up** → **Continue with GitHub**.
2. Click **Add New… → Project**, find your `kuekadoodledoo` repo, click **Import**.
3. Vercel will auto-detect it's a **Vite** app — you don't need to change build settings.
4. Open **Environment Variables** and add these two (names must match exactly):

   | Name | Value |
   |------|-------|
   | `VITE_SUPABASE_URL` | your Project URL from Part 1 |
   | `VITE_SUPABASE_ANON_KEY` | your **publishable** key from Part 1 |

5. Click **Deploy** and wait ~1 minute. You'll get a live link like
   **`https://kuekadoodledoo.vercel.app`**. Open it — you should see the login screen. 🎉

> If the page loads but login errors, double-check the two variables are spelled exactly
> and re-deploy (Vercel → your project → **Deployments** → **Redeploy**).

---

## Part 4 — Add it to your iPhone home screen · 1 min

1. Open your Vercel link in **Safari** (it must be Safari, not Chrome).
2. Tap the **Share** button (the square with an up-arrow at the bottom).
3. Scroll down → **Add to Home Screen** → **Add**.
4. It now sits on your home screen with the coin icon and opens fullscreen like a real app.

Do the same on any device. Because you log in, **your phone and laptop show the same data**
automatically. Add a few expenses on your phone, open it on your laptop, log in — they're there.

---

## Part 5 — Share with your friends

Just send them the Vercel link. They open it, tap **Create an account**, and they're in with
their **own private space**. They can add it to their home screen too. They can **never** see
your expenses and you can't see theirs — that's enforced by the privacy rules from Part 1.

---

## Running it on your own computer (optional, for testing)

You only need this if you want to preview changes before publishing.

1. Install **Node.js** (https://nodejs.org, the "LTS" version).
2. In this folder, make a file called **`.env`** (copy `.env.example` and fill in your two keys).
3. In a terminal here, run:
   ```
   npm install
   npm run dev
   ```
4. Open the local link it prints (usually `http://localhost:5173`).

---

## FAQ

**Will this use Gemini / AI credits?** No. The app makes zero AI calls. AI only helped build
it; the running app is plain code. Supabase is a database, not an AI — also free here.

**Is it really private?** Yes. Each person's data is one row locked to their login by Supabase's
Row Level Security. No one (not even other signed-in users) can read your row.

**Does it cost anything?** No, on the free tiers of Supabase + Vercel, which are plenty for you
and your friends.

**I changed the app — how do I update the live site?** Upload/commit the new files to GitHub
(Part 2). Vercel redeploys automatically within a minute.

**Back up my data?** The app's **Settings → Backup & export** still works and downloads a file
you can keep for extra safety.

---

<p align="center">
  Designed & built by <strong>Charlotte Kuek</strong> 💛
</p>

<p align="center">
  <a href="https://instagram.com/charlottekuek">Instagram</a> ·
  <a href="https://t.me/charlottekuek">Telegram</a> ·
  <a href="https://linkedin.com/in/charlottekuek">LinkedIn</a>
</p>

<p align="center">
  <sub>If you have ideas to make it better, reach out — or just deal with it I guess… HAHAHA ENJOY! ✨</sub>
</p>
