
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import riz.trelloclone.board.JsonBoard
import java.util.*

@Service
class BoardService(@Autowired val boardRepository: BoardRepository) {

  fun createBoard(jsonBoard: JsonBoard): JsonBoard {
    val board = Board(UUID.randomUUID(), jsonBoard.title)
    return toJsonBoard(boardRepository.save(board))
  }

  fun getBoard(id: UUID): Optional<JsonBoard> {
    return boardRepository.findById(id)
      .map { toJsonBoard(it) }
  }

  private fun toJsonBoard(board: Board): JsonBoard {
    return JsonBoard(board.id, board.title)
  }
}