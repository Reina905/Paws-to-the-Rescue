-- ==========================================
-- Functions
-- ==========================================

-- Trigger function: creates a profile row when a new auth user is created.
-- If role metadata is missing (e.g. user created from dashboard), it still succeeds.
CREATE OR REPLACE FUNCTION create_profile()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.profiles (user_id)
    VALUES (NEW.id);

    RETURN NEW;
END;
$$;
