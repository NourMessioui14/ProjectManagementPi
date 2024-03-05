pipeline {
    agent any

    tools {
        nodejs 'NodeJs'
    }

    stages {
        stage('Install dependencies') {
            steps {
                script {
                    try {
                        dir('ProjectManagement_main') {
                            sh 'npm install'
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
                    echo 'Running unit tests...'
                    // Add your unit test command here
                }
            }
        }

        stage('Build application') {
            steps {
                script {
                    echo 'Building the application...'
                    // Add your build command here
                }
            }
        }
    }

    post {
        always {
            // Cleanup or post-build actions can be added here
        }
    }
}
