pipeline {
    agent any

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
                            sh "gradle javaToolchains"
                            sh "gradle build"
                        }
                    }
                }

                stage("Build frontend") {
                    agent { label 'ubuntu-java21-docker' }
                    steps {
                        dir("frontend") {
                            sh "npm install --no-audit"
                            sh "npm install -g @angular/cli"
                            sh "ng build"
                        }
                    }
                }
            }
        }

        stage('Audits') {
            parallel {
                stage('OWASP Dependency Checker') {
                    steps {
                        dependencyCheck additionalArguments: '''--scan ./
                                                            --out ./
                                                            --format ALL
                                                            --prettyPrint''', 
                                       odcInstallation: 'owasp-depche-12.1.1'
                    }
                }

                stage('Npm audit') {
                    steps {
                        sh '''
                        npm audit --audit-level=critical 
                        echo $1
                       ''' 
                    }
                }
            }
        }
        stage('Unit Tests') {
            parallel {
                stage('Backend test') {
                    steps {
                      dir("backend"){
                        sh "gradle test"
                        }
                    }
                }

                stage('frontend test') {
                    steps {
                      dir("frontend"){
                        sh "ng test"
                      }
                    }
                }
            }
        }
    }
}
