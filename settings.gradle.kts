rootProject.name = "trello-clone"
include("src:integrationTest")
findProject(":src:integrationTest")?.name = "integrationTest"
