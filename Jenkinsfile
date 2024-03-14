pipeline {
    agent any
    tools {
        nodejs "NodeJs"
    }
    stages {
        stage('Install dependencies') {
            steps {
                script {
                    try {
                        dir('backend') {
                            sh('npm install')
                        }
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
                    // Run unit tests (customize as needed)
                    echo 'This is a testing stage for unit tests.'
                }
            }
        }

        stage('Build application') {
            steps {
                script {
                    // Build the application (customize as needed)
                    echo 'This is a testing stage for building the application.'
                }
            }
        }
    }
}
