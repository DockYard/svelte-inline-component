function encodeBase64(str) {
  let buf = Buffer.from(str, 'utf8');
  return buf.toString('base64');
}

export async function svelte([code]) {
  const id = `virtual:inline-svelte:${encodeBase64(code)}.svelte`
  return import(id);
}