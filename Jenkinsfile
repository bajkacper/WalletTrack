pipeline {
    agent any

    tools {
        gradle 'gradle813'
        nodejs 'node23110'
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
                            sh "ng build"
                        }
                    }
                }
            }
        }
    }
}
