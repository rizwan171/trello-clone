CREATE TABLE tc.lists (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(1000),
  board_id UUID,
  CONSTRAINT fk_board FOREIGN KEY (board_id) REFERENCES tc.boards(id)
)