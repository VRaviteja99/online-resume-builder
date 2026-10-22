
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
                bat '"C:\\Users\\Ravi Teja\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin\\docker.exe" build -t resume-builder:latest .'
            }
        }

        stage('Deploy application') {
            steps {
                bat '''
                    "C:\\Users\\Ravi Teja\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin\\docker.exe" rm -f resume-builder 2>NUL
                    "C:\\Users\\Ravi Teja\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin\\docker.exe" run -d --restart unless-stopped --name resume-builder -p 8081:80 resume-builder:latest
                '''
            }
        }

        stage('Verify deployment') {
            steps {
                bat '"C:\\Users\\Ravi Teja\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin\\docker.exe" ps --filter "name=resume-builder"'
                bat 'curl.exe -f http://localhost:8081/'
            }
        }
    }

    post {
        success {
            echo 'SUCCESS: Resume Builder deployed at http://localhost:8081'
        }
        failure {
            echo 'FAILED: Check Console Output for the error.'
        }
    }
}
