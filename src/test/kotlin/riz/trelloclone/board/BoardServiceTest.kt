package riz.trelloclone.board

import io.mockk.every
import io.mockk.mockk
import io.mockk.slot
import io.mockk.verify
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test
import java.util.*

class BoardServiceTest {

  private val boardRepository: BoardRepository = mockk()
  private val boardService = BoardService(boardRepository)
  private val boardCaptureSlot = slot<Board>()


  @Test
  fun createBoard() {
    val boardId = UUID.randomUUID()
    val jsonBoard = JsonBoard(boardId, "title")
    val board = Board(boardId, "title")
    every { boardRepository.save(any()) } returns board

    val savedJsonBoard = boardService.createBoard(jsonBoard)

    verify { boardRepository.save(capture(boardCaptureSlot)) }
    assertThat(boardCaptureSlot.captured)
      .usingRecursiveComparison()
      .ignoringFields("id")
      .isEqualTo(board)
    assertThat(savedJsonBoard)
      .usingRecursiveComparison()
      .isEqualTo(jsonBoard)
  }
}
