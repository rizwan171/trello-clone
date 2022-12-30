import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import java.util.UUID

@Repository
interface BoardRepo : CrudRepository<Board, UUID>