(async function(){
  try {
    const res = await globalThis.fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'vikkivikki9095+3@gmail.com', password: 'v1kki1' })
    });
    console.log('STATUS', res.status);
    console.log('BODY', await res.text());
  } catch (err) {
    console.error('ERROR', err);
    process.exit(1);
  }
})();