
-- Make numero_processo column have a default value using our function
-- This will make the Supabase types reflect that numero_processo is optional on insert
ALTER TABLE public.emprestimos 
ALTER COLUMN numero_processo SET DEFAULT generate_numero_processo();
