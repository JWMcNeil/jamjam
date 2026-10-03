const redirects = async () => {
  const internetExplorerRedirect = {
    destination: '/ie-incompatible.html',
    has: [
      {
        type: 'header',
        key: 'user-agent',
        value: '(.*Trident.*)', // all ie browsers
      },
    ],
    permanent: false,
    source: '/:path((?!ie-incompatible.html$).*)', // all pages except the incompatibility page
  }

  const galleryRedirects = [
    { source: '/board', destination: '/gallery', permanent: true },
    { source: '/board/:slug', destination: '/gallery/:slug', permanent: true },
  ]

  const redirects = [internetExplorerRedirect, ...galleryRedirects]

  return redirects
}

export default redirects
