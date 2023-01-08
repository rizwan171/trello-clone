package riz.trelloclone.board

import com.fasterxml.jackson.annotation.JsonView
import jakarta.servlet.http.HttpServletRequest
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.*
import riz.trelloclone.view.Views
import java.net.URI
import java.util.*

@RestController
@RequestMapping("/api/v1/boards")
class BoardApiRestController(@Autowired val boardService: BoardService) {

  @GetMapping("/{id}")
  fun getBoard(@PathVariable id: UUID): ResponseEntity<JsonBoard> {
    val jsonBoardOptional = boardService.getBoard(id)
    if (jsonBoardOptional.isEmpty) {
      return ResponseEntity.notFound().build()
    }

    return ResponseEntity.ok().body(jsonBoardOptional.get())
  }

  @PostMapping
  fun createBoard(@Validated @RequestBody @JsonView(Views.Post::class) jsonBoard: JsonBoard,
                  request: HttpServletRequest): ResponseEntity<JsonBoard> {
    val createdBoard = boardService.createBoard(jsonBoard)
    return ResponseEntity.created(URI.create(request.requestURI.plus("/${createdBoard.id}"))).body(createdBoard)
  }
}