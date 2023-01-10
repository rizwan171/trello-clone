package riz.trelloclone.board

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.util.*

@Service
class BoardService(@Autowired val boardRepository: BoardRepository) {

  fun createBoard(boardJson: BoardJson): BoardJson {
    val board = Board(UUID.randomUUID(), boardJson.title)
    return BoardJson.fromEntity(boardRepository.save(board))
  }

  fun getBoard(id: UUID): Optional<Board> {
    return boardRepository.findById(id)
  }

  fun updateBoard(board: Board, boardJson: BoardJson): BoardJson {
    board.title = boardJson.title

    return BoardJson.fromEntity(boardRepository.save(board))
  }

  fun deleteBoard(board: Board) {
    boardRepository.delete(board)
  }
}