-- ==========================================
-- Seed: Badges
-- ==========================================

INSERT INTO badges (name, description, url_image)
VALUES
('First Purr', 'Completed your first volunteer activity.', '/badges/first_purr.png'),
('Kitten Caregiver', 'Helped care for kittens.', '/badges/kitten_caregiver.png'),
('Clean Paws', 'Completed 10 cleaning activities.', '/badges/clean_paws.png'),
('Cat Whisperer', 'Spent 20 hours socializing cats.', '/badges/cat_whisperer.png'),
('Shelter Hero', 'Completed 50 volunteer activities.', '/badges/shelter_hero.png')
ON CONFLICT (name) DO NOTHING;
