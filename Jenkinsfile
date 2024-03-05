pipeline {
    agent any

    tools {
        nodejs 'NodeJs' 
    }

    stages {
        stage('Print Environment') {
            steps {
                script {
                    sh('env')
                }
            }
        }

        stage('Install dependencies') {
            steps {
                script {
                    sh('npm install')
                }
            }
        }

        stage('Unit Test') {
            steps {
                script {
                    sh('npm test')
                }
            }
        }

        stage('Build application') {
            steps {
                script {
                    sh('npm run build-dev')
                }
            }
        }
    }
}
