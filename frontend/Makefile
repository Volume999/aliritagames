.PHONY: install upgrade fmt dev

install:
	yarn install 

upgrade:
	yarn upgrade-interactive --latest

fmt:
	yarn lint

dev:
	yarn dev

deploy-preview:
	vercel --prebuilt

deploy:
	vercel --prod

clean:
	rm -rf .next
	rm -rf node_modules
	yarn cache clean

test:
	yarn test