export const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Nomad Society',
    version: '1.0.0',
    description:
      'This is a social network backend for digital nomads.',
    license: {
      name: 'GNU General Public License 3.0',
      url: 'https://github.com/Kric12/BackEnd-NomadSociety/blob/main/LICENSE'
    },
    contact: {
      name: 'Github Repository',
      url: 'https://github.com/Kric12/BackEnd-NomadSociety'
    }
  },
  servers: [
    {
      description: 'Production',
      url: 'https://backend-nomadsociety-production.up.railway.app/'
    },
    {
      description: 'Development',
      url: 'https://backend-nomadsociety-development.up.railway.app/'
    },
    {
      description: 'Local Host',
      url: 'http://localhost:3000/'
    },
  ],
  components: {
    securitySchemes: {
      "token": {
        type: "apiKey",
        name: "Authorization",
        in: "header"
      }
    }
  }
};