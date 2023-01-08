package riz.trelloclone

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.ComponentScan

@SpringBootApplication
@ComponentScan("riz.trelloclone")
class TrelloCloneApplication

fun main(args: Array<String>) {
	runApplication<TrelloCloneApplication>(*args)
}
