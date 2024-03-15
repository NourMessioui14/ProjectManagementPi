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
                            // Supprimer le dossier node_modules
                            sh('rm -rf node_modules')
                            // Installer les dépendances
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
        stage('SonarQube Analysis') {
    steps {
        script {
            def scannerHome = tool 'scanner'
            withSonarQubeEnv {
                sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=reclamation"
            }
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