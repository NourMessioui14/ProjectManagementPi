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
                    // Ajoutez votre commande de test unitaire ici
                    // Exemple: sh 'npm test'
                }
            }
        }

           stage('SONARQUBE') {
            steps {
                sh "mvn sonar:sonar -Dsonar.login=admin -Dsonar.password=sonar"
            }
        }

        stage('Build application') {
            steps {
                script {
                    echo 'Building the application...'
                    // Ajoutez votre commande de construction ici
                    // Exemple: sh 'mvn clean install'
                }
            }
        }
    }

   
}
