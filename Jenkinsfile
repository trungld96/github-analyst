// Jenkins Docker Ecr: https://octopus.com/blog/jenkins-docker-ecr
// SSH Agent: https://www.jenkins.io/doc/pipeline/steps/ssh-agent/

pipeline {
    agent any

    environment {
        CODE_VERSION = sh(
            script: "cat ./package.json | grep -m 1 version | sed 's/[^0-9.]//g'", returnStdout: true
        ).trim()

        VERSION = "${CODE_VERSION}_${BUILD_TIMESTAMP}"

        ECR_HOST = '803614452193.dkr.ecr.ap-southeast-1.amazonaws.com'
        IMAGE_REPO = '803614452193.dkr.ecr.ap-southeast-1.amazonaws.com/ai-style-management-fe'
        AWS_CREDENTIAL = 'ecr:ap-southeast-1:aws-deployment-credentials'

        DEV_MACHINE_HOST = '139.180.138.240'
        DEV_MACHINE_SSH_PORT = '2232'
        DEV_MACHINE_SSH_CREDENTIAL = 'ssh-key-jenkins-dev'

        PROD_MACHINE_HOST = ''
        PROD_MACHINE_SSH_PORT = '22'

        BRANCH_DEV = 'dev'
        BRANCH_STAGING = 'stg'
        BRANCH_MASTER = 'master'
    }

    stages {
        stage('Git SCM') {
            steps {
                script {
                    checkout scm
                }
            }
        }

        stage('Build') {
            when {
                anyOf {
                    branch BRANCH_DEV
                    branch BRANCH_STAGING
                    branch BRANCH_MASTER
                    branch pattern: 'release\\/.*', comparator: 'REGEXP'
                }
            }

            steps {
                script {		    
                    if (BRANCH_NAME == BRANCH_DEV) {
                        sh "mv .env.development .env"
			finalImageVersion = "${VERSION}_dev"
                    } else if (BRANCH_NAME == BRANCH_STAGING) {
                        sh "mv .env.stg .env"
			finalImageVersion = "${VERSION}_stg"
                    }

                    docker.withRegistry("https://${ECR_HOST}", AWS_CREDENTIAL) {
                        echo "Triggering build ${IMAGE_REPO}:${finalImageVersion}"
                        def image = docker.build("${IMAGE_REPO}:${finalImageVersion}", "--no-cache -f Dockerfile .")

                        echo "publishing ${IMAGE_REPO}:${finalImageVersion}"
                        image.push()
                    }
                }
            }
        }

        stage('Deploy Artifact') {
            when {
                anyOf {
                    branch BRANCH_DEV
                    branch BRANCH_STAGING
                    branch BRANCH_MASTER
                    branch pattern: 'release\\/.*', comparator: 'REGEXP'
                }
            }
            steps {
                script {
                    if (BRANCH_NAME == BRANCH_DEV) {
			def finalImageVersion = "${VERSION}_dev"
                        remoteCmd = "\"cd /home/dev/visionlab/ai-style-management/frontend/dev && ./deploy.sh $finalImageVersion\""

                        echo "Updating the Container on ${DEV_MACHINE_HOST} ${DEV_MACHINE_SSH_PORT} with cmd = \n ${remoteCmd}"
                        sshagent (credentials: [DEV_MACHINE_SSH_CREDENTIAL]) {
                          sh "ssh -o StrictHostKeyChecking=no -p ${DEV_MACHINE_SSH_PORT} -l dev ${DEV_MACHINE_HOST} ${remoteCmd}"
                        }
                    } else if (BRANCH_NAME == BRANCH_STAGING) {
			def finalImageVersion = "${VERSION}_stg"
                        echo 'Do Nothing on Staging'
                    } else if (BRANCH_NAME == BRANCH_MASTER) {
                        echo 'Do Nothing on Master'
                    } else if ((BRANCH_NAME =~ 'release\\/.*').matches()) {
                        echo 'Release is not implemented yet'
                    }
                }
            }
        }
    }
}

