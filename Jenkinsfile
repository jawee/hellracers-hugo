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
        sshagent(["linode"]) {
          sh 'rsync -r -e "ssh -o StrictHostKeyChecking=no" "$WORKSPACE/public/" figge@jawee.se:/home/figge/public/beta.hellracers.se/public_html'
        }
      }
    }
    stage('Test before deploying live') {
      steps {
         def userInput = input(id: 'Proceed1', message: 'Promote build?', parameters: [[$class: 'BooleanParameterDefinition', defaultValue: true, description: '', name: 'Please confirm you agree with this']])
            echo 'userInput: ' + userInput

            if(userInput == true) {
                // do action
            } else {
                // not do action
                echo "Action was aborted."
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

