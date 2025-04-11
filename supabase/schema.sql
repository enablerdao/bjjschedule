-- Create academies table
CREATE TABLE academies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  address TEXT,
  city TEXT,
  region TEXT,
  country TEXT,
  latitude FLOAT,
  longitude FLOAT,
  logo_url TEXT,
  website TEXT,
  phone TEXT,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create instructors table
CREATE TABLE instructors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  academy_id UUID REFERENCES academies(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  bio TEXT,
  belt_level TEXT,
  profile_image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create class_categories table
CREATE TABLE class_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  color_code TEXT
);

-- Create classes table
CREATE TABLE classes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  academy_id UUID REFERENCES academies(id) ON DELETE CASCADE,
  category_id UUID REFERENCES class_categories(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  recurring_pattern TEXT,
  max_capacity INTEGER,
  requirements TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create junction table for classes and instructors
CREATE TABLE class_instructors (
  class_id UUID REFERENCES classes(id) ON DELETE CASCADE,
  instructor_id UUID REFERENCES instructors(id) ON DELETE CASCADE,
  PRIMARY KEY (class_id, instructor_id)
);

-- Create users table (extends Supabase auth.users)
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  name TEXT,
  belt_level TEXT,
  profile_image_url TEXT,
  language_preference TEXT DEFAULT 'en',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_favorites table
CREATE TABLE user_favorites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  academy_id UUID REFERENCES academies(id) ON DELETE CASCADE,
  class_id UUID REFERENCES classes(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create notifications table
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  content TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default class categories
INSERT INTO class_categories (name, description, color_code) VALUES
  ('Fundamentals', 'Basic techniques for all levels', '#1E40AF'),
  ('Advanced', 'Advanced techniques for experienced practitioners', '#DC2626'),
  ('No-Gi', 'Grappling without the traditional gi', '#10B981'),
  ('Kids', 'Classes designed for children', '#F59E0B'),
  ('Competition', 'Training focused on competition preparation', '#8B5CF6'),
  ('Open Mat', 'Unstructured training session', '#6B7280');

-- Enable RLS on all tables
ALTER TABLE academies ENABLE ROW LEVEL SECURITY;
ALTER TABLE instructors ENABLE ROW LEVEL SECURITY;
ALTER TABLE class_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE class_instructors ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Public read access for academies, instructors, class_categories, classes, class_instructors
CREATE POLICY "Public read access for academies" ON academies FOR SELECT USING (true);
CREATE POLICY "Public read access for instructors" ON instructors FOR SELECT USING (true);
CREATE POLICY "Public read access for class_categories" ON class_categories FOR SELECT USING (true);
CREATE POLICY "Public read access for classes" ON classes FOR SELECT USING (true);
CREATE POLICY "Public read access for class_instructors" ON class_instructors FOR SELECT USING (true);

-- Create academy_owners table for academy management
CREATE TABLE academy_owners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  academy_id UUID REFERENCES academies(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'owner',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, academy_id)
);

ALTER TABLE academy_owners ENABLE ROW LEVEL SECURITY;

-- Academy owners can update their own academies
CREATE POLICY "Academy owners can update their academies" ON academies 
  FOR UPDATE USING (
    auth.uid() IN (
      SELECT user_id FROM academy_owners WHERE academy_id = id
    )
  );

-- Users can read their own data
CREATE POLICY "Users can read own data" ON users
  FOR SELECT USING (auth.uid() = id);

-- Users can update their own data
CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Users can manage their own favorites
CREATE POLICY "Users can manage own favorites" ON user_favorites
  FOR ALL USING (auth.uid() = user_id);

-- Users can read their own notifications
CREATE POLICY "Users can read own notifications" ON notifications
  FOR SELECT USING (auth.uid() = user_id);

-- Users can update their own notifications (mark as read)
CREATE POLICY "Users can update own notifications" ON notifications
  FOR UPDATE USING (auth.uid() = user_id);

-- Academy owners can manage their academies
CREATE POLICY "Academy owners can manage their academies" ON academy_owners
  FOR ALL USING (auth.uid() = user_id);

-- Create functions and triggers

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_academies_updated_at
  BEFORE UPDATE ON academies
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_instructors_updated_at
  BEFORE UPDATE ON instructors
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_classes_updated_at
  BEFORE UPDATE ON classes
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

-- Create indexes for performance
CREATE INDEX idx_academies_city ON academies(city);
CREATE INDEX idx_academies_country ON academies(country);
CREATE INDEX idx_classes_start_time ON classes(start_time);
CREATE INDEX idx_classes_academy_id ON classes(academy_id);
CREATE INDEX idx_instructors_academy_id ON instructors(academy_id);
CREATE INDEX idx_user_favorites_user_id ON user_favorites(user_id);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(read);

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, name, language_preference)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', COALESCE(NEW.raw_user_meta_data->>'language', 'en'));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE handle_new_user();