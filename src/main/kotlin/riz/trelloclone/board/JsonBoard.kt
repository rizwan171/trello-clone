package riz.trelloclone.board

import com.fasterxml.jackson.annotation.JsonView
import org.jetbrains.annotations.NotNull
import riz.trelloclone.view.Views
import java.util.*

data class JsonBoard(
  @field:JsonView(Views.Get::class)
  val id: UUID?,

  @field:JsonView(Views.Post::class)
  @field:NotNull(value = "Title must not be blank")
  val title: String
)