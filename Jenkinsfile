properties([pipelineTriggers([githubPush()])])

pipeline {
  agent any
  
  stages {
    /* checkout repo */
    stage('Checkout SCM') {
      steps {
        checkout([
          $class: 'GitSCM',
          branches: [[name: 'master']],
          extensions: [[$class: 'SubmoduleOption',
                        disableSubmodules: false,
                        parentCredentials: false,
                        recursiveSubmodules: true,
                        reference: '',
                        trackingSubmodules: false]],
          userRemoteConfigs: [[
            url: 'https://github.com/jawee/hellracers-hugo.git',
            credentialsId: '',
          ]]
        ])
      }
    }
    stage('Build') {
      steps {
        echo ">> Build application"
        sh "hugo -b https://beta.hellracers.se"
      }
    }
    stage('Deploy beta') {
      steps {
        echo ">> Deploy to beta"
      }
    }
  }
  /* Cleanup workspace */
    post {
       always {
           deleteDir()
       }
   }

} 

