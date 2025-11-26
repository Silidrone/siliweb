export UID=$(id -u)
export GID=$(id -g)

cp .env backend/.env
docker compose -p siliweb up --build