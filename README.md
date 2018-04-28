#zhuyem

# #####安装软件
yarn 

# 在app所在文件配置如下
       zhuye.nginx
       package.json
       app_vy.js


# #####配置HTTP服务器  nginx反向代理配置(zhuye.nginx)
# 删掉默认网站配置
sudo rm /etc/nginx/sites-enabled/default
# 将本文件的zhuye.nigx 软连接到特定目录
sudo ln -s /home/zhuyem/zhuye.nginx /etc/nginx/sites-enabled/zhuyem
# 运行
sudo service nginx restart

1.
nohup node app.js > myLog.txt 2>&1 &

2.
npm install -g forever
forever start app.js
