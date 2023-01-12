package riz.trelloclone.board

import com.ninjasquad.springmockk.MockkBean
import io.mockk.every
import io.mockk.verify
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.http.MediaType
import org.springframework.test.context.junit.jupiter.SpringExtension
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.*
import java.util.*

@WebMvcTest(controllers = [BoardApiRestControllerTest::class])
@ExtendWith(SpringExtension::class)
class BoardApiRestControllerTest(@Autowired val mockMvc: MockMvc) {

  @MockkBean
  private lateinit var boardService: BoardService

  private val boardId = UUID.randomUUID()
  private val board = Board(boardId, "title")
  private val boardJson = BoardJson(boardId, "title")
  private val boardJsonString = """
    {
      "id": "$boardId",
      "title": "title"
    }
    """.trimIndent()

  @Test
  fun getBoard() {
    every { boardService.getBoard(boardId) } returns Optional.of(board)

    mockMvc.perform(get("/api/v1/boards/$boardId"))
      .andExpect(status().isOk)
      .andExpect(content().json(boardJsonString))
  }

  @Test
  fun getBoard_notFound() {
    every { boardService.getBoard(boardId) } returns Optional.empty()

    mockMvc.perform(get("/api/v1/boards/$boardId"))
      .andExpect(status().isNotFound)
  }

  @Test
  fun createBoard() {
    val postBoardJson = BoardJson(null, "title")
    every { boardService.createBoard(postBoardJson) } returns boardJson

    mockMvc.perform(post("/api/v1/boards")
      .contentType(MediaType.APPLICATION_JSON)
      .content("""
        {
          "title": "title"
        }
        """.trimIndent()))
      .andExpect(status().isCreated)
      .andExpect(header().string("Location", "/api/v1/boards/$boardId"))
      .andExpect(content().json(boardJsonString))
  }

  @Test
  fun updateBoard() {
    every { boardService.getBoard(boardId) } returns Optional.of(board)
    val boardJsonUpdates = BoardJson(null, "updated title")
    val updateBoardJsonString = """
      {
        "id": "$boardId",
        "title": "updated title"
      }
      """.trimIndent()
    val updatedBoardJson = BoardJson(boardId, "updated title")
    every { boardService.updateBoard(board, boardJsonUpdates) } returns updatedBoardJson

    mockMvc.perform(put("/api/v1/boards/$boardId")
      .contentType(MediaType.APPLICATION_JSON)
      .content("""
        {
          "title": "updated title"
        }
        """.trimIndent()))
      .andExpect(status().isOk)
      .andExpect(content().json(updateBoardJsonString))
  }

  @Test
  fun updateBoard_notFound() {
    every { boardService.getBoard(boardId) } returns Optional.empty()

    mockMvc.perform(put("/api/v1/boards/$boardId")
      .contentType(MediaType.APPLICATION_JSON)
      .content("""
        {
          "title": "updated title"
        }
        """.trimIndent()))
      .andExpect(status().isNotFound)
  }

  @Test
  fun deleteBoard() {
    every { boardService.getBoard(boardId) } returns Optional.of(board)
    every { boardService.deleteBoard(board) } returns Unit

    mockMvc.perform(delete("/api/v1/boards/$boardId"))
      .andExpect(status().isNoContent)
    verify { boardService.deleteBoard(board) }
  }

  @Test
  fun deleteBoard_notFound() {
    every { boardService.getBoard(boardId) } returns Optional.empty()

    mockMvc.perform(delete("/api/v1/boards/$boardId"))
      .andExpect(status().isNotFound)
  }
}