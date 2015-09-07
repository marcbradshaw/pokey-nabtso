all:
	echo "Usage"

setup:
	#aptitude install ruby1.9.1-dev nodejs
	gem install jekyll execjs jekyll-sitemap

configinstall:
	mkdir -p /var/log/apache2/pokey.goestheweasel.com
	chown www-data:www-data /var/log/apache2/pokey.goestheweasel.com 
	cp conf/apache/pokey.goestheweasel.com.conf /etc/apache2/sites-available/
	a2ensite pokey.goestheweasel.com.conf

reload:
	service apache2 reload

content:
	mkdir -p /home/web/pokey.goestheweasel.com
	cd website ; jekyll build ; ./local.sh
	rsync -qrcC --delete website/_site/  /home/web/pokey.goestheweasel.com/
	chown -R admpokey:www-data /home/web/pokey.goestheweasel.com
	(find /home/web/pokey.goestheweasel.com -type f -print0|xargs -0 chmod 640)
	(find /home/web/pokey.goestheweasel.com -type d -print0|xargs -0 chmod 750)

prodhook:
	echo '#!/bin/bash' > .git/hooks/post-merge
	echo 'hooks/post-merge' >> .git/hooks/post-merge
	chmod 755 .git/hooks/post-merge
	mkdir -p /etc/twofiftyeight/deploy_manager
	cp conf/deploy.json /etc/twofiftyeight/deploy_manager/pokey.goestheweasel.json

install: configinstall content reload

