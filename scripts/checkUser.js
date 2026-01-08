const { PrismaClient } = require('@prisma/client');
const { PrismaMariaDb } = require('@prisma/adapter-mariadb');
const prisma = new PrismaClient({ adapter: new PrismaMariaDb(process.env.DATABASE_URL || 'mysql://root:root@localhost:3306/rivvo') });

(async function(){
  try{
    const user = await prisma.user.findUnique({ where: { email: 'vikkivikki9095@gmail.com' } });
    console.log(JSON.stringify(user, null, 2));
  }catch(e){
    console.error('Error:', e);
  }finally{
    await prisma.$disconnect();
  }
})();
