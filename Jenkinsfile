pipeline {
  agent any;
  tools{
      gradle "gradle813"
      node "node23110"
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
