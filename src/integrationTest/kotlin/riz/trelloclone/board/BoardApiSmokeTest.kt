package riz.trelloclone.board

import io.restassured.RestAssured.given
import io.restassured.http.ContentType
import org.assertj.core.api.Assertions.assertThat
import org.hamcrest.CoreMatchers.equalTo
import org.hamcrest.CoreMatchers.notNullValue
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.web.server.LocalServerPort
import org.springframework.http.HttpStatus
import riz.trelloclone.util.AbstractIntegrationTest
import riz.trelloclone.util.BoardUtils
import java.util.*

class BoardApiSmokeTest : AbstractIntegrationTest() {

  @Autowired
  private lateinit var boardRepository: BoardRepository

  private lateinit var uri: String

  @LocalServerPort
  private val port: Int = 0

  @BeforeEach
  fun setup() {
    boardRepository.deleteAll()
    uri = "http://localhost:$port"
  }

  @Test
  fun getBoard() {
    val boardId = BoardUtils.createBoard(uri).id

    given()
      .get("$uri/api/v1/boards/$boardId")
      .then()
      .statusCode(HttpStatus.OK.value())
      .body("id", equalTo(boardId.toString()))
      .body("title", notNullValue())
  }

  @Test
  fun getBoard_notFound() {
    given()
      .get("$uri/api/v1/boards/${UUID.randomUUID()}")
      .then()
      .statusCode(HttpStatus.NOT_FOUND.value())
  }

  @Test
  fun createBoard() {
    val location = given()
      .body("""
        {
          "title": "New Board"
        }
      """.trimIndent())
      .contentType(ContentType.JSON)
      .post("$uri/api/v1/boards")
      .then()
      .statusCode(HttpStatus.CREATED.value())
      .extract()
      .header("Location")

    val createdBoardId = BoardUtils.extractIdFromLocation(location)
    val createdBoard = boardRepository.findById(createdBoardId)
    assertThat(createdBoard).isPresent
    assertThat(createdBoard.get().title).isEqualTo("New Board")
  }

  @Test
  fun updateBoard() {
    val boardId = BoardUtils.createBoard(uri).id

    given()
      .body("""
        {
          "title": "Updated Test Board"
        }
      """.trimIndent())
      .contentType(ContentType.JSON)
      .put("$uri/api/v1/boards/$boardId")
      .then()
      .statusCode(HttpStatus.OK.value())
      .body("id", equalTo(boardId.toString()))
      .body("title", equalTo("Updated Test Board"))

    val updatedBoard = boardRepository.findById(boardId)
    assertThat(updatedBoard).isPresent
    assertThat(updatedBoard.get().title).isEqualTo("Updated Test Board")
  }

  @Test
  fun updateBoard_notFound() {
    given()
      .body("""
        {
          "title": "Updated Test Board"
        }
      """.trimIndent())
      .contentType(ContentType.JSON)
      .put("$uri/api/v1/boards/${UUID.randomUUID()}")
      .then()
      .statusCode(HttpStatus.NOT_FOUND.value())
  }

  @Test
  fun deleteBoard() {
    val boardId = BoardUtils.createBoard(uri).id

    given()
      .delete("$uri/api/v1/boards/$boardId")
      .then()
      .statusCode(HttpStatus.NO_CONTENT.value())

    val deletedBoard = boardRepository.findById(boardId)
    assertThat(deletedBoard).isEmpty
  }

  @Test
  fun deleteBoard_notFound() {
    given()
      .delete("$uri/api/v1/boards/${UUID.randomUUID()}")
      .then()
      .statusCode(HttpStatus.NOT_FOUND.value())
  }
}