function encodeBase64(str) {
  let buf = Buffer.from(str, 'utf8');
  return buf.toString('base64');
}

export default async function svelte([code]) {
  const id = `@svelte-inline-components:${encodeBase64(code)}.svelte`
  return import(id);
}
