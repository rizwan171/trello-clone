package riz.trelloclone.list

import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface ListRepository : CrudRepository<List, UUID>