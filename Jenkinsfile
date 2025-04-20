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
                    agent { label 'ubuntu-java21-docker' }
                    steps {
                        dir("backend") {
                            sh "gradle --version"
                            sh "gradle javaToolchains"
                            sh "gradle build"
                        }
                    }
                }

                stage("Build frontend") {
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
                      dir('frontend'){
                        sh '''
                        npm audit --audit-level=critical 
                        echo $1
                       ''' 
                        }
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
    dir("frontend") {
      sh '''
        npm ci
        npm install puppeteer --no-save
        export CHROME_BIN=$(node -e "console.log(require('puppeteer').executablePath())")
        
        export KARMA_CUSTOM_LAUNCHERS='{
          "ChromeHeadlessNoSandbox": {
            "base": "ChromeHeadless",
            "flags": ["--no-sandbox"]
          }
        }'

        ng test --watch=false --browsers=ChromeHeadlessNoSandbox
      '''
    }
  }
}
            }
        }
        stage('Test Coverage'){
          dir("backend"){
              withSonarQubeEnv() {
                sh "gradle sonar"
              }
         }
        }
        stage('Building Images'){
          parallel{
              stage('Building Backend Image'){
                  steps{
                      sh "Building Backend"
                    }
                }
              stage('Building Frontend Image'){
                  steps{
                      sh "Building Frontend"
                    }
                }
            }
        }
    }
}
