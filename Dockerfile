FROM nginx
#VOLUME /tmp
ENV LANG en_US.UTF-8
ADD release/nginx.conf /etc/nginx/nginx.conf
ADD ./dist/ /usr/share/nginx/html/
EXPOSE 80
EXPOSE 443
