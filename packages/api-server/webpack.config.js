const webpack = require('webpack');

module.exports = function (options) {
  const { plugins, ...config } = options;
  return {
    ...config,
    externals: [],
    plugins: [
      ...plugins,
      new webpack.IgnorePlugin({
        checkResource(resource) {
          const lazyImports = [
            '@nestjs/microservices',
            'cache-manager',
            'class-validator',
            'class-transformer',
            '@nestjs/websockets/socket-module',
            '@nestjs/microservices/microservices-module',
          ];
          if (!lazyImports.includes(resource)) {
            return false;
          }
          try {
            require.resolve(resource, {
              paths: [process.cwd()],
            });
          } catch (err) {
            return true;
          }
          return false;
        },
      }),
    ],
  };
};
