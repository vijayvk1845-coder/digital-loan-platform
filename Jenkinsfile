pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out source code...'
                checkout scm
            }
        }

        stage('Docker Check') {
            steps {
                echo 'Checking Docker...'
                sh 'docker --version'
                sh 'docker compose version'
                sh 'docker ps'
            }
        }

        stage('Validate Docker Compose') {
            steps {
                echo 'Validating Docker Compose configuration...'
                sh 'docker compose config'
            }
        }

        stage('Build') {
            steps {
                echo 'Building application images...'
                sh 'docker compose build'
            }
        }

        stage('Test') {
            steps {
                echo 'Running application tests...'
                sh 'docker compose run --rm backend npm run test --if-present'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying Digital Loan Platform...'
                sh 'docker compose up -d'
            }
        }

        stage('Wait for Services') {
            steps {
                echo 'Waiting for services to start...'
                sh 'sleep 15'
            }
        }

        stage('Verify Deployment') {
            steps {
                echo 'Verifying deployed containers...'
                sh 'docker compose ps'

                echo 'Checking backend health...'
                sh '''
                    docker compose exec -T backend node -e '
                    require("http").get(
                      "http://localhost:5000/health",
                      response => process.exit(response.statusCode === 200 ? 0 : 1)
                    ).on("error", () => process.exit(1))
                    '
                '''
            }
        }
    }

    post {
        success {
            echo '=========================================='
            echo 'CI/CD PIPELINE COMPLETED SUCCESSFULLY!'
            echo 'Digital Loan Platform is deployed.'
            echo '=========================================='
        }

        failure {
            echo '=========================================='
            echo 'CI/CD PIPELINE FAILED!'
            echo 'Please check the Jenkins console output.'
            echo '=========================================='
        }
    }
}