vercel_environment=${VERCEL_ENV:-production}
if [ $vercel_environment = "production" ]
then
    yarn build
else
    yarn build:staging
fi
