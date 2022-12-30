package riz.trelloclone.board

import org.jetbrains.annotations.NotNull
import java.util.*

data class JsonBoard(
  val id: UUID,

  @field:NotNull(value = "Title must not be blank")
  val title: String
)