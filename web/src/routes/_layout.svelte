<script context="module">
  import client from '../sanityClient'
  import BlockContent from '@movingbrands/svelte-portable-text'
  import serializers from '../components/serializers'
  const contentType = 'post'
  export async function preload({ params }) {
    const filter = `*[_type == "siteSettings"][0]`
    const projection = `{
      title,
      "hero": image.asset->url,
      "alt": image.alt
    }`

    const query = filter + projection
    const settings = await client
      .fetch(query)
      .catch((err) => this.error(500, err))
    return { settings }
  }
</script>

<script>
  import Nav from '../components/Nav.svelte'

  export let settings
  const { title, hero: src, alt } = settings

  export let segment
</script>

<style>
  section {
    height: 100vh;
    width: 100vw;
    display: grid;
    place-content: center;
  }
  h1 {
    font-size: 3rem;
  }
</style>

<Nav {segment} />

{#if segment === undefined}
<section style="background: url('{src}');">
  <h1>{title}</h1>
</section>
{/if}
<main>
  <slot />
</main>
