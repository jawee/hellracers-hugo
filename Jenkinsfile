properties([pipelineTriggers([githubPush()])])

pipeline {
  agent any
  
  stages {
    /* checkout repo */
    stage('Init submodules') {
        sh 'git submodule update --init'
      }
    }
    stage('Build Beta') {
      when {
        branch 'development'
      }
      steps {
        echo ">> Build for beta"
        sh "hugo -b https://beta.hellracers.se"
      }
    }
    stage('Deploy Beta') {
      when {
        branch 'development'
      }
      steps {
        sshagent(["linode"]) {
          sh 'rsync -r -e "ssh -o StrictHostKeyChecking=no" "$WORKSPACE/public/" figge@jawee.se:/home/figge/public/beta.hellracers.se/public_html'
        }
      }
    }
    stage('Build Live') {
      when {
        branch 'master'
      }
      steps {
        echo ">> Build for production"
        sh "hugo -b https://hellracers.se"
      }
    }
    stage('Deploy Live') {
      when {
        branch 'development'
      }
      steps {
        sshagent(["linode"]) {
          sh 'rsync -r -e "ssh -o StrictHostKeyChecking=no" "$WORKSPACE/public/" figge@jawee.se:/home/figge/public/hellracers.se/public_html'
        }
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

