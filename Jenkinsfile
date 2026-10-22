
pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Validate files') {
            steps {
                bat 'if not exist index.html exit /b 1'
                bat 'if not exist style.css exit /b 1'
                bat 'if not exist script.js exit /b 1'
                bat 'if not exist Dockerfile exit /b 1'
            }
        }

        stage('Build Docker image') {
            steps {
                bat 'docker build -t resume-builder:latest .'
            }
        }

        stage('Deploy application') {
            steps {
                bat 'docker rm -f resume-builder 2>NUL'
                bat 'docker run -d --restart unless-stopped --name resume-builder -p 8081:80 resume-builder:latest'
            }
        }

        stage('Verify deployment') {
            steps {
                bat 'curl.exe -f http://localhost:8081/'
            }
        }
    }

    post {
        success {
            echo 'Resume Builder deployed successfully!'
        }
        failure {
            echo 'Deployment failed. Check Console Output.'
        }
    }
}
