CREATE TABLE tc.boards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(1000) NOT NULL
);