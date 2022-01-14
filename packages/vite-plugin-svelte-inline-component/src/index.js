export default function vitePluginSvelteInlineComponents() {
  const virtualModuleId = '@svelte-inline-components:'
  const resolvedVirtualModuleId = '\0' + virtualModuleId  
  return {
    name: 'svelte-inline-component',
    enforce: 'pre',

    resolveId(id) {
      if (id.startsWith(virtualModuleId)) {
        return '\0' + id;
      }
    },

    load(id) {
      if (id.startsWith(resolvedVirtualModuleId)) {
        let base64ComponentSource = id.split(/@svelte-inline-components:/)[1].slice(0, -7);
        let buf = Buffer.from(base64ComponentSource, 'base64');
        return buf.toString('utf8');
      }
    },
  }
}