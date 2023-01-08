package riz.trelloclone.board

import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface BoardRepository : CrudRepository<Board, UUID>