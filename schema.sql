create table profiles (
  id uuid references auth.users on delete cascade,
  email text,
  name text,
  plan text default 'free',
  created_at timestamp default now(),
  primary key (id)
);

create table conversations (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade,
  title text,
  created_at timestamp default now()
);

create table messages (
  id uuid default gen_random_uuid() primary key,
  conversation_id uuid references conversations(id) on delete cascade,
  role text,
  content text,
  created_at timestamp default now()
);

create table resumes (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade,
  title text,
  content jsonb,
  created_at timestamp default now()
);

alter table profiles enable row level security;
alter table conversations enable row level security;
alter table messages enable row level security;
alter table resumes enable row level security;

create policy "Users own data" on profiles for all using (auth.uid() = id);
create policy "Users own convos" on conversations for all using (auth.uid() = user_id);
create policy "Users own messages" on messages for all using (
  conversation_id in (select id from conversations where user_id = auth.uid())
);
create policy "Users own resumes" on resumes for all using (auth.uid() = user_id);
