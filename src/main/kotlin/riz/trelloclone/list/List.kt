package riz.trelloclone.list

import jakarta.persistence.*
import riz.trelloclone.board.Board
import java.util.*

@Entity
@Table(name = "lists")
open class List (
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  var id: UUID,

  var title: String,

  @ManyToOne
  @JoinColumn(name = "board_id")
  var board: Board
)