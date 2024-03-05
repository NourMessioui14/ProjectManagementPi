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

       

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Unit Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build Application') {
            steps {
                sh 'npm run build-dev'
            }
        }
    }
}
