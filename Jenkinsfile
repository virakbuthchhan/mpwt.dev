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
                    echo "--- User & Workspace ---"
                    whoami
                    pwd

                    echo "--- Node & NPM ---"
                    node --version 2>/dev/null || echo "Node.js not installed on Jenkins agent (OK if using Docker containers)"
                    npm --version 2>/dev/null || echo "NPM not installed on Jenkins agent"

                    echo "--- Docker ---"
                    docker --version

                    echo "--- Docker Compose Detection ---"
                    if docker compose version 2>/dev/null; then
                        echo "Docker Compose (V2 plugin) is available"
                    elif docker-compose --version 2>/dev/null; then
                        echo "Docker Compose (V1 standalone) is available"
                    else
                        echo "WARNING: Neither 'docker compose' nor 'docker-compose' found on Jenkins agent!"
                        echo "You must install docker-compose-plugin inside your Jenkins container."
                    fi
                '''
            }
        }

        stage('Docker Test') {
            steps {
                sh '''
                    echo "Checking docker daemon connectivity:"
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