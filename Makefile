V=5
url=registry.cn-hangzhou.aliyuncs.com/enchantable/rabbit-h5:$(V)
push:
	yarn build && yarn upload && docker build . -t $(url) && docker push $(url)
