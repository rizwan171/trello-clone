package riz.trelloclone.board

import jakarta.persistence.*
import java.util.*

@Entity
@Table(name = "boards")
open class Board (
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  var id: UUID,

  var title: String
)