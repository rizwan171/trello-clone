
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import java.util.*

@Entity
data class Board (
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  val id: UUID,

  val title: String
)