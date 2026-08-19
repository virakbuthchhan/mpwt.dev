pipeline {

    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Repository checkout completed by Jenkins'
            }
        }

        stage('Environment') {
            steps {
                sh '''
                    echo "Node:"
                    node --version || true

                    echo "NPM:"
                    npm --version || true

                    echo "Docker:"
                    docker --version

                    echo "Docker Compose:"
                    docker compose version
                '''
            }
        }

        stage('Docker Test') {
            steps {
                sh '''
                    docker ps
                '''
            }
        }
    }

    post {
        success {
            echo 'CI test successful!'
        }

        failure {
            echo 'CI test failed!'
        }
    }
}