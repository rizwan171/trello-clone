# Kotlin Tests

## Unit Tests
- The unit tests in this project are based off the guidance from this page
  - https://www.baeldung.com/kotlin/spring-boot-testing

## Integration Tests
- The integration tests run using Testcontainers and RestAssured
- To create an integration test, extend `AbstractIntegrationTest`
  - This class provides all the setup needed for integration or smoke tests