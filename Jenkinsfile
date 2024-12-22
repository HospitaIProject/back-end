pipeline {
    agent any

    environment {
        DOCKER_USERNAME = credentials('DOCKER_USERNAME')
        DOCKER_PASSWORD = credentials('DOCKER_PASSWORD')
        EC2_PRIVATE_KEY = credentials('EC2_PRIVATE_KEY')
        EC2_HOST = credentials('EC2_HOST')
        DOCKER_REPOSITORY = credentials('DOCKER_REPOSITORY')
    }

    stages {
        stage('Setup Tools') {
            steps {
                sh '''
                sudo apt-get update
                sudo apt-get install -y unzip curl

                # Install Node.js dynamically
                curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
                sudo apt-get install -y nodejs

                # Install Gradle dynamically in home directory
                wget https://services.gradle.org/distributions/gradle-8.8-bin.zip -P /tmp
                sudo unzip -o -d /opt/gradle /tmp/gradle-8.8-bin.zip

                # Set permissions for Jenkins user
                sudo chown -R jenkins:jenkins /home/ubuntu/gradle
                sudo chmod -R 755 /home/ubuntu/gradle
                sudo chmod +x /home/ubuntu/gradle/gradle-8.8/bin/gradle
                
                export PATH=/home/ubuntu/gradle/gradle-8.8/bin:$PATH
                gradle -v
                '''
            }
        }

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Cache and Setup') {
            steps {
                sh '''
                chmod +x ./gradlew
                ./gradlew clean
                cd FrontEnd && npm ci && cd ..
                '''
            }
        }

        stage('Build React and Backend') {
            steps {
                sh '''
                cd FrontEnd && npm run build && cd ..
                ./gradlew build
                '''
            }
        }

        stage('Docker Login') {
            steps {
                sh '''
                echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
                '''
            }
        }

        stage('Determine Environment') {
            steps {
                script {
                    def currentEnv = sh(
                        script: """
                        ssh -o StrictHostKeyChecking=no -i ${EC2_PRIVATE_KEY} ubuntu@${EC2_HOST} \
                        "grep -oP '(?<=proxy_pass http://)\\w+' /etc/nginx/sites-available/stmary.site | head -1"
                        """,
                        returnStdout: true
                    ).trim()

                    if (currentEnv == 'blue') {
                        env.NEW_ENV = 'green'
                    } else if (currentEnv == 'green') {
                        env.NEW_ENV = 'blue'
                    } else {
                        error('Unable to determine the current environment.')
                    }

                    echo "Current environment: ${currentEnv}"
                    echo "New environment: ${env.NEW_ENV}"
                }
            }
        }

        stage('Build and Push Docker Image') {
            steps {
                sh '''
                docker buildx create --use
                docker buildx build --platform linux/amd64,linux/arm64/v8 \
                --push --tag $DOCKER_USERNAME/$DOCKER_REPOSITORY:$NEW_ENV .
                '''
            }
        }

        stage('Health Check and Update Nginx') {
            steps {
                sshagent(['EC2_PRIVATE_KEY']) {
                    sh '''
                    set -e

                    current_env=$(grep -oP '(?<=proxy_pass http://)\\w+' /etc/nginx/sites-available/stmary.site | head -1)
                    new_env=$NEW_ENV
                    new_port=8080

                    if [ "$new_env" == "green" ]; then
                        new_port=8081
                    fi

                    echo "Current environment: $current_env"
                    echo "New environment: $new_env"

                    echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
                    docker pull $DOCKER_USERNAME/$DOCKER_REPOSITORY:$new_env

                    cd compose
                    docker-compose up -d app-$new_env

                    for i in {1..20}; do
                        response=$(curl -s http://localhost:$new_port/actuator/health | jq -r '.status')
                        if [ "$response" == "UP" ]; then
                            echo "$new_env is healthy. Updating traffic..."
                            break
                        else
                            echo "Waiting for $new_env to become healthy..."
                            sleep 15
                        fi

                        if [ $i -eq 20 ]; then
                            echo "$new_env failed health check."
                            exit 1
                        fi
                    done

                    sudo sed -i "s|proxy_pass http://$current_env;|proxy_pass http://$new_env;|g" /etc/nginx/sites-available/stmary.site
                    sudo systemctl reload nginx

                    docker-compose stop app-$current_env
                    docker-compose rm -f app-$current_env
                    '''
                }
            }
        }
    }
}
