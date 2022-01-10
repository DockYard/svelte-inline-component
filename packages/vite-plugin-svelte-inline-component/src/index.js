export default function vitePluginSvelteInlineComponents() {
  return {
    name: 'svelte-inline-component',
    enforce: 'pre',

    resolveId(id) {
      if (id.startsWith('virtual:inline-svelte')) {
        return id;
      }
    },

    load(id) {
      if (id.startsWith('virtual:inline-svelte')) {
        let base64ComponentSource = id.split(/virtual:inline-svelte:/)[1].slice(0, -7);
        let buf = Buffer.from(base64ComponentSource, 'base64');
        return buf.toString('utf8');
      }
    },
  }
}