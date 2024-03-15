pipeline {

    agent any
    tools {
        nodejs "NodeJs"
    }
    environment { 
registryCredentials = "nexus" 
registry = "172.31.219.90:8083" 
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



        stage('Deploy  to Nexus') { 
steps{   
script { 
docker.withRegistry("http://"+registry, 
registryCredentials ) { 
sh('docker push $registry/nodemongoapp:5.0 ') 
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
