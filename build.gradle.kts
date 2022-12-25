import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

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

node {
	version = '16.16.0'
	download = true
	workDir = file("${project.projectDir}/src/main/frontend/nodejs")
	yarnWorkDir = file("${project.projectDir}/src/main/frontend/yarn")
	nodeModulesDir = file("${project.projectDir}/src/main/frontend")
}

dependencies {
	// implementation("org.springframework.boot:spring-boot-starter-data-jpa")
	implementation("org.springframework.boot:spring-boot-starter-web")
	implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
	implementation("org.jetbrains.kotlin:kotlin-reflect")
	implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
	testImplementation("org.springframework.boot:spring-boot-starter-test")
}

tasks.withType<KotlinCompile> {
	kotlinOptions {
		freeCompilerArgs = listOf("-Xjsr305=strict")
		jvmTarget = "17"
	}
}

tasks.withType<Test> {
	useJUnitPlatform()
}

tasks.withType<YarnTask> {	
	buildFrontend {
		execOverrides {
			it.workingDir = 'src/main/frontend'
		}
		args = ['build']
	}
}
tasks.build.dependsOn buildFrontend