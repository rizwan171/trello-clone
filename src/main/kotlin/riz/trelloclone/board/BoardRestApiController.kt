package riz.trelloclone.board

import BoardService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.*
import java.util.*

@RestController
@RequestMapping("/api/v1/boards")
class BoardRestApiController(@Autowired val boardService: BoardService) {

  @GetMapping("/{id}")
  fun getBoard(@PathVariable id: UUID): ResponseEntity<JsonBoard?> {
    val jsonBoardOptional = boardService.getBoard(id)
    if (jsonBoardOptional.isEmpty) {
      return ResponseEntity.notFound().build()
    }

    return ResponseEntity.ok().body(jsonBoardOptional.get())
  }

  @PostMapping
  fun createBoard(@Validated @RequestBody jsonBoard: JsonBoard): ResponseEntity<JsonBoard> {
    return ResponseEntity.ok().body(boardService.createBoard(jsonBoard))
  }
}