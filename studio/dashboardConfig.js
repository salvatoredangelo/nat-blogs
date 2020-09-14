export default {
  widgets: [
    // {
    //   name: 'sanity-tutorials',
    //   options: {
    //     templateRepoId: 'sanity-io/sanity-template-gatsby-blog'
    //   }
    // },
    { name: 'structure-menu' },
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '5f5ed0c53b4b0e9cc728e19a',
                  title: 'Sanity Studio',
                  name: 'nat-blogs-studio',
                  apiId: 'f3eb29b6-f245-46a1-b426-ca4f9dd2765d'
                },
                {
                  buildHookId: '5f5ed0c5da13e322a9ccbc84',
                  title: 'Blog Website',
                  name: 'nat-blogs',
                  apiId: '0aa0fd1f-244d-4c64-a696-65f25eee117e'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/salvatoredangelo/nat-blogs',
            category: 'Code'
          },
          { title: 'Frontend', value: 'https://nat-blogs.netlify.app', category: 'apps' }
        ]
      }
    },
    { name: 'project-users', layout: { height: 'auto' } },
    {
      name: 'document-list',
      options: { title: 'Recent blog posts', order: '_createdAt desc', types: ['post'] },
      layout: { width: 'medium' }
    }
  ]
}
