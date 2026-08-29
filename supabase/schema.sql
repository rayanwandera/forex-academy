-- Run this whole file once in the Supabase SQL editor for a brand new project.

-- ============ TABLES ============

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  phone text not null,
  referral_code text unique not null,
  referred_by uuid references public.profiles(id),
  is_paid boolean not null default false,
  is_admin boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  phone text not null,
  amount_ugx integer not null default 20000,
  provider text not null default 'manual',
  provider_reference text,
  note text,
  status text not null default 'pending' check (status in ('pending', 'successful', 'failed')),
  created_at timestamptz not null default now()
);

create table if not exists public.referral_earnings (
  id uuid primary key default gen_random_uuid(),
  referrer_id uuid not null references public.profiles(id) on delete cascade,
  referred_id uuid not null references public.profiles(id) on delete cascade,
  amount_ugx integer not null default 5000,
  status text not null default 'pending' check (status in ('pending', 'paid')),
  created_at timestamptz not null default now(),
  unique (referrer_id, referred_id)
);

-- ============ HELPER: is the current user an admin? ============
-- SECURITY DEFINER avoids infinite recursion when RLS policies on `profiles`
-- need to check the admin flag on `profiles` itself.

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select coalesce((select is_admin from public.profiles where id = auth.uid()), false);
$$;

-- ============ NEW USER TRIGGER: create profile + resolve referral ============

create or replace function public.generate_referral_code()
returns text
language plpgsql
as $$
declare
  code text;
  exists_already boolean;
begin
  loop
    code := upper(substr(md5(random()::text), 1, 6));
    select exists(select 1 from public.profiles where referral_code = code) into exists_already;
    exit when not exists_already;
  end loop;
  return code;
end;
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  referrer uuid;
  used_code text;
begin
  used_code := new.raw_user_meta_data->>'referral_code_used';

  if used_code is not null and used_code <> '' then
    select id into referrer from public.profiles where referral_code = upper(used_code);
  end if;

  insert into public.profiles (id, full_name, phone, referral_code, referred_by)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', 'New user'),
    coalesce(new.raw_user_meta_data->>'phone', ''),
    public.generate_referral_code(),
    referrer
  );

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============ ROW LEVEL SECURITY ============

alter table public.profiles enable row level security;
alter table public.payments enable row level security;
alter table public.referral_earnings enable row level security;

-- profiles: a user can read/update their own row; admins can read/update all
create policy "profiles_select_own_or_admin" on public.profiles
  for select using (auth.uid() = id or public.is_admin());

create policy "profiles_update_own_or_admin" on public.profiles
  for update using (auth.uid() = id or public.is_admin());

-- payments: a user can see their own payments; admins see all.
-- Inserts/updates to payments happen only via Netlify Functions using the
-- service role key, so no insert/update policy is granted to regular users here.
create policy "payments_select_own_or_admin" on public.payments
  for select using (auth.uid() = user_id or public.is_admin());

-- referral_earnings: a referrer can see their own earnings; admins see all
-- and can update status (e.g. marking a payout as paid).
create policy "referral_select_own_or_admin" on public.referral_earnings
  for select using (auth.uid() = referrer_id or public.is_admin());

create policy "referral_update_admin_only" on public.referral_earnings
  for update using (public.is_admin());

-- ============ MAKE YOURSELF AN ADMIN ============
-- After you sign up through the site once with your own account, run:
--   update public.profiles set is_admin = true where id = 'YOUR-USER-UUID-HERE';
-- Find your UUID in Supabase > Authentication > Users.
