create table if not exists public.miss_tour_comments (
    id uuid primary key default gen_random_uuid(),
    name text not null check (char_length(name) between 1 and 100),
    content text not null check (char_length(content) between 1 and 3000),
    rating smallint not null default 5 check (rating between 1 and 5),
    avatar text not null default '' check (char_length(avatar) <= 2097152),
    likes integer not null default 0 check (likes >= 0),
    loves integer not null default 0 check (loves >= 0),
    created_by uuid default auth.uid() references auth.users(id) on delete set null,
    created_at timestamptz not null default now()
);

create table if not exists public.site_admins (
    user_id uuid primary key references auth.users(id) on delete cascade,
    created_at timestamptz not null default now()
);

create table if not exists public.miss_tour_profiles (
    user_id uuid primary key references auth.users(id) on delete cascade,
    username text not null unique
        check (username = lower(username) and username ~ '^[a-z0-9_]{3,24}$'),
    created_at timestamptz not null default now()
);

create unique index if not exists site_admins_single_account
    on public.site_admins ((true));

create or replace function public.create_miss_tour_profile()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
    insert into public.miss_tour_profiles (user_id, username)
    values (new.id, lower(trim(new.raw_user_meta_data ->> 'username')));
    return new;
end;
$$;

drop trigger if exists create_miss_tour_profile on auth.users;
create trigger create_miss_tour_profile
    after insert on auth.users
    for each row execute function public.create_miss_tour_profile();

alter table public.miss_tour_comments enable row level security;
alter table public.site_admins enable row level security;
alter table public.miss_tour_profiles enable row level security;

revoke all on public.miss_tour_comments from anon, authenticated;
grant select, insert on public.miss_tour_comments to anon, authenticated;
grant delete on public.miss_tour_comments to authenticated;

revoke all on public.site_admins from anon, authenticated;
grant select on public.site_admins to authenticated;
revoke all on public.miss_tour_profiles from anon, authenticated;
grant select on public.miss_tour_profiles to authenticated;

drop policy if exists "Anyone can read comments" on public.miss_tour_comments;
create policy "Anyone can read comments"
    on public.miss_tour_comments for select
    using (true);

drop policy if exists "Anyone can submit comments" on public.miss_tour_comments;
create policy "Anyone can submit comments"
    on public.miss_tour_comments for insert
    with check (created_by is null or created_by = (select auth.uid()));

drop policy if exists "Registered site owners can delete comments" on public.miss_tour_comments;
drop policy if exists "Authors and site owners can delete comments" on public.miss_tour_comments;
create policy "Authors and site owners can delete comments"
    on public.miss_tour_comments for delete
    using (
        created_by = (select auth.uid())
        or exists (
            select 1
            from public.site_admins
            where site_admins.user_id = (select auth.uid())
        )
    );

drop policy if exists "Site owners can read their own role" on public.site_admins;
create policy "Site owners can read their own role"
    on public.site_admins for select
    using (user_id = (select auth.uid()));

drop policy if exists "Users can read their own profile" on public.miss_tour_profiles;
create policy "Users can read their own profile"
    on public.miss_tour_profiles for select
    using (user_id = (select auth.uid()));

create or replace function public.react_to_miss_tour_comment(
    p_comment_id uuid,
    p_reaction text
)
returns table (likes integer, loves integer)
language plpgsql
security definer
set search_path = ''
as $$
begin
    if p_reaction = 'like' then
        update public.miss_tour_comments as comment
        set likes = comment.likes + 1
        where comment.id = p_comment_id;
    elsif p_reaction = 'love' then
        update public.miss_tour_comments as comment
        set loves = comment.loves + 1
        where comment.id = p_comment_id;
    else
        raise exception 'Unsupported reaction type';
    end if;

    return query
    select comment.likes, comment.loves
    from public.miss_tour_comments as comment
    where comment.id = p_comment_id;
end;
$$;

revoke all on function public.react_to_miss_tour_comment(uuid, text) from public;
grant execute on function public.react_to_miss_tour_comment(uuid, text) to anon, authenticated;

do $$
begin
    if not exists (
        select 1
        from pg_publication_tables
        where pubname = 'supabase_realtime'
          and schemaname = 'public'
          and tablename = 'miss_tour_comments'
    ) then
        alter publication supabase_realtime add table public.miss_tour_comments;
    end if;
end;
$$;

-- After the account has been registered in Supabase Auth, run this block to grant it admin rights.
-- It matches both email and username, and the unique index above prevents a second admin.
-- do $$
-- declare
--     target_user_id uuid;
-- begin
--     select auth_user.id into target_user_id
--     from auth.users as auth_user
--     join public.miss_tour_profiles as profile on profile.user_id = auth_user.id
--     where lower(auth_user.email) = lower('teot99349@gmail.com')
--       and profile.username = 'missyou';
--
--     if target_user_id is null then
--         raise exception 'No registered account found for the specified email and username';
--     end if;
--
--     insert into public.site_admins (user_id)
--     values (target_user_id)
--     on conflict (user_id) do nothing;
-- end;
-- $$;