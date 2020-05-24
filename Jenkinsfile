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
    stage('Build Beta') {
      steps {
        echo ">> Build application"
        sh "hugo -b https://beta.hellracers.se"
      }
    }
    stage('Deploy Beta') {
      steps {
        sshagent(["linode"]) {
          sh 'rsync -r -e "ssh -o StrictHostKeyChecking=no" "$WORKSPACE/public/" figge@jawee.se:/home/figge/public/beta.hellracers.se/public_html'
        }
      }
    }
    stage('Test before deploying live') {
      steps {
        input message: 'Do you want to release this build?',
              parameters: [[$class: 'BooleanParameterDefinition',
                            defaultValue: false,
                            description: 'Ticking this box will deploy to hellracers.se',
                            name: 'Release']]
      }
    }
    stage('Build Live') {
      steps {
        echo ">> Build application"
        sh "hugo -b https://hellracers.se"
      }
    }
    stage('Deploy Live') {
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

