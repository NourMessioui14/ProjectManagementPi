pipeline {
    agent any
  tools {
        nodejs "NodeJs"
    }
    stages {
        stage('Checkout and Install dependencies') {
            steps {
                script {
                    // Check out the repository
                    checkout scm

                    // Install dependencies inside the 'backend' directory
                    dir('backend') {
                        sh 'npm install'
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
