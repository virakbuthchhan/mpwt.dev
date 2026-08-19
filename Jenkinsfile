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
        APP_PORT      = '3030'
        HEALTH_PATH   = '/'
        GIT_BRANCH    = 'main'
    }

    stages {

        stage('Verify Environment') {
            steps {
                sh '''
                    echo "Checking Docker..."
                    docker --version

                    echo "Checking Docker Compose..."
                    if docker compose version 2>/dev/null; then
                        echo "Docker Compose plugin found."
                    elif docker-compose --version 2>/dev/null; then
                        echo "Docker Compose standalone found."
                    else
                        echo "Error: docker compose is not installed on Jenkins agent!"
                        exit 1
                    fi
                '''
            }
        }

        stage('Deploy') {
            steps {
                dir("${APP_DIR}") {
                    sh '''
                        set -euo pipefail

                        echo "=== Step 1: Updating source code (${GIT_BRANCH}) ==="
                        git fetch origin ${GIT_BRANCH}
                        git reset --hard origin/${GIT_BRANCH}

                        echo "=== Step 2: Building Docker images ==="
                        docker compose build --pull

                        echo "=== Step 3: Starting containers on port ${APP_PORT} ==="
                        APP_PORT=${APP_PORT} docker compose up -d --remove-orphans
                    '''
                }
            }
        }

        stage('Database Migration') {
            steps {
                dir("${APP_DIR}") {
                    sh '''
                        set -euo pipefail
                        echo "=== Step 4: Applying Prisma Schema & Migrations ==="
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
                        echo "=== Step 5: Waiting for Nuxt app to warm up ==="
                        sleep 5

                        echo "Testing endpoint at http://127.0.0.1:${APP_PORT}${HEALTH_PATH}..."
                        curl \
                            --fail \
                            --silent \
                            --show-error \
                            --retry 10 \
                            --retry-delay 3 \
                            --retry-connrefused \
                            --max-time 10 \
                            "http://127.0.0.1:${APP_PORT}${HEALTH_PATH}" > /dev/null

                        echo "Health check passed! App is running on port ${APP_PORT}."
                    '''
                }
            }
        }
    }

    post {

        success {
            echo '=================================================='
            echo "🚀 Nuxt project deployed successfully on port ${APP_PORT}!"
            echo '=================================================='
        }

        failure {
            echo '=================================================='
            echo '❌ Deployment failed! Fetching diagnostic logs...'
            echo '=================================================='

            dir("${APP_DIR}") {
                sh '''
                    echo "--- Container Status ---"
                    docker compose ps

                    echo "--- Nuxt App Logs ---"
                    docker compose logs --tail=100 app || true

                    echo "--- PostgreSQL Logs ---"
                    docker compose logs --tail=50 postgres || true
                '''
            }
        }

        always {
            // Clean up dangling build images to prevent filling host disk
            sh 'docker image prune -f || true'
        }
    }
}