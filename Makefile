# All is from https://github.com/extrawurst/gitui
SPC_CLIENT_JS_DIR = jsclient

.PHONY: build-spa-client-js, build-release, release-mac, release-win, release-linux-musl, docker-release, spa-client-docker-release

build-release:
	cargo build --package spa-client --bin spa-client --release

release-mac: build-release
	strip target/release/spa-client
	otool -L target/release/spa-client
	mkdir -p release
	tar -C ./target/release/ -czvf ./release/spa-client-mac.tar.gz ./spa-client
	ls -lisah ./release/spa-client-mac.tar.gz

release-win: build-release
	mkdir -p release
	tar -C ./target/release/ -czvf ./release/spa-client-win.tar.gz ./spa-client.exe
	#cargo install cargo-wix
	#cargo wix --package spa-client init
	#cargo wix --no-build --nocapture --package spa-client --output ./release/spa-client.msi
	ls -l ./release/spa-client-win.tar.gz

release-linux-musl: build-linux-musl-release
	strip target/x86_64-unknown-linux-musl/release/spa-client
	mkdir -p release
	tar -C ./target/x86_64-unknown-linux-musl/release/ -czvf ./release/spa-client-linux-musl.tar.gz ./spa-client

build-linux-musl-release:
	cargo build --package spa-client --bin spa-client --target=x86_64-unknown-linux-musl --release

build-spa-client-js:
	cd $(SPC_CLIENT_JS_DIR) && npm run build:release

# this is for local machine, not for GitHub Action
# make docker-release VERSION=1.2.3
docker-release:
ifeq ($(VERSION), )
	$(error VEDRSION is not set)
else
	DOCKER_BUILDKIT=1 docker build . -t="timzaak/spa-server:$(VERSION)"
    docker push timzaak/spa-server:$(VERSION)
	cd docker
	DOCKER_BUILDKIT=1 docker build . -f S3FS.Dockerfile -t="timzaak/spa-server:$(VERSION)-s3"
	docker push timzaak/spa-server:$(VERSION)-s3
endif

spa-client-docker-release:
ifeq ($(VERSION), )
	$(error VEDRSION is not set)
else
	DOCKER_BUILDKIT=1 docker build . -f SPA-Client.Dockerfile -t="timzaak/client:$(VERSION)"
	docker push timzaak/spa-client:$(VERSION)
endif


release-doc:
	set -e
	rm -fr docs/.vitepress/dist/*
	yarn run docs:build
	cd docs/.vitepress/dist
	git init
	git add -A
	git commit -m 'deploy'
	git push -f git@github.com:timzaak/spa-server.git master:gh-pages
	cd -
