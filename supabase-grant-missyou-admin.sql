do $$
declare
    target_user_id uuid;
    existing_admin_id uuid;
begin
    select auth_user.id
    into target_user_id
    from auth.users as auth_user
    join public.miss_tour_profiles as profile on profile.user_id = auth_user.id
    where lower(auth_user.email) = lower('teot99349@gmail.com')
      and profile.username = 'missyou';

    if target_user_id is null then
        raise exception 'Account missyou / teot99349@gmail.com is not registered in Supabase Auth';
    end if;

    select user_id
    into existing_admin_id
    from public.site_admins
    limit 1;

    if existing_admin_id is not null and existing_admin_id <> target_user_id then
        raise exception 'A different site admin already exists; remove or replace that role intentionally first';
    end if;

    insert into public.site_admins (user_id)
    values (target_user_id)
    on conflict (user_id) do nothing;
end;
$$;
