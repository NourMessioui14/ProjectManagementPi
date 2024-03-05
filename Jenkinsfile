pipeline {
    agent any
    tools {
        nodejs 'NodeJs'
    }
    stages {
        stage('Declarative: Checkout SCM') {
            steps {
                checkout scm
            }
        }

        stage('Declarative: Tool Install') {
            steps {
                script {
                    // You may perform tool installations here if needed
                }
            }
        }

        stage('Install dependencies') {
            steps {
                script {
                    try {
                        // Navigate to the project's workspace before running npm install
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
