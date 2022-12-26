import org.jetbrains.kotlin.gradle.tasks.KotlinCompile
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
	implementation("org.springframework.boot:spring-boot-starter-data-jpa")
	implementation("org.springframework.boot:spring-boot-starter-web")
	implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
	implementation("org.jetbrains.kotlin:kotlin-reflect")
	implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
	testImplementation("org.springframework.boot:spring-boot-starter-test")
}

tasks.clean {
	delete("${project.projectDir}/src/main/frontend/build")
}

tasks.withType<KotlinCompile> {
	kotlinOptions {
		dependsOn("copyFrontend")
		freeCompilerArgs = listOf("-Xjsr305=strict")
		jvmTarget = "17"
	}
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