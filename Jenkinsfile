pipeline {
    agent { label 'ubuntu-java21-docker' }

    tools {
        gradle 'gradle813'
        nodejs 'node23110'
        jdk 'jdk21'  
    }

    stages {
        stage("Build") {
            parallel {
                stage("Build backend") {
                    steps {
                        dir("backend") {
                            sh "gradle build -x test"
                        }
                    }
                }
                
                stage("Build frontend") {
                    steps {
                        dir("frontend") {
                            sh "npm install"
                            sh "npm install -g @angular/cli"
                            sh "ng build"
                        }
                    }
                }
            }
        }
    }
}
