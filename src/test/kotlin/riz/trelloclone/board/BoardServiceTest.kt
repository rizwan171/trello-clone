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
    val boardJson = BoardJson(boardId, "title")
    val board = Board(boardId, "title")
    every { boardRepository.save(any()) } returns board

    val savedJsonBoard = boardService.createBoard(boardJson)

    verify { boardRepository.save(capture(boardCaptureSlot)) }
    assertThat(boardCaptureSlot.captured)
      .usingRecursiveComparison()
      .ignoringFields("id")
      .isEqualTo(board)
    assertThat(savedJsonBoard)
      .usingRecursiveComparison()
      .isEqualTo(boardJson)
  }

  @Test
  fun updateBoard() {
    val boardId = UUID.randomUUID()
    val board = Board(boardId, "title")
    val updatedBoard = Board(boardId, "Updated Title")
    val updatedBoardJson = BoardJson(boardId, "Updated Title")
    every { boardRepository.save(any()) } returns updatedBoard

    val savedJsonBoard = boardService.updateBoard(board, updatedBoardJson)

    verify { boardRepository.save(capture(boardCaptureSlot)) }
    assertThat(boardCaptureSlot.captured)
      .usingRecursiveComparison()
      .isEqualTo(updatedBoard)
    assertThat(savedJsonBoard)
      .usingRecursiveComparison()
      .isEqualTo(updatedBoardJson)
  }
}