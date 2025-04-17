pipeline {
  agent any;
  tools{
      gradle "gradle813"
      nodejs "node23110"
    }

  stages {
    stage('Build Version'){
        steps{
            sh "npm --version"
            sh "gradle --version"
          }
      }
  }
}
