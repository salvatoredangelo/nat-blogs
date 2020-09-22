<script context="module">
  import client from '../sanityClient'
  import BlockContent from '@movingbrands/svelte-portable-text'
  import serializers from '../components/serializers'
  export async function preload({ params }) {
    const settings = `*[_type == "siteSettings"][0]{
      title,
      "hero": image.asset->url,
      "alt": image.alt
    }`
    const firstPost = `*[_type == "post"]|order(publishedAt desc)[0]{
      ...,
      "image": mainImage.asset->url,
      "caption": mainImage.caption,
      "alt": mainImage.alt,
      mainImage,
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

    const query = `{
      "settings": ${settings},
      "post": ${firstPost},
    }`
    const result = await client.fetch(query).catch((err) => this.error(500, err))
    return { result }
  }
</script>

<script>
  export let result
  const {post, settings} = result
  const { title, hero: src, alt } = settings

  import myConfiguredSanityClient from '../sanityClient'
  import imageUrlBuilder from '@sanity/image-url'

  const builder = imageUrlBuilder(myConfiguredSanityClient)

  const urlFor = (source) => builder.image(source)
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
  article {
    padding: 0 3rem;
  }
  h2 {
    font-size: 2.3rem;
  }
  figure {
    width: 100%;
    height: auto;
  }
  img {
    width: 100%;
    height: 50vh;
    object-fit: cover;
  }
</style>

<svelte:head>
  <title>Nat's Portfolio</title>
</svelte:head>

<section style="background: url('{src}');" aria-label="{alt}">
  <h1>{title}</h1>
</section>

<article>
<h2>
  <b>Latest Post</b>
</h2>

<h3>{post.title}</h3>

<figure>
  <img src={urlFor(post.image).url()} alt={post.alt} />
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
</article>
