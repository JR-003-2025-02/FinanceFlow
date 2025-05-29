-- Create profiles table
create table "public"."profiles" (
    "id" uuid not null,
    "full_name" text,
    "username" text,
    "avatar_url" text,
    "updated_at" timestamp with time zone,
    "created_at" timestamp with time zone default timezone('utc'::text, now()) not null,
    constraint "profiles_pkey" primary key ("id"),
    constraint "profiles_id_fkey" foreign key ("id") references auth.users("id") on delete cascade,
    constraint "username_unique" unique ("username")
);

-- Enable RLS
alter table "public"."profiles" enable row level security;

-- Create secure policies
create policy "Public profiles are viewable by everyone"
  on profiles for select
  using ( true );

create policy "Users can insert their own profile"
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile"
  on profiles for update
  using ( auth.uid() = id );

-- Create indexes
create index profiles_username_idx on profiles using btree (username);
create index profiles_id_idx on profiles using btree (id);

-- Set up Realtime
alter publication supabase_realtime add table profiles;
