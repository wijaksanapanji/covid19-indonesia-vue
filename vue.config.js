module.exports = {
  publicPath:
    process.env.NODE_ENV === "production" ? "/projects/covid19-indonesia" : "/",
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].title = "Kasus covid19 Indonesia";
      args[0].description = "Informasi kasus covid19 di Indonesia";
      return args;
    });
  }
};
