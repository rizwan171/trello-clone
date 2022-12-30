
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import riz.trelloclone.board.JsonBoard
import java.util.*

@Service
class BoardService(@Autowired val boardRepo: BoardRepo) {

  fun createBoard(jsonBoard: JsonBoard): JsonBoard {
    val board = Board(UUID.randomUUID(), jsonBoard.title)
    return toJsonBoard(boardRepo.save(board))
  }

  fun getBoard(id: UUID): Optional<JsonBoard> {
    return boardRepo.findById(id)
      .map { toJsonBoard(it) }
  }

  private fun toJsonBoard(board: Board): JsonBoard {
    return JsonBoard(board.id, board.title)
  }
}