package riz.trelloclone.list

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.util.*

@Service
class ListService(@Autowired val listRepository: ListRepository) {

  fun createList(listJson: ListJson): ListJson {

  }


  fun getList(id: UUID) {
  }

  fun updateList(listJson: ListJson) {

  }

  private fun toJsonList(list: List): ListJson {
    return ListJson(list.id, list.title, list.board.id)
  }
}