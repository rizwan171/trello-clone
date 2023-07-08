package riz.trelloclone.list

import com.fasterxml.jackson.annotation.JsonView
import jakarta.servlet.http.HttpServletRequest
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import riz.trelloclone.board.BoardService
import riz.trelloclone.view.Views
import java.net.URI
import java.util.UUID

@RestController
@RequestMapping("/api/v1/lists")
class ListApiRestController(@Autowired val listService: ListService, @Autowired val boardService: BoardService) {

  @PostMapping
  fun createList(@Validated @RequestBody @JsonView(Views.Post::class) listJson: ListJson,
                 request: HttpServletRequest): ResponseEntity<ListJson> {
    val boardOptional = boardService.getBoard(listJson.boardId)
    if (boardOptional.isEmpty) {
      return ResponseEntity.notFound().build()
    }

    val createdList = listService.createList(listJson)
    return ResponseEntity.created(URI.create(request.requestURI.plus("/${createdList.id}"))).body(createdList)
  }

  @GetMapping("/{id}")
  fun getList(@PathVariable id: UUID): ResponseEntity<ListJson> {
    val listOptional = listService.getList(id)
    if (listOptional.isEmpty) {
      return ResponseEntity.notFound().build()
    }

    val listJson = ListJson.fromEntity(listOptional.get())
    return ResponseEntity.ok().body(listJson)
  }

  @PutMapping("/{id}")
  fun updateList(@Validated @RequestBody @JsonView(Views.Post::class) listJson: ListJson,
                 @PathVariable id: UUID): ResponseEntity<ListJson> {
    val boardOptional = boardService.getBoard(listJson.boardId)
    if (boardOptional.isEmpty) {
      return ResponseEntity.badRequest().build()
    }

    val listOptional = listService.getList(listJson.id)
    if(listOptional.isEmpty) {
      return ResponseEntity.notFound().build()
    }

    val updatedListJson
  }

  @DeleteMapping("/{id}")
  fun deleteList(@PathVariable id: UUID): ResponseEntity<Unit> {

  }
}