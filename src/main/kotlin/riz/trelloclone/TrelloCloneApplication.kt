package riz.trelloclone

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class TrelloCloneApplication

fun main(args: Array<String>) {
	runApplication<TrelloCloneApplication>(*args)
}
