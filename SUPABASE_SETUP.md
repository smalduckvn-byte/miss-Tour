# Supabase Setup for Miss tour

The app uses Supabase Auth and Postgres for shared accounts, comments, replies, reactions, and server-enforced comment deletion. Local browser storage remains active until the project URL and public anon key are configured.

## 1. Create a project

1. Sign in at <https://supabase.com/dashboard> and create a project.
2. In **Project Settings > API**, copy the **Project URL** and the **anon/public** key.
3. Open `supabase-config.js` and set `projectUrl` and `anonKey` to those values. The anon key is intended for a browser; never put a `service_role` key in this file.

## 2. Create the database schema

1. In the project, open **SQL Editor**.
2. Run the complete contents of `supabase-setup.sql` once.
3. The script creates the comments, profiles, replies, and admin tables; enables RLS; and adds the realtime publication entries.

## 3. Configure Auth redirects

In **Authentication > URL Configuration**, set the Site URL and add redirect URLs for local and production use, for example:

- `http://localhost:5500/**`
- `https://YOUR-PRODUCTION-DOMAIN/**`

Email confirmation can remain enabled. Supabase sends a confirmation link; the browser origin must be in the allowed redirect URLs. The default test mailer may restrict recipients; configure SMTP in **Authentication > SMTP Settings** for public signup.

## 4. Run the site locally

The current workspace is being served at `http://localhost:5500/index.html` by the built-in Windows PowerShell HTTP listener. Keep that terminal running while testing. For later sessions, use the VS Code **Live Server** extension or another static HTTP server.

Do not open the page with `file://` for Supabase Auth because it has no valid web origin for redirects.

## 5. Register and promote the owner

1. Register the owner account in the site's account form using username `missyou` and the email address associated with that account.
2. Confirm the email if confirmation is enabled, then sign in once.
3. In SQL Editor, run `supabase-grant-missyou-admin.sql`. It promotes only the matching registered account and refuses to replace a different existing admin.

Passwords are managed by Supabase Auth and are never stored in the site source. The single-admin constraint is enforced in the database. Local accounts created before Supabase is configured remain local and must be registered again in Supabase.

## 6. Verify shared behavior

Open the same deployed site on two browsers/devices. Submit a comment from one; the other should receive it through Supabase Realtime. Sign in as the comment author to delete their own comment, or as the promoted owner to delete any comment. Replies are stored in `miss_tour_comment_replies` and also update in realtime.

If the page says it is using local mode, check that the URL and anon key in `supabase-config.js` are correct and that the SQL setup completed without errors.