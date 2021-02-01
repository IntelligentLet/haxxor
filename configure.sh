echo Haxxor bot setup
echo Enter discord token:
read discord
echo Enter prefix:
read prefix
echo Enter color:
read color
echo Enter port:
read port
echo Enter welcome channel id:
read channel
echo Enter rules channel id:
read rules
echo Enter join role:
read role

rm .env
echo "DISCORD=$discord
PREFIX=$prefix
COLOR=$color
PORT=$port
CHANNEL=$channel
RULES=$rules
ROLE=$role" > .env