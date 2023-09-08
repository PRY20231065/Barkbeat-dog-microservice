/* groovylint-disable-next-line CompileStatic */
pipeline {
    agent any
    environment {
        DYNAMO_ACCESS_KEY = credentials('dynamo-access-key')
        DYNAMO_SECRET_ACCESS_KEY = credentials('dynamo-secret-key')
        DYNAMO_REGION = 'us-east-1'
        NAME = 'dog-microservice'
        PORT = '443'
    }

    stages {
        stage('Clean') {
            agent any
            steps {
                sh "docker stop ${NAME}-container"
                sh "docker rm ${NAME}-container"
            }
        }

        stage('Checkout') {
            agent any
            steps {
                checkout scm
            }
        }

        stage('Build') {
            agent any
            steps {
                sh "docker build -t ${NAME} ."
            }
        }

        stage('Deploy') {
            agent any
            steps {
                sh "docker run -d --name ${NAME}-container -p ${PORT}:${PORT} -e DYNAMO_ACCESS_KEY=$DYNAMO_ACCESS_KEY -e DYNAMO_SECRET_ACCESS_KEY=$DYNAMO_SECRET_ACCESS_KEY -e DYNAMO_REGION=${DYNAMO_REGION} -e PORT=${PORT} dog-microservice"
            }
        }
    }
}
