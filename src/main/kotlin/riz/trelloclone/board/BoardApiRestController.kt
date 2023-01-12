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
  fun getBoard(@PathVariable id: UUID): ResponseEntity<BoardJson> {
    val boardOptional = boardService.getBoard(id)
    if (boardOptional.isEmpty) {
      return ResponseEntity.notFound().build()
    }

    val boardJson = BoardJson.fromEntity(boardOptional.get())
    return ResponseEntity.ok().body(boardJson)
  }

  @PostMapping
  fun createBoard(@Validated @RequestBody @JsonView(Views.Post::class) boardJson: BoardJson,
                  request: HttpServletRequest): ResponseEntity<BoardJson> {
    val createdBoard = boardService.createBoard(boardJson)
    return ResponseEntity.created(URI.create(request.requestURI.plus("/${createdBoard.id}"))).body(createdBoard)
  }

  @PutMapping("/{id}")
  fun editBoard(@Validated @RequestBody @JsonView(Views.Post::class) boardJson: BoardJson,
                @PathVariable id: UUID): ResponseEntity<BoardJson> {
    val boardOptional = boardService.getBoard(id)
    if (boardOptional.isEmpty) {
      return ResponseEntity.notFound().build()
    }

    val updatedBoardJson = boardService.updateBoard(boardOptional.get(), boardJson)
    return ResponseEntity.ok(updatedBoardJson)
  }

  @DeleteMapping("/{id}")
  fun deleteBoard(@PathVariable id: UUID): ResponseEntity<Unit> {
    val boardOptional = boardService.getBoard(id)
    if (boardOptional.isEmpty) {
      return ResponseEntity.notFound().build()
    }

    boardService.deleteBoard(boardOptional.get())
    return ResponseEntity.noContent().build()
  }
}