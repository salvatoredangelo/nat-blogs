<script context="module">
  import client from '../sanityClient'
  import BlockContent from '@movingbrands/svelte-portable-text'
  import serializers from '../components/serializers'
  export async function preload({ params }) {
    const filter = '*[_type == "author"][0]'
    const projection = `{
	  ...,
	  "image": image.asset->url,
	  "caption": image.caption,
	  "alt": image.alt,
      body[]{
        ...,
        children[]{
          ...,
          _type == 'authorReference' => {
            _type,
            author->
          }
        }
      }
    }`

    const query = filter + projection
    const author = await client
      .fetch(query)
      .catch((err) => this.error(500, err))
    return { author }
  }
</script>

<script>
  export let author
  const heroQuerySize = `?fit=crop&crop=entropy&w=500`
</script>

<svelte:head>
  <title>About {author.name}</title>
</svelte:head>
<h1>
  About
  <b>{author.name}</b>
</h1>
<figure>
  <img src={`${author.image}${heroQuerySize}`} alt={author.alt} />
  <figcaption>{author.caption}</figcaption>
</figure>

<div class="content">
  <BlockContent blocks={author.bio} {serializers} />
</div>
