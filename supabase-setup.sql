-- ============================================================
--  Kuekadoodledoo — Supabase setup
--  Run this ONCE in your Supabase project:
--  Supabase dashboard -> SQL Editor -> New query -> paste -> Run
-- ============================================================

-- One row per user. The whole app's data lives in the `data` column as JSON.
create table if not exists public.app_data (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  data       jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- Turn on Row Level Security so people can ONLY touch their own row.
alter table public.app_data enable row level security;

-- Each policy checks that the logged-in user (auth.uid()) matches the row's user_id.
-- This is what guarantees your friends can never see your expenses, or each other's.

drop policy if exists "read own data"   on public.app_data;
drop policy if exists "insert own data" on public.app_data;
drop policy if exists "update own data" on public.app_data;

create policy "read own data"
  on public.app_data for select
  using (auth.uid() = user_id);

create policy "insert own data"
  on public.app_data for insert
  with check (auth.uid() = user_id);

create policy "update own data"
  on public.app_data for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
