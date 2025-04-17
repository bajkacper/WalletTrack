pipeline {
    agent any; 

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
                            sh "gradle --version"
                            sh "gradle build"
                        }
                    }
                }
                
                stage("Build frontend") {
                    agent { label 'ubuntu-java21-docker' }
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
