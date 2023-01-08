CREATE TABLE tc.boards (
  id UUID DEFAULT uuid_generate_v4(),
  title VARCHAR(1000)
);