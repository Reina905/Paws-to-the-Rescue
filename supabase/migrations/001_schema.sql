-- ==========================================
-- Schema for Paws to the Rescue
-- ==========================================

-- Profiles table (links auth.users to app roles)
CREATE TABLE profiles (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Shelters table
CREATE TABLE shelters (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id UUID UNIQUE NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    logo TEXT,
    description TEXT,
    contact_number TEXT,
    location TEXT,
    animal_capacity INTEGER DEFAULT 0,
    total_animals INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Volunteers table
CREATE TABLE volunteers (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id UUID UNIQUE NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    role TEXT,
    bio TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Opportunities table
CREATE TABLE opportunities (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    shelter_id BIGINT NOT NULL REFERENCES shelters(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    category TEXT,
    description TEXT,
    image TEXT,
    location TEXT,
    date TIMESTAMPTZ NOT NULL,
    duration INTEGER,
    total_spaces INTEGER NOT NULL,
    available_spaces INTEGER NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CHECK (total_spaces >= 0),
    CHECK (available_spaces >= 0),
    CHECK (available_spaces <= total_spaces)
);

-- Applications table (volunteers apply to opportunities)
CREATE TABLE applications (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    volunteer_id BIGINT NOT NULL REFERENCES volunteers(id) ON DELETE CASCADE,
    opportunity_id BIGINT NOT NULL REFERENCES opportunities(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    hours NUMERIC(5,2) DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(volunteer_id, opportunity_id)
);

-- Activity logs (tracks volunteer hours)
CREATE TABLE activity_logs (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    volunteer_id BIGINT NOT NULL REFERENCES volunteers(id) ON DELETE CASCADE,
    shelter_id BIGINT NOT NULL REFERENCES shelters(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    hours NUMERIC(5,2) NOT NULL CHECK (hours > 0),
    note TEXT,
    completed_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Badges table
CREATE TABLE badges (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    description TEXT NOT NULL,
    url_image TEXT
);

-- Earned badges
CREATE TABLE earned_badges (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    volunteer_id BIGINT NOT NULL REFERENCES volunteers(id) ON DELETE CASCADE,
    badge_id BIGINT NOT NULL REFERENCES badges(id) ON DELETE CASCADE,
    earned_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(volunteer_id, badge_id)
);
