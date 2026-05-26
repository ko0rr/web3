FROM quay.io/wildfly/wildfly:34.0.1.Final-jdk17
COPY ./build/libs/backend-1.0-SNAPSHOT.war /opt/jboss/wildfly/standalone/deployments/backend.war
EXPOSE 8080
CMD ["/opt/jboss/wildfly/bin/standalone.sh", "-b", "0.0.0.0"]