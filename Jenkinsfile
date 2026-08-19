pipeline {

    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
        timeout(time: 15, unit: 'MINUTES')
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }

    environment {
        APP_DIR       = '/opt/apps/mpwt.dev'
        APP_PORT      = '3000'
        HEALTH_PATH   = '/'
        GIT_BRANCH    = 'main'
    }

    stages {

        stage('Verify Environment') {
            steps {
                sh '''
                    echo "Checking Docker and Compose..."
                    docker --version
                    docker compose version
                '''
            }
        }

        stage('Deploy') {
            steps {
                dir("${APP_DIR}") {
                    sh '''
                        set -euo pipefail

                        echo "=== Step 1: Pulling latest changes (${GIT_BRANCH}) ==="
                        git fetch origin ${GIT_BRANCH}
                        git reset --hard origin/${GIT_BRANCH}

                        echo "=== Step 2: Building Docker images ==="
                        docker compose build --pull

                        echo "=== Step 3: Starting containers ==="
                        docker compose up -d --remove-orphans
                    '''
                }
            }
        }

        stage('Database Migration') {
            steps {
                dir("${APP_DIR}") {
                    sh '''
                        set -euo pipefail
                        echo "=== Applying Prisma Schema / Migrations ==="
                        docker compose exec -T app npx prisma db push --skip-generate
                    '''
                }
            }
        }

        stage('Health Check') {
            steps {
                dir("${APP_DIR}") {
                    sh '''
                        set -euo pipefail
                        echo "Waiting for application to warm up..."
                        sleep 5

                        echo "Testing endpoint http://127.0.0.1:${APP_PORT}${HEALTH_PATH}..."
                        curl \
                            --fail \
                            --silent \
                            --show-error \
                            --retry 10 \
                            --retry-delay 3 \
                            --retry-connrefused \
                            --max-time 10 \
                            "http://127.0.0.1:${APP_PORT}${HEALTH_PATH}" > /dev/null

                        echo "Health check passed!"
                    '''
                }
            }
        }
    }

    post {

        success {
            echo '=================================================='
            echo '🚀 MPWT Web App deployed and verified successfully!'
            echo '=================================================='
        }

        failure {
            echo '=================================================='
            echo '❌ Deployment failed! Gathering diagnostic logs...'
            echo '=================================================='

            dir("${APP_DIR}") {
                sh '''
                    echo "--- Container Status ---"
                    docker compose ps

                    echo "--- Application Recent Logs ---"
                    docker compose logs --tail=100 app || true

                    echo "--- Postgres Recent Logs ---"
                    docker compose logs --tail=50 postgres || true
                '''
            }
        }

        always {
            // Clean up dangling Docker images to avoid exhausting host disk space
            sh 'docker image prune -f || true'
        }
    }
}