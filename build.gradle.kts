
import com.github.gradle.node.yarn.task.YarnTask

plugins {
	id("org.springframework.boot") version "3.0.1"
	id("io.spring.dependency-management") version "1.1.0"
	id("com.github.node-gradle.node") version "3.5.0"
	kotlin("jvm") version "1.7.22"
	kotlin("plugin.spring") version "1.7.22"
	kotlin("plugin.jpa") version "1.7.22"
}

group = "riz"
version = "0.0.1-SNAPSHOT"
java.sourceCompatibility = JavaVersion.VERSION_17

repositories {
	mavenCentral()
}

dependencies {
	implementation("org.postgresql:postgresql")
	implementation("org.springframework.boot:spring-boot-starter-data-jpa")
	implementation("org.springframework.boot:spring-boot-starter-web")
	implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
	implementation("org.jetbrains.kotlin:kotlin-reflect")
	implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")

	runtimeOnly("org.flywaydb:flyway-gradle-plugin:9.10.2")

	testImplementation("org.springframework.boot:spring-boot-starter-test")
	testImplementation("io.mockk:mockk:1.13.3")
	testImplementation("com.ninja-squad:springmockk:4.0.0")
}

tasks.clean {
	delete("${project.projectDir}/src/main/frontend/build")
}

tasks.withType<org.jetbrains.kotlin.gradle.tasks.KotlinCompile> {
	kotlinOptions {
		jvmTarget = "17"
	}
}
tasks.build {
	dependsOn("copyFrontend")
}

tasks.withType<Test> {
	useJUnitPlatform()
}

tasks.register<YarnTask>("frontendDependencies") {
	workingDir.set(file("${project.projectDir}/src/main/frontend"))
	args.set(listOf("install"))
}

tasks.register<YarnTask>("buildFrontend") {
	dependsOn("frontendDependencies")
	workingDir.set(file("${project.projectDir}/src/main/frontend"))
	args.set(listOf("build"))
}

tasks.register<Copy>("copyFrontend") {
	dependsOn("buildFrontend")
	from("src/main/frontend/build")
	into("build/resources/main/static/.")
}

sourceSets {
	create("integrationTest") {
		kotlin {
			compileClasspath += sourceSets.main.get().output
			runtimeClasspath += sourceSets.main.get().output
			srcDir(file("src/integrationTest/kotlin"))
		}
		resources.srcDir(file("src/integrationTest/resources"))
	}
}

val integrationTestImplementation: Configuration by configurations.getting {
	extendsFrom(configurations.implementation.get())
}

configurations["integrationTestRuntimeOnly"].extendsFrom(configurations.runtimeOnly.get())

dependencies {
	integrationTestImplementation("org.springframework.boot:spring-boot-starter-test")
	integrationTestImplementation("io.rest-assured:rest-assured:5.3.0")
	integrationTestImplementation("org.testcontainers:testcontainers:1.17.6")
	integrationTestImplementation("org.testcontainers:junit-jupiter:1.17.6")
	integrationTestImplementation("org.testcontainers:postgresql:1.17.6")
}

task<Test>("integrationTest") {
	description = "Runs integration tests."
	group = "verification"

	testClassesDirs = sourceSets["integrationTest"].output.classesDirs
	classpath = sourceSets["integrationTest"].runtimeClasspath
	shouldRunAfter("test")

	useJUnitPlatform()

	testLogging {
		events("passed")
	}
}