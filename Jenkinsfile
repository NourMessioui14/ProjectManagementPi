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
                        // Nettoyer le cache npm
                        sh 'npm cache clean --force'

                        // Installer les dépendances
                        dir('backend') {
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
                    // Exécuter les tests unitaires (personnaliser si nécessaire)
                    echo 'Ceci est une étape de test unitaire.'
                }
            }
        }

        stage('Build application') {
            steps {
                script {
                    // Construire l'application (personnaliser si nécessaire)
                    echo 'Ceci est une étape de construction de l\'application.'
                }
            }
        }
    }
}
