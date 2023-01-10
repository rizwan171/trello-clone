package riz.trelloclone.util

import io.restassured.RestAssured.given
import io.restassured.http.ContentType
import riz.trelloclone.board.BoardJson

class BoardUtils {

  companion object {
    fun createBoard(baseUri: String): BoardJson {
      return given()
        .body("""
        {
          "title": "Test Board"
        }
      """.trimIndent())
        .contentType(ContentType.JSON)
        .post("$baseUri/api/v1/boards")
        .andReturn()
        .`as`(BoardJson::class.java)
    }
  }
}