// // next.config.mjs
// export default {
//   images: {
//     domains: ['imagedelivery.net', 'i.imgur.com', 'i.seadn.io','res.cloudinary.com','openseauserdata.com'], // Add the domain here
//   },
// };




// next.config.mjs
export default {
  images: {
    domains: [
      'imagedelivery.net',
      'i.imgur.com',
      'i.seadn.io',
      'res.cloudinary.com',
      'openseauserdata.com'
    ],
    loader: 'custom',
    path: '/',
  },
};
