package riz.trelloclone.list

import com.fasterxml.jackson.annotation.JsonView
import org.jetbrains.annotations.NotNull
import riz.trelloclone.view.Views
import java.util.*

data class ListJson (
  @field:JsonView(Views.Get::class)
  val id: UUID?,

  @field:JsonView(Views.Post::class)
  @field:NotNull(value = "Title must not be blank")
  val title: String,

  @field:JsonView(Views.Post::class)
  @field:NotNull(value = "Board id must not be blank")
  val boardId: UUID
) {
  companion object {
    fun fromEntity(list: List): ListJson {
      return ListJson(list.id, list.title, list.board.id)
    }
  }
}