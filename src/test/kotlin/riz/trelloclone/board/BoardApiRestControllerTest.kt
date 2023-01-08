package riz.trelloclone.board

import com.ninjasquad.springmockk.MockkBean
import io.mockk.every
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.http.MediaType
import org.springframework.test.context.junit.jupiter.SpringExtension
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.*
import java.util.*

@WebMvcTest(controllers = [BoardApiRestControllerTest::class])
@ExtendWith(SpringExtension::class)
class BoardApiRestControllerTest(@Autowired val mockMvc: MockMvc) {

  @MockkBean
  private lateinit var boardService: BoardService

  private val boardId = UUID.randomUUID()
  private val jsonBoard = JsonBoard(boardId, "title")
  private val boardJsonString = """
    {
      "id": "$boardId",
      "title": "title"
    }
    """.trimIndent()

  @Test
  fun getBoard() {
    every { boardService.getBoard(boardId) } returns Optional.of(jsonBoard)

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
    val postJsonBoard = JsonBoard(null, "title")
    every { boardService.createBoard(postJsonBoard) } returns jsonBoard

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
}