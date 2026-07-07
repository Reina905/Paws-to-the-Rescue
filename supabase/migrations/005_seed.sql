-- ==========================================
-- Seed: Badges
-- ==========================================

INSERT INTO badges (name, description, url_image)
VALUES
('First Purr', 'Completed your first volunteer activity.', 'https://img.freepik.com/vector-premium/vector-cute-cat-kawaii_871993-126.jpg'),
('Kitten Caregiver', 'Helped care for kittens.', 'https://easydrawingguides.com/wp-content/uploads/2023/03/how-to-draw-a-cartoon-heart-featured-image-1200.png'),
('Clean Paws', 'Completed 10 cleaning activities.', 'https://i.pinimg.com/736x/8d/2b/99/8d2b991f4efed2f4772e0afd1b679ac9.jpg'),
('Cat Whisperer', 'Spent 20 hours socializing cats.', 'https://img.magnific.com/premium-vector/cats-are-playing-ball-with-simple-cartoon-style-mascot-concept_995281-5973.jpg'),
('Shelter Hero', 'Completed 50 volunteer activities.', 'https://i.pinimg.com/564x/49/aa/81/49aa813a1fab5a2583599992ecd18d11.jpg')
ON CONFLICT (name) DO NOTHING;
