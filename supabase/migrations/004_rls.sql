-- ==========================================
-- Row Level Security
-- ==========================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE shelters ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteers ENABLE ROW LEVEL SECURITY;
ALTER TABLE opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE earned_badges ENABLE ROW LEVEL SECURITY;

-- Profiles: users can view and update their own profile
CREATE POLICY "Users view own profile"
ON profiles FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users update own profile"
ON profiles FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Shelters: anyone can read, owner can manage
CREATE POLICY "Anyone can view shelters"
ON shelters FOR SELECT
USING (true);

CREATE POLICY "Shelter owner manages own record"
ON shelters FOR INSERT
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Shelter owner updates own record"
ON shelters FOR UPDATE
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Shelter owner deletes own record"
ON shelters FOR DELETE
USING (user_id = auth.uid());

-- Volunteers: anyone can read, owner can manage
CREATE POLICY "Anyone can view volunteers"
ON volunteers FOR SELECT
USING (true);

CREATE POLICY "Volunteer owner manages own record"
ON volunteers FOR INSERT
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Volunteer owner updates own record"
ON volunteers FOR UPDATE
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Volunteer owner deletes own record"
ON volunteers FOR DELETE
USING (user_id = auth.uid());

-- Opportunities: anyone can read, shelter owner can manage
CREATE POLICY "Anyone can view active opportunities"
ON opportunities FOR SELECT
USING (true);

CREATE POLICY "Shelter owner inserts opportunities"
ON opportunities FOR INSERT
WITH CHECK (
    shelter_id IN (
        SELECT id FROM shelters WHERE user_id = auth.uid()
    )
);

CREATE POLICY "Shelter owner updates opportunities"
ON opportunities FOR UPDATE
USING (
    shelter_id IN (
        SELECT id FROM shelters WHERE user_id = auth.uid()
    )
)
WITH CHECK (
    shelter_id IN (
        SELECT id FROM shelters WHERE user_id = auth.uid()
    )
);

CREATE POLICY "Shelter owner deletes opportunities"
ON opportunities FOR DELETE
USING (
    shelter_id IN (
        SELECT id FROM shelters WHERE user_id = auth.uid()
    )
);

-- Applications: volunteers can insert their own, shelter owners can view/update theirs
CREATE POLICY "Volunteer inserts application"
ON applications FOR INSERT
WITH CHECK (
    volunteer_id IN (
        SELECT id FROM volunteers WHERE user_id = auth.uid()
    )
);

CREATE POLICY "Volunteer views own applications"
ON applications FOR SELECT
USING (
    volunteer_id IN (
        SELECT id FROM volunteers WHERE user_id = auth.uid()
    )
);

CREATE POLICY "Shelter views applications for their opportunities"
ON applications FOR SELECT
USING (
    opportunity_id IN (
        SELECT id FROM opportunities WHERE shelter_id IN (
            SELECT id FROM shelters WHERE user_id = auth.uid()
        )
    )
);

CREATE POLICY "Shelter updates application status"
ON applications FOR UPDATE
USING (
    opportunity_id IN (
        SELECT id FROM opportunities WHERE shelter_id IN (
            SELECT id FROM shelters WHERE user_id = auth.uid()
        )
    )
)
WITH CHECK (
    opportunity_id IN (
        SELECT id FROM opportunities WHERE shelter_id IN (
            SELECT id FROM shelters WHERE user_id = auth.uid()
        )
    )
);

-- Activity logs: volunteer views own, shelter can insert
CREATE POLICY "Volunteer views own activity"
ON activity_logs FOR SELECT
USING (
    volunteer_id IN (
        SELECT id FROM volunteers WHERE user_id = auth.uid()
    )
);

CREATE POLICY "Shelter inserts activity logs"
ON activity_logs FOR INSERT
WITH CHECK (
    shelter_id IN (
        SELECT id FROM shelters WHERE user_id = auth.uid()
    )
);

-- Badges: anyone can read
CREATE POLICY "Anyone can view badges"
ON badges FOR SELECT
USING (true);

-- Earned badges: volunteer views own
CREATE POLICY "Volunteer views own badges"
ON earned_badges FOR SELECT
USING (
    volunteer_id IN (
        SELECT id FROM volunteers WHERE user_id = auth.uid()
    )
);
