pipeline {

    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    stages {

        stage('Test Jenkins') {
            steps {
                sh '''
                    echo "================================"
                    echo "Jenkins CI/CD is working!"
                    echo "================================"

                    docker --version
                    docker compose version

                    echo "Current directory:"
                    pwd

                    echo "Files:"
                    ls -la
                '''
            }
        }
    }
}