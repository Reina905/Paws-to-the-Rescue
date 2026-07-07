-- ==========================================
-- Demo Data Seed
-- ==========================================
-- HOW TO USE:
-- 1. First, create these 3 users from the Supabase Dashboard (Authentication > Users > Add User):
--      - shelter@test.com / password123 (set metadata: {"role": "shelter"})
--      - volunteer1@test.com / password123 (set metadata: {"role": "volunteer"})
--      - volunteer2@test.com / password123 (set metadata: {"role": "volunteer"})
--    Make sure "Auto Confirm User" is checked.
-- 2. Then run: supabase db query --linked --file supabase/seed/demo_data.sql

DO $$
DECLARE
    v_shelter_user UUID;
    v_volunteer_1 UUID;
    v_volunteer_2 UUID;
    v_shelter_id BIGINT;
    v_volunteer_1_id BIGINT;
    v_volunteer_2_id BIGINT;
    v_opp_1 BIGINT;
    v_opp_2 BIGINT;
    v_opp_3 BIGINT;
    v_opp_4 BIGINT;
    v_badge_first_purr BIGINT;
    v_badge_kitten BIGINT;
BEGIN

-- ==========================================
-- Get Auth user IDs
-- ==========================================

SELECT id INTO v_shelter_user
FROM auth.users WHERE email = 'shelter@test.com';

SELECT id INTO v_volunteer_1
FROM auth.users WHERE email = 'volunteer1@test.com';

SELECT id INTO v_volunteer_2
FROM auth.users WHERE email = 'volunteer2@test.com';

IF v_shelter_user IS NULL THEN
    RAISE EXCEPTION 'Missing user: shelter@test.com — create it in Supabase Dashboard first (Auth > Users > Add User)';
END IF;

IF v_volunteer_1 IS NULL THEN
    RAISE EXCEPTION 'Missing user: volunteer1@test.com — create it in Supabase Dashboard first';
END IF;

IF v_volunteer_2 IS NULL THEN
    RAISE EXCEPTION 'Missing user: volunteer2@test.com — create it in Supabase Dashboard first';
END IF;

-- ==========================================
-- Ensure profiles exist
-- ==========================================

INSERT INTO profiles (user_id)
VALUES (v_shelter_user)
ON CONFLICT (user_id) DO NOTHING;

INSERT INTO profiles (user_id)
VALUES (v_volunteer_1)
ON CONFLICT (user_id) DO NOTHING;

INSERT INTO profiles (user_id)
VALUES (v_volunteer_2)
ON CONFLICT (user_id) DO NOTHING;

-- ==========================================
-- Shelter
-- ==========================================

INSERT INTO shelters (user_id, name, logo, description, contact_number, location, animal_capacity)
VALUES (
    v_shelter_user,
    'Happy Whiskers Shelter',
    'https://www.operationkindness.org/wp-content/uploads/blog-june-adopt-shelter-cat-month-operation-kindness.jpg',
    'Cat rescue shelter dedicated to abandoned cats.',
    '+1 555-123-4567',
    'San José, Costa Rica',
    80
)
ON CONFLICT (user_id) DO NOTHING
RETURNING id INTO v_shelter_id;

-- If shelter already existed, fetch its id
IF v_shelter_id IS NULL THEN
    SELECT id INTO v_shelter_id FROM shelters WHERE user_id = v_shelter_user;
END IF;

-- ==========================================
-- Volunteers
-- ==========================================

INSERT INTO volunteers (user_id, name, role, bio)
VALUES (
    v_volunteer_1,
    'Emily Johnson',
    'Cat Caregiver',
    'Cat lover with rescue experience.'
)
ON CONFLICT (user_id) DO NOTHING
RETURNING id INTO v_volunteer_1_id;

IF v_volunteer_1_id IS NULL THEN
    SELECT id INTO v_volunteer_1_id FROM volunteers WHERE user_id = v_volunteer_1;
END IF;

INSERT INTO volunteers (user_id, name, role, bio)
VALUES (
    v_volunteer_2,
    'Daniel Smith',
    'Weekend Helper',
    'Weekend volunteer passionate about animal welfare.'
)
ON CONFLICT (user_id) DO NOTHING
RETURNING id INTO v_volunteer_2_id;

IF v_volunteer_2_id IS NULL THEN
    SELECT id INTO v_volunteer_2_id FROM volunteers WHERE user_id = v_volunteer_2;
END IF;

-- ==========================================
-- Opportunities
-- ==========================================

INSERT INTO opportunities (shelter_id, name, category, description, image, location, date, duration, total_spaces, available_spaces, is_active)
VALUES (
    v_shelter_id,
    'Morning Feeding',
    'Feeding',
    'Help feed the shelter cats their morning meal.',
    'https://images.pexels.com/photos/20049565/pexels-photo-20049565/free-photo-of-cats-eating-food-in-a-shelter.jpeg',
    'Happy Whiskers Shelter',
    '2026-08-01 08:00:00+00',
    2,
    5,
    3,
    true
)
RETURNING id INTO v_opp_1;

INSERT INTO opportunities (shelter_id, name, category, description, image, location, date, duration, total_spaces, available_spaces, is_active)
VALUES (
    v_shelter_id,
    'Litter Box Cleaning',
    'Cleaning',
    'Clean and sanitize litter boxes throughout the shelter.',
    'https://www.dailypaws.com/thmb/47fyY3uop4mUkI6-r6tOQbZuP0Y=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/cleaning-litter-box-1218969227-2000-9e4f580eb48242078562aa3de6d93257.jpg',
    'Happy Whiskers Shelter',
    '2026-08-01 10:00:00+00',
    2,
    4,
    0,
    true
)
RETURNING id INTO v_opp_2;

INSERT INTO opportunities (shelter_id, name, category, description, image, location, date, duration, total_spaces, available_spaces, is_active)
VALUES (
    v_shelter_id,
    'Cat Socialization',
    'Socialization',
    'Spend time with shy cats to help them get comfortable with humans.',
    'https://www.aaha.org/wp-content/uploads/2025/06/playing-with-cat.jpg',
    'Happy Whiskers Shelter',
    '2026-08-02 14:00:00+00',
    3,
    6,
    6,
    true
)
RETURNING id INTO v_opp_3;

INSERT INTO opportunities (shelter_id, name, category, description, image, location, date, duration, total_spaces, available_spaces, is_active)
VALUES (
    v_shelter_id,
    'Adoption Event',
    'Adoption Event',
    'Help visitors during our weekend adoption event.',
    'https://static.independent.co.uk/s3fs-public/thumbnails/image/2019/09/24/15/cat-pet-owner.jpg',
    'City Park',
    '2026-08-10 09:00:00+00',
    6,
    8,
    8,
    true
)
RETURNING id INTO v_opp_4;

-- ==========================================
-- Applications
-- ==========================================

INSERT INTO applications (volunteer_id, opportunity_id, status)
VALUES
    (v_volunteer_1_id, v_opp_1, 'approved'),
    (v_volunteer_1_id, v_opp_2, 'approved'),
    (v_volunteer_2_id, v_opp_3, 'approved')
ON CONFLICT (volunteer_id, opportunity_id) DO NOTHING;

-- ==========================================
-- Activity Logs
-- ==========================================

INSERT INTO activity_logs (volunteer_id, shelter_id, title, hours, note, completed_at)
VALUES
    (v_volunteer_1_id, v_shelter_id, 'Morning Feeding', 2, 'Fed all 30 cats', '2026-07-25 10:00:00+00'),
    (v_volunteer_1_id, v_shelter_id, 'Litter Box Cleaning', 2, 'Deep cleaned all boxes', '2026-07-26 12:00:00+00'),
    (v_volunteer_2_id, v_shelter_id, 'Cat Socialization', 3, 'Spent time with shy kittens', '2026-07-27 17:00:00+00');

-- ==========================================
-- Badges (ensure they exist)
-- ==========================================

INSERT INTO badges (name, description, url_image)
VALUES
    ('First Purr', 'Completed your first volunteer activity.', 'https://img.magnific.com/free-psd/kawaii-cat-illustration_23-2151299388.jpg'),
    ('Kitten Caregiver', 'Helped care for kittens.', 'https://png.pngtree.com/element_our/20200701/ourmid/pngtree-cartoon-cat-element-image_2278015.jpg'),
    ('Clean Paws', 'Completed 10 cleaning activities.', 'https://png.pngtree.com/png-vector/20250808/ourlarge/pngtree-cartoon-broom-with-pink-handle-and-teal-accents-on-circle-cleaning-png-image_16730454.webp')
ON CONFLICT (name) DO NOTHING;

SELECT id INTO v_badge_first_purr FROM badges WHERE name = 'First Purr';
SELECT id INTO v_badge_kitten FROM badges WHERE name = 'Kitten Caregiver';

-- ==========================================
-- Earned Badges
-- ==========================================

INSERT INTO earned_badges (volunteer_id, badge_id)
VALUES
    (v_volunteer_1_id, v_badge_first_purr),
    (v_volunteer_1_id, v_badge_kitten),
    (v_volunteer_2_id, v_badge_first_purr)
ON CONFLICT (volunteer_id, badge_id) DO NOTHING;

END $$;
