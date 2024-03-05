pipeline{
    agent any
    tools{
        nodejs '21.6.2'
    }
    stages {
        stage('Install dependencies') {
            steps{
                script {
                    try {
                        sh('npm install')
                    } catch (err) {
                        currentBuild.result = 'FAILURE'
                        error("Failed to install dependencies: ${err}")
                    }
                }
            }
        }
        stage('Unit Test') {
            steps {
                script {
                    echo 'This is a testing stage for unit tests.'
                }
            }
        }
        stage('Build application') {
            steps {
                script {
                    echo 'This is a testing stage for building the application.'
                }
            }
        }
    }
}
