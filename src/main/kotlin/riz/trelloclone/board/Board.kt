package riz.trelloclone.board

import jakarta.persistence.*
import java.util.*

@Entity
@Table(name = "boards")
data class Board (
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  val id: UUID,

  val title: String
)