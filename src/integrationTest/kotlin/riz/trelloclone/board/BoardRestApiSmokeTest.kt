package riz.trelloclone.board

import io.restassured.RestAssured.given
import io.restassured.http.ContentType
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.web.server.LocalServerPort
import org.springframework.http.HttpStatus
import riz.trelloclone.util.AbstractIntegrationTest
import riz.trelloclone.util.BoardUtils
import java.util.*

class BoardRestApiSmokeTest : AbstractIntegrationTest() {

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
    given()
      .body("""
        {
          "title": "Test Board"
        }
      """.trimIndent())
      .contentType(ContentType.JSON)
      .post("$uri/api/v1/boards")
      .then()
      .statusCode(HttpStatus.CREATED.value())
  }
}