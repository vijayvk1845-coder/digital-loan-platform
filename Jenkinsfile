pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Validate Docker Compose') {
            steps {
                sh 'docker compose config'
            }
        }

        stage('Build') {
            steps {
                sh 'docker compose build'
            }
        }

        stage('Test') {
            steps {
                echo 'Running application tests'
                sh 'docker compose run --rm backend npm run test --if-present'
            }
        }

        stage('Docker Deployment') {
            steps {
                sh 'docker compose up -d'
            }
        }

        stage('Verify Deployment') {
            steps {
                sh 'docker compose ps --status running'
                sh """docker compose exec -T backend node -e 'require("http").get("http://localhost:5000/health", response => process.exit(response.statusCode === 200 ? 0 : 1)).on("error", () => process.exit(1))'"""
            }
        }
    }

    post {
        success {
            echo 'CI/CD Pipeline completed successfully!'
        }

        failure {
            echo 'CI/CD Pipeline failed!'
        }

        always {
            sh 'docker compose down --remove-orphans || true'
        }
    }
}