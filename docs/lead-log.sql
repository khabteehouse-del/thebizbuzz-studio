-- Lead log columns for the Supabase "leads" table.
-- Run once in the Supabase SQL editor. Safe to run again.
-- The site never writes these columns, so they are yours to fill in the
-- table view as a lead moves along.
--   source           already filled by the site (gbp-checker or enquiry-form)
--   service          already filled by the AI scoring step
--   qualification    your call: hot, warm, cold, not a fit
--   follow_up_date   when to contact them next
--   proposal_status  none, sent, accepted, declined
--   outcome          open, won, lost
alter table leads add column if not exists qualification text;
alter table leads add column if not exists follow_up_date date;
alter table leads add column if not exists proposal_status text default 'none';
alter table leads add column if not exists outcome text default 'open';
