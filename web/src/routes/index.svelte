<script context="module">
  import client from '../sanityClient'
  import BlockContent from '@movingbrands/svelte-portable-text'
  import serializers from '../components/serializers'
  export async function preload({ params }) {
    const filter = '*[_type == "post"]|order(publishedAt desc)[0]'
    const projection = `{
      ...,
      "image": mainImage.asset->url,
      "caption": mainImage.caption,
      "alt": mainImage.alt,
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
    const post = await client.fetch(query).catch((err) => this.error(500, err))
    return { post }
  }
</script>

<script>
  export let post
  console.log(post.image)
  const heroQuerySize = `?w=500`
</script>

<style>
  h1,
  p {
    text-align: center;
    margin: 0 auto;
  }

  h1 {
    font-size: 2rem;
    text-transform: uppercase;
    font-weight: 700;
    margin: 0 0 0.5em 0;
  }
  p {
    margin: 1em auto;
  }

  b {
    text-decoration: underline;
  }

  @media (min-width: 480px) {
    h1 {
      font-size: 4em;
    }
  }
</style>

<svelte:head>
  <title>Nat's Portfolio</title>
</svelte:head>

<h1>Nat's Portfolio</h1>

<h2>
  <b>Latest Post</b>
</h2>

<h3>{post.title}</h3>

<figure>
  <img src={`${post.image}${heroQuerySize}`} alt={post.alt} />
  <figcaption>{post.caption}</figcaption>
</figure>

<div class="content">
  <BlockContent blocks={post.body} {serializers} />
</div>

<p>
  <strong>
    Go to
    <a href="/blog">/blog</a>
    to see content loaded from
    <a href="https://www.sanity.io">Sanity</a>
  </strong>
</p>
