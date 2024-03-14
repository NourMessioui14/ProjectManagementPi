pipeline {
    agent any
    tools {
        nodejs 'Nom_de_votre_instalation_NodeJS'
    }
    stages {
        stage('Install dependencies') {
            steps {
                script {
                    sh 'npm install'
                }
            }
        }
        stage('Unit Test') {
            steps {
                script {
                    sh 'npm test'
                }
            }
        }
        stage('Build application') {
            steps {
                script {
                    sh 'npm run build-dev'
                }
            }
        }
    }
}
