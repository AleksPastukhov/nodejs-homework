build:
		docker build -t nodejshw:env .
run:
		docker run -d -p 3000:3000 --rm --name nodejshw nodejshw:env
run-dev:
		docker run -d -p 3000:3000 -v ./:/app --rm --name nodejshw nodejshw:env
stop:
		docker stop nodejshw