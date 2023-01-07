package riz.trelloclone.util

import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.DynamicPropertyRegistry
import org.springframework.test.context.DynamicPropertySource
import org.testcontainers.containers.PostgreSQLContainer
import org.testcontainers.junit.jupiter.Container
import org.testcontainers.junit.jupiter.Testcontainers
import riz.trelloclone.TrelloCloneApplication

@SpringBootTest(classes = [TrelloCloneApplication::class], webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Testcontainers
class AbstractIntegrationTest {
  companion object {

    @Container
    val databaseContainer = PostgreSQLContainer("postgres:12.13-alpine").apply {
      withDatabaseName("tcdb-it")
      withUsername("dev")
      withPassword("dev")
    }

    @JvmStatic
    @DynamicPropertySource
    fun properties(registry: DynamicPropertyRegistry) {
      registry.add("spring.datasource.url", databaseContainer::getJdbcUrl)
      registry.add("spring.datasource.password", databaseContainer::getPassword)
      registry.add("spring.datasource.username", databaseContainer::getUsername)
    }
  }
}